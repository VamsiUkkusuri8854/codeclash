import { Card } from './ui';
export default function AchievementCard({ a, unlocked }) {
  return (
    <Card className={`ach ${unlocked ? 'unlocked' : 'locked'}`}>
      <div className="badge">{unlocked ? a.icon : '🔒'}</div>
      <h3>{a.name}</h3><p className="mut">{a.desc}</p>
      <div className="row between"><span className="xpb">🎖️ Badge</span><small>{unlocked ? 'Unlocked' : 'Locked'}</small></div>
    </Card>
  );
}
