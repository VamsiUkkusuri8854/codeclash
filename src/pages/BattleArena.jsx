import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { BATTLE_MODES } from '../data/statistics';
import { CHALLENGES } from '../data/challenges';
import { OPPONENTS } from '../data/leaderboard';
import { levelInfo } from '../utils/levelSystem';
import { fmtNum } from '../utils/formatters';
import { Button, Card, Empty, LevelBadge } from '../components/ui';
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const oppFor = (type) => { const pool = type === 'ranked' ? [2, 4, 0, 1] : type === 'practice' ? [5, 3] : [0, 1, 2, 3, 4, 5]; return pick(pool); };
export default function BattleArena() {
  const { s } = useGame(); const nav = useNavigate(); const [q] = useSearchParams();
  const [count, setCount] = useState(null); const [oi, setOi] = useState(() => oppFor('quick')); const url = useRef('');
  const li = levelInfo(s.xp), opp = OPPONENTS[oi];
  const start = (type) => {
    const o = oppFor(type), c = pick(CHALLENGES), t = type === 'ranked' ? 70 + Math.floor(Math.random() * 60) : 100 + Math.floor(Math.random() * 100);
    setOi(o); url.current = `/arena/${c.id}?mode=battle&type=${type}&o=${o}&t=${t}`; setCount(3);
  };
  useEffect(() => { if (q.get('start')) start(q.get('start')); }, []); // eslint-disable-line
  useEffect(() => {
    if (count === null) return undefined;
    const t = setTimeout(() => (count === 0 ? nav(url.current) : setCount(count - 1)), count === 0 ? 700 : 1000);
    return () => clearTimeout(t);
  }, [count]); // eslint-disable-line
  if (count !== null) return <div className="countdown"><div className="row center"><div className="fighter"><b>{s.username}</b><LevelBadge level={li.level} /></div><h1>VS</h1><div className="fighter"><b>{opp.name}</b><LevelBadge level={opp.level} /></div></div><div className="count" key={count}>{count === 0 ? 'GO!' : count}</div></div>;
  return (
    <div className="stack"><h1>⚔️ Battle Arena</h1>
      <Card className="glow"><div className="row between vs"><div><small>You</small><h2>{s.username}</h2><LevelBadge level={li.level} /> <small>{fmtNum(s.xp)} XP · {s.rating}</small></div><h1>VS</h1>
        <div className="right"><small>Opponent</small><h2>{opp.name}</h2><LevelBadge level={opp.level} /> <small>{fmtNum(opp.xp)} XP · {opp.rating}</small></div></div></Card>
      <div className="grid">{BATTLE_MODES.map((m) => <Card key={m.type} className="hover"><div style={{ fontSize: 32 }}>{m.icon}</div><h3>{m.title}</h3><p className="mut">{m.desc}</p><Button onClick={() => start(m.type)}>Start {m.title.split(' ')[0]}</Button></Card>)}</div>
      <Card><h3>Recent Battles</h3>{s.battleHistory.length === 0 ? <Empty icon="⚔️" text="No battles yet. Start one above!" /> : s.battleHistory.slice(0, 6).map((b, i) => <div key={i} className="item row between"><span>{b.win ? '🏆 Victory' : '💀 Defeat'} vs {b.opp} ({b.type})</span><small>{b.time} · {b.rating > 0 ? '+' : ''}{b.rating} rating</small></div>)}</Card>
    </div>
  );
}
