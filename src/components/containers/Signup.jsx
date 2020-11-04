/* eslint-disable no-console */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import SignupLayout from '../layouts/Signup';

export default function () {
  const [fname, setFname] = useState('');
  const [email, setEmail] = useState('');
  const [signupErr, setSignupErr] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [btnState, setBtnState] = useState(false);

  const history = useHistory();

  const handleSubmit = () => {
    if (!btnState) {
      setBtnState(true);
    }
    const inputData = {
      fullName: fname,
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
      body: JSON.stringify(inputData),
    }).then((response) => response.json())
      .then(({ error, token }) => {
        if (error) {
          if (error.messages) setSignupErr(error.messages[error.messages.length - 1].msg);
          else if (error.message) setSignupErr(error.message);
          setBtnState(false);
        } else {
          localStorage.setItem('token', token);
          history.push('/home');
        }
      }).catch((err) => {
        console.log(err);
        setBtnState(false);
      });
  };

  return (
    <>
      <SignupLayout
        handleSubmit={handleSubmit}
        setFname={setFname}
        setEmail={setEmail}
        setUsername={setUsername}
        setPassword={setPassword}
        formBtnState={btnState}
        signupErr={signupErr}
      />
    </>
  );
}
