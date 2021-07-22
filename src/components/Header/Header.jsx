import './Header.css';

import headerLogoPath from '../../images/logo.svg';

export function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={headerLogoPath} alt="Логотип проекта Movies Explorer" />
        <nav>
          <ul className="header__authentication-navigation">
            <li className="header__authentication-navigation-item">
              <a className="header__authentication-navigation-link" href="/#">Регистрация</a>
            </li>
            <li className="header__authentication-navigation-item header__authentication-navigation-item_accent">
              <a className="header__authentication-navigation-link header__authentication-navigation-link_color_black" href="/#">Войти</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}