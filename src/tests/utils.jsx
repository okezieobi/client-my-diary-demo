import { render } from '@testing-library/react';

import authServices from '../components/Auth';

const inputs = {
  user: {
    fullName: 'Okezie',
    username: 'Obiedere',
    email: 'foobar@mail.com',
    password: 'sate234',
  },
  entry: {
    title: 'title',
    body: 'body',
  },
};

const errors = {
  user: {
    fullName: { msg: 'fake error fullName', param: 'fullName' },
    username: { msg: 'fake error username', param: 'username' },
    email: { msg: 'fake error email', param: 'email' },
    password: { msg: 'fake error password', param: 'password' },
    self: { msg: 'fake error user', param: 'user' },
    token: 'fake-token',
  },
  entry: {
    title: { msg: 'fake error title', param: 'title' },
    body: { msg: 'fake error body', param: 'body' },
  },
};

const data = {
  token: 'real-token',
  users: [
    {
      fullName: 'Frank',
      username: 'Eke',
      email: 'barfoo@mail.com',
      password: 'sate234',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  entries: [
    {
      id: '222', title: 'fake-title-1', body: 'fake-body-1', createdAt: new Date(), updatedAt: new Date(),
    },
    {
      id: '4444', title: 'fake-title-2', body: 'fake-body-2', createdAt: new Date(), updatedAt: new Date(),
    },
    {
      id: '6777', title: 'fake-title-3', body: 'fake-body-3', createdAt: new Date(), updatedAt: new Date(),
    },
  ],
};

function renderWithRouter(ui, { route = '/' } = {}) {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: authServices.ProvideAuth });
}

export default {
  inputs,
  errors,
  data,
  renderWithRouter,
  response: {
    user: {
      err400: {
        error: [],
      },
      err40X: {
        error: 'fakeErr-auth-2',
      },
      data: data.users,
    },
    entry: {
      err400: {
        error: [],
      },
      err40X: {
        error: 'fakeErr-40X-entries',
      },
      data: {
        entries: data.entries,
      },
    },
  },
};
