import './App.css';
import { Main } from '../Main/Main';
import { Register } from '../Register/Register';
import { PageNotFound } from '../PageNotFound/PageNotFound';
import { Route, Switch } from 'react-router-dom';
import { Login } from '../Login/Login';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies';

//Временное переключение авторизации пользователя
const isLoginIn = true;

function App() {
  return (
    <div className="app">
      <Switch>
      <Route exact path="/">
        <Main isLoginIn={isLoginIn}/>
      </Route>
      <Route path="/movies">
        <Movies isLoginIn={isLoginIn} />
      </Route>
      <Route path="/saved-movies">
        <SavedMovies isLoginIn={isLoginIn}/>
      </Route>
      <Route path="/profile">
        <p>Cтраница с профилем пользователя</p>
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
  );
}

export default App;
