import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { getChallenges, getLeaderboard, useApi } from '../services/api';
import { ACHIEVEMENTS } from '../data/achievements';
import { levelInfo } from '../utils/levelSystem';
import { dailyFor, dateKey } from '../utils/xpSystem';
import { fmtNum } from '../utils/formatters';
import LeaderboardTable, { buildRows } from '../components/LeaderboardTable';
import { Button, Card, ProgressBar, Skeleton, StatCard, XPBadge, diffClass } from '../components/ui';
export default function Dashboard() {
  const { s, users, rank } = useGame(); const nav = useNavigate();
  const cs = useApi(getChallenges), lb = useApi(getLeaderboard);
  if (!cs || !lb) return <Skeleton n={6} />;
  const li = levelInfo(s.xp), d = dailyFor(cs), done = s.dailyDone === dateKey();
  const cont = Object.entries(s.progress).filter(([id]) => !s.completedChallenges.includes(+id)).map(([id, p]) => ({ c: cs.find((x) => x.id === +id), p })).filter((x) => x.c);
  const recent = [...s.achievements].reverse().slice(0, 4).map((id) => ACHIEVEMENTS.find((a) => a.id === id));
  return (
    <div className="stack">
      <Card className="glow"><h1>Welcome back, {s.name.split(' ')[0]}!</h1>
        <div className="row between"><b>Level {li.level}</b><span>{fmtNum(s.xp)} / {fmtNum(li.next)} XP</span></div><ProgressBar pct={li.pct} /><small className="mut">{li.pct}% to next level</small></Card>
      <div className="grid4">
        <StatCard icon="✅" label="Problems Solved" value={s.problemsSolved} to="/challenges" /><StatCard icon="⚔️" label="Battle Wins" value={s.battleWins} to="/battle" />
        <StatCard icon="🔥" label="Current Streak" value={`${s.currentStreak} Days`} to="/daily" /><StatCard icon="🌍" label="Global Rank" value={`#${rank}`} to="/leaderboard" />
      </div>
      <div className="grid2">
        <Card><h3>Continue Coding</h3>{cont.length === 0 ? <p className="mut">Nothing in progress. Start a challenge!</p> : cont.map(({ c, p }) => (
          <div key={c.id} className="item clickable" onClick={() => nav(`/arena/${c.id}`)}><div className="row between"><b>{c.title}</b><span className={diffClass(c.difficulty)}>{c.difficulty}</span></div>
            <small className="mut">{p ? `${p}% completed` : 'Not completed'}</small><ProgressBar pct={p} /></div>))}</Card>
        <Card><h3>📅 Daily Challenge</h3><h2>{d.title}</h2><p className="row"><span className={diffClass(d.difficulty)}>{d.difficulty}</span><XPBadge xp={100} /><small>⏱ {d.minutes} min</small></p>
          {done ? <p className="ok">✓ Completed today!</p> : <Button onClick={() => nav(`/arena/${d.id}?mode=daily`)}>Start Challenge</Button>}</Card>
        <Card><h3>Recent Achievements</h3>{recent.length === 0 ? <p className="mut">No achievements unlocked yet.</p> : recent.map((a) => <div key={a.id} className="item">{a.icon} {a.name}</div>)}
          <Button variant="ghost" onClick={() => nav('/achievements')}>View all</Button></Card>
        <Card><h3>Leaderboard Preview</h3><LeaderboardTable compact rows={buildRows(lb, users, s, 'Global', 3)} /><Button variant="ghost" onClick={() => nav('/leaderboard')}>Full leaderboard</Button></Card>
      </div>
    </div>
  );
}
