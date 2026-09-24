import { CHALLENGES } from './challenges';
const cnt = (s) => s.problemsSolved;
export const ACHIEVEMENTS = [
  ['first-blood','🩸','First Blood','Solve your first challenge.',25,(s) => cnt(s) >= 1],
  ['problem-hunter','🎯','Problem Hunter','Solve 10 problems.',50,(s) => cnt(s) >= 10],
  ['coding-beast','🐉','Coding Beast','Solve 50 problems.',150,(s) => cnt(s) >= 50],
  ['streak-master','🔥','Streak Master','Maintain a 7-day streak.',75,(s) => s.longestStreak >= 7],
  ['unstoppable','🚀','Unstoppable','Maintain a 30-day streak.',300,(s) => s.longestStreak >= 30],
  ['battle-rookie','⚔️','Battle Rookie','Win your first battle.',50,(s) => s.battleWins >= 1],
  ['arena-champion','🏆','Arena Champion','Win 25 battles.',250,(s) => s.battleWins >= 25],
  ['speed-coder','⚡','Speed Coder','Solve a problem under the target time.',100,(s) => !!s.speed],
  ['hard-mode','💎','Hard Mode','Solve your first Hard challenge.',150,(s) => s.completedChallenges.some((id) => CHALLENGES.find((c) => c.id === id)?.difficulty === 'Hard')],
].map(([id, icon, name, desc, xp, test]) => ({ id, icon, name, desc, xp, test }));

export const checkAch = (n, msgs) => ACHIEVEMENTS.forEach((a) => {
  if (!n.achievements.includes(a.id) && a.test(n)) {
    n.achievements.push(a.id);
    msgs.push([`Achievement unlocked: ${a.name} ${a.icon}`, 'ach']);
  }
});
