import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { getChallenge, useApi } from '../services/api';
import { Button, Card, Empty, Skeleton, XPBadge, diffClass } from '../components/ui';
export default function ChallengeDetails() {
  const { id } = useParams(); const nav = useNavigate(); const c = useApi(() => getChallenge(id), [id]); const [hints, setHints] = useState(0); const { s } = useGame();
  if (c === null) return <Skeleton n={3} h={140} />;
  if (c === false) return <Empty icon="🕳️" text="Challenge not found." action={<Button onClick={() => nav('/challenges')}>Back to challenges</Button>} />;
  return (
    <div className="stack"><Button variant="ghost" onClick={() => nav(-1)}>← Back</Button>
      <Card><h1>{c.title}</h1>{s.completedChallenges.includes(c.id) && <p className="ok">✓ Challenge Completed</p>}<div className="row"><span className={diffClass(c.difficulty)}>{c.difficulty}</span><XPBadge xp={c.xp} /><small>⏱ {c.minutes} min</small><small>{c.category}</small></div>
        <h3>Problem</h3><p>{c.statement}</p><h3>Input format</h3><p className="mut">{c.inputFormat}</p><h3>Output format</h3><p className="mut">{c.outputFormat}</p>
        <h3>Constraints</h3><ul>{c.constraints.map((x) => <li key={x}>{x}</li>)}</ul>
        <div className="grid2"><div><h3>Example input</h3><pre className="code">{c.exIn}</pre></div><div><h3>Example output</h3><pre className="code">{c.exOut}</pre></div></div>
        <h3>Explanation</h3><p className="mut">{c.expl}</p><h3>Hints</h3>
        {c.hints.slice(0, hints).map((h, i) => <p key={i} className="item">💡 {h}</p>)}
        {hints < c.hints.length ? <Button variant="ghost" onClick={() => setHints(hints + 1)}>Show hint ({hints}/{c.hints.length})</Button> : <small className="mut">No more hints.</small>}
        <div className="mt"><Button onClick={() => nav(`/arena/${c.id}`)}>Start Coding</Button></div></Card></div>
  );
}
