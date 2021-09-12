import './Movies.css';

import { useState, useEffect } from 'react';

import { Header } from '../Header/Header';
import { SearchForm } from '../SearchForm/SearchForm';
import { Footer } from '../Footer/Footer';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';

import { MOBILE_WIDTH, TABLET_WIDTH } from '../../utils/constants';

export const Movies = ({
  isLoggedIn,
  isShortMovies,
  setIsShortMovies,
  filterShortMovies,
  movies,
  savedMovies,
  onLikeButtonClick,
  preloaderVisible,
  onSearch,
  moviesStatusMessage,
  setMoviesStatusMessage,
  isSendingRequest,
}) => {

  //  Количество отображаемых фильмов
  const [countOfDisplayMovie, setCountOfDisplayMovie] = useState({ initialMovies: 0, moreMovies: 0 });

  //Ограничение отображение фильмов displayLimitedCountOfMoviesSetter
  const countOfDisplayMovieSetter = () => {
    const screenWidth = window.screen.width;
    if (screenWidth <= MOBILE_WIDTH) {
      setCountOfDisplayMovie({ startCards: 5, moreCards: 2 })
    } else if (screenWidth <= TABLET_WIDTH) {
      setCountOfDisplayMovie({ startCards: 8, moreCards: 2 })
    } else {
      setCountOfDisplayMovie({ startCards: 12, moreCards: 3 })
    }
  }

  useEffect(() => {
    window.addEventListener('resize', countOfDisplayMovieSetter)

    return () => {
      window.removeEventListener('resize', countOfDisplayMovieSetter)
    }
  }, [])

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm
        onSearch={onSearch}
        isShortMovies={isShortMovies}
        setIsShortMovies={setIsShortMovies}
        isSendingRequest={isSendingRequest}
      />
      <MoviesCardList
        preloaderVisible={preloaderVisible}
        movies={filterShortMovies(movies)}
        savedMovies={savedMovies}
        onLikeButtonClick={onLikeButtonClick}
        countOfDisplayMovie={countOfDisplayMovie}
        setCountOfDisplayMovie={setCountOfDisplayMovie}
        countOfDisplayMovieSetter={countOfDisplayMovieSetter}
        moviesStatusMessage={moviesStatusMessage}
        setMoviesStatusMessage={setMoviesStatusMessage}
      />
      <Footer />
    </>
  )
}