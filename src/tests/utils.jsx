import { render } from '@testing-library/react';

import authServices from '../services/Auth';

const inputs = {
  user: {
    new: {
      fullName: 'Okezie',
      username: 'Obiedere',
      email: 'foobar@mail.com',
      password: '456789Lovely',
    },
    registered: {
      fullName: 'Frank',
      username: 'Eke',
      email: 'barfoo@mail.com',
      password: '456789Lovely',
    },
  },
  entry: {
    title: 'title',
    body: 'body',
  },
};

const errors = {
  user: {
    fullName: { msg: 'fake error fullName', params: 'fullName' },
    username: { msg: 'fake error username', params: 'username' },
    email: { msg: 'fake error email', params: 'email' },
    password: { msg: 'fake error password', params: 'password' },
    self: { msg: 'fake error user', params: 'user' },
    token: 'fake-token',
  },
  entry: {
    title: { msg: 'fake error title', params: 'title' },
    body: { msg: 'fake error body', params: 'body' },
  },
};

const data = {
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
};

export default {
  inputs,
  errors,
  data,
  response: {
    user: {
      err400: {
        error: {
          messages: [],
        },
      },
      err40X: {
        error: {
          message: 'fakeErr-auth-2',
        },
      },
      data: { users: [{ ...inputs.user.registered }] },
    },
    entry: {
      err400: {
        error: {
          messages: [],
        },
      },
      err40X: {
        error: {
          message: 'fakeErr-40X-entries',
        },
      },
      data: {
        entries: data.entries,
      },
    },
  },
  renderWithRouter(ui, { route = '/' } = {}) {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: authServices.ProvideAuth });
  },
};
