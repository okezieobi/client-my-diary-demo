import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Dashboard from '../templates/Dashboard';
import Form from '../templates/Form';
import authServices from '../../services/Auth';
import env from '../../utils/env';

export default function () {
  const [reqErr, setReqErr] = useState('');
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [btnState, setBtnState] = useState(false);

  const auth = authServices.useAuth();
  const history = useHistory();

  function handleTitleChange(value) {
    setTitle(value);
  }

  function handleBodyChange(value) {
    setBody(value);
  }

  function handleSubmit() {
    setBtnState(true);

    const inputData = {
      title, body,
    };

    const reqURL = env.backendAPI('entries');
    auth.setResource(reqURL, inputData)
      .then(({ error }) => {
        if (error) {
          if (error.messages) setReqErr(error.messages[error.messages.length - 1].msg);
          setBtnState(false);
        } else {
          history.push('/entries');
        }
      }).catch((err) => {
        setBtnState(false);
        throw err;
      });
  }

  return (
    <Dashboard homeSelect>
      <Form
        handleSubmit={handleSubmit}
        setTitle={handleTitleChange}
        setBody={handleBodyChange}
        reqErr={reqErr}
        formBtnState={btnState}
      />
    </Dashboard>
  );
}
