import { useState } from 'react';

import './MoviesCard.css';

export const MoviesCard = ({imageUrl, title, filmDuration, isSaved}) => {

  const [filmLikeStatus, setFilmLikeStatus] = useState(isSaved);

  const filmLikeButtonClickHandler = () => {
    setFilmLikeStatus(!filmLikeStatus);
  }

  const filmLikeButtonClassName = (
    `movies-card__save-film-button ${filmLikeStatus ? 'movies-card__save-film-button_active' : 'movies-card__save-film-button_disable'}`
  );

  return (
    <li className="movies-card">
      <img className="movies-card__cover-image" src={imageUrl} alt={title} />
      <div className="movies-card__description">
        <h2 className="movies-card__header">{title}</h2>
        <span className="movies-card__film-duration">{filmDuration}</span>
        <button
            type="button"
            aria-label="Сохранить фильм"
            className={filmLikeButtonClassName}
            onClick={filmLikeButtonClickHandler}
          />
      </div>
    </li>
  )
}