import './AuthorizedUserNav.css';
import { NavLink } from 'react-router-dom';

export const AuthorizedUserNav = () => {
  return (
    <nav>
      <ul className="authorized-user-nav">
        <li className="authorized-user-nav__item">
          <NavLink className="authorized-user-nav__link" to="/movies">Фильмы</NavLink>
        </li>
        <li className="authorized-user-nav__item">
          <NavLink className="authorized-user-nav__link" to="/saved-movies">Сохранённые фильмы</NavLink>
        </li>
      </ul>
    </nav>
  )
}