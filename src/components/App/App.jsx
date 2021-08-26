import './App.css';
import { Main } from '../Main/Main';
import { Register } from '../Register/Register';
import { PageNotFound } from '../PageNotFound/PageNotFound';
import { Route, Switch } from 'react-router-dom';
import { Login } from '../Login/Login';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Profile } from '../Profile/Profile';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';

//Временное переключение авторизации пользователя
const isLoggedIn = false;

function App() {
  return (
    <div className="app">
      <Switch>

      <Route exact path="/">
        <Main isLoggedIn={isLoggedIn}/>
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
        <Register />
      </Route>

      <Route path="*">
        <PageNotFound />
      </Route>

      </Switch>
    </div>
  );
}

export default App;
