import './SavedMovies.css';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';


export const SavedMovies = ({
  isLoggedIn,
  onSearch,
  isShortMovies,
  setIsShortMovies,
  filterShortMovies,
  movies,
  savedMovies,
  onLikeButtonClick,
  moviesStatusMessage,
  setMoviesStatusMessage
}) => {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm
        onSearch={onSearch}
        isShortMovies={isShortMovies}
        setIsShortMovies={setIsShortMovies}
      />
      <MoviesCardList
        movies={filterShortMovies(movies)}
        onLikeButtonClick={onLikeButtonClick}
        moviesStatusMessage={moviesStatusMessage}
        setMoviesStatusMessage={setMoviesStatusMessage}
      />
      <Footer />
    </>
  )
}