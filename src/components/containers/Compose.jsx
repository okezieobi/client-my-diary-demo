import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Dashboard from '../templates/Dashboard';
import Form from '../templates/Form';
import authServices from '../Auth';
import env from '../../utils/env';

export default function Compose() {
  const [titleErr, setTitleErr] = useState('');
  const [errInTitle, setErrInTitle] = useState(false);
  const [errInBody, setErrInBody] = useState(false);
  const [bodyErr, setBodyErr] = useState('');
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [btnState, setBtnState] = useState(false);

  const auth = authServices.useAuth();
  const history = useHistory();

  function handleTitleChange(value) {
    setErrInTitle(false);
    setTitleErr('');
    setTitle(value);
  }

  function handleBodyChange(value) {
    setErrInBody(false);
    setBodyErr('');
    setBody(value);
  }

  function handleSubmit(event) {
    setBtnState(true);

    const inputData = {
      title, body,
    };

    const url = env.backendAPI('entries');
    auth.setResource(url, inputData, 'POST')
      .then((response) => {
        if (response) {
          if (response.error && response.error.messages) {
            const err = response.error.messages.find(({ param }) => param);
            if (err.param === 'title') {
              setErrInTitle(true);
              setTitleErr(err.msg);
            } else if (err.param === 'body') {
              setErrInBody(true);
              setBodyErr(err.msg);
            } setBtnState(false);
          } else {
            history.push('/entries');
          }
        }
      }).catch((err) => {
        setBtnState(false);
        throw err;
      });

    event.preventDefault();
  }

  return (
    <Dashboard homeSelect>
      <Form
        handleSubmit={handleSubmit}
        setTitle={handleTitleChange}
        setBody={handleBodyChange}
        titleErr={titleErr}
        bodyErr={bodyErr}
        formBtnState={btnState}
        errInTitle={errInTitle}
        errInBody={errInBody}
      />
    </Dashboard>
  );
}
