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

  const authenticate = async (url, input) => {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      method: 'POST',
      body: JSON.stringify(input),
    });
    if (response.ok) {
      const { data: { token } } = await response.json();
      sessionStorage.setItem('authorization', JSON.stringify(token));
      return setUser(true);
    }
    setUser(false);
    return response.json();
  };

  const setResource = async (url, input = {}, method = 'POST') => {
    const authorization = sessionStorage.getItem('authorization');
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: JSON.parse(authorization),
      },
      method,
      body: JSON.stringify(input),
    });
    if (response.status === 401) return setUser(false);
    setUser(true);
    return response.json();
  };

  const getResource = async (url) => {
    const authorization = JSON.parse(sessionStorage.getItem('authorization'));
    const response = await fetch(url, {
      headers: {
        authorization,
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
    if (response.status === 401) return setUser(false);
    setUser(true);
    return response.json();
  };

  const logout = async () => {
    sessionStorage.removeItem('authorization');
    return setUser(false);
  };

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
