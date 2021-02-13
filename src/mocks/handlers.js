import { rest } from 'msw';

import testUtils from '../tests/utils';

export default [
  rest.post('/api/v1/auth/signup', ({ body }, res, { json, status, cookie }) => {
    let response;
    if (!body.fullName) {
      testUtils.response.user.err400.error.messages.splice(0, 1, testUtils.errors.user.fullName);
      response = res(
        status(400),
        json({
          error: { ...testUtils.response.user.err400.error },
        }),
      );
    } else if (!body.username) {
      testUtils.response.user.err400.error.messages.splice(0, 1, testUtils.errors.user.username);
      response = res(
        status(400),
        json({
          error: { ...testUtils.response.user.err400.error },
        }),
      );
    } else if (!body.email) {
      testUtils.response.user.err400.error.messages.splice(0, 1, testUtils.errors.user.email);
      response = res(
        status(400),
        json({
          error: { ...testUtils.response.user.err400.error },
        }),
      );
    } else if (!body.password) {
      testUtils.response.user.err400.error.messages.splice(0, 1, testUtils.errors.user.password);
      response = res(
        status(400),
        json({
          error: { ...testUtils.response.user.err400.error },
        }),
      );
    } else {
      const userExists = testUtils.response.user.data
        .some(({ email, username }) => username === body.username || email === body.email);
      if (userExists) {
        response = res(
          status(406),
          json({
            error: { ...testUtils.response.user.err40X.error },
          }),
        );
      } else {
        testUtils.response.user.data.push({ ...body });
        response = res(
          status(201),
          cookie('fakeToken', testUtils.data.token),
          json({
            data: {},
          }),
        );
      }
    } return response;
  }),
  rest.post('/api/v1/auth/login', ({ body }, res, { json, status, cookie }) => {
    let response;
    if (!body.user) {
      testUtils.response.user.err400.error.messages.splice(0, 1, testUtils.errors.user.self);
      response = res(
        status(400),
        json({
          error: { ...testUtils.response.user.err400.error },
        }),
      );
    } else if (!body.password) {
      testUtils.response.user.err400.error.messages.splice(0, 1, testUtils.errors.user.password);
      response = res(
        status(400),
        json({
          error: { ...testUtils.response.user.err400.error },
        }),
      );
    } else {
      const userExists = testUtils.response.user.data
        .find(({ username, email }) => body.user === username || body.user === email);
      if (!userExists) {
        response = res(
          status(406),
          json({
            error: { ...testUtils.response.user.err40X.error },
          }),
        );
      } else if (body.password !== userExists.password) {
        response = res(
          status(401),
          json({
            error: { ...testUtils.response.user.err40X.error },
          }),
        );
      } else {
        response = res(
          status(200),
          cookie('fakeToken', testUtils.data.token),
          json({
            data: {},
          }),
        );
      }
    } return response;
  }),
  rest.post('/api/v1/auth/logout', (req, res, { json, status, cookie }) => res(
    status(200),
    cookie('fake-token', null),
    json({
      data: {},
    }),
  )),
  rest.get('/api/v1/entries',
    ({ cookies: { fakeToken } }, res, { json, status }) => {
      let response;
      if (!fakeToken || fakeToken !== testUtils.data.token) {
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
  rest.get('/api/v1/entries/:id',
    ({ cookies: { fakeToken }, params }, res, { json, status }) => {
      let response;
      if (!fakeToken || fakeToken !== testUtils.data.token) {
        response = res(
          status(401),
          json({
            error: { ...testUtils.response.entry.err40X.error },
          }),
        );
      } else {
        const entry = testUtils.response.entry.data.entries.find(({ id }) => id === params.id);
        if (entry) {
          response = res(
            json({
              data: { entry },
            }),
          );
        } else {
          response = res(
            status(401),
            json({
              error: { ...testUtils.response.entry.err40X.error },
            }),
          );
        }
      } return response;
    }),
  rest.put('/api/v1/entries/:id',
    ({ cookies: { fakeToken }, params, body: { title, body } }, res, { json, status }) => {
      let response;
      if (!fakeToken || fakeToken !== testUtils.data.token) {
        response = res(
          status(401),
          json({
            error: { ...testUtils.response.entry.err40X.error },
          }),
        );
      } else {
        const entry = testUtils.response.entry.data.entries.find(({ id }) => id === params.id);
        if (entry) {
          const updatedEntry = {
            id: '8989',
            title: title || entry.title,
            body: body || entry.body,
            createdOn: new Date(),
            updatedAt: new Date(),
          };
          const entryIndex = testUtils.response.entry.data.entries.indexOf(entry);
          testUtils.response.entry.data.entries.splice(entryIndex, 1, updatedEntry);
          response = res(
            json({
              data: { ...testUtils.response.entry.data.entries },
            }),
          );
        } else {
          response = res(
            status(401),
            json({
              error: { ...testUtils.response.entry.err40X.error },
            }),
          );
        }
      } return response;
    }),
  rest.post('/api/v1/entries',
    ({ cookies: { fakeToken }, body: { title, body } }, res, { json, status }) => {
      let response;
      if (!title) {
        testUtils.response.entry.err400.error.messages.splice(0, 1, testUtils.errors.entry.title);
        response = res(
          status(400),
          json({
            error: { ...testUtils.response.entry.err400.error },
          }),
        );
      } else if (!body) {
        testUtils.response.entry.err400.error.messages.splice(0, 1, testUtils.errors.entry.body);
        response = res(
          status(400),
          json({
            error: { ...testUtils.response.entry.err400.error },
          }),
        );
      } else if (!fakeToken || fakeToken !== testUtils.data.token) {
        response = res(
          status(401),
          json({
            error: { ...testUtils.response.entry.err40X.error },
          }),
        );
      } else {
        const entry = {
          id: testUtils.response.entry.data.entries.length + 1000,
          title,
          body,
          createdOn: new Date(),
          updatedAt: new Date(),
        };
        testUtils.response.entry.data.entries.push(entry);
        response = res(
          status(201),
          json({
            data: { entry },
          }),
        );
      } return response;
    }),
];
