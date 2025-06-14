import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/hia_logo.png';
import './Header.css';

export default function Header() {
  return (
    <header className='header'>
      <div className='logoContainer'>
        <img src={logo} alt="Hearts in Action logo" className='logo' />
        <Link to="/" className="link" style={{ fontSize: '1.5rem' }}>
          Hearts in Action
        </Link>
      </div>
      <nav className='nav'>
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/about" className="nav-link">About</NavLink>
        <NavLink to="/donate" className="nav-link">Donate</NavLink>
        <NavLink to="/team" className="nav-link">Team</NavLink>
        <NavLink to="/ai" className="nav-link">AI Census</NavLink>
      </nav>
    </header>
  );
}
