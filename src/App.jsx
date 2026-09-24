import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Challenges from './pages/Challenges';
import ChallengeDetails from './pages/ChallengeDetails';
import CodingArena from './pages/CodingArena';
import BattleArena from './pages/BattleArena';
import Leaderboard from './pages/Leaderboard';
import Achievements from './pages/Achievements';
import Profile from './pages/Profile';
import Statistics from './pages/Statistics';
import DailyChallenge from './pages/DailyChallenge';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import NotFound from './pages/NotFound';
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/challenges/:id" element={<ChallengeDetails />} />
        <Route path="/arena/:id" element={<CodingArena />} />
        <Route path="/battle" element={<BattleArena />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/daily" element={<DailyChallenge />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
