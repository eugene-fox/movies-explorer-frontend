import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({path, isLoggedIn, children}) => {
  return (
    <Route path={path} exact>
      {
        isLoggedIn ? children : <Redirect to="/" />
      }
    </Route>
  );
};