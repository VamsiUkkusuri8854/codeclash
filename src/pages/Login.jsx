import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { Button, Card } from '../components/ui';
export default function Login() {
  const { s, login } = useGame(); const nav = useNavigate(); const loc = useLocation();
  const [id, setId] = useState(''), [pw, setPw] = useState(''), [err, setErr] = useState('');
  const dest = loc.state?.from || '/dashboard';
  if (s) return <Navigate to={dest} replace />;
  const submit = (e) => {
    e.preventDefault();
    if (!id.trim() || !pw) return setErr('Enter your username/email and password.');
    const r = login(id, pw);
    return r.ok ? nav(dest) : setErr(r.error);
  };
  return (
    <div className="auth"><Card className="glow"><h1>Login</h1>
      {loc.state?.msg && <p className="ok">{loc.state.msg}</p>}
      <form noValidate onSubmit={submit}>
        <label>Email or Username<input className="input" value={id} onChange={(e) => setId(e.target.value)} /></label>
        <label>Password<input className="input" type="password" value={pw} onChange={(e) => setPw(e.target.value)} /></label>
        {err && <p className="err">{err}</p>}
        <div className="row mt"><Button type="submit">Login</Button><Button type="button" variant="ghost" onClick={() => nav('/register')}>Create New Account</Button></div>
      </form>
      <p className="mut">Demo account: <b>demo@codeclash.dev</b> / <b>demo1234</b></p>
      <p className="note">Prototype only: accounts live in this browser's LocalStorage and are not secure. v2 moves auth to Spring Security + JWT.</p>
      <p className="center"><Link to="/">Home</Link> · <Link to="/about">About</Link></p></Card></div>
  );
}
