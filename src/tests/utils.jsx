import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import App from '../App';

export default {
  inputs: {
    fullName: 'Frank Okezie',
    username: 'Obiedere',
    email: 'foobar@mail.com',
    password: '456789Lovely',
  },
  errRes: {
    error: {
      message: 'fakeErr',
    },
  },
  errRes400: {
    error: {
      messages: [{ msg: 'fakeErr' }],
    },
  },
  successResponse: {
    data: {
      token: 'fakeToken',
    },
  },
  renderWithRouter: (route = '/') => render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  ),
};
