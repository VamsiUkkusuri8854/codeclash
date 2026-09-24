import { useGame } from '../context/GameContext';
import { levelInfo } from '../utils/levelSystem';
import { fmtNum } from '../utils/formatters';
import { LevelBadge, ProgressBar } from './ui';
export default function ProfileCard() {
  const { s, rank } = useGame(); const li = levelInfo(s.xp);
  return (
    <div className="pcard">
      <div className="row"><div className="avatar">{s.username.slice(0, 2).toUpperCase()}</div>
        <div><h2>{s.name}</h2><small>@{s.username}</small><LevelBadge level={li.level} /> <span className="mut">Rank #{rank}</span></div></div>
      <div className="row between mt"><small>{fmtNum(s.xp)} / {fmtNum(li.next)} XP</small><small>{li.pct}%</small></div><ProgressBar pct={li.pct} />
      <div className="grid4 mt">
        <div><b>{s.rating}</b><small>Rating</small></div><div><b>{s.problemsSolved}</b><small>Solved</small></div>
        <div><b>{s.battleWins}</b><small>Wins</small></div><div><b>{s.currentStreak}🔥</b><small>Streak</small></div>
      </div>
      <p className="mut center mt">🎖️ {s.achievements.length} achievements · {s.favLang}</p>
    </div>
  );
}
