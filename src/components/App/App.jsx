import './App.css';

import { useState } from 'react';

import { Main } from '../Main/Main';
import { Register } from '../Register/Register';
import { PageNotFound } from '../PageNotFound/PageNotFound';
import { Route, Switch } from 'react-router-dom';
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

  //Стейт данных текущего пользователя
  const [currentUser, setCurrentUser] = useState({});

  const [commonMistakeText, setCommonMistakeText] = useState('');

  const onRegistration = (data) => {
    console.log(data);
    return mainApi.registerUser(data)
      .then((res) => {
        setCommonMistakeText('');
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 409) {
          setCommonMistakeText('Пользователь с таким email уже существует.')
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
            <Login />
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
