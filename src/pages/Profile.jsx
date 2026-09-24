import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { getChallenges, useApi } from '../services/api';
import { ACHIEVEMENTS } from '../data/achievements';
import { LANGS } from '../data/challenges';
import { categoryStats } from '../utils/stats';
import ProfileCard from '../components/ProfileCard';
import { Button, Card, Empty, ProgressBar, Skeleton, StatCard } from '../components/ui';
export default function Profile() {
  const { s, rank, setProfile, toast } = useGame(); const nav = useNavigate(); const cs = useApi(getChallenges);
  const [name, setName] = useState(s.name), [uname, setUname] = useState(s.username);
  if (!cs) return <Skeleton n={4} h={140} />;
  const copy = () => { navigator.clipboard?.writeText(`${s.name} (@${s.username}) · LV ${s.level} · ${s.xp} XP · Rank #${rank} — CodeClash`); toast('Profile summary copied!', 'success'); };
  const changed = (name.trim() !== s.name || uname.trim() !== s.username) && name.trim() && /^[A-Za-z0-9_]{3,20}$/.test(uname.trim());
  return (
    <div className="stack"><h1>👤 Profile</h1>
      <div className="grid2"><div className="stack"><ProfileCard /><Button variant="ghost" onClick={copy}>📋 Copy profile summary</Button></div>
        <Card><h3>Account</h3><small>{s.email}</small><label>Full name</label><input className="input" value={name} onChange={(e) => setName(e.target.value)} />
          <label>Username</label><input className="input" value={uname} maxLength={20} onChange={(e) => setUname(e.target.value)} />
          <label>Favorite language</label><select className="input" value={s.favLang} onChange={(e) => setProfile({ favLang: e.target.value })}>{LANGS.map((l) => <option key={l}>{l}</option>)}</select>
          <div className="mt"><Button disabled={!changed} onClick={() => setProfile({ name: name.trim(), username: uname.trim() })}>Save</Button></div></Card></div>
      <div className="grid4"><StatCard icon="🌍" label="Rank" value={`#${rank}`} to="/leaderboard" /><StatCard icon="📈" label="Rating" value={s.rating} to="/statistics" /><StatCard icon="🔥" label="Longest streak" value={`${s.longestStreak}d`} to="/daily" /><StatCard icon="🎖️" label="Badges" value={s.achievements.length} to="/achievements" /></div>
      <div className="grid2"><Card><h3>Statistics</h3><p>Easy {s.statistics.easy} · Medium {s.statistics.medium} · Hard {s.statistics.hard}</p><h3>Skills</h3>{categoryStats(s, cs).slice(0, 6).map(([k, v]) => <div key={k}><small>{k} · {v}%</small><ProgressBar pct={v} /></div>)}</Card>
        <Card><h3>Recent activity</h3>{s.activity.length === 0 ? <Empty text="No activity yet." action={<Button onClick={() => nav('/challenges')}>Start a challenge</Button>} /> : s.activity.slice(0, 6).map((a, i) => <div key={i} className="item row between"><span>{a.t}</span><small className="ok">{a.x}</small></div>)}
          <h3>Badges</h3>{s.achievements.length === 0 ? <p className="mut">No achievements unlocked yet.</p> : <div className="row">{s.achievements.map((id) => { const a = ACHIEVEMENTS.find((x) => x.id === id); return <span key={id} title={a?.name} style={{ fontSize: 26 }}>{a?.icon}</span>; })}</div>}</Card></div>
    </div>
  );
}
