import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import utils from './utils';

describe('Signup page should render', () => {
  it('Renders signup page of app for large screens', () => {
    utils.renderWithRouter('/signup');

    expect(screen.getByRole('heading', { name: /Sign up/i })).toBeInTheDocument();
  });

  it('navigates to dashboard when signup is successful', async () => {
    utils.renderWithRouter('/signup');

    await userEvent.type(screen.getByLabelText(/Full Name/i), utils.inputs.fullName);
    await userEvent.type(screen.getByLabelText(/Username/i), utils.inputs.username);
    await userEvent.type(screen.getByLabelText(/Email Address/i), utils.inputs.email);
    await userEvent.type(screen.getByLabelText(/Password/i), utils.inputs.password);
    userEvent.click(screen.getByRole('button', { name: /Submit/ }));

    expect(await screen.findByRole('button', { name: /Search/i })).toBeInTheDocument();
  });

  /*
  test('does not navigate to dashboard when signup is not successful', async () => {
    utils.renderWithRouter('/signup');

    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(utils.errRes),
    }));

    await userEvent.type(screen.getByLabelText(/Full Name/i), utils.inputs.fullName);
    await userEvent.type(screen.getByLabelText(/Username/i), utils.inputs.username);
    await userEvent.type(screen.getByLabelText(/Email Address/i), 'test-404@email.com');
    await userEvent.type(screen.getByLabelText(/Password/i), utils.inputs.password);
    await userEvent.click(screen.getByRole('button', { name: /Submit/ }));

    await wait(() => expect(screen.getByText(utils.errRes.error.message)).toBeInTheDocument());

    global.fetch.mockRestore();
  });

  test('does not navigate to dashboard when signup is not successful if input is not valid', async () => {
    utils.renderWithRouter('/signup');

    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(utils.errRes400),
    }));

    await userEvent.click(screen.getByRole('button', { name: /Submit/ }));

    await wait(() => expect(screen.getByText(utils.errRes400.error.messages[0].msg))
      .toBeInTheDocument());

    global.fetch.mockRestore();
  });
  */
});
