import { dayIdx } from '../utils/xpSystem';
export const mondayKey = () => { const d = new Date(); d.setDate(d.getDate() - dayIdx()); return d.toDateString(); };
export const yesterdayKey = () => new Date(Date.now() - 864e5).toDateString();
const zeros = () => Array(7).fill(0);
// A brand-new account always starts from zero. `password` must already be hashed.
export const newUser = ({ name, username, email, password }) => ({
  id: `u_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`,
  name, username, email, password, createdAt: new Date().toISOString(), lastActive: null,
  level: 1, xp: 0, rating: 1000, problemsSolved: 0, battleWins: 0, currentStreak: 0, longestStreak: 0,
  completedChallenges: [], achievements: [], submissions: [], battleHistory: [],
  statistics: { easy: 0, medium: 0, hard: 0 },
  settings: { theme: 'dark', notifications: true, sound: true, animations: true },
  favLang: 'Java', speed: false, dailyDone: '', progress: {},
  weekOf: mondayKey(), week: Array(7).fill(false), weeklyXp: zeros(), weeklySolved: zeros(), weeklyWins: zeros(), activity: [],
});
// Optional pre-made account (demo@codeclash.dev / demo1234) so the app is explorable immediately.
export const demoStats = () => ({
  xp: 2450, level: 5, rating: 1420, battleWins: 3, currentStreak: 7, longestStreak: 21, dailyDone: yesterdayKey(),
  completedChallenges: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], achievements: ['first-blood', 'problem-hunter', 'streak-master', 'battle-rookie'],
  progress: { 12: 20, 13: 30 }, week: Array.from({ length: 7 }, (_, i) => i < dayIdx()),
  weeklyXp: [180, 240, 120, 300, 160, 220, 90].map((v, i) => (i < dayIdx() ? v : 0)),
  weeklySolved: [3, 4, 2, 5, 3, 4, 2].map((v, i) => (i < dayIdx() ? v : 0)), weeklyWins: [1, 0, 2, 1, 1, 0, 1].map((v, i) => (i < dayIdx() ? v : 0)),
  activity: [{ t: 'Solved Coin Change', x: '+100 XP' }, { t: 'Won a ranked battle vs LoopLord', x: '+250 XP' }],
});
