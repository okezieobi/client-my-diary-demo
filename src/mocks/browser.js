import { setupWorker, rest } from 'msw';

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
    } else if (username === testUtils.inputErr.username || email === testUtils.inputErr.email) {
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
    } else if (user !== testUtils.inputs.username && user !== testUtils.inputs.email) {
      response = res(
        status(406),
        json({
          error: { ...testUtils.response.user.err40X.error },
        }),
      );
    } else if (password !== testUtils.inputs.password) {
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
    ({ cookies: { fakeToken } }, res, { json, status }) => {
      let response;
      if (!fakeToken || fakeToken === testUtils.inputErr.token) {
        response = res(
          status(401),
          json({
            error: { ...testUtils.response.entry.err40X.error },
          }),
        );
      } else {
        response = res(
          json({
            data: { ...testUtils.response.entry.data },
          }),
        );
      } return response;
    }),
  rest.post('/api/v1/entries',
    ({ cookies: { fakeToken }, body: { title, body } }, res, { json, status }) => {
      let response;
      if (!title || !body) {
        response = res(
          status(400),
          json({
            error: { ...testUtils.response.entry.err400.error },
          }),
        );
      } else if (!fakeToken || fakeToken === testUtils.inputErr.token) {
        response = res(
          status(401),
          json({
            error: { ...testUtils.response.entry.err40X.error },
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

export default setupWorker(...handlers);
