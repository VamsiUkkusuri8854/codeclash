import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { getChallenge, useApi } from '../services/api';
import { LANGS, starter } from '../data/challenges';
import { OPPONENTS } from '../data/leaderboard';
import { levelInfo } from '../utils/levelSystem';
import { fmtTime } from '../utils/formatters';
import CodeEditor from '../components/CodeEditor';
import { Button, Card, Empty, Modal, ProgressBar, Skeleton, XPBadge, diffClass } from '../components/ui';

export default function CodingArena() {
  const { id } = useParams(); const [q] = useSearchParams(); const nav = useNavigate(); const g = useGame();
  const mode = q.get('mode') || 'practice', type = q.get('type') || 'quick', oppT = +q.get('t') || 120, opp = OPPONENTS[+q.get('o') || 0];
  const c = useApi(() => getChallenge(id), [id]);
  const [lang, setLang] = useState(g.s.favLang); const [code, setCode] = useState('');
  const [sec, setSec] = useState(0), [out, setOut] = useState(null), [busy, setBusy] = useState(false), [res, setRes] = useState(null), [tries, setTries] = useState(1), [hint, setHint] = useState(0);

  useEffect(() => { if (c) setCode(starter(c, lang)); }, [c, lang]);
  useEffect(() => { if (res) return undefined; const t = setInterval(() => setSec((x) => x + 1), 1000); return () => clearInterval(t); }, [res]);
  useEffect(() => { if (mode === 'battle' && !res && sec >= oppT) lose(); }, [sec]); // eslint-disable-line

  if (c === null) return <Skeleton n={2} h={300} />;
  if (c === false) return <Empty icon="🕳️" text="Challenge not found." action={<Button onClick={() => nav('/challenges')}>Back to challenges</Button>} />;
  const untouched = code.trim() === starter(c, lang).trim();
  const info = { type, opp: opp.name, time: fmtTime(sec) };
  const done = g.s.completedChallenges.includes(c.id);

  function lose() {
    const r = g.finishBattle(false, info);
    setRes({ kind: 'battle', win: false, ...r, time: fmtTime(sec), passed: '6/10', acc: 60 });
  }
  const simulate = (total, submit) => {
    if (untouched) { setOut({ error: 'Write your solution first — the editor still contains the starter code.' }); return; }
    setBusy(true); setOut({ running: true });
    setTimeout(() => {
      setBusy(false);
      const ok = Math.random() < (c.difficulty === 'Hard' ? 0.75 : 0.9), bad = ok ? -1 : Math.floor(Math.random() * total);
      const tests = Array.from({ length: total }, (_, i) => ({ ok: i !== bad, n: i + 1 }));
      setOut({ tests, ok, submit, bad: bad + 1 });
      if (!ok) { setTries((t) => t + 1); return; }
      if (!submit) { g.markProgress(c.id, 60); return; }
      const acc = Math.round(100 / tries);
      if (mode === 'daily') setRes({ kind: 'daily', xp: g.completeDaily(c), time: fmtTime(sec) });
      else if (mode === 'battle') setRes({ kind: 'battle', win: true, ...g.finishBattle(true, info), time: fmtTime(sec), passed: '10/10', acc });
      else setRes({ kind: 'challenge', xp: g.completeChallenge(c, sec), time: fmtTime(sec) });
    }, 900);
  };
  const li = levelInfo(g.s.xp);
  return (
    <div className="stack">
      <div className="row between"><Button variant="ghost" onClick={() => nav(-1)}>← Back</Button><b>⏱ {fmtTime(sec)} / {c.minutes}:00</b></div>
      {done && mode !== 'daily' && <Card className="item ok">✓ Challenge Completed — replays award no extra XP.</Card>}
      {mode === 'battle' && <Card><div className="row between"><span>You (LV {li.level})</span><span>{opp.name} (LV {opp.level})</span></div><ProgressBar pct={Math.min(100, (sec / oppT) * 100)} /><small className="mut">Opponent is coding… finish before they do!</small></Card>}
      <div className="arena">
        <Card><h2>{c.title}</h2><div className="row"><span className={diffClass(c.difficulty)}>{c.difficulty}</span><XPBadge xp={mode === 'daily' ? 100 : c.xp} />{mode === 'daily' && <span className="xpb">📅 Daily</span>}</div>
          <p>{c.statement}</p><h4>Example</h4><pre className="code">Input: {c.exIn}{'\n'}Output: {c.exOut}</pre><p className="mut">{c.expl}</p><h4>Constraints</h4><ul>{c.constraints.map((x) => <li key={x}>{x}</li>)}</ul>
          {c.hints.slice(0, hint).map((h) => <p key={h} className="item">💡 {h}</p>)}
          {hint < c.hints.length && <Button variant="ghost" onClick={() => setHint(hint + 1)}>💡 Hint</Button>}</Card>
        <div className="stack">
          <Card><div className="row between"><select className="input sm" value={lang} onChange={(e) => setLang(e.target.value)}>{LANGS.map((l) => <option key={l}>{l}</option>)}</select>
            <div className="row"><Button variant="ghost" disabled={busy} onClick={() => { setCode(starter(c, lang)); setOut(null); }}>Reset</Button><Button variant="ghost" disabled={busy} onClick={() => simulate(3, false)}>▶ Run Code</Button><Button disabled={busy} onClick={() => simulate(10, true)}>Submit</Button></div></div>
            <CodeEditor value={code} onChange={setCode} /></Card>
          <Card><h4>Console</h4><pre className="code">{!out ? 'Run your code to see test results.' : out.running ? 'Running...' : out.error ? out.error : <>
            {out.tests.slice(0, 3).map((t) => `Test Case ${t.n} ${t.ok ? '✓' : '✗'}\n`)}{out.submit ? `${out.tests.filter((t) => t.ok).length}/10 hidden tests passed\n` : ''}{out.ok ? (out.submit ? '\nSubmission Successful' : '\nAll test cases passed.') : `\nWrong Answer on test ${out.bad}. Fix your code and try again.`}</>}</pre></Card>
        </div>
      </div>
      <Modal open={!!res}>{res && (res.kind === 'battle' ? <>
        <h1 className={res.win ? 'ok' : 'bad'}>{res.win ? 'VICTORY! 🏆' : 'DEFEAT 💀'}</h1><h2>+{res.xp} XP</h2><p>{res.rating > 0 ? '+' : ''}{res.rating} Rating</p><p>New Rank: #{g.rank}</p>
        <div className="grid3"><div><b>{res.time}</b><small>Time</small></div><div><b>{res.passed}</b><small>Tests Passed</small></div><div><b>{res.acc}%</b><small>Accuracy</small></div></div>
        <div className="row center mt"><Button onClick={() => nav(`/battle?start=${type}`)}>Play Again</Button><Button variant="ghost" onClick={() => nav('/dashboard')}>Back to Dashboard</Button></div></> : <>
        <h1 className="ok">{res.kind === 'daily' ? 'Daily Challenge Completed!' : 'Submission Successful'}</h1><h2>{res.xp > 0 ? `+${res.xp} XP` : 'Challenge Completed — no extra XP'}</h2>{res.kind === 'daily' && <p>🔥 Streak increased!</p>}<p className="mut">Solved in {res.time}</p>
        <div className="row center mt"><Button onClick={() => nav('/challenges')}>More Challenges</Button><Button variant="ghost" onClick={() => nav('/dashboard')}>Dashboard</Button></div></>)}</Modal>
    </div>
  );
}
