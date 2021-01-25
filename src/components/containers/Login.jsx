import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import LoginLayout from '../views/Login';
import authServices from '../../services/Auth';
import env from '../../utils/env';

export default function () {
  const [loginErr, setLoginErr] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [btnState, setBtnState] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/entries' } };
  const auth = authServices.useAuth();

  function handleUserChange(value) {
    setUser(value);
  }

  function handlePasswordChange(value) {
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
          if (error.messages) setLoginErr(error.messages[error.messages.length - 1].msg);
          else if (error.message) setLoginErr(error.message);
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
      />
    </>
  );
}
