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

  const { from } = location.state || { from: { pathname: '/home' } };
  const auth = authServices.useAuth();

  const handleFullNameChange = ({ target: { value } }) => {
    setFullName(value);
  };

  const handleUsernameChange = ({ target: { value } }) => {
    setUsername(value);
  };

  const handleEmailChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value);
  };

  const handleSubmit = () => {
    setBtnState(true);

    const inputData = {
      fullName,
      email,
      username,
      password,
    };

    const reqURL = env.backendAPI('auth/signup');
    auth.signup(reqURL, inputData)
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
  };

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
