import './Movies.css';
import { Header } from '../Header/Header';
import { SearchForm } from '../SearchForm/SearchForm';
import { Footer } from '../Footer/Footer';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';


export const Movies = ({
  isLoggedIn,
  moviesSearchHandler,
  allMovies
}) => {

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm
        filmSearchButtonHandler={moviesSearchHandler}
      />
      <MoviesCardList
        movies={allMovies}
      />
      <Footer />
    </>
  )
}