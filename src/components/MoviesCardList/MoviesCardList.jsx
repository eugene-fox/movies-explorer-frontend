import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { BEATFILM_MOVIES_URL } from '../../utils/constants';
import minuteToHoursConverter from '../../utils/minuteToHoursConverter';


export const MoviesCardList = ({
  movies,
  savedMovies,
  displayedMovies,
  setDisplayedMovies,
  isMoreMoviesButtonDisplay,
  setIsMoreMoviesButtonDisplay,
  countOfDisplayMovie,
  setCountOfDisplayMovie,
  displayLimitedCountOfMoviesSetter,
  addMovieToSaved,
  removeMovieFromSaved,
  listMessageDisplay,
  setListMessageDisplay
}) => {

  const { pathname } = useLocation();

  //Сравниваем количество отображенных карточек с общим количеством +++
  useEffect(() => {
    console.log(displayedMovies, movies);
    // if (movies.length === 0) {
    //   setListMessageDisplay('movies-card-list__message movies-card-list__message_display')
    // } else {
    //   setListMessageDisplay('movies-card-list__message')
    // }
    if (movies.length > displayedMovies.length) {
      //Кнопку видно
      setIsMoreMoviesButtonDisplay(true);
    } else {
      setIsMoreMoviesButtonDisplay(false);
    }
  }, [movies, displayedMovies]);



  useEffect(() => {
    const initialCards = displayLimitedCountOfMoviesSetter();

    if (pathname === '/saved-movies') {
      // Прячем кнопку more и надпись (ничего не найдено)
      setIsMoreMoviesButtonDisplay(false);
      setListMessageDisplay('movies-card-list__message')
    }
    // if (loggedIn && foundMovies && JSON.parse(foundMovies).length > 0) setMoviesVisibility('movies-card-list_visible');
    // if (loggedIn && foundMovies) setRenderedMoviesList(JSON.parse(foundMovies).slice(0, initialCards));
  }, [movies, setDisplayedMovies, pathname]);

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__container">

        {pathname === '/movies' ?
          (<p className={listMessageDisplay} >
            Ничего не найдено
          </p>) : ''}


        <ul className="movies-card-list__movies-card-wrapper">
          {pathname === '/movies' ? (
            movies.slice(0, countOfDisplayMovie.startCards).map((movie) => (
              <MoviesCard
                key={movie.id}
                movie={movie}
                title={movie.nameRU}
                filmDuration={minuteToHoursConverter(movie.duration)}
                imageUrl={`${BEATFILM_MOVIES_URL}${movie.image.url}`}
                trailerLink={movie.trailerLink}
                savedMovies={savedMovies}
                addMovieToSaved={addMovieToSaved}
                removeMovieFromSaved={removeMovieFromSaved}
              />
            ))
          ) : (
            savedMovies.map((movie) => (
              <MoviesCard
                key={movie._id}
                movie={movie}
                title={movie.nameRU}
                filmDuration={minuteToHoursConverter(movie.duration)}
                imageUrl={movie.image}
                trailerLink={movie.trailer}
                savedMovies={savedMovies}
                addMovieToSaved={addMovieToSaved}
                removeMovieFromSaved={removeMovieFromSaved}
              />
            ))
          )}
        </ul>
        {
          movies.length > displayedMovies.length || pathname !== '/saved-movies'
            ? (
              <button type="button"
                onClick={() => {
                  setCountOfDisplayMovie({ ...countOfDisplayMovie, startCards: countOfDisplayMovie.startCards + countOfDisplayMovie.moreCards })
                }}
                className={`movies-card-list__more-movies-button ${countOfDisplayMovie.startCards < movies.length ? "" : "movies-card-list__more-movies-button_hidden"}`}
              >Ещё</button>
            )
            : ''
        }
      </div>
    </section>
  )
}