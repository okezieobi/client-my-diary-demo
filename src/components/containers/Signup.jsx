import React from 'react';
import { useHistory } from 'react-router-dom';

import SignupLayout from '../layouts/Signup';

export default function () {
  const history = useHistory();

  const handleSubmit = () => {
    history.push('/home');
  };

  return (
    <>
      <SignupLayout
        handleSubmit={handleSubmit}
      />
    </>
  );
}
