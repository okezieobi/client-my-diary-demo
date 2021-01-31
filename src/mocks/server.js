import { setupServer } from 'msw/node';
import { rest } from 'msw';

import testUtils from '../tests/utils';

const handlers = [
  rest.post('/api/v1/auth/signup', ({
    body: {
      username, fullName, email, password,
    },
  }, res, { json, status, cookie }) => {
    let response;
    if (!username || !fullName || !email || !password) {
      response = res(
        status(400),
        json({
          error: { ...testUtils.response.user.err400.error },
        }),
      );
    } else if (username === testUtils.inputs.error.user.username
      || email === testUtils.inputs.error.user.email) {
      response = res(
        status(406),
        json({
          error: { ...testUtils.response.user.err40X.error },
        }),
      );
    } else {
      response = res(
        status(201),
        cookie('fakeToken', 'token123'),
        json({
          data: { ...testUtils.response.user.data },
        }),
      );
    } return response;
  }),
  rest.post('/api/v1/auth/login', ({
    body: {
      user, password,
    },
  }, res, { json, status, cookie }) => {
    let response;
    if (!user || !password) {
      response = res(
        status(400),
        json({
          error: { ...testUtils.response.user.err400.error },
        }),
      );
    } else if (user !== testUtils.inputs.data.user.username
      && user !== testUtils.inputs.data.user.email) {
      response = res(
        status(406),
        json({
          error: { ...testUtils.response.user.err40X.error },
        }),
      );
    } else if (password !== testUtils.inputs.data.user.password) {
      response = res(
        status(401),
        json({
          error: { ...testUtils.response.user.err40X.error },
        }),
      );
    } else {
      response = res(
        status(200),
        cookie('fakeToken', 'token123'),
        json({
          data: { ...testUtils.response.user.data },
        }),
      );
    } return response;
  }),
  rest.get('/api/v1/entries',
    (req, res, { json }) => res(
      json({
        data: { ...testUtils.response.entry.data },
      }),
    )),
  rest.get('/api/v1/entries/:id',
    ({ params }, res, { json, status }) => {
      let response;
      const entry = testUtils.response.entry.data.entries.find(({ id }) => id === params.id);
      if (entry) {
        response = res(
          json({
            data: { entry },
          }),
        );
      } else {
        response = res(
          status(404),
          json({
            error: { ...testUtils.response.entry.err40X.error },
          }),
        );
      }
      return response;
    }),
  rest.post('/api/v1/entries',
    ({ body: { title, body } }, res, { json, status }) => {
      let response;
      if (!title || !body) {
        response = res(
          status(400),
          json({
            error: { ...testUtils.response.entry.err400.error },
          }),
        );
      } else {
        testUtils.response.entry.data.entries.push({
          title, body, createdAt: new Date(), updatedAt: new Date(),
        });
        response = res(
          json({
            status: 201,
            data: { ...testUtils.response.entry.data },
          }),
        );
      } return response;
    }),
];

export default setupServer(...handlers);
