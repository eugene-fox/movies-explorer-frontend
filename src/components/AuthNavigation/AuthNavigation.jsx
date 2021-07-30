import './AuthNavigation.css';
import { NavLink } from 'react-router-dom';

export const AuthNavigation = ({ isLoginIn }) => {
  return (
    <nav>
      {isLoginIn ?
        (<NavLink className="auth-navigation__profile-link" to="/profile">Аккаунт</NavLink>)
        :
        (<ul className="auth-navigation">
          <li className="auth-navigation__item">
            <NavLink className="auth-navigation__link" to="/signup">Регистрация</NavLink>
          </li>
          <li className="auth-navigation__item auth-navigation__item_accent">
            <NavLink className="auth-navigation__link auth-navigation__link_color_black" to="/signin">Войти</NavLink>
          </li>
        </ul>)}
    </nav>
  )
}
