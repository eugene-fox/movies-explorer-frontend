import './ShortMoviesCheckbox.css';

export const ShortMoviesCheckbox = () => {
  return (
    <label className="search-form__checkbox-wrapper">
      <input className="search-form__checkbox" type="checkbox" name="shortMovies" id="" />
      <span className="search-form__checkbox-visible"></span>
      Короткометражки
    </label>
  )
}