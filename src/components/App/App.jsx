import './App.css';

import { useState, useEffect } from 'react';

import { Main } from '../Main/Main';
import { Register } from '../Register/Register';
import { PageNotFound } from '../PageNotFound/PageNotFound';
import { Route, Switch, useHistory } from 'react-router-dom';
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

  //  Стейт отображения прелоадера
  const [preloaderVisible, setPreloaderVisible] = useState(false);
  //  Стейт переключателя короткометражных фильмов
  const [isShortMovies, setIsShortMovies] = useState(false);

  //  Стейт всех фильмов полученных от стороннего api
  const [allMovies, setAllMovies] = useState([]);
  //  Стейт найденых по запросу всех фильмов полученных от стороннего api
  const [foundAllMovies, setFoundAllMovies] = useState([]);
  //  Стейт сохраненных пользователем фильмов
  const [savedMovies, setSavedMovies] = useState([]);
  //  Стейт найденых по запросу сохраненных пользователем фильмов
  const [foundSavedMovies, setFoundSavedMovies] = useState([]);


  const history = useHistory();

  //Проверка наличия токена в локальном хранилище
  const checkToken = () => {
    const jwt = mainApi.getToken();
    if (!jwt) {
      return;
    } else {
      // console.log(`Токен есть: ${jwt}`);
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

  //  Отправка и обработка запроса на авторизацию существующего пользователя
  const onLogin = (data) => {
    return mainApi.authorizeUser(data)
      .then((res) => {
        console.log(res);
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
      });
  }

  //  Отправка и обработка запроса на регистрацию пользователя
  const onRegistration = (data) => {
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
    console.log(foundMovies);
    // if (foundMovies.length === 0) {
    //   setListMessageDisplay('movies-card-list__message movies-card-list__message_display');
    // } else {
    //   setListMessageDisplay('movies-card-list__message');
    // }
    return foundMovies;
  }

  //  Обработчик сабмита формы поиска
  const handleMovieSearchFormSubmit = (searchQuery) => {
    if (!localStorage.getItem('movies')) {
      setPreloaderVisible(true);
      moviesApi.getMovies()
        .then((movies) => {
          localStorage.setItem('movies', JSON.stringify(movies));
          setAllMovies(movies);
          setFoundAllMovies(findMoviesByKeywords(movies, searchQuery));
        })
        .catch(console.log)
        .finally(() => {
          setPreloaderVisible(false);
        });
    } else {
      setAllMovies(JSON.parse(localStorage.movies));
      setFoundAllMovies(findMoviesByKeywords(JSON.parse(localStorage.movies), searchQuery));
    }
  }

  const getSavedMovies = () => {
    mainApi.getSavedMovies()
      .then((movies) => {
        setSavedMovies(movies);
      })
      .catch(err => { console.log(err.message) })
      .finally(() => { console.log('Финал') });
  }

  useEffect(() => {
    if (isLoggedIn) {
      getSavedMovies();
    }
  }, [isLoggedIn]);

  // Функция сортировки короткометражных фильмов
  const filterShortMovies = (movies) => {
    if (isShortMovies) {
      return movies.filter(movie => movie.duration <= SHORT_MOVIE_DURATION);
    } else {
      return movies.filter(movie => movie.duration > SHORT_MOVIE_DURATION)
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
              preloaderVisible={preloaderVisible}
              onSearch={handleMovieSearchFormSubmit}
              isShortMovies={isShortMovies}
              setIsShortMovies={setIsShortMovies}
              filterShortMovies={filterShortMovies}
              movies={foundAllMovies}
            />
          </ProtectedRoute>

          <ProtectedRoute path="/saved-movies" isLoggedIn={isLoggedIn} >
            <SavedMovies
              isLoggedIn={isLoggedIn}
              isShortMovies={isShortMovies}
              setIsShortMovies={setIsShortMovies}
              filterShortMovies={filterShortMovies}
              movies={savedMovies}
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
            <Login onLogin={onLogin} commonMistakeText={commonMistakeText} />
          </UserBlockedRoute>

          <UserBlockedRoute path="/signup" isLoggedIn={isLoggedIn}>
            <Register onRegistration={onRegistration} commonMistakeText={commonMistakeText} />
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
