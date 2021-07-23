import './Promo.css';

import { NavTab } from '../NavTab/NavTab';

export function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__header">Учебный проект студента <br /> факультета Веб-разработки.</h1>
      </div>
      <NavTab />
    </section>
  )
}