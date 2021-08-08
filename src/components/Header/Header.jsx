import './Header.css';
import { useRouteMatch } from "react-router-dom";
import { ProjectLogo } from '../ProjectLogo/ProjectLogo';
import { AuthorizedUserNav } from '../AuthorizedUserNav/AuthorizedUserNav';
import { AuthNavigation } from '../AuthNavigation/AuthNavigation';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { UserProfileLink } from '../UserProfileLink/UserProfileLink';

export function Header({ isLoggedIn }) {

  const isLandingPage = useRouteMatch({ path: '/', exact: true });

  const headerClassName = (`header ${!isLandingPage ? 'header_color_white' : ''}`);

  return (
    <header className={headerClassName}>
      <div className="header__container">
        <ProjectLogo />
        {isLoggedIn ? <AuthorizedUserNav isLandingPage={isLandingPage} /> : ''}
        <AuthNavigation isLoggedIn={isLoggedIn} isLandingPage={isLandingPage} />
        {isLoggedIn ? <BurgerMenu isLandingPage={isLandingPage} /> : ''}

      </div>
    </header>
  )
}