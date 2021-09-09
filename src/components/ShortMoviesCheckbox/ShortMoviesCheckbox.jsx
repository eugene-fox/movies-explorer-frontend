import './ShortMoviesCheckbox.css';

export const ShortMoviesCheckbox = ({ isShortMovies, setIsShortMovies }) => {

  //  Обработчик клика по изменению состояния поиска короткометражек
  const isShortMoviesHandler = () => {
    setIsShortMovies(!isShortMovies);
  }

  return (
    <label className="search-form__checkbox-wrapper">
      <input
        className="search-form__checkbox"
        type="checkbox"
        name="shortMovies"
        id=""
        onClick={isShortMoviesHandler} />
      <span className="search-form__checkbox-visible"></span>
      Короткометражки
    </label>
  )
}