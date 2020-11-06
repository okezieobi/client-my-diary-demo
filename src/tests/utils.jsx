export default {
  inputs: {
    fullName: 'Frank Okezie',
    username: 'Obiedere',
    email: 'foobar@mail.com',
    password: '456789Lovely',
  },
  errRes: {
    error: {
      message: 'fakeErr',
    },
  },
  ErrRes400: {
    error: {
      messages: [{ msg: 'fakeErr' }],
    },
  },
  successResponse: {
    data: {
      token: 'fakeToken',
    },
  },
};
