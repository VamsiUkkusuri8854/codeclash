import { describe, test, expect, beforeEach } from 'vitest';
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { GameProvider, useGame } from '../context/GameContext';
import { CHALLENGES } from '../data/challenges';
import { PLAYERS } from '../data/leaderboard';
import { buildRows } from '../components/LeaderboardTable';
import { getAllUsers, getCurrentUser } from '../utils/storage';
import { evaluateSubmission } from '../utils/codeEvaluator';

beforeEach(() => localStorage.clear());
const mount = () => renderHook(() => useGame(), { wrapper: GameProvider });
const call = (h, fn) => { let r; act(() => { r = fn(h.result.current); }); return r; };
const acct = (u) => ({ name: u, username: u, email: `${u}@x.com`, password: 'Passw0rd1' });
const snap = (h) => { const { xp, level, achievements, completedChallenges, problemsSolved } = h.result.current.s; return { xp, level, achievements: [...achievements], completedChallenges: [...completedChallenges], problemsSolved }; };

describe('multi-user accounts (spec §12 / §23)', () => {
  test('separate progress, persistence, no auto-login, reset only self', () => {
    let h = mount();
    expect(call(h, (g) => g.register(acct('userA'))).ok).toBe(true);
    expect(h.result.current.s).toBe(null);                                    // not auto-logged-in
    expect(call(h, (g) => g.login('userA@x.com', 'wrong')).ok).toBe(false);
    expect(call(h, (g) => g.login('userA', 'Passw0rd1')).ok).toBe(true);
    expect(snap(h)).toMatchObject({ xp: 0, level: 1, problemsSolved: 0, achievements: [] });

    [0, 5, 11].forEach((i) => call(h, (g) => g.completeChallenge(CHALLENGES[i], 9999))); // Easy, Medium, Hard
    const A = snap(h);
    expect(A.xp).toBe(350); expect(A.problemsSolved).toBe(3);
    expect(A.achievements).toEqual(expect.arrayContaining(['first-blood', 'hard-mode']));
    call(h, (g) => g.completeChallenge(CHALLENGES[0], 9999));                 // replay: no extra XP
    expect(snap(h).xp).toBe(350);
    expect(h.result.current.s.statistics).toEqual({ easy: 1, medium: 1, hard: 1 });

    call(h, (g) => g.logout());
    expect(h.result.current.s).toBe(null); expect(getCurrentUser()).toBe(null);
    expect(getAllUsers().some((u) => u.username === 'userA')).toBe(true);     // account kept

    expect(call(h, (g) => g.register(acct('userB'))).ok).toBe(true);
    expect(call(h, (g) => g.register(acct('userB'))).ok).toBe(false);         // duplicate username
    expect(call(h, (g) => g.register({ ...acct('other'), email: 'USERB@x.com' })).field).toBe('email');
    call(h, (g) => g.login('userB', 'Passw0rd1'));
    expect(snap(h)).toMatchObject({ xp: 0, level: 1, achievements: [] });
    call(h, (g) => g.completeChallenge(CHALLENGES[0], 9999));
    const B = snap(h); expect(B.xp).toBe(50); expect(B.achievements).toEqual(['first-blood']);
    call(h, (g) => g.logout());

    call(h, (g) => g.login('userA', 'Passw0rd1')); expect(snap(h)).toEqual(A);
    call(h, (g) => g.logout());
    call(h, (g) => g.login('userB', 'Passw0rd1')); expect(snap(h)).toEqual(B);

    h.unmount(); h = mount();                                                 // browser refresh
    expect(snap(h)).toEqual(B);
    call(h, (g) => g.logout()); call(h, (g) => g.login('userB', 'Passw0rd1')); expect(snap(h)).toEqual(B);

    const rows = buildRows(PLAYERS, h.result.current.users, h.result.current.s, 'Global', 50);
    expect(rows.filter((r) => r.me).map((r) => r.name)).toEqual(['userB']);
    expect(rows.find((r) => r.name === 'userA').xp).toBe(350);

    call(h, (g) => g.reset());                                                // reset only current user
    expect(snap(h)).toMatchObject({ xp: 0, level: 1, problemsSolved: 0, achievements: [] });
    expect(h.result.current.s.email).toBe('userB@x.com');
    call(h, (g) => g.logout()); call(h, (g) => g.login('userA', 'Passw0rd1')); expect(snap(h)).toEqual(A);
  });

  test('level = 500 XP per level, daily streak, demo account', () => {
    const h = mount();
    call(h, (g) => g.login('demo@codeclash.dev', 'demo1234'));
    expect(h.result.current.s).toMatchObject({ level: 5, xp: 2450, problemsSolved: 11, currentStreak: 7 });
    call(h, (g) => g.completeDaily(CHALLENGES[0]));
    expect(h.result.current.s).toMatchObject({ currentStreak: 8, xp: 2575 });
    call(h, (g) => g.completeDaily(CHALLENGES[0]));                           // once per day
    expect(h.result.current.s.xp).toBe(2575);
  });
});

describe('challenge evaluation', () => {
  test('does not pass starter code and executes JavaScript solutions', () => {
    const challenge = CHALLENGES[0];
    expect(evaluateSubmission(challenge, 'function twoSum(data) { return [0, 0]; }', 'JavaScript').cases).toEqual([false, false, false]);
    expect(evaluateSubmission(challenge, 'function twoSum(nums, target) { const seen = new Map(); for (let i = 0; i < nums.length; i++) { const need = target - nums[i]; if (seen.has(need)) return [seen.get(need), i]; seen.set(nums[i], i); } return []; }', 'JavaScript').cases).toEqual([true, true, true]);
  });
});

describe('UI flow', () => {
  const app = (path) => render(<MemoryRouter initialEntries={[path]}><GameProvider><App /></GameProvider></MemoryRouter>);
  test('protected route redirects to login', () => { app('/dashboard'); expect(screen.getByRole('heading', { name: 'Login' })).toBeTruthy(); });
  test('register → login → dashboard shows Level 1 / 0 problems', async () => {
    app('/register');
    const put = (l, v) => fireEvent.change(screen.getByLabelText(new RegExp(`^${l}`)), { target: { value: v } });
    fireEvent.click(screen.getByText('Register')); expect(screen.getByText('Full Name is required.')).toBeTruthy();
    put('Full Name', 'Rahul K'); put('Username', 'rahul123'); put('Email', 'rahul@example.com'); put('Password', 'Passw0rd1'); put('Confirm Password', 'nope');
    fireEvent.click(screen.getByText('Register')); expect(screen.getByText('Passwords do not match.')).toBeTruthy();
    put('Confirm Password', 'Passw0rd1'); fireEvent.click(screen.getByText('Register'));
    expect(screen.getByText('Registration successful. Please login.')).toBeTruthy();
    put('Email or Username', 'rahul123'); put('Password', 'bad'); fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Invalid username/email or password.')).toBeTruthy();
    put('Password', 'Passw0rd1'); fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(await screen.findByText('Level 1')).toBeTruthy(); expect(screen.getByText('Welcome back, Rahul!')).toBeTruthy();
  });
});
