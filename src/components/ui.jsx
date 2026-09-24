import { Link } from 'react-router-dom';
export const Card = ({ children, className = '', ...p }) => <div className={`card ${className}`} {...p}>{children}</div>;
export const Button = ({ variant = 'primary', className = '', children, ...p }) => <button className={`btn ${variant} ${className}`} {...p}>{children}</button>;
export const ProgressBar = ({ pct }) => <div className="bar"><i style={{ width: `${pct}%` }} /></div>;
export const XPBadge = ({ xp }) => <span className="xpb">+{xp} XP</span>;
export const LevelBadge = ({ level }) => <span className="lvl">LV {level}</span>;
export const StatCard = ({ icon, label, value, to }) => {
  const inner = <><span className="ico">{icon}</span><div><b>{value}</b><small>{label}</small></div></>;
  return to ? <Link to={to} className="card stat">{inner}</Link> : <div className="card stat">{inner}</div>;
};
export const Skeleton = ({ n = 4, h = 90 }) => <div className="grid">{Array.from({ length: n }, (_, i) => <div key={i} className="skel" style={{ height: h }} />)}</div>;
export const Empty = ({ icon = '🕹️', text, action }) => <Card className="empty"><div style={{ fontSize: 40 }}>{icon}</div><p>{text}</p>{action}</Card>;
export const Modal = ({ open, children }) => open ? <div className="overlay"><div className="modal card">{children}</div></div> : null;
export const Toggle = ({ on, onChange, label }) => (
  <label className="row toggle"><span>{label}</span><button type="button" role="switch" aria-checked={on} className={`sw ${on ? 'on' : ''}`} onClick={() => onChange(!on)}><i /></button></label>
);
export const Tabs = ({ items, value, onChange }) => <div className="tabs">{items.map((t) => <button key={t} className={`pill ${t === value ? 'act' : ''}`} onClick={() => onChange(t)}>{t}</button>)}</div>;
export const Chart = ({ data, labels, color = 'var(--a1)' }) => {
  const max = Math.max(1, ...data);
  return <div className="chart">{data.map((v, i) => <div key={i} className="col"><span>{v}</span><i style={{ height: `${(v / max) * 100}%`, background: color }} /><small>{labels[i]}</small></div>)}</div>;
};
export const diffClass = (d) => `diff ${d.toLowerCase()}`;
