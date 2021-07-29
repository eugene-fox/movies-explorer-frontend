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
      <Route path="*">
        <PageNotFound />
      </Route>
      </Switch>
    </div>
  );
}

export default App;
