import { useState, useEffect } from 'react';
import { useRouteMatch } from "react-router-dom";

import './MoviesCard.css';

export const MoviesCard = ({
  movie,
  imageUrl,
  title,
  filmDuration,
  trailerLink,
  savedMovies,
  addMovieToSaved,
  removeMovieFromSaved
}) => {

  const isSavedMoviesPage = useRouteMatch({ path: '/saved-movies', exact: true });

  const [filmLikeStatus, setFilmLikeStatus] = useState(false);

  useEffect(() => {
    if (savedMovies.some(film => movie.movieId === film.movieId)) {
      setFilmLikeStatus(true);
    }
  }, [])

  const isLiked = savedMovies.some(film => movie.movieId === film.movieId)

  // const filmLikeButtonClassName = (
  //   `movies-card__save-film-button ${isLiked ? 'movies-card__save-film-button_active' : 'movies-card__save-film-button_disable'}`
  // );

  //  Обработчик клика по кнопке лайка
  const addMovieToSavedHandler = () => {
    console.log(movie, savedMovies)

    const isLiked = savedMovies.some(film => movie.movieId === film.movieId)
    console.log(isLiked);

    if (!isLiked) {
      addMovieToSaved(movie);
      setFilmLikeStatus(true);
    } else {
      removeMovieFromSaved(movie._id);
      setFilmLikeStatus(false);
    }
  }

  return (
    <li className="movies-card">
      <a href={trailerLink} target="_blank" rel='noreferrer'>
        <img className="movies-card__cover-image" src={imageUrl} alt={title} />
      </a>
      <div className="movies-card__description">
        <h2 className="movies-card__header">{title}</h2>
        <span className="movies-card__film-duration">{filmDuration}</span>
        {isSavedMoviesPage ? (<button
          type="button"
          aria-label="Удалить фильм"
          className="movies-card__delete-button"
          onClick={addMovieToSavedHandler}
        />) : (
          <button
            type="button"
            aria-label="Сохранить фильм"
            className={`movies-card__save-film-button ${filmLikeStatus ? 'movies-card__save-film-button_active' : 'movies-card__save-film-button_disable'}`}
            onClick={addMovieToSavedHandler}
          />
        )}
      </div>
    </li >
  )
}