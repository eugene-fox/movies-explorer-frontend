import './SearchForm.css';
import { ShortMoviesCheckbox } from '../ShortMoviesCheckbox/ShortMoviesCheckbox';

import useFormWithValidation from '../../hooks/useFormWithValidation';

export const SearchForm = ({ onSearch, isShortMovies, setIsShortMovies, isSendingRequest }) => {

  const { values, isValid, handleChange } = useFormWithValidation();

  const { searchQuery } = values;

  //  Обработчик сабмита формы поиска по фильмам
  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    onSearch(searchQuery);
  }

  return (
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__form" onSubmit={handleFormSubmit} noValidate>
          <div className="search-form__text-field-wrapper">
            <input
              className="search-form__text-field"
              type="text"
              placeholder="Фильм"
              name="searchQuery"
              onChange={handleChange}
              value={searchQuery || ''}
              required
              disabled={isSendingRequest ? true : false}
            />
            <button
              className="search-form__search-button"
              type="submit" disabled={isValid ? false : true}>
              Поиск
            </button>
          </div>
          <ShortMoviesCheckbox
            isShortMovies={isShortMovies}
            setIsShortMovies={setIsShortMovies}
          />
        </form>
      </div>
    </section>
  )
}