import { useState, useEffect } from 'react';
import { useRouteMatch } from "react-router-dom";

import './MoviesCard.css';

export const MoviesCard = ({
  movie,
  imageUrl,
  title,
  filmDuration,
  trailerLink,
  onLikeButtonClick,
  savedMovies
}) => {

  const isSavedMoviesPage = useRouteMatch({ path: '/saved-movies', exact: true });

  // const isSaved = savedMovies.some(savedMovie => movie.movieId === savedMovie.movieId);

  const [isSaved, setIsSaved] = useState(false);

  const filmLikeButtonClickHandler = () => {
    onLikeButtonClick(movie, isSaved);
    setIsSaved(savedMovies.some(savedMovie => movie.id === savedMovie.id));
  }

  useEffect(() => {
    setIsSaved(savedMovies.some(savedMovie => movie.id === savedMovie.id));
  }, [savedMovies, movie]);

  const filmLikeButtonClassName = (
    `movies-card__save-film-button ${isSaved ? 'movies-card__save-film-button_active' : 'movies-card__save-film-button_disable'}`
  );

  return (
    <li className="movies-card">
      <a href={trailerLink} target="_blank" rel='noreferrer' className="movies-card__cover-image-container">
        <img className="movies-card__cover-image" src={imageUrl} alt={title} />
      </a>
      <div className="movies-card__description">
        <h2 className="movies-card__header">{title}</h2>
        <span className="movies-card__film-duration">{filmDuration}</span>
        {isSavedMoviesPage ? (<button
          type="button"
          aria-label="Удалить фильм"
          className="movies-card__delete-button"
          onClick={filmLikeButtonClickHandler}
        />) : (
          <button
            type="button"
            aria-label="Сохранить фильм"
            className={filmLikeButtonClassName}
            onClick={filmLikeButtonClickHandler}
          />)}
      </div>
    </li>
  )
}