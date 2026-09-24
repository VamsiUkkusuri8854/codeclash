import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { getLeaderboard, useApi } from '../services/api';
import LeaderboardTable, { buildRows } from '../components/LeaderboardTable';
import { Card, Empty, Skeleton, Tabs } from '../components/ui';
export default function Leaderboard() {
  const { s, users } = useGame(); const lb = useApi(getLeaderboard); const [tab, setTab] = useState('Global');
  return (
    <div className="stack"><h1>🏆 Leaderboard</h1><Tabs items={['Global', 'Weekly', 'Monthly', 'Friends']} value={tab} onChange={setTab} />
      {!lb ? <Skeleton n={5} h={50} /> : <Card>{lb.length ? <LeaderboardTable rows={buildRows(lb, users, s, tab)} /> : <Empty text="No players." />}</Card>}
    </div>
  );
}
