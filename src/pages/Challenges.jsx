import { useMemo, useState } from 'react';
import { getChallenges, useApi } from '../services/api';
import { CATEGORIES } from '../data/challenges';
import ChallengeCard from '../components/ChallengeCard';
import { Button, Empty, Skeleton, Tabs } from '../components/ui';
export default function Challenges() {
  const cs = useApi(getChallenges); const [q, setQ] = useState(''); const [diff, setDiff] = useState('All'); const [cat, setCat] = useState('All');
  const list = useMemo(() => (cs || []).filter((c) => (diff === 'All' || c.difficulty === diff) && (cat === 'All' || c.category === cat) && c.title.toLowerCase().includes(q.toLowerCase())), [cs, q, diff, cat]);
  const clear = () => { setQ(''); setDiff('All'); setCat('All'); };
  return (
    <div className="stack"><h1>Challenges</h1>
      <input className="input" placeholder="🔍 Search challenges..." value={q} onChange={(e) => setQ(e.target.value)} />
      <Tabs items={['All', 'Easy', 'Medium', 'Hard']} value={diff} onChange={setDiff} />
      <Tabs items={['All', ...CATEGORIES]} value={cat} onChange={setCat} />
      {!cs ? <Skeleton n={6} h={150} /> : list.length === 0 ? <Empty text="No challenges available for these filters." action={<Button onClick={clear}>Clear filters</Button>} />
        : <div className="grid">{list.map((c) => <ChallengeCard key={c.id} c={c} />)}</div>}
    </div>
  );
}
