import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import utils from './utils';
import App from '../App';

describe('Home dashboard page should render', () => {
  test('Renders home dashboard page of app for large screens', async () => {
    utils.renderWithRouter(<App />, { route: '/login' });

    await userEvent.type(screen.getByLabelText(/Email Address or Username/i), utils.inputs.user.registered.email);
    await userEvent.type(screen.getByLabelText(/Password/i), utils.inputs.user.registered.password);
    userEvent.click(screen.getByRole('button', { name: /Submit/ }));

    expect(await screen.findByRole('table')).toBeInTheDocument();
  });
});
