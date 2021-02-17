import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import utils from './utils';
import App from '../App';

describe('Signin page should render', () => {
  test('Renders login page of app for large screens', () => {
    utils.renderWithRouter(<App />, { route: '/login' });

    expect(screen.getByRole('heading', { name: /Sign in/i })).toBeInTheDocument();
  });

  test('does not navigate to dashboard when login is not successful if input is not valid',
    async () => {
      utils.renderWithRouter(<App />, { route: '/login' });

      userEvent.click(screen.getByRole('button', { name: /Submit/ }));

      expect(await screen.findByText(utils.errors.user.self.msg))
        .toBeInTheDocument();

      await userEvent.type(screen.getByLabelText(/Email Address or Username/i), utils.data.users[0].email);

      userEvent.click(screen.getByRole('button', { name: /Submit/ }));

      expect(await screen.findByText(utils.errors.user.password.msg))
        .toBeInTheDocument();
    });

  test('does not navigate to dashboard when login is not successful if user is not signed up', async () => {
    utils.renderWithRouter(<App />, { route: '/login' });

    await userEvent.type(screen.getByLabelText(/Email Address or Username/i), utils.inputs.user.username);
    await userEvent.type(screen.getByLabelText(/Password/i), utils.data.users[0].password);
    userEvent.click(screen.getByRole('button', { name: /Submit/ }));

    expect(await screen.findByText(utils.response.user.err40X.error.message))
      .toBeInTheDocument();
  }, 10000);

  test('navigates to dashboard when login is successful', async () => {
    utils.renderWithRouter(<App />, { route: '/login' });

    await userEvent.type(screen.getByLabelText(/Email Address or Username/i), utils.data.users[0].email);
    await userEvent.type(screen.getByLabelText(/Password/i), utils.data.users[0].password);
    userEvent.click(screen.getByRole('button', { name: /Submit/ }));

    expect(await screen.findByRole('button', { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    // expect(screen.getByText(utils.data.entries[0].body))
    //  .toBeInTheDocument();
  }, 15000);
});
