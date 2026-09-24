import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { Button, Card } from '../components/ui';
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELDS = [['name', 'Full Name', 'text'], ['username', 'Username', 'text'], ['email', 'Email', 'email'], ['password', 'Password', 'password'], ['confirm', 'Confirm Password', 'password']];
export default function Register() {
  const { s, register } = useGame(); const nav = useNavigate();
  const [f, setF] = useState({ name: '', username: '', email: '', password: '', confirm: '' }); const [err, setErr] = useState({});
  if (s) return <Navigate to="/dashboard" replace />;
  const submit = (e) => {
    e.preventDefault(); const x = {};
    FIELDS.forEach(([k, l]) => { if (!f[k].trim()) x[k] = `${l} is required.`; });
    if (!x.username && !/^[A-Za-z0-9_]{3,20}$/.test(f.username.trim())) x.username = 'Use 3–20 letters, numbers or underscores.';
    if (!x.email && !EMAIL.test(f.email.trim())) x.email = 'Enter a valid email address.';
    if (!x.password && (f.password.length < 8 || !/[A-Za-z]/.test(f.password) || !/\d/.test(f.password))) x.password = 'Use 8+ characters with at least one letter and one number.';
    if (!x.confirm && f.confirm !== f.password) x.confirm = 'Passwords do not match.';
    if (Object.keys(x).length) return setErr(x);
    const r = register({ name: f.name.trim(), username: f.username.trim(), email: f.email.trim(), password: f.password });
    if (!r.ok) return setErr({ [r.field]: r.error });
    return nav('/login', { state: { msg: 'Registration successful. Please login.' } });
  };
  return (
    <div className="auth"><Card className="glow"><h1>Create account</h1>
      <form noValidate onSubmit={submit}>
        {FIELDS.map(([k, l, t]) => <label key={k}>{l}<input className="input" type={t} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} />{err[k] && <span className="err">{err[k]}</span>}</label>)}
        <div className="row mt"><Button type="submit">Register</Button><Button type="button" variant="ghost" onClick={() => nav('/login')}>Go to Login</Button></div>
      </form>
      <p className="note">Prototype only: accounts live in this browser's LocalStorage and are not secure. v2 moves auth to Spring Security + JWT.</p>
      <p className="center"><Link to="/">Home</Link> · <Link to="/about">About</Link></p></Card></div>
  );
}
