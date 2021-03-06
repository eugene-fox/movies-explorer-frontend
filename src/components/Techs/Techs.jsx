import './Techs.css';

export function Techs() {
  return (
    <section id="techs" className="techs">
      <div className="techs__container">
      <h2 className="main__section-header">Технологии</h2>
        <article className="techs__description">
          <h3 className="techs__header">7 технологий</h3>
          <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
          <ul className="techs__list">
            <li className="techs__list-item">HTML</li>
            <li className="techs__list-item">CSS</li>
            <li className="techs__list-item">JS</li>
            <li className="techs__list-item">React</li>
            <li className="techs__list-item">Git</li>
            <li className="techs__list-item">Express.js</li>
            <li className="techs__list-item">mongoDB</li>
          </ul>
        </article>
      </div>
    </section>
  )
}