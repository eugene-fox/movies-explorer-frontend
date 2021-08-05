import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { Preloader } from '../Preloader/Preloader';

import { BEATFILM_MOVIES_URL } from '../../utils/constants';
import minuteToHoursConverter from '../../utils/minuteToHoursConverter';

export const MoviesCardList = ({
  movies
}) => {

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__container">
        <Preloader />
        <ul className="movies-card-list__movies-card-wrapper">
          {movies.map((movie) => (
            <MoviesCard
              key={movie.id}
              movie={movie}
              title={movie.nameRU}
              filmDuration={minuteToHoursConverter(movie.duration)}
              imageUrl={`${BEATFILM_MOVIES_URL}${movie.image.url}`}
              trailerLink={movie.trailerLink}
              isSaved={false}
            />
          ))}
        </ul>

        <button className="movies-card-list__more-movies-button">Ещё</button>
      </div>
    </section>
  )
}