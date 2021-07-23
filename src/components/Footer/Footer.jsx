import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__about-text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <p className="footer__copyright">&copy; 2021</p>
        <ul className="footer__menu">
          <li className="footer__menu-item">
            <a className="footer__menu-link" href="/#">Яндекс.Практикум</a>
          </li>
          <li className="footer__menu-item">
            <a className="footer__menu-link" href="/#">Github</a>
          </li>
          <li className="footer__menu-item">
            <a className="footer__menu-link" href="/#">Facebook</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}