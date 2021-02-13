import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import utils from './utils';
import App from '../App';

describe('Signup page should render', () => {
  test('Renders signup page of app for large screens', () => {
    utils.renderWithRouter(<App />, { route: '/signup' });

    expect(screen.getByRole('heading', { name: /Sign up/i })).toBeInTheDocument();
  });

  test('does not navigate to dashboard when signup is not successful if inputs is not valid',
    async () => {
      utils.renderWithRouter(<App />, { route: '/signup' });

      userEvent.click(screen.getByRole('button', { name: /Submit/ }));

      expect(await screen.findByText(utils.errors.user.fullName.msg))
        .toBeInTheDocument();

      await userEvent.type(screen.getByLabelText(/Full Name/i), utils.inputs.user.new.fullName);

      userEvent.click(screen.getByRole('button', { name: /Submit/ }));

      expect(await screen.findByText(utils.errors.user.username.msg))
        .toBeInTheDocument();

      await userEvent.type(screen.getByLabelText(/Username/i), utils.inputs.user.new.username);

      userEvent.click(screen.getByRole('button', { name: /Submit/ }));

      expect(await screen.findByText(utils.errors.user.email.msg))
        .toBeInTheDocument();

      await userEvent.type(screen.getByLabelText(/Email Address/i), utils.inputs.user.new.email);

      userEvent.click(screen.getByRole('button', { name: /Submit/ }));

      expect(await screen.findByText(utils.errors.user.password.msg))
        .toBeInTheDocument();
    });

  test('does not navigate to dashboard when signup is not successful if user already exists', async () => {
    utils.renderWithRouter(<App />, { route: '/signup' });

    await userEvent.type(screen.getByLabelText(/Full Name/i), utils.inputs.user.registered.fullName);
    await userEvent.type(screen.getByLabelText(/Username/i), utils.inputs.user.registered.username);
    await userEvent.type(screen.getByLabelText(/Email Address/i), utils.inputs.user.registered.email);
    await userEvent.type(screen.getByLabelText(/Password/i), utils.inputs.user.registered.password);
    userEvent.click(screen.getByRole('button', { name: /Submit/ }));

    expect(await screen.findByText(utils.response.user.err40X.error.message))
      .toBeInTheDocument();
  });

  test('navigates to dashboard when signup is successful', async () => {
    utils.renderWithRouter(<App />, { route: '/signup' });

    await userEvent.type(screen.getByLabelText(/Full Name/i), utils.inputs.user.new.fullName);
    await userEvent.type(screen.getByLabelText(/Username/i), utils.inputs.user.new.username);
    await userEvent.type(screen.getByLabelText(/Email Address/i), utils.inputs.user.new.email);
    await userEvent.type(screen.getByLabelText(/Password/i), utils.inputs.user.new.password);
    userEvent.click(screen.getByRole('button', { name: /Submit/ }));

    expect(await screen.findByRole('button', { name: /Home/i })).toBeInTheDocument();
  }, 10000);
});
