import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { LANGS } from '../data/challenges';
import { Button, Card, Modal, Tabs, Toggle } from '../components/ui';
export default function Settings() {
  const { s, setSettings, setProfile, reset, logout } = useGame(); const nav = useNavigate(); const [name, setName] = useState(s.username); const [ask, setAsk] = useState(false); const st = s.settings;
  return (
    <div className="stack"><h1>⚙️ Settings</h1>
      <Card><h3>Profile</h3><small>{s.name} · {s.email}</small><div className="row"><input className="input" value={name} maxLength={16} onChange={(e) => setName(e.target.value)} /><Button disabled={!name.trim() || name === s.username} onClick={() => setProfile({ username: name.trim() })}>Save</Button></div></Card>
      <Card><h3>Theme</h3><Tabs items={['Dark', 'Light']} value={st.theme === 'dark' ? 'Dark' : 'Light'} onChange={(v) => setSettings({ theme: v.toLowerCase() })} /></Card>
      <Card><h3>Preferences</h3><Toggle label="Notifications" on={st.notifications} onChange={(v) => setSettings({ notifications: v })} /><Toggle label="Sound effects" on={st.sound} onChange={(v) => setSettings({ sound: v })} /><Toggle label="Animations" on={st.animations} onChange={(v) => setSettings({ animations: v })} />
        <label>Default coding language</label><select className="input" value={s.favLang} onChange={(e) => setProfile({ favLang: e.target.value })}>{LANGS.map((l) => <option key={l}>{l}</option>)}</select></Card>
      <Card><h3>Danger zone</h3><div className="row"><Button variant="danger" onClick={() => setAsk(true)}>Reset Demo Progress</Button><Button variant="ghost" onClick={() => { logout(); nav('/login'); }}>Logout</Button></div></Card>
      <Modal open={ask}><h2>Reset all progress?</h2><p className="mut">Only YOUR XP, level, solved challenges, achievements, streak, battles and stats are cleared. Your account and all other users stay untouched.</p><div className="row center"><Button variant="danger" onClick={() => { reset(); setName(s.username); setAsk(false); }}>Yes, reset</Button><Button variant="ghost" onClick={() => setAsk(false)}>Cancel</Button></div></Modal>
    </div>
  );
}
