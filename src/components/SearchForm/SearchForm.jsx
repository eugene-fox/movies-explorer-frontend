import './SearchForm.css';
import { ShortMoviesCheckbox } from '../ShortMoviesCheckbox/ShortMoviesCheckbox';

export const SearchForm = () => {
  return (
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__form">
          <div className="search-form__text-field-wrapper">
            <input className="search-form__text-field" type="text" placeholder="Фильм" />
            <button className="search-form__search-button" type="submit">Поиск</button>
          </div>
          <ShortMoviesCheckbox />
        </form>
      </div>
    </section>
  )
}