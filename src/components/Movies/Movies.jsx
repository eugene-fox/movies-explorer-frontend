import { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import './Movies.css';

import { moviesApi } from '../../utils/MoviesApi';

import { Header } from '../Header/Header';
import { SearchForm } from '../SearchForm/SearchForm';
import { Preloader } from '../Preloader/Preloader';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { Footer } from '../Footer/Footer';
import { mainApi } from '../../utils/MainApi';

import { SHORT_MOVIE_DURATION, MOBILE_WIDTH, TABLET_WIDTH, LAPTOP_WIDTH } from '../../utils/constants';

export const Movies = ({ isLoggedIn }) => {

  const { pathname } = useLocation();

  //  Стейт переключателя короткометражек
  const [isShortMovies, setIsShortMovies] = useState(false);
  //  Стейт состояния прелоаудера
  const [isPreloaderDisplay, setIsPreloaderDisplay] = useState(false);
  //  Cтейт видимости кнопки "Ёще"
  const [isMoreMoviesButtonDisplay, setIsMoreMoviesButtonDisplay] = useState(false);
  //  Фильмы найденые по запросу
  const [moviesFoundOnRequest, setMoviesFoundOnRequest] = useState([]);
  //  Сохраненные пользователем фильмы
  const [savedMovies, setSavedMovies] = useState([]);
  //  Количество отображаемых фильмов
  const [countOfDisplayMovie, setCountOfDisplayMovie] = useState({ initialMovies: 0, moreMovies: 0 });
  //  Отображаемые фильмы
  const [displayedMovies, setDisplayedMovies] = useState([]);
  //  Отображение текстового сообщения на странице результатов
  const [listMessageDisplay, setListMessageDisplay] = useState('movies-card-list__message')

  //  Запрос сохраненных пользователем фильмов при монтировании компонента
  useEffect(() => {
    if (pathname === '/saved-movies') {
      setIsPreloaderDisplay(true);
    }
    mainApi.getSavedMovies()
      .then((res) => {
        if (res) setSavedMovies(res);
      })
      .catch(err => { console.log(err.message) })
      .finally(() => {
        setIsPreloaderDisplay(false);
        setIsMoreMoviesButtonDisplay(false);
        setListMessageDisplay('movies-card-list__message');
      });
  }, []);

  // Функция сортировки короткометражных фильмов
  const filterShortMovies = (movies) => {
    if (isShortMovies) {
      return movies.filter(movie => movie.duration <= SHORT_MOVIE_DURATION);
    } else {
      return movies.filter(movie => movie.duration > SHORT_MOVIE_DURATION)
    }
  }

  const MoviesReadyToRender = useMemo(
    () => filterShortMovies(moviesFoundOnRequest),
    [isShortMovies, moviesFoundOnRequest]
  );

  const savedMoviesReadyToRender = useMemo(
    () => filterShortMovies(savedMovies),
    [isShortMovies, savedMovies]
  );

  const displayedMoviesReadyToRender = useMemo(
    () => filterShortMovies(displayedMovies),
    [isShortMovies, displayedMovies]
  );

  //  Фильтрация массива фильмов по ключевому слову
  const selectMoviewsByKeywords = (movies, searchQuery) => {
    if (!searchQuery) {
      return;
    }
    const selectedMovies = movies.filter(movie => movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()));
    console.log(selectedMovies);
    if (selectedMovies.length === 0) {
      setListMessageDisplay('movies-card-list__message movies-card-list__message_display');
    } else {
      setListMessageDisplay('movies-card-list__message');
    }
    setMoviesFoundOnRequest(selectedMovies);
  }

  //  Обработчки клика по кнопке поиска
  const searchButtonHandler = ({ searchQuery }) => {
    if (pathname === '/movies') {
      if (!localStorage.getItem('movies')) {
        setIsPreloaderDisplay(true);
        moviesApi.getMovies()
          .then(movies => {
            localStorage.setItem('movies', JSON.stringify(movies));
            selectMoviewsByKeywords(movies, searchQuery);
          })
          .catch(err => { console.log(err.message) })
          .finally(() => {
            setIsPreloaderDisplay(false);
          });
      }
      selectMoviewsByKeywords(localStorage.getItem('movies') ? JSON.parse(localStorage.movies) : [], searchQuery);
    } else {
      console.log(savedMovies);
      setSavedMovies(savedMovies.filter(movie => movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())));
      setIsPreloaderDisplay(false);
    }
  }

  //Ограничение отображение фильмов
  const displayLimitedCountOfMoviesSetter = () => {
    const screenWidth = window.screen.width;
    if (screenWidth <= MOBILE_WIDTH) {
      setCountOfDisplayMovie({ startCards: 5, moreCards: 2 })
    } else if (screenWidth <= TABLET_WIDTH) {
      setCountOfDisplayMovie({ startCards: 8, moreCards: 2 })
    } else {
      setCountOfDisplayMovie({ startCards: 12, moreCards: 3 })
    }
  }

  //  Добавление фильма в сохраненные +++
  const addMovieToSaved = (movie) => {
    mainApi.addMovieToSaved(movie)
      .then(movieData => {
        setSavedMovies([movieData, ...savedMovies])
      })
      .catch(err => { console.log(err.message) });
  }

  //  Удаление фильма из сохраненных
  const removeMovieFromSaved = (movieId) => {
    mainApi.removeMovieFromSaved(movieId)
      .then(() => {
        setSavedMovies(savedMovies.filter(movie => movie._id !== movieId));
      })
      .catch(err => { console.log(err.message) });
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm
        onSearch={searchButtonHandler}
        isShortMovies={isShortMovies}
        setIsShortMovies={setIsShortMovies}
      />
      <Preloader isPreloaderDisplay={isPreloaderDisplay} />
      <MoviesCardList
        movies={MoviesReadyToRender}
        savedMovies={savedMoviesReadyToRender}
        displayedMovies={displayedMoviesReadyToRender}
        setDisplayedMovies={setDisplayedMovies}
        countOfDisplayMovie={countOfDisplayMovie}
        setCountOfDisplayMovie={setCountOfDisplayMovie}
        isMoreMoviesButtonDisplay={isMoreMoviesButtonDisplay}
        setIsMoreMoviesButtonDisplay={setIsMoreMoviesButtonDisplay}
        displayLimitedCountOfMoviesSetter={displayLimitedCountOfMoviesSetter}
        addMovieToSaved={addMovieToSaved}
        removeMovieFromSaved={removeMovieFromSaved}
        listMessageDisplay={listMessageDisplay}
        setListMessageDisplay={setListMessageDisplay}
      />
      <Footer />
    </>
  )
}