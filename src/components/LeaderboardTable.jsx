import { fmtNum } from '../utils/formatters';
import { dayIdx } from '../utils/xpSystem';
import { LevelBadge } from './ui';
const mv = (m) => (m > 0 ? <b className="ok">↑{m}</b> : m < 0 ? <b className="bad">↓{-m}</b> : <span className="mut">–</span>);
export default function LeaderboardTable({ rows, compact }) {
  return (
    <div className="scroll"><table className="tbl">
      <thead><tr><th>Rank</th><th>Player</th><th>Level</th><th>XP</th>{!compact && <><th>Solved</th><th>Wins</th><th>Rating</th></>}</tr></thead>
      <tbody>{rows.map((r) => r.gap ? <tr key="gap"><td colSpan={compact ? 4 : 7} className="mut center">• • •</td></tr> : (
        <tr key={r.id || r.name} className={r.me ? 'me' : ''}>
          <td>#{r.rank} {mv(r.move)}</td><td>{r.me ? '⭐ ' : ''}{r.name}</td><td><LevelBadge level={r.level} /></td><td>{fmtNum(r.xp)}</td>
          {!compact && <><td>{r.solved}</td><td>{r.wins}</td><td>{r.rating}</td></>}
        </tr>))}</tbody>
    </table></div>
  );
}
// Ranks demo players + every registered user by XP (per-tab); marks the logged-in user (`me`, may be null).
export function buildRows(mock, users, me, tab = 'Global', top = 10) {
  const wk = (u) => u.weeklyXp.reduce((a, b) => a + b, 0);
  const f = { Global: 1, Weekly: 0.25, Monthly: 0.6, Friends: 1 }[tab];
  const list = mock.filter((p) => tab !== 'Friends' || p.friend).map((p) => ({ ...p, xp: Math.round(p.xp * f) }));
  const real = users.filter((u) => tab !== 'Friends' || u.id === me?.id).map((u) => ({
    id: u.id, name: u.username, level: u.level, xp: tab === 'Weekly' ? wk(u) : tab === 'Monthly' ? wk(u) * 3 : u.xp,
    solved: u.problemsSolved, wins: u.battleWins, rating: u.rating, me: u.id === me?.id, move: u.id === me?.id && u.weeklyXp[dayIdx()] > 0 ? 1 : 0 }));
  const all = [...list, ...real].sort((a, b) => b.xp - a.xp || a.name.localeCompare(b.name)).map((r, i) => ({ ...r, rank: i + 1 }));
  const idx = all.findIndex((r) => r.me), out = all.slice(0, top);
  if (idx >= top) out.push({ gap: true }, all[idx]);
  return out;
}
