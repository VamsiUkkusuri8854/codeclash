import { useState } from 'react';
import { NavLink, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { levelInfo } from '../utils/levelSystem';
import { LevelBadge, ProgressBar } from './ui';
const NAV = [['/dashboard', '🏠', 'Dashboard'], ['/challenges', '🧩', 'Challenges'], ['/battle', '⚔️', 'Battle Arena'], ['/daily', '📅', 'Daily Challenge'], ['/leaderboard', '🏆', 'Leaderboard'], ['/achievements', '🎖️', 'Achievements'], ['/statistics', '📊', 'Statistics'], ['/profile', '👤', 'Profile'], ['/settings', '⚙️', 'Settings']];
export default function Layout() {
  const { s, logout, toasts, setSettings } = useGame(); const [open, setOpen] = useState(false);
  const nav = useNavigate(); const { pathname } = useLocation();
  if (!s) return <Navigate to="/login" replace state={{ from: pathname }} />;
  const li = levelInfo(s.xp);
  return (
    <div className="shell">
      <header className="top">
        <button className="btn ghost menu" aria-label="Menu" onClick={() => setOpen(!open)}>☰</button>
        <b className="logo" onClick={() => nav('/dashboard')}>⚔️ CODE<span>CLASH</span></b>
        <div className="row"><LevelBadge level={li.level} />
          <button className="btn ghost" title="Toggle theme" onClick={() => setSettings({ theme: s.settings.theme === 'dark' ? 'light' : 'dark' })}>{s.settings.theme === 'dark' ? '☀️' : '🌙'}</button></div>
      </header>
      {open && <div className="scrim" onClick={() => setOpen(false)} />}
      <aside className={`side ${open ? 'open' : ''}`}>
        <b className="logo" onClick={() => { nav('/dashboard'); setOpen(false); }}>⚔️ CODE<span>CLASH</span></b>
        <nav>{NAV.map(([to, i, l]) => <NavLink key={to} to={to} onClick={() => setOpen(false)}><span>{i}</span>{l}</NavLink>)}
          <button className="navbtn" onClick={() => { logout(); nav('/login'); }}><span>🚪</span>Logout</button></nav>
        <div className="mini"><LevelBadge level={li.level} /><small>{s.xp} / {li.next} XP</small><ProgressBar pct={li.pct} /></div>
      </aside>
      <main key={pathname} className="page"><Outlet /></main>
      <div className="toasts">{toasts.map((t) => <div key={t.id} className={`toast ${t.type}`}>{t.msg}</div>)}</div>
    </div>
  );
}
