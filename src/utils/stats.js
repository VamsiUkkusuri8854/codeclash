// Per-category completion (%) for one user.
export const categoryStats = (user, challenges) => {
  const o = {};
  challenges.forEach((c) => { o[c.category] = o[c.category] || { done: 0, total: 0 }; o[c.category].total++; if (user.completedChallenges.includes(c.id)) o[c.category].done++; });
  return Object.entries(o).map(([k, v]) => [k, Math.round((v.done / v.total) * 100)]);
};
