import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { getAchievements, useApi } from '../services/api';
import AchievementCard from '../components/AchievementCard';
import { Card, Empty, ProgressBar, Skeleton, Tabs } from '../components/ui';
export default function Achievements() {
  const { s } = useGame(); const list = useApi(getAchievements); const [f, setF] = useState('All');
  if (!list) return <Skeleton n={6} h={150} />;
  const shown = list.filter((a) => f === 'All' || (f === 'Unlocked') === s.achievements.includes(a.id));
  return (
    <div className="stack"><h1>🎖️ Achievements</h1>
      <Card><b>{s.achievements.length} / {list.length} unlocked</b><ProgressBar pct={(s.achievements.length / list.length) * 100} /></Card>
      <Tabs items={['All', 'Unlocked', 'Locked']} value={f} onChange={setF} />
      {shown.length === 0 ? <Empty icon="🎖️" text={f === 'Unlocked' ? 'No achievements unlocked yet.' : 'Everything is unlocked. Legend!'} /> : <div className="grid">{shown.map((a) => <AchievementCard key={a.id} a={a} unlocked={s.achievements.includes(a.id)} />)}</div>}
    </div>
  );
}
