import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Dashboard from '../templates/Dashboard';
import Form from '../templates/Form';
import env from '../../utils/env';
import authServices from '../../services/Auth';

export default function Edit() {
  const [reqErr, setReqErr] = useState('');
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [btnState, setBtnState] = useState(false);
  const [entry, setEntry] = useState({
    title: '', body: '',
  });
  const entryId = JSON.parse(localStorage.getItem('entryId'));
  const auth = authServices.useAuth();
  const history = useHistory();
  const reqURL = env.backendAPI(`entries/${entryId}`);

  function handleTitleChange(value) {
    setTitle(value);
  }

  function handleBodyChange(value) {
    setBody(value);
  }

  useEffect(() => {
    auth.getResource(reqURL)
      .then((response) => {
        if (response) {
          if (response.error && response.error.message) setReqErr(response.error.message);
          else setEntry(response.data.entry);
        }
      }).catch((err) => { throw err; });
  }, [auth, reqURL]);

  function handleSubmit() {
    setBtnState(true);

    const inputData = {
      title, body,
    };

    auth.setResource(reqURL, inputData, 'PUT')
      .then(() => {
        history.push('/entries');
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
        title={entry.title}
        body={entry.body}
      />
    </Dashboard>
  );
}
