import './App.css';

import { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

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

  const history = useHistory();

  //Проверка наличия токена в локальном хранилище
  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      console.log('JWT токен отсуствует');
      return;
    }
    setIsLoggedIn(true);
    history.push('/');
  }

  //Проверка наличия токена в локальном хранилище при монтировании элемента
  useEffect(() => {
    tokenCheck();
  }, []);

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
        localStorage.setItem('jwt', res.token);
        history.push('/movies');
      })
  }

  //Обработчик выхода пользователя
  const onLogout = () => {
    localStorage.removeItem('jwt');
    setCurrentUser({});
    setIsLoggedIn(false);
    history.push('/signin')
  }



  //Стейт данных текущего пользователя
  const [currentUser, setCurrentUser] = useState({});

  const filmSearchButtonHandler = (evt) => {
    evt.preventDefault();
    moviesApi.getMovies()
      .then((movies) => localStorage.setItem('movies', JSON.stringify(movies)));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Main isLoginIn={isLoggedIn} />
          </Route>
          <Route path="/movies">
            <Movies
              isLoginIn={isLoggedIn}
              filmSearchButtonHandler={filmSearchButtonHandler}
            />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies isLoginIn={isLoggedIn} />
          </Route>
          <Route path="/profile">
            <Profile isLoginIn={isLoggedIn} />
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/signup">
            <Register />
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
