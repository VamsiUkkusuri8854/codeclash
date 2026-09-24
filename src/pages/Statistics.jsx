import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { getChallenges, getStatistics, useApi } from '../services/api';
import { categoryStats } from '../utils/stats';
import { Card, Chart, ProgressBar, Skeleton, StatCard, Tabs } from '../components/ui';
export default function Statistics() {
  const { s } = useGame(); const st = useApi(getStatistics), cs = useApi(getChallenges); const [m, setM] = useState('XP earned');
  if (!st || !cs) return <Skeleton n={6} h={160} />;
  const by = { Easy: s.statistics.easy, Medium: s.statistics.medium, Hard: s.statistics.hard }, total = s.problemsSolved;
  const data = { 'XP earned': s.weeklyXp, 'Problems solved': s.weeklySolved, 'Battle wins': s.weeklyWins }[m];
  return (
    <div className="stack"><h1>📊 Statistics</h1>
      {total === 0 && s.xp === 0 && <Card className="center mut">No activity yet — solve a challenge and your stats will appear here.</Card>}
      <div className="grid4"><StatCard icon="✅" label="Total solved" value={total} /><StatCard icon="⚡" label="Weekly XP" value={s.weeklyXp.reduce((a, b) => a + b, 0)} /><StatCard icon="⚔️" label="Battle wins" value={s.battleWins} /><StatCard icon="📈" label="Rating" value={s.rating} /></div>
      <Card><div className="row between"><h3>Weekly activity</h3><Tabs items={['XP earned', 'Problems solved', 'Battle wins']} value={m} onChange={setM} /></div><Chart data={data} labels={st.days} /></Card>
      <div className="grid2"><Card><h3>Difficulty distribution</h3>{Object.entries(by).map(([k, v]) => <div key={k}><small>{k}: {v}</small><ProgressBar pct={total ? (v / total) * 100 : 0} /></div>)}</Card>
        <Card><h3>Category performance</h3>{categoryStats(s, cs).map(([k, v]) => <div key={k}><small>{k} · {v}%</small><ProgressBar pct={v} /></div>)}</Card></div>
    </div>
  );
}
