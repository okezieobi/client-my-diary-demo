import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import LoginLayout from '../views/Login';
import authServices from '../../services/Auth';
import env from '../../utils/env';

export default function () {
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

  function handleSubmit() {
    setBtnState(true);

    const inputData = {
      user,
      password,
    };

    const reqURL = env.backendAPI('auth/login');
    auth.authenticate(reqURL, inputData)
      .then(({ error }) => {
        if (error) {
          if (error.messages) {
            const err = error.messages.find(({ params }) => params);
            if (err.params === 'user') {
              setUserErr(err.msg);
              setErrInUser(true);
            } else if (err.params === 'password') {
              setPasswordErr(err.msg);
              setErrInPassword(true);
            }
          } else if (error.message) setLoginErr(error.message);
          setBtnState(false);
        } else {
          history.replace(from);
        }
      }).catch((err) => {
        setBtnState(false);
        throw err;
      });
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
