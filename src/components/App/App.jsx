import './App.css';

import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Main } from '../Main/Main';
import { Register } from '../Register/Register';
import { PageNotFound } from '../PageNotFound/PageNotFound';
import { Login } from '../Login/Login';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Profile } from '../Profile/Profile';

import moviesApi from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

//Временное переключение авторизации пользователя
const isLoginIn = true;

function App() {

  //Стейт данных текущего пользователя
  const [currentUser, setCurrentUser] = useState({});

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Main isLoginIn={isLoginIn} />
          </Route>
          <Route path="/movies">
            <Movies isLoginIn={isLoginIn} />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies isLoginIn={isLoginIn} />
          </Route>
          <Route path="/profile">
            <Profile isLoginIn={isLoginIn} />
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
