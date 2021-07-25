import './Portfolio.css';


export function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h3 className="portfolio__header">Портфолио</h3>
        <ul className="portfolio__project-list">
          <li className="portfolio__project-list-item">
            <a className="portfolio__project-list-link" href="/#" target="_blank">Статичный сайт</a>
          </li>
          <li className="portfolio__project-list-item">
            <a className="portfolio__project-list-link" href="/#" target="_blank">Адаптивный сайт</a>
          </li>
          <li className="portfolio__project-list-item">
            <a className="portfolio__project-list-link" href="/#" target="_blank">Одностраничное приложение</a>
          </li>
        </ul>
      </div>

    </section>
  )
}