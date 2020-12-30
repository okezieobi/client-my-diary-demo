import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import App from '../App';

const inputs = {
  fullName: 'Frank Okezie',
  username: 'Obiedere',
  email: 'foobar@mail.com',
  password: '456789Lovely',
};

const inputErr = {
  fullName: 'fake fullName',
  username: 'fake username',
  email: 'fake@mail.com',
  password: 'fake-password',
  token: 'fake-token',
};

const handlers = [
  rest.post('http://localhost:5000/api/v1/auth/signup', ({
    username, fullName, email, password,
  }, res, { json }) => {
    if (!username || !fullName || !email || !password) {
      return res(
        json({
          error: {
            messages: [{ msg: 'fakeErr' }],
          },
        }),
      );
    } if (username === inputErr.username || email === inputErr.email) {
      return res(
        json({
          error: {
            message: 'fakeErr',
          },
        }),
      );
    }
    res.cookie('token', 'fake-token', { httpOnly: true });
    return res(
      json({
        username, fullName, email, password,
      }),
    );
  }),
  /*
  rest.get('http://localhost:5000/api/v1/entries', ({ cookies: { token } }, res, { json }) => {
    if (!token) {
      return res(
        json({
          error: {
            messages: [{ msg: 'fakeErr' }],
          },
        }),
      );
    } if (token === inputErr.token) {
      return res(
        json({
          error: {
            message: 'fakeErr',
          },
        }),
      );
    }
    res.cookie('token', 'fake-token', { httpOnly: true });
    return res(
      json({
        data: {
          entries: [
            {
              title: 'fake', body: 'fake', createdAt: new Date(), updatedAt: new Date(),
            },
          ],
        },
      }),
    );
  }),
  */
];

export default {
  inputs,
  inputErr,
  server: setupServer(...handlers),
  renderWithRouter(route = '/') {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>,
    );
  },
};
