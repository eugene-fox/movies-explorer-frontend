import {
  Route,
  Redirect
} from 'react-router-dom';

export const UserBlockedRoute = ({ isLoggedIn, path, children }) => {
  return (
    <Route path={path} exact>
      {
        !isLoggedIn ? children : <Redirect to="/movies" />
      }
    </Route>
  )
}