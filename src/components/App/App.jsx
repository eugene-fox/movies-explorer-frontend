import './App.css';

import { useState, useEffect } from 'react';

import { Main } from '../Main/Main';
import { Register } from '../Register/Register';
import { PageNotFound } from '../PageNotFound/PageNotFound';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { Login } from '../Login/Login';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Profile } from '../Profile/Profile';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { UserBlockedRoute } from '../UserBlockedRoute/UserBlockedRoute';

import { CurrentUserContext } from '../../contexts/currentUser/CurrentUserContext';

import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';

import { SHORT_MOVIE_DURATION } from '../../utils/constants';

function App() {

  //  Стейт данных текущего пользователя
  const [currentUser, setCurrentUser] = useState({});
  //  Стейт состоянии авторизации пользователя
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //  Стейт сообщения об ошибки при регистрации / авторизации
  const [commonMistakeText, setCommonMistakeText] = useState('');
  //  Стейт состояния отправки запроса
  const [isSendingRequest, setIsSendingRequest] = useState(false);

  //  Стейт отображения прелоадера
  const [preloaderVisible, setPreloaderVisible] = useState(false);
  //  Стейт переключателя короткометражных фильмов
  const [isShortMovies, setIsShortMovies] = useState(false);
  //  Стейт сообщения в компоненте контейнера фильмов
  const [moviesStatusMessage, setMoviesStatusMessage] = useState('');

  //  Стейт всех фильмов полученных от стороннего api
  const [allMovies, setAllMovies] = useState([]);
  //  Стейт найденых по запросу всех фильмов полученных от стороннего api
  const [foundAllMovies, setFoundAllMovies] = useState([]);
  //  Стейт сохраненных пользователем фильмов
  const [savedMovies, setSavedMovies] = useState([]);
  //  Стейт найденых по запросу сохраненных пользователем фильмов
  const [foundSavedMovies, setFoundSavedMovies] = useState([]);


  const history = useHistory();
  const { pathname } = useLocation();

  //Проверка наличия токена в локальном хранилище
  const checkToken = () => {
    const jwt = mainApi.getToken();
    if (!jwt) {
      return;
    } else {
      mainApi.getUserInfo()
        .then(res => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser(res);
          };
        })
        .catch(err => { console.log(err.message) });
    }
  }

  //Проверка наличия токена в локальном хранилище при монтировании элемента
  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    setIsShortMovies(false);
  }, [pathname]);

  //  Отправка и обработка запроса на авторизацию существующего пользователя
  const onLogin = (data) => {
    setIsSendingRequest(true);
    return mainApi.authorizeUser(data)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        mainApi.getUserInfo()
          .then(res => {
            setCurrentUser(res);
          })
          .catch(console.log);
        setIsLoggedIn(true);
        setCommonMistakeText('');
        history.push('/movies');
      })
      .catch(err => {
        console.log(err);
        if (err.status === 401) {
          setCommonMistakeText('Вы ввели неправильный логин или пароль.');
        } else {
          setCommonMistakeText(`${err.status} — ${err.statusText}`);
        }
      })
      .finally(() => {
        setIsSendingRequest(false);
      });
  }

  //  Отправка и обработка запроса на регистрацию пользователя
  const onRegistration = (data) => {
    setIsSendingRequest(true);
    return mainApi.registerUser(data)
      .then((res) => {
        setCommonMistakeText('');
        const { email, password } = data;
        onLogin({ email, password });
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 409) {
          setCommonMistakeText('Пользователь с таким email уже существует.');
        } else {
          setCommonMistakeText(`${err.status} — ${err.statusText}`);
        }
      })
      .finally(() => {
        // setIsSendingRequest(false);
      });
  }

  //Обработчик изменения данных авторизованного пользователя
  const onUpdateUser = (userData) => {
    return mainApi.updateUserProfile(userData)
      .then((res) => {
        setCurrentUser(res);
        setCommonMistakeText('Профиль успешно обновлен!')
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 409) {
          setCommonMistakeText('Пользователь с таким email уже существует.');
        } else {
          setCommonMistakeText(`${err.status} — ${err.statusText}`);
        }
      });
  }

  //  Обработчик выхода пользователя
  const onLogout = () => {
    // localStorage.removeItem('jwt');
    localStorage.clear();
    setCurrentUser({});
    setIsLoggedIn(false);
    history.push('/')
  }

  //  Фильтрация массива фильмов по ключевому слову
  const findMoviesByKeywords = (movies, searchQuery) => {
    if (!searchQuery) {
      return;
    }
    const foundMovies = movies.filter(movie => movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()));
    if (foundMovies.length === 0) {
      setMoviesStatusMessage('Ничего не найдено :(');
    }
    return foundMovies;
  }

  //  Обработчик сабмита формы поиска для страницы фильмов
  const handleMovieSearchFormSubmit = (searchQuery) => {
    setMoviesStatusMessage('');
    setIsSendingRequest(true);
    if (!localStorage.getItem('movies')) {
      setPreloaderVisible(true);
      moviesApi.getMovies()
        .then((movies) => {
          localStorage.setItem('movies', JSON.stringify(movies));
          setAllMovies(movies);
          const foundMovies = findMoviesByKeywords(movies, searchQuery);
          localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
          setFoundAllMovies(foundMovies);
        })
        .catch((err) => {
          console.log(err);
          setMoviesStatusMessage('Упс! Ошибка запроса к серверу.');
        })
        .finally(() => {
          setPreloaderVisible(false);
          setIsSendingRequest(false);
        });
    } else {
      setAllMovies(JSON.parse(localStorage.movies));
      const foundMovies = findMoviesByKeywords(JSON.parse(localStorage.movies), searchQuery);
      localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
      setIsSendingRequest(false);
      setFoundAllMovies(foundMovies);
    }
  }

  //  Обработчик сабмита формы поиска для страницы сохраненных фильмов фильмов
  const handleSavedMovieSearchFormSubmit = (searchQuery) => {
    setMoviesStatusMessage('');
    setFoundSavedMovies(findMoviesByKeywords(savedMovies, searchQuery));
  }

  const getSavedMovies = () => {
    mainApi.getSavedMovies()
      .then((movies) => {
        const tempMovies = movies.map((movie) => {
          return { ...movie, id: movie.movieId }
        })
        setSavedMovies(tempMovies);
        setFoundSavedMovies(tempMovies);
      })
      .catch(err => { console.log(err.message) })
      .finally(() => { });
  }

  useEffect(() => {
    if (isLoggedIn) {
      getSavedMovies();
      if (localStorage.getItem('foundMovies')) {
        setFoundAllMovies(JSON.parse(localStorage.foundMovies));
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setFoundSavedMovies(savedMovies);
  }, [savedMovies]);

  // Функция сортировки короткометражных фильмов
  const filterShortMovies = (movies) => {
    if (isShortMovies) {
      return movies.filter(movie => movie.duration <= SHORT_MOVIE_DURATION);
    } else {
      return movies.filter(movie => movie.duration > 0)
    }
  }

  //  Обработчик сохранения фильма
  const handleMovieSave = (movie) => {
    mainApi.addMovieToSaved(movie)
      .then((savedMovie) => {
        setSavedMovies([...savedMovies, { ...savedMovie, id: savedMovie.movieId }]);
      })
      .catch(console.log);
  }

  //  Обработчик удаления фильма
  const handleMovieDelete = (movie) => {
    const deleteMovieId = savedMovies.find((item) => item.id === movie.id)._id;
    mainApi.removeMovieFromSaved(deleteMovieId)
      .then((deletedMovie) => {
        setSavedMovies(savedMovies.filter(savedMovie => savedMovie._id !== deletedMovie._id));
      })
  }

  const onLikeButtonClick = (movie, isSaved) => {
    if (!isSaved) {
      handleMovieSave(movie);
    } else {
      handleMovieDelete(movie);
    }
  }

  return (
    <div className="app">

      <CurrentUserContext.Provider value={currentUser}>

        <Switch>

          <Route exact path="/">
            <Main isLoggedIn={isLoggedIn} />
          </Route>

          <ProtectedRoute path="/movies" isLoggedIn={isLoggedIn}>
            <Movies
              isLoggedIn={isLoggedIn}
              isShortMovies={isShortMovies}
              setIsShortMovies={setIsShortMovies}
              filterShortMovies={filterShortMovies}
              movies={foundAllMovies}
              savedMovies={savedMovies}
              onLikeButtonClick={onLikeButtonClick}
              preloaderVisible={preloaderVisible}
              onSearch={handleMovieSearchFormSubmit}
              moviesStatusMessage={moviesStatusMessage}
              setMoviesStatusMessage={setMoviesStatusMessage}
              isSendingRequest={isSendingRequest}
            />
          </ProtectedRoute>

          <ProtectedRoute path="/saved-movies" isLoggedIn={isLoggedIn} >
            <SavedMovies
              isLoggedIn={isLoggedIn}
              isShortMovies={isShortMovies}
              setIsShortMovies={setIsShortMovies}
              filterShortMovies={filterShortMovies}
              movies={foundSavedMovies}
              savedMovies={savedMovies}
              onLikeButtonClick={onLikeButtonClick}
              onSearch={handleSavedMovieSearchFormSubmit}
              moviesStatusMessage={moviesStatusMessage}
              setMoviesStatusMessage={setMoviesStatusMessage}
            />
          </ProtectedRoute>

          <ProtectedRoute path="/profile" isLoggedIn={isLoggedIn} >
            <Profile
              isLoggedIn={isLoggedIn}
              commonMistakeText={commonMistakeText}
              setCommonMistakeText={setCommonMistakeText}
              onUpdateUser={onUpdateUser}
              onLogout={onLogout}
            />
          </ProtectedRoute>

          <UserBlockedRoute path="/signin" isLoggedIn={isLoggedIn}>
            <Login
              onLogin={onLogin}
              commonMistakeText={commonMistakeText}
              isSendingRequest={isSendingRequest}
            />
          </UserBlockedRoute>

          <UserBlockedRoute path="/signup" isLoggedIn={isLoggedIn}>
            <Register
              onRegistration={onRegistration}
              commonMistakeText={commonMistakeText}
              isSendingRequest={isSendingRequest}
            />
          </UserBlockedRoute>

          <Route path="*">
            <PageNotFound />
          </Route>

        </Switch>

      </CurrentUserContext.Provider>

    </div>
  );
}

export default App;
