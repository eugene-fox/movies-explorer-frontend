import './Header.css';
import { useRouteMatch } from "react-router-dom";
import { ProjectLogo } from '../ProjectLogo/ProjectLogo';
import { AuthorizedUserNav } from '../AuthorizedUserNav/AuthorizedUserNav';
import { AuthNavigation } from '../AuthNavigation/AuthNavigation';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';

export function Header({ isLoginIn }) {

  const isLandingPage = useRouteMatch({ path: '/', exact: true });

  const headerClassName = (`header ${!isLandingPage ? 'header_color_white' : ''}`);

  return (
    <header className={headerClassName}>
      <div className="header__container">
        <ProjectLogo />
        {isLoginIn ? <AuthorizedUserNav isLandingPage={isLandingPage}/> : ''}
        <div className="header__navigation-wrapper">
          <AuthNavigation isLoginIn={isLoginIn} isLandingPage={isLandingPage}/>
        </div>
        {isLoginIn ? <BurgerMenu isLandingPage={isLandingPage} /> : ''}

      </div>
    </header>
  )
}