import React, { useEffect, useState } from 'react';

import Content from '../views/Content';
import authServices from '../Auth';
import env from '../../utils/env';

export default function () {
  const [reqErr, setReqErr] = useState('');
  const [entry, setEntry] = useState({
    title: '', body: '', createdOn: '', updatedAt: '',
  });
  const entryId = JSON.parse(localStorage.getItem('entryId'));
  const auth = authServices.useAuth();

  const reqURL = env.backendAPI(`entries/${entryId}`);

  useEffect(() => {
    auth.getResource(reqURL)
      .then((response) => {
        if (response) {
          if (response.error && response.error.message) setReqErr(response.error.message);
          else setEntry(response.data.entry);
        }
      }).catch((err) => { throw err; });
  }, [auth, reqURL]);

  return (
    <>
      <Content
        title={entry.title}
        body={entry.body}
        createdOn={entry.createdOn}
        updatedAt={entry.updatedAt}
        reqErr={reqErr}
      />
    </>
  );
}
