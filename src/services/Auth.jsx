/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, createContext, useState } from 'react';
import { Redirect, Route, BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const appAPI = {
  isAuthenticated: false,
  authenticate(reqURL, input, method = 'GET') {
    this.isAuthenticated = true;
    return fetch(reqURL, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      method,
      credentials: 'include',
      body: null || JSON.stringify(input),
    }).then((response) => response.json());
  },
};

const authContext = createContext();

function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(false);

  const signup = (reqURL, input) => appAPI.authenticate(reqURL, input, 'POST').then((response) => {
    setUser(true);
    return response;
  });

  const getResource = (reqURL) => appAPI.authenticate(reqURL).then((response) => {
    setUser(true);
    return response;
  });

  return {
    user,
    signup,
    getResource,
  };
}

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </authContext.Provider>
  );
}

ProvideAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) => (auth.user ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      ))}
    />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default {
  useAuth,
  useProvideAuth,
  authContext,
  ProvideAuth,
  PrivateRoute,
};
