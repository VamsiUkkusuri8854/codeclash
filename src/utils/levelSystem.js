// 500 XP per level: Level 1 = 0, Level 2 = 500, Level 3 = 1000 ...
export const levelStart = (L) => (L <= 1 ? 0 : (L - 1) * 500);
export const getLevel = (xp) => Math.floor(xp / 500) + 1;
export const levelInfo = (xp) => {
  const level = getLevel(xp), cur = levelStart(level), next = levelStart(level + 1);
  return { level, cur, next, pct: Math.round(((xp - cur) / (next - cur)) * 100) };
};
