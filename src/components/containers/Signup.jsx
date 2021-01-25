/* eslint-disable no-console */
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import SignupLayout from '../layouts/Signup';
import authServices from '../../services/Auth';
import env from '../../utils/env';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [signupErr, setSignupErr] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [btnState, setBtnState] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/entries' } };
  const auth = authServices.useAuth();

  function handleFullNameChange(value) {
    setFullName(value);
  }

  function handleUsernameChange(value) {
    setUsername(value);
  }

  function handleEmailChange(value) {
    setEmail(value);
  }

  function handlePasswordChange(value) {
    setPassword(value);
  }

  function handleSubmit() {
    setBtnState(true);

    const inputData = {
      fullName,
      email,
      username,
      password,
    };

    const reqURL = env.backendAPI('auth/signup');
    auth.authenticate(reqURL, inputData)
      .then(({ error }) => {
        if (error) {
          if (error.messages) setSignupErr(error.messages[error.messages.length - 1].msg);
          else if (error.message) setSignupErr(error.message);
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
      <SignupLayout
        handleSubmit={handleSubmit}
        setFullName={handleFullNameChange}
        setEmail={handleEmailChange}
        setUsername={handleUsernameChange}
        setPassword={handlePasswordChange}
        formBtnState={btnState}
        signupErr={signupErr}
      />
    </>
  );
}
