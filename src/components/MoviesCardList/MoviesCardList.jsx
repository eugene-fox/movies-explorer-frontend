import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { Preloader } from '../Preloader/Preloader';

import picUrl1 from '../../images/pic-1.jpg';

export const MoviesCardList = () => {

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__container">
        <Preloader />
        <ul className="movies-card-list__movies-card-wrapper">
          <MoviesCard
            imageUrl={picUrl1}
            title="33 слова о дизайне"
            filmDuration="1ч 42м"
            isSaved={false}
          />
        </ul>

        <button className="movies-card-list__more-movies-button">Ещё</button>
      </div>
    </section>
  )
}