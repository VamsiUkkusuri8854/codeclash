// LocalStorage "database" layer. ⚠ PROTOTYPE ONLY — NOT SECURE: users and (weakly hashed) passwords live in the browser.
// v2 replaces this file with REST calls: React → Spring Boot → Spring Security + JWT → MySQL.
import { newUser, demoStats } from '../data/users';
import { PLAYERS } from '../data/leaderboard';
const USERS = 'codeclash_users', SESSION = 'codeclash_currentUserId', SEEDED = 'codeclash_seeded';
const read = () => { try { return JSON.parse(localStorage.getItem(USERS)) || []; } catch { return []; } };
const write = (u) => { try { localStorage.setItem(USERS, JSON.stringify(u)); } catch { /* ignore */ } };
const same = (a, b) => String(a).trim().toLowerCase() === String(b).trim().toLowerCase();

export const hashPassword = (p) => { let h = 5381; for (const ch of `cc:${p}`) h = ((h << 5) + h + ch.charCodeAt(0)) | 0; return `demo$${(h >>> 0).toString(16)}`; };
export const getAllUsers = () => read();
export const getUserById = (id) => read().find((u) => u.id === id) || null;
export const saveUser = (user) => { const all = read(), i = all.findIndex((u) => u.id === user.id); if (i >= 0) all[i] = user; else all.push(user); write(all); return user; };
export const updateUser = (id, patch) => { const u = getUserById(id); return u ? saveUser({ ...u, ...patch }) : null; };
export const deleteUser = (id) => write(read().filter((u) => u.id !== id));
export const isUsernameTaken = (name, exceptId) => read().some((u) => u.id !== exceptId && same(u.username, name)) || PLAYERS.some((p) => same(p.name, name));
export const isEmailTaken = (email) => read().some((u) => same(u.email, email));

export const registerUser = ({ name, username, email, password }) => {
  if (isUsernameTaken(username)) return { ok: false, field: 'username', error: 'That username is already taken.' };
  if (isEmailTaken(email)) return { ok: false, field: 'email', error: 'An account with that email already exists.' };
  return { ok: true, user: saveUser(newUser({ name, username, email, password: hashPassword(password) })) };
};
export const loginUser = (idf, password) => {
  const u = read().find((x) => same(x.email, idf) || same(x.username, idf));
  if (!u || u.password !== hashPassword(password)) return { ok: false, error: 'Invalid username/email or password.' };
  localStorage.setItem(SESSION, u.id); return { ok: true, user: u };
};
export const clearSession = () => localStorage.removeItem(SESSION);
export const logoutUser = clearSession; // account + progress stay in the users list
export const getCurrentUser = () => { const id = localStorage.getItem(SESSION); return id ? getUserById(id) : null; };
export const seedDemoUsers = () => {
  try {
    if (localStorage.getItem(SEEDED)) return; localStorage.setItem(SEEDED, '1');
    saveUser({ ...newUser({ name: 'Demo Player', username: 'CodeWarrior', email: 'demo@codeclash.dev', password: hashPassword('demo1234') }), ...demoStats() });
  } catch { /* ignore */ }
};
