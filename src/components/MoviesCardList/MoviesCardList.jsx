import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { Preloader } from '../Preloader/Preloader';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { MOVIES_API_URL } from '../../utils/constants';

import minuteToHoursConverter from '../../utils/minuteToHoursConverter';

export const MoviesCardList = ({
  movies,
  savedMovies,
  preloaderVisible,
  onLikeButtonClick,
  countOfDisplayMovie,
  setCountOfDisplayMovie,
  countOfDisplayMovieSetter,
  moviesStatusMessage,
  setMoviesStatusMessage,
}) => {

  const { pathname } = useLocation();

  useEffect(() => {

    setMoviesStatusMessage('');

    if (pathname !== '/saved-movies') {
      countOfDisplayMovieSetter();
    }
  }, []);

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__container">
        <Preloader preloaderVisible={preloaderVisible} />
        {moviesStatusMessage.length !== 0 ?
          <p className="movies-card-list__status-message">{moviesStatusMessage}</p> :
          ''
        }

        <ul className="movies-card-list__movies-card-wrapper">
          {pathname === '/movies' ? (
            movies.slice(0, countOfDisplayMovie.startCards).map((movie) => (
              <MoviesCard
                key={movie.id}
                movie={movie}
                title={movie.nameRU}
                filmDuration={minuteToHoursConverter(movie.duration)}
                imageUrl={`${MOVIES_API_URL}${movie.image.url}`}
                trailerLink={movie.trailerLink}
                onLikeButtonClick={onLikeButtonClick}
                savedMovies={savedMovies}
              />
            ))) : (
            movies.map((movie) => (
              <MoviesCard
                key={movie._id}
                movie={movie}
                title={movie.nameRU}
                filmDuration={minuteToHoursConverter(movie.duration)}
                imageUrl={movie.image}
                trailerLink={movie.trailer}
                onLikeButtonClick={onLikeButtonClick}
                savedMovies={movies}
              />
            ))
          )
          }
        </ul>

        {
          pathname !== '/saved-movies'
            ? (
              <button type="button"
                onClick={() => {
                  setCountOfDisplayMovie({ ...countOfDisplayMovie, startCards: countOfDisplayMovie.startCards + countOfDisplayMovie.moreCards })
                }}
                className={`movies-card-list__more-movies-button ${countOfDisplayMovie.startCards < movies.length ? "" : "movies-card-list__more-movies-button_hidden"}`}
              >
                Ещё
              </button>
            )
            : ''
        }
      </div>
    </section>
  )
}