import './App.css';

import { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { Main } from '../Main/Main';
import { Register } from '../Register/Register';
import { PageNotFound } from '../PageNotFound/PageNotFound';
import { Login } from '../Login/Login';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Profile } from '../Profile/Profile';

import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {

  // Хук состояния, залогинен ли пользователь
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Тестовый хук для всех фильмов
  const [allMovies, setAllMovies] = useState([]);

  //Стейт данных текущего пользователя
  const [currentUser, setCurrentUser] = useState({});



  const history = useHistory();

  //Проверка наличия токена в локальном хранилище
  const tokenCheck = () => {
    const jwt = mainApi.getToken();
    if (!jwt) {
      return;
    } else {
      // console.log(`Токен есть: ${jwt}`);
      mainApi.getUserInfo()
        .then(res => {
          if (res) {
            setIsLoggedIn(true);
          };
        })
        .catch(err => { console.log(err.message) });
    }
  }

  //Проверка наличия токена в локальном хранилище при монтировании элемента
  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      mainApi.getUserInfo()
        .then(data => {
          setCurrentUser(data);
        })
        .catch(err => { console.log(err.message) });
    }
  }, [history, isLoggedIn])

  //Обработчик регистрации нового пользователя
  const onRegister = (data) => {
    return mainApi.register(data)
      .then(() => {
        console.log('Вы успешно зарегистрированы');
        history.push('/signin')
      })
      .catch(console.log);
  }

  //Обработчик авторизации существующего пользователя
  const onLogin = (data) => {
    return mainApi.authorize(data)
      .then((res) => {
        setIsLoggedIn(true);
        mainApi.getUserInfo()
        .then(res => {
          setCurrentUser(res);
        })
        .catch(err => { console.log(err.message) });
        console.log(currentUser);

        localStorage.setItem('jwt', res.token);
        history.push('/movies');
      })
  }

  //Обработчик изменения данных авторизованного пользователя
  const handleUpdateUser = (userData) => {
    return mainApi.updateUserProfile(userData)
    .then((res) => {
      setCurrentUser(res)
    })
    .catch(err => { console.log(err.message) });
  }

  //Обработчик выхода пользователя
  const onLogout = () => {
    localStorage.removeItem('jwt');
    setCurrentUser({});
    setIsLoggedIn(false);
    history.push('/')
  }

  const moviesSearchHandler = (evt) => {
    evt.preventDefault();
    moviesApi.getMovies()
      .then((movies) => localStorage.setItem('movies', JSON.stringify(movies)));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Main isLoggedIn={isLoggedIn} />
          </Route>
          <ProtectedRoute
            path="/movies"
            isLoggedIn={isLoggedIn}
          >
            <Movies
              isLoggedIn={isLoggedIn}
              moviesSearchHandler={moviesSearchHandler}
              allMovies={allMovies}
            />
          </ProtectedRoute>
          <ProtectedRoute
            path="/saved-movies"
            isLoggedIn={isLoggedIn}
          >
            <SavedMovies isLoggedIn={isLoggedIn} />
          </ProtectedRoute>
          <ProtectedRoute
            path="/profile"
            isLoggedIn={isLoggedIn}
          >
            <Profile
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              onUpdateUser={handleUpdateUser}
              onLogout={onLogout}
            />
          </ProtectedRoute>
          <Route path="/signin">
            <Login
              onLogin={onLogin}
            />
          </Route>
          <Route path="/signup">
            <Register
              onRegister={onRegister}
            />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
