// Service layer: every function is async so it can later be swapped for fetch('/api/...') calls to Spring Boot.
import { useEffect, useState } from 'react';
import { CHALLENGES } from '../data/challenges';
import { PLAYERS } from '../data/leaderboard';
import { ACHIEVEMENTS } from '../data/achievements';
import { STATS } from '../data/statistics';
const wait = (d, ms = 300) => new Promise((r) => setTimeout(() => r(d), ms));
export const getChallenges = () => wait(CHALLENGES);                                        // GET /api/challenges
export const getChallenge = (id) => wait(CHALLENGES.find((c) => c.id === +id) || false, 200); // GET /api/challenges/{id}
export const getLeaderboard = () => wait(PLAYERS);                                          // GET /api/leaderboard
export const getAchievements = () => wait(ACHIEVEMENTS);                                    // GET /api/achievements
export const getStatistics = () => wait(STATS);                                             // GET /api/statistics

// data === null while loading; false means "not found".
export function useApi(fn, deps = []) {
  const [data, setData] = useState(null);
  useEffect(() => { let ok = true; setData(null); fn().then((r) => ok && setData(r)); return () => { ok = false; }; }, deps); // eslint-disable-line
  return data;
}
