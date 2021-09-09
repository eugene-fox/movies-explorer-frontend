import './Movies.css';

import { useEffect } from 'react';

import { Header } from '../Header/Header';
import { SearchForm } from '../SearchForm/SearchForm';
import { Footer } from '../Footer/Footer';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';


export const Movies = ({
  isLoggedIn,
  preloaderVisible,
  onSearch,
  isShortMovies,
  setIsShortMovies,
  filterShortMovies,
  movies,
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
        preloaderVisible={preloaderVisible}
        movies={isShortMovies? filterShortMovies(movies) : movies}
      />
      <Footer />
    </>
  )
}