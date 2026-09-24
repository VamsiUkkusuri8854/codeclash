import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { checkAch } from '../data/achievements';
import { CHALLENGES } from '../data/challenges';
import { PLAYERS } from '../data/leaderboard';
import { mondayKey, newUser, yesterdayKey } from '../data/users';
import { getAllUsers, getCurrentUser, isUsernameTaken, loginUser, logoutUser, registerUser, saveUser, seedDemoUsers } from '../utils/storage';
import { getLevel } from '../utils/levelSystem';
import { XP_REWARD, dateKey, dayIdx } from '../utils/xpSystem';
import { beep } from '../utils/formatters';

const Ctx = createContext();
export const useGame = () => useContext(Ctx);
const addXp = (n, v) => { n.xp += v; n.weeklyXp[dayIdx()] += v; };
// Keep derived fields in sync and roll over the weekly stats / broken streaks.
const norm = (n) => {
  n.level = getLevel(n.xp); n.problemsSolved = n.completedChallenges.length;
  const st = { easy: 0, medium: 0, hard: 0 };
  n.completedChallenges.forEach((id) => { const c = CHALLENGES.find((x) => x.id === id); if (c) st[c.difficulty.toLowerCase()]++; });
  n.statistics = st;
  if (n.weekOf !== mondayKey()) { n.weekOf = mondayKey(); n.week = Array(7).fill(false); n.weeklyXp = Array(7).fill(0); n.weeklySolved = Array(7).fill(0); n.weeklyWins = Array(7).fill(0); }
  if (n.dailyDone && n.dailyDone !== dateKey() && n.dailyDone !== yesterdayKey()) n.currentStreak = 0;
  n.activity = n.activity.slice(0, 30); n.submissions = n.submissions.slice(0, 50); n.battleHistory = n.battleHistory.slice(0, 30);
};

export function GameProvider({ children }) {
  const [s, setS] = useState(() => { seedDemoUsers(); return getCurrentUser(); }); // s = the logged-in user (or null)
  const ref = useRef(s);
  const [toasts, setToasts] = useState([]);
  useEffect(() => {
    if (!s) return;
    document.documentElement.dataset.theme = s.settings.theme;
    document.documentElement.classList.toggle('no-anim', !s.settings.animations);
  }, [s]);
  const toast = useCallback((msg, type = 'info') => {
    if (ref.current && !ref.current.settings.notifications) return;
    const id = Math.random();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  // Mutate a copy of the CURRENT user only, run achievement/level checks, then persist that user.
  const act = (fn) => {
    const before = ref.current; if (!before) return;
    const n = structuredClone(before), msgs = [];
    norm(n); fn(n, msgs); norm(n); checkAch(n, msgs); norm(n);
    n.lastActive = new Date().toISOString();
    if (n.level > before.level) msgs.push([`Level up! You are now Level ${n.level} ⚡`, 'ach']);
    saveUser(n); ref.current = n; setS(n);
    if (msgs.length) beep(n.settings.sound, 780);
    msgs.forEach(([m, t]) => toast(m, t));
  };

  const rank = s ? [...PLAYERS.map((p) => p.xp), ...getAllUsers().filter((u) => u.id !== s.id).map((u) => u.xp)].filter((x) => x > s.xp).length + 1 : 0;
  const api = {
    s, toasts, toast, rank, users: getAllUsers(),
    register: (data) => registerUser(data), // does NOT log in
    login: (idf, pw) => { const r = loginUser(idf, pw); if (r.ok) { ref.current = r.user; setS(r.user); act(() => {}); } return r; },
    logout: () => { logoutUser(); ref.current = null; setS(null); },
    setSettings: (p) => act((n) => { Object.assign(n.settings, p); }),
    setProfile: (p) => {
      if (p.username && isUsernameTaken(p.username, ref.current.id)) { toast('That username is already taken.', 'info'); return false; }
      act((n) => Object.assign(n, p)); toast('Profile updated!', 'success'); return true;
    },
    markProgress: (id, pct) => act((n) => { n.progress[id] = Math.max(n.progress[id] || 0, pct); }),
    completeChallenge: (c, elapsed) => {
      let gained = 0;
      act((n, m) => {
        if (!n.completedChallenges.includes(c.id)) {
          gained = c.xp; n.completedChallenges.push(c.id); n.weeklySolved[dayIdx()]++; addXp(n, gained);
          n.submissions.unshift({ challengeId: c.id, title: c.title, at: new Date().toISOString(), seconds: elapsed });
          n.activity.unshift({ t: `Solved ${c.title}`, x: `+${gained} XP` });
          if (elapsed < c.minutes * 30) n.speed = true;
          m.push([`Challenge completed! +${gained} XP`, 'success']);
        } else m.push(['Challenge already completed — no extra XP.', 'info']);
        n.progress[c.id] = 100;
      });
      return gained;
    },
    completeDaily: (c) => {
      let gained = 0;
      act((n, m) => {
        if (n.dailyDone === dateKey()) return;
        gained = XP_REWARD.Daily + XP_REWARD.Streak; addXp(n, gained);
        n.currentStreak = n.dailyDone === yesterdayKey() ? n.currentStreak + 1 : 1; n.dailyDone = dateKey();
        n.longestStreak = Math.max(n.longestStreak, n.currentStreak); n.week[dayIdx()] = true;
        if (!n.completedChallenges.includes(c.id)) { n.completedChallenges.push(c.id); n.weeklySolved[dayIdx()]++; }
        n.progress[c.id] = 100; n.activity.unshift({ t: `Daily Challenge: ${c.title}`, x: `+${gained} XP` });
        m.push([`Daily Challenge completed! +${gained} XP`, 'success'], [`🔥 ${n.currentStreak}-day streak!`, 'ach']);
      });
      return gained;
    },
    finishBattle: (win, info) => {
      let r = {};
      act((n, m) => {
        const xp = win ? XP_REWARD.Battle : 20, rating = win ? 15 : -10;
        addXp(n, xp); n.rating += rating; if (win) { n.battleWins++; n.weeklyWins[dayIdx()]++; }
        n.battleHistory.unshift({ win, ...info, xp, rating });
        n.activity.unshift({ t: `${win ? 'Won' : 'Lost'} a ${info.type} battle vs ${info.opp}`, x: `+${xp} XP` });
        r = { xp, rating }; m.push([win ? 'Battle won! +250 XP' : 'Battle lost. +20 XP for playing', 'battle']);
      });
      return r;
    },
    // Resets ONLY the current user's progress. Identity, settings and every other account are untouched.
    reset: () => {
      const b = ref.current, f = newUser(b);
      const n = { ...f, id: b.id, createdAt: b.createdAt, settings: b.settings, favLang: b.favLang };
      saveUser(n); ref.current = n; setS(n); toast('Your demo progress was reset', 'info');
    },
  };
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}
