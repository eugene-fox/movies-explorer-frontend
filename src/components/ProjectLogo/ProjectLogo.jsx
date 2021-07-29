import './ProjectLogo.css';
import headerLogoPath from '../../images/logo.svg';

export const ProjectLogo = () => {
  return (
    <a href="/">
          <img className="project-logo" src={headerLogoPath} alt="Логотип проекта Movies Explorer" />
    </a>
  )
}