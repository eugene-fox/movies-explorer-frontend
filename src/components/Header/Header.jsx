import './Header.css';

import { ProjectLogo } from '../ProjectLogo/ProjectLogo';
import { AuthorizedUserNav } from '../AuthorizedUserNav/AuthorizedUserNav';
import { AuthNavigation } from '../AuthNavigation/AuthNavigation';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';

export function Header({ isLoginIn }) {
  return (
    <header className="header">
      <div className="header__container">
        <ProjectLogo />
        <div className="header__navigation-wrapper">
          {isLoginIn ? <AuthorizedUserNav /> : ''}
          <AuthNavigation isLoginIn={isLoginIn} />
        </div>
        {isLoginIn ? <BurgerMenu /> : ''}

      </div>
    </header>
  )
}