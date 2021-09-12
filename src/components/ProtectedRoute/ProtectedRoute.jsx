import {
  Route,
  Redirect
} from 'react-router-dom';

//HOC (higher-order component) компонент более высокого порядка

export const ProtectedRoute = ({ isLoggedIn, path, children }) => {
  return (
    <Route path={path} exact>
      {
        isLoggedIn ? children : <Redirect to="/" />
      }
    </Route>
  )
}