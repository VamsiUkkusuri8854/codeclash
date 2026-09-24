import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { CHALLENGES } from '../data/challenges';
import { PLAYERS } from '../data/leaderboard';
import ChallengeCard from '../components/ChallengeCard';
import LeaderboardTable, { buildRows } from '../components/LeaderboardTable';
import { Button, Card, LevelBadge, ProgressBar } from '../components/ui';
const FEATURES = [['🧩', 'Code Challenges', 'Solve coding problems across multiple difficulty levels.', '/challenges'], ['⚔️', 'Coding Battles', 'Compete against other players in timed challenges.', '/battle'], ['⚡', 'XP & Levels', 'Earn XP for solving problems and completing activities.', '/dashboard'], ['🎖️', 'Achievements', 'Unlock badges for reaching milestones.', '/achievements'], ['🏆', 'Leaderboards', 'Compete with other developers.', '/leaderboard'], ['📅', 'Daily Challenges', 'Complete daily challenges to maintain your streak.', '/daily']];
export default function Home() {
  const { s, users } = useGame(); const nav = useNavigate();
  const go = (p) => (s ? nav(p) : nav('/login', { state: { from: p } }));
  return (
    <div className="landing">
      <div className="bg">{['{ }', '</>', '01', '=>', 'XP', '&&', '[]', '++'].map((g, i) => <span key={i} style={{ left: `${8 + i * 12}%`, animationDelay: `${i * 1.3}s` }}>{g}</span>)}</div>
      <header className="lhead"><b className="logo">⚔️ CODE<span>CLASH</span></b>
        <div className="row"><Button variant="ghost" onClick={() => go('/leaderboard')}>Leaderboard</Button>{s ? <Button variant="ghost" onClick={() => nav('/dashboard')}>Dashboard</Button> : <><Button variant="ghost" onClick={() => nav('/about')}>About</Button><Button variant="ghost" onClick={() => nav('/login')}>Login</Button><Button onClick={() => nav('/register')}>Register</Button></>}</div></header>
      <section className="hero">
        <h1>CODE<span>CLASH</span></h1><h2>Code. Battle. Level Up.</h2>
        <p className="mut">Turn coding practice into a competitive gaming experience.</p>
        <div className="row center"><Button onClick={() => go('/arena/1')}>Start Coding</Button><Button variant="ghost" onClick={() => go('/challenges')}>Explore Challenges</Button></div>
        <Card className="herocard"><div className="row between"><b>Sample Player</b><LevelBadge level={5} /></div><small>2,450 / 2,500 XP</small><ProgressBar pct={90} /></Card>
      </section>
      <section className="wrap"><div className="grid4">{[['19', 'Challenges'], ['9', 'Achievements'], ['4', 'Languages'], ['3', 'Battle modes']].map(([v, l]) => <Card key={l} className="center"><b className="big">{v}</b><small>{l}</small></Card>)}</div></section>
      <section className="wrap"><h2>Features</h2><div className="grid">{FEATURES.map(([i, t, d, to]) => <Card key={t} className="hover clickable" onClick={() => go(to)}><div style={{ fontSize: 30 }}>{i}</div><h3>{t}</h3><p className="mut">{d}</p></Card>)}</div></section>
      <section className="wrap"><h2>Popular Challenges</h2><div className="grid">{CHALLENGES.slice(0, 3).map((c) => <ChallengeCard key={c.id} c={c} />)}</div></section>
      <section className="wrap"><h2>Leaderboard Preview</h2><Card><LeaderboardTable compact rows={buildRows(PLAYERS, users, s, 'Global', 3)} /></Card>
        <div className="row center mt"><Button onClick={() => go('/leaderboard')}>View Full Leaderboard</Button></div></section>
      <footer className="center mut">© CodeClash · Frontend prototype v1</footer>
    </div>
  );
}
