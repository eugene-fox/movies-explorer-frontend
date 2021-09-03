import './App.css';

import { useState } from 'react';

import { Main } from '../Main/Main';
import { Register } from '../Register/Register';
import { PageNotFound } from '../PageNotFound/PageNotFound';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Login } from '../Login/Login';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Profile } from '../Profile/Profile';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';

import { CurrentUserContext } from '../../contexts/currentUser/CurrentUserContext';

import { mainApi } from '../../utils/MainApi';

//Временное переключение авторизации пользователя
const isLoggedIn = false;

function App() {

  const history = useHistory();

  //Стейт данных текущего пользователя
  const [currentUser, setCurrentUser] = useState({});
  //Стейт состоянии авторизации пользователя
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Стейт сообщения об ошибки при регистрации / авторизации
  const [commonMistakeText, setCommonMistakeText] = useState('');

  //  Отправка и обработка запроса на авторизацию существующего пользователя
  const onLogin = (data) => {
    return mainApi.authorizeUser(data)
      .then(() => {
        setIsLoggedIn(true);
        setCommonMistakeText('');
        history.push('/');
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

  return (
    <div className="app">

      <CurrentUserContext.Provider value={currentUser}>

        <Switch>

          <Route exact path="/">
            <Main isLoggedIn={isLoggedIn} />
          </Route>

          <ProtectedRoute path="/movies" isLoggedIn={isLoggedIn}>
            <Movies isLoggedIn={isLoggedIn} />
          </ProtectedRoute>

          <ProtectedRoute path="/saved-movies" isLoggedIn={isLoggedIn} >
            <SavedMovies isLoggedIn={isLoggedIn} />
          </ProtectedRoute>

          <ProtectedRoute path="/profile" isLoggedIn={isLoggedIn} >
            <Profile isLoggedIn={isLoggedIn} />
          </ProtectedRoute>

          <Route path="/signin">
            <Login onLogin={onLogin} commonMistakeText={commonMistakeText} />
          </Route>

          <Route path="/signup">
            <Register onRegistration={onRegistration} commonMistakeText={commonMistakeText} />
          </Route>

          <Route path="*">
            <PageNotFound />
          </Route>

        </Switch>

      </CurrentUserContext.Provider>

    </div>
  );
}

export default App;
