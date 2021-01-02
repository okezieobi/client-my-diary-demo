/* eslint-disable no-console */
import React, { useState, useCallback } from 'react';
import { Redirect } from 'react-router-dom';

import SignupLayout from '../layouts/Signup';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [signupErr, setSignupErr] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [btnState, setBtnState] = useState(false);
  const [isAuth, setAuth] = useState(false);

  const handleFullNameChange = useCallback(({ target: { value } }) => {
    setFullName(value);
  }, []);

  const handleUsernameChange = useCallback(({ target: { value } }) => {
    setUsername(value);
  }, []);

  const handleEmailChange = useCallback(({ target: { value } }) => {
    setEmail(value);
  }, []);

  const handlePasswordChange = useCallback(({ target: { value } }) => {
    setPassword(value);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!btnState) {
      setBtnState(true);
    }
    const inputData = {
      fullName,
      email,
      username,
      password,
    };
    const reqURL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api/v1/auth/signup' : 'https://diary-app-demo.herokuapp.com/api/v1/auth/signup';
    fetch(reqURL, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(inputData),
    }).then((response) => response.json())
      .then(({ error }) => {
        if (error) {
          if (error.messages) setSignupErr(error.messages[error.messages.length - 1].msg);
          else if (error.message) setSignupErr(error.message);
          setBtnState(false);
        } else {
          setAuth(true);
        }
      }).catch((err) => {
        setBtnState(false);
        throw err;
      });
  }, [btnState, email, fullName, password, username]);

  if (isAuth) return <Redirect to="/home" push />;
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
