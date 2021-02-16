import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import LoginLayout from '../views/Login';
import authServices from '../Auth';
import env from '../../utils/env';

export default function Login() {
  const [loginErr, setLoginErr] = useState('');
  const [user, setUser] = useState('');
  const [userErr, setUserErr] = useState('');
  const [errInUser, setErrInUser] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [errInPassword, setErrInPassword] = useState(false);
  const [btnState, setBtnState] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/entries' } };
  const auth = authServices.useAuth();

  function handleUserChange(value) {
    setUserErr('');
    setErrInUser(false);
    setUser(value);
  }

  function handlePasswordChange(value) {
    setPasswordErr('');
    setErrInPassword(false);
    setPassword(value);
  }

  function handleSubmit(event) {
    setBtnState(true);

    const inputData = {
      user,
      password,
    };

    const url = env.backendAPI('auth/login');
    auth.authenticate(url, inputData)
      .then((response) => {
        if (response) {
          if (response.error) {
            if (response.error.messages) {
              const err = response.error.messages.find(({ param }) => param);
              if (err.param === 'user') {
                setUserErr(err.msg);
                setErrInUser(true);
              } else if (err.param === 'password') {
                setPasswordErr(err.msg);
                setErrInPassword(true);
              }
            } else if (response.error.message) setLoginErr(response.error.message);
            setBtnState(false);
          }
        } else {
          history.replace(from);
        }
      }).catch((err) => {
        setBtnState(false);
        throw err;
      });

    event.preventDefault();
  }

  return (
    <>
      <LoginLayout
        handleSubmit={handleSubmit}
        formBtnState={btnState}
        loginErr={loginErr}
        setUser={handleUserChange}
        setPassword={handlePasswordChange}
        errInUser={errInUser}
        userErr={userErr}
        passwordErr={passwordErr}
        errInPassword={errInPassword}
      />
    </>
  );
}
