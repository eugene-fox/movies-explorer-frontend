import './App.css';
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { Footer } from '../Footer/Footer';
import { PageNotFound } from '../PageNotFound/PageNotFound'
import { Route } from 'react-router-dom';


function App() {
  return (
    <div className="app">
      <Route exact path="/">
        <Header />
        <Main />
        <Footer />
      </Route>
      <Route path="*">
        <PageNotFound />
      </Route>
    </div>
  );
}

export default App;
