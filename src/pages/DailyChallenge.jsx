import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { getChallenges, useApi } from '../services/api';
import { dailyFor, dateKey } from '../utils/xpSystem';
import { Button, Card, Skeleton, XPBadge, diffClass } from '../components/ui';
const left = () => { const n = new Date(), e = new Date(n); e.setHours(24, 0, 0, 0); return Math.floor((e - n) / 1000); };
export default function DailyChallenge() {
  const { s, completeDaily } = useGame(); const nav = useNavigate(); const cs = useApi(getChallenges); const [t, setT] = useState(left());
  useEffect(() => { const i = setInterval(() => setT(left()), 1000); return () => clearInterval(i); }, []);
  if (!cs) return <Skeleton n={3} h={140} />;
  const d = dailyFor(cs), done = s.dailyDone === dateKey();
  return (
    <div className="stack"><h1>📅 Daily Challenge</h1>
      <Card className="glow"><h2>{d.title}</h2><div className="row"><span className={diffClass(d.difficulty)}>{d.difficulty}</span><XPBadge xp={100} /><small>⏱ {d.minutes} min</small>{d.source && <small>{d.source}</small>}</div><p>{d.statement}</p>
        <p className="mut">⏳ New challenge in <b>{Math.floor(t / 3600)}h {Math.floor((t % 3600) / 60)}m {t % 60}s</b></p>
        {done ? <h3 className="ok">Daily Challenge Completed! +100 XP 🔥 Streak increased!</h3> : <div className="row"><Button onClick={() => nav(`/arena/${d.id}?mode=daily`)}>Start Challenge</Button><Button variant="ghost" onClick={() => completeDaily(d)}>⚡ Quick complete (demo)</Button></div>}</Card>
      <Card><h3>🔥 Streak: {s.currentStreak} days <small className="mut">· longest {s.longestStreak}</small></h3><div className="week">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((n, i) => <div key={n} className={s.week[i] ? 'day on' : 'day'}><small>{n}</small><b>{s.week[i] ? '✓' : '○'}</b></div>)}</div></Card>
    </div>
  );
}
