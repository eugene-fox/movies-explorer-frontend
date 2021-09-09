import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { Preloader } from '../Preloader/Preloader';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { MOVIES_API_URL } from '../../utils/constants';

import minuteToHoursConverter from '../../utils/minuteToHoursConverter';

export const MoviesCardList = ({movies, preloaderVisible}) => {

  const { pathname } = useLocation();

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__container">
        <Preloader preloaderVisible={preloaderVisible}/>
        <ul className="movies-card-list__movies-card-wrapper">
          { pathname === '/movies' ? (
            movies.map((movie) => (
              <MoviesCard
                key={movie.id}
                movie={movie}
                title={movie.nameRU}
                filmDuration={minuteToHoursConverter(movie.duration)}
                imageUrl={`${MOVIES_API_URL}${movie.image.url}`}
                trailerLink={movie.trailerLink}
              />
            ))) :(
              movies.map((movie) => (
                <MoviesCard
                  key={movie._id}
                  movie={movie}
                  title={movie.nameRU}
                  filmDuration={minuteToHoursConverter(movie.duration)}
                  imageUrl={movie.image}
                  trailerLink={movie.trailer}
                />
              ))
            )

          }
        </ul>

        <button className="movies-card-list__more-movies-button">Ещё</button>
      </div>
    </section>
  )
}