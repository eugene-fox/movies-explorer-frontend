import './App.css';
import { Main } from '../Main/Main';
import { PageNotFound } from '../PageNotFound/PageNotFound'
import { Route, Switch } from 'react-router-dom';


function App() {
  return (
    <div className="app">
      <Switch>
      <Route exact path="/">
        <Main />
      </Route>
      <Route path="/movies">
        <p>Фильмы</p>
      </Route>
      <Route path="/saved-movies">
        <p>Сохранённые фильмы</p>
      </Route>
      <Route path="/profile">
        <p>Cтраница с профилем пользователя</p>
      </Route>
      <Route path="/signin">
        <p>Авторизация</p>
      </Route>
      <Route path="/signup">
        <p>Регистрация</p>
      </Route>
      <Route path="*">
        <PageNotFound />
      </Route>
      </Switch>
    </div>
  );
}

export default App;
