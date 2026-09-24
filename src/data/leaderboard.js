import { getLevel } from '../utils/levelSystem';
export const PLAYERS = [
  ['CodeMaster',8920,412,180,2210,1,0],['JavaNinja',8450,388,160,2105,0,1],['AlgoKing',8120,371,151,2040,-1,1],
  ['ByteQueen',7600,340,133,1960,2,0],['StackSmith',6900,310,120,1890,0,0],['GraphGuru',6100,285,104,1810,-1,1],
  ['LoopLord',5400,250,90,1740,1,0],['HashHero',4700,222,77,1690,0,0],['TreeTamer',3900,190,61,1610,-2,1],
  ['BitBender',3300,160,49,1540,1,0],['SyntaxSam',2300,120,25,1380,0,1],['DebugDuke',1900,95,18,1310,-1,0],['NullNate',1400,60,9,1220,1,0],
].map(([name, xp, solved, wins, rating, move, friend]) => ({ name, level: getLevel(xp), xp, solved, wins, rating, move, friend: !!friend }));
export const OPPONENTS = [['LoopLord', 5400, 1740], ['HashHero', 4700, 1690], ['ByteQueen', 7600, 1960], ['SyntaxSam', 2300, 1380], ['GraphGuru', 6100, 1810], ['BotRookie', 700, 1050]]
  .map(([name, xp, rating]) => ({ name, xp, rating, level: getLevel(xp) }));
