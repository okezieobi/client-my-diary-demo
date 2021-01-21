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

  it('navigates to dashboard when login is successful', async () => {
    utils.renderWithRouter(<App />, { route: '/login' });

    await userEvent.type(screen.getByLabelText(/Email Address or Username/i), utils.inputs.email);
    await userEvent.type(screen.getByLabelText(/Password/i), utils.inputs.password);
    userEvent.click(screen.getByRole('button', { name: /Submit/ }));

    expect(await screen.findByRole('button', { name: /Search/i })).toBeInTheDocument();
  }, 10000);
});
