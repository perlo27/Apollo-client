import React from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { Login, SignUp } from "../Components/Auth";
import Home from "../Components/Home";
import ProtectedRoute from "./ProtectedRoute";

 const AppRouter = ({ name, auth, id, handleLogout, handleAuth }) => (
  <div className="container">
    <Router>
        <Switch>
          <ProtectedRoute
            path="/"
            exact
            component={() => <Home name={name} handleLogout={handleLogout} userId={id}/>}
            isAuthenticated={auth}
          />
          <Route
            path="/login"
            render={props => <Login handleAuth={handleAuth} {...props} />}
          />
          <Route
            path="/signup"
            render={props => <SignUp handleAuth={handleAuth} {...props} />}
          />
          <Redirect to="/login" />
        </Switch>
      </Router>
  </div>
);

AppRouter.propTypes = {
  name: PropTypes.string.isRequired,
  auth: PropTypes.bool.isRequired, 
  id: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleAuth: PropTypes.func.isRequired
};

export default AppRouter;