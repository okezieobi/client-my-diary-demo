import { setupServer } from 'msw/node';
import { rest } from 'msw';

import testUtils from '../tests/utils';

const defaultHandlers = [
  rest.post('/api/v1/auth/signup', (req, res, { json, status, cookie }) => res(
    status(201),
    cookie('fakeToken', 'token123'),
    json({
      data: { ...testUtils.response.user.data },
    }),
  )),
  rest.get('/api/v1/entries', (req, res, { json, status }) => res(
    status(201),
    json({
      data: { ...testUtils.response.entry.data },

    }),
  )),
];

const errHandlers = {
  err400: [
    rest.post('/api/v1/auth/signup', (req, res, { json, status }) => res(
      status(400),
      json({
        error: { ...testUtils.response.user.err400.error },
      }),
    )),
    rest.post('/api/v1/entries', (req, res, { json, status }) => res(
      status(400),
      json({
        error: { ...testUtils.response.entry.err400.error },
      }),
    )),
  ],
  err40X: [
    rest.post('/api/v1/auth/signup', (req, res, { json, status }) => res(
      status(400),
      json({
        error: { ...testUtils.response.user.err40X.error },
      }),
    )),
    rest.post('/api/v1/entries', (req, res, { json, status }) => res(
      status(406),
      json({
        error: { ...testUtils.response.entry.err40X.error },
      }),
    )),
  ],
};

export default {
  server: setupServer(...defaultHandlers),
  errHandlers,
};
