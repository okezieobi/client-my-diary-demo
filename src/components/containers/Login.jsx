import React from 'react';
import { useHistory } from 'react-router-dom';

import LoginLayout from '../layouts/Login';

export default function () {
  const history = useHistory();

  const handleSubmit = () => {
    history.push('/home');
  };

  return (
    <>
      <LoginLayout
        handleSubmit={handleSubmit}
      />
    </>
  );
}
