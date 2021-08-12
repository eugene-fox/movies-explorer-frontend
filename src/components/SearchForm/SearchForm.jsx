import { useState } from 'react';
import './SearchForm.css';

export const SearchForm = ({
  onSearch,
  isShortMovies,
  setIsShortMovies,
}) => {

  //  Стейт поискового запроса
  const [searchQuery, setSearchQuery] = useState('');

  // Обработчик изменения значений в инпутах
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setSearchQuery({
      [name]: value
    });
  }

  //  Обработчик сабмита формы поиска по фильмам
  const handleSearchSubmit = (evt) => {
    evt.preventDefault();
    // if (!searchQuery) {
    //   return;
    // }
    onSearch(searchQuery);
  }

  //  Обработчик клика по изменению состояния поиска короткометражек
  const isShortMoviesHandler = () => {
    setIsShortMovies(!isShortMovies);
  }

  return (
    <section className="search-form">
      <div className="search-form__container">
        <form
          className="search-form__form"
          onSubmit={handleSearchSubmit}
        >
          <div className="search-form__text-field-wrapper">
            <input
              className="search-form__text-field"
              type="text"
              placeholder="Фильм"
              name="searchQuery"
              autoComplete="off"
              onChange={handleInputChange}
              required
            />
            <button className="search-form__search-button" type="submit">Поиск</button>
          </div>
          <label className="search-form__checkbox-wrapper">
            <input
              className="search-form__checkbox"
              type="checkbox"
              name="shortMovies"
              id=""
              onClick={isShortMoviesHandler}
            />
            <span className="search-form__checkbox-visible"></span>
            Короткометражки
          </label>
        </form>
      </div>
    </section>
  )
}