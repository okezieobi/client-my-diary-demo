import { rest } from 'msw';

import testUtils from '../tests/utils';

export default [
  rest.post('/api/v1/auth/signup', ({
    body: {
      username, fullName, email, password,
    },
  }, res, { json, status, cookie }) => {
    if (!username || !fullName || !email || !password) {
      return res(
        status(400),
        json({
          error: {
            messages: [{ msg: 'fakeErr-signup-1' }],
          },
        }),
      );
    } if (username === testUtils.inputErr.username || email === testUtils.inputErr.email) {
      return res(
        status(406),
        json({
          error: {
            message: 'fakeErr-signup-2',
          },
        }),
      );
    }
    return res(
      status(201),
      cookie('fakeToken', 'token123'),
      json({
        data: { user: 'user details' },
      }),
    );
  }),
  rest.get('/api/v1/entries',
    ({ cookies: { fakeToken } }, res, { json, status }) => {
      if (!fakeToken) {
        return res(
          status(400),
          json({
            error: {
              messages: [{ msg: 'fakeErr-token400-get-entries' }],
            },
          }),
        );
      } if (fakeToken === testUtils.inputErr.token) {
        return res(
          status(401),
          json({
            error: {
              message: 'fakeErr-token401-get-entries',
            },
          }),
        );
      }
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
];
