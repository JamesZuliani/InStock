import LogoImg from "../../assests/Logo/InStock-Logo.svg";
import "./Header.scss";
export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo-wrapper">
          <img src={LogoImg} alt="inStock Logo" />
        </div>
        <nav className="nav">
          <ul className="nav__nav-list">
            <a className="nav__item" href="/">
              Warehouses
            </a>
            <a className="nav__item" href="/">
              Inventory
            </a>
          </ul>
        </nav>
      </div>
    </header>
  );
}
