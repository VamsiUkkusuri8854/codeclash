import { useNavigate } from 'react-router-dom';
import { Button, Card, XPBadge, diffClass } from './ui';
import { useGame } from '../context/GameContext';
export default function ChallengeCard({ c }) {
  const nav = useNavigate(); const { s } = useGame(); const done = !!s?.completedChallenges.includes(c.id);
  return (
    <Card className="hover clickable" onClick={() => nav(`/challenges/${c.id}`)}>
      <div className="row between"><span className={diffClass(c.difficulty)}>{c.difficulty}</span>{done && <span className="ok">✓ Completed</span>}</div>
      <h3>{c.title}</h3><p className="mut">{c.category} · ⏱ {c.minutes} min</p>
      <div className="row between"><XPBadge xp={c.xp} /><Button onClick={(e) => { e.stopPropagation(); nav(`/arena/${c.id}`); }}>{done ? 'Retry' : 'Start'}</Button></div>
    </Card>
  );
}
