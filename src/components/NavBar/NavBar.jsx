import { Link, NavLink } from 'react-router-dom';
import CartWidget from "../CartWidget/CartWidget";
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="nav">
      
      <Link to="/" className="nav-brand">
        <h1>🏍️ MotoStore</h1>
      </Link>

      <ul className="nav-menu">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            end
          >
            Todas
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/category/nakeds" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Nakeds
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/category/deportivas" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Deportivas
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/category/enduro" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Enduro
          </NavLink>
        </li>
      </ul>

      <CartWidget />
    </nav>
  );
};

export default NavBar;
