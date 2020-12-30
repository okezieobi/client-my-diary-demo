// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

import utils from './tests/utils';

beforeAll(() => {
  // Enable the mocking in tests.
  utils.server.listen();
  // document.cookie = 'token=token';
});

afterEach(() => {
  // Reset any runtime handlers tests may use.
  utils.server.resetHandlers();
});

afterAll(() => {
  // Clean up once the tests are done.
  utils.server.close();
});
