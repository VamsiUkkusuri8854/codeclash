import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { Button, Card } from '../components/ui';
const STEPS = [['1. Register & login', 'Create your own account. Progress is stored per user.'], ['2. Solve challenges', 'Easy +50 XP, Medium +100, Hard +200. Each challenge pays XP once.'], ['3. Level up', 'Every 500 XP is a new level. Achievements unlock automatically.'], ['4. Daily & battles', 'Daily challenge +100 XP and streak; battle wins +250 XP.'], ['5. Climb the leaderboard', 'All registered players are ranked by XP.']];
export default function About() {
  const { s } = useGame(); const nav = useNavigate();
  return (
    <div className="wrap stack"><div className="row between"><Button variant="ghost" onClick={() => nav('/')}>← Home</Button>{s ? <Button onClick={() => nav('/dashboard')}>Dashboard</Button> : <div className="row"><Button variant="ghost" onClick={() => nav('/login')}>Login</Button><Button onClick={() => nav('/register')}>Register</Button></div>}</div>
      <h1>How CodeClash works</h1><div className="grid">{STEPS.map(([t, d]) => <Card key={t}><h3>{t}</h3><p className="mut">{d}</p></Card>)}</div>
      <Card><h3>About this prototype</h3><p className="mut">Version 1 is frontend-only: accounts and progress live in LocalStorage and are not secure. Version 2 targets React → Spring Boot → Spring Security + JWT → MySQL.</p></Card></div>
  );
}
