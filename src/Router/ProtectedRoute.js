import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element, PropTypes.func
  ]).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default ProtectedRoute;
