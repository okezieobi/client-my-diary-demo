/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, createContext, useState } from 'react';
import { Redirect, Route, BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const authContext = createContext();

function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(true);

  const authenticate = (url, input) => fetch(url, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(input),
  }).then((response) => {
    if (response.status === 200 || response.status === 201) return setUser(true);
    setUser(false);
    return response.json();
  });

  const setResource = (url, input = {}, method = 'POST') => fetch(url, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    method,
    credentials: 'include',
    body: JSON.stringify(input),
  }).then((response) => {
    if (response.status === 401) return setUser(false);
    setUser(true);
    return response.json();
  });

  const getResource = (url) => fetch(url, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    credentials: 'include',
  }).then((response) => {
    if (response.status === 401) return setUser(false);
    setUser(true);
    return response.json();
  });

  const logout = (url) => fetch(url, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    method: 'POST',
    credentials: 'include',
  }).then(() => setUser(false));

  return {
    user,
    authenticate,
    getResource,
    setResource,
    logout,
  };
}

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      <BrowserRouter>{children}</BrowserRouter>
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
  ProvideAuth,
  PrivateRoute,
};
