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
  inputErr: {
    fullName: 'fake fullName',
    username: 'fake username',
    email: 'fake@mail.com',
    password: 'fake-password',
    token: 'fake-token',
  },
  renderWithRouter(route = '/') {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>,
    );
  },
};
