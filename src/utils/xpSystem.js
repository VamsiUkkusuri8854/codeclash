export const XP_REWARD = { Easy: 50, Medium: 100, Hard: 200, Daily: 100, Battle: 250, Streak: 25 };
export const dateKey = () => new Date().toDateString();
export const dayIdx = () => (new Date().getDay() + 6) % 7; // Mon=0
export const dailyFor = (list) => list[Math.floor(Date.now() / 864e5) % list.length];
