import './Header.css';

import { ProjectLogo } from '../ProjectLogo/ProjectLogo';
import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <ProjectLogo />
        <nav>
          <ul className="header__authentication-navigation">
            <li className="header__authentication-navigation-item">
              <NavLink className="header__authentication-navigation-link" to="/signup">Регистрация</NavLink>
            </li>
            <li className="header__authentication-navigation-item header__authentication-navigation-item_accent">
              <NavLink className="header__authentication-navigation-link header__authentication-navigation-link_color_black" to="/signin">Войти</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}