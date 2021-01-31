import { render } from '@testing-library/react';

import authServices from '../services/Auth';

export default {
  inputs: {
    data: {
      user: {
        fullName: 'Frank Okezie',
        username: 'Obiedere',
        email: 'foobar@mail.com',
        password: '456789Lovely',
      },
      entry: {
        title: 'fake-entry-title-1',
        body: 'fake-entry-body-1',
      },
    },
    error: {
      user: {
        fullName: 'fake fullName',
        username: 'fake username',
        email: 'fake@mail.com',
        password: 'fake-password',
        token: 'fake-token',
      },
    },
  },
  response: {
    user: {
      err400: {
        error: {
          messages: [{ msg: 'fakeErr-auth-1' }],
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
          messages: [{ msg: 'fakeErr-400-entries' }],
        },
      },
      err40X: {
        error: {
          message: 'fakeErr-40X-entries',
        },
      },
      data: {
        entries: [
          {
            id: '222', title: 'fake-title-1', body: 'fake-body-1', createdOn: new Date(), updatedAt: new Date(),
          },
          {
            id: '4444', title: 'fake-title-2', body: 'fake-body-2', createdOn: new Date(), updatedAt: new Date(),
          },
          {
            id: '6777', title: 'fake-title-3', body: 'fake-body-3', createdOn: new Date(), updatedAt: new Date(),
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
