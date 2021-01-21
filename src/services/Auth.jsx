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

  const authenticate = (reqURL, input) => fetch(reqURL, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(input),
  }).then((response) => response.json());

  const getResource = (reqURL) => fetch(reqURL, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    credentials: 'include',
  }).then((response) => {
    if (response.status === 200) return response.json();
    return setUser(false);
  });

  return {
    user,
    authenticate,
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
