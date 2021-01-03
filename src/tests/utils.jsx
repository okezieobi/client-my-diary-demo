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
  response: {
    user: {
      err400: {
        error: {
          messages: [{ msg: 'fakeErr-signup-1' }],
        },
      },
      err40X: {
        error: {
          message: 'fakeErr-signup-2',
        },
      },
      data: { user: 'user details' },
    },
    entry: {
      err400: {
        error: {
          messages: [{ msg: 'fakeErr-token400-get-entries' }],
        },
      },
      err40X: {
        error: {
          message: 'fakeErr-token401-get-entries',
        },
      },
      data: {
        entries: [
          {
            title: 'fake', body: 'fake', createdAt: new Date(), updatedAt: new Date(),
          },
        ],
      },
    },
  },
  renderWithRouter(route = '/') {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>,
    );
  },
};
