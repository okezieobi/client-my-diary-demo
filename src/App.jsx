/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/views/Home';
import Signup from './components/containers/Signup';
import Login from './components/containers/Login';
import HomeDash from './components/containers/Dashboard';
import ContentDash from './components/containers/Content';
import ComposeForm from './components/containers/Compose';
import EditForm from './components/containers/Edit';
import Profile from './components/containers/Profile';

import authServices from './components/Auth';

export default function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <authServices.PrivateRoute path="/profile">
        <Profile />
      </authServices.PrivateRoute>
      <authServices.PrivateRoute path="/edit">
        <EditForm />
      </authServices.PrivateRoute>
      <authServices.PrivateRoute path="/compose">
        <ComposeForm />
      </authServices.PrivateRoute>
      <authServices.PrivateRoute path="/entry">
        <ContentDash />
      </authServices.PrivateRoute>
      <authServices.PrivateRoute path="/entries">
        <HomeDash />
      </authServices.PrivateRoute>
    </Switch>
  );
}
