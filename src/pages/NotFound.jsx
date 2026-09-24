import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui';
export default function NotFound() {
  const nav = useNavigate();
  return <div className="center" style={{ padding: '15vh 20px' }}><h1 className="big">404</h1><p className="mut">This level doesn't exist.</p><div className="row center"><Button onClick={() => nav('/')}>Go Home</Button><Button variant="ghost" onClick={() => nav(-1)}>Go Back</Button></div></div>;
}
