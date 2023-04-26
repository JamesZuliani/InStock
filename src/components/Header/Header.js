import LogoImg from "../../assets/logo/InStock-Logo.svg";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Header.scss";
export default function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo-wrapper">
          <Link to="/">
            <img className="header__logo" src={LogoImg} alt="inStock Logo" />
          </Link>
        </div>
        <nav className="nav">
          <NavLink
            to="/warehouse"
            className={`nav__item ${location.pathname === "/" ? "active" : ""}`}
          >
            <h3 className="nav__text-link">Warehouses</h3>
          </NavLink>
          <NavLink to="/inventory" className="nav__item">
            <h3 className="nav__text-link">Inventory</h3>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
