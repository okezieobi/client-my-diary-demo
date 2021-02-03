/* eslint-disable no-console */
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import SignupLayout from '../views/Signup';
import authServices from '../../services/Auth';
import env from '../../utils/env';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [fullNameErr, setFullNameErr] = useState('');
  const [errInFullName, setErrInFullName] = useState(false);
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [errInEmail, setErrInEmail] = useState(false);
  const [signupErr, setSignupErr] = useState('');
  const [username, setUsername] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [errInUsername, setErrInUsername] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [errInPassword, setErrInPassword] = useState(false);
  const [btnState, setBtnState] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/entries' } };
  const auth = authServices.useAuth();

  function handleFullNameChange(value) {
    setFullNameErr('');
    setErrInFullName(false);
    setFullName(value);
  }

  function handleUsernameChange(value) {
    setUsernameErr('');
    setErrInUsername(false);
    setUsername(value);
  }

  function handleEmailChange(value) {
    setEmailErr('');
    setErrInEmail(false);
    setEmail(value);
  }

  function handlePasswordChange(value) {
    setPasswordErr('');
    setErrInPassword(false);
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
          if (error.messages) {
            const err = error.messages.find(({ params }) => params);
            if (err.params === 'fullName') {
              setErrInFullName(true);
              setFullNameErr(err.msg);
            } else if (err.params === 'username') {
              setErrInUsername(true);
              setUsernameErr(err.msg);
            } else if (err.params === 'email') {
              setErrInEmail(true);
              setEmailErr(err.msg);
            } else if (err.params === 'password') {
              setErrInPassword(true);
              setPasswordErr(err.msg);
            }
          } else if (error.message) setSignupErr(error.message);
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
        errInFullName={errInFullName}
        fullNameErr={fullNameErr}
        errInUsername={errInUsername}
        usernameErr={usernameErr}
        errInEmail={errInEmail}
        emailErr={emailErr}
        errInPassword={errInPassword}
        passwordErr={passwordErr}
      />
    </>
  );
}
