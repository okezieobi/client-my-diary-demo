import { render } from '@testing-library/react';

import authServices from '../services/Auth';

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
          messages: [{ msg: 'fakeErr-auth-1' }, { location: 'token', msg: 'token-err-1' }],
        },
      },
      err40X: {
        error: {
          message: 'fakeErr-auth-2',
        },
      },
      data: { user: 'user details' },
    },
    entry: {
      err400: {
        error: {
          messages: [{ msg: 'fakeErr-token400-entries' }],
        },
      },
      err40X: {
        error: {
          message: 'fakeErr-token401-entries',
        },
      },
      data: {
        entries: [
          {
            title: 'fake-title-1', body: 'fake-body-1', createdAt: new Date(), updatedAt: new Date(),
          },
          {
            title: 'fake-title-2', body: 'fake-body-2', createdAt: new Date(), updatedAt: new Date(),
          },
          {
            title: 'fake-title-3', body: 'fake-body-3', createdAt: new Date(), updatedAt: new Date(),
          },
        ],
      },
    },
  },
  renderWithRouter(ui, { route = '/' } = {}) {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: authServices.ProvideAuth });
  },
};
