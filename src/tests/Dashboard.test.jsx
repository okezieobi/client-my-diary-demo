import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import utils from './utils';
import App from '../App';

describe('Home dashboard page should render', () => {
  test('Renders home dashboard page of app for large screens', async () => {
    utils.renderWithRouter(<App />, { route: '/login' });

    await userEvent.type(screen.getByLabelText(/Email Address or Username/i), utils.data.users[0].email);
    await userEvent.type(screen.getByLabelText(/Password/i), utils.data.users[0].password);
    userEvent.click(screen.getByRole('button', { name: /Submit/ }));

    expect(await screen.findByRole('table')).toBeInTheDocument();
    //  expect(await screen.findByText(utils.data.entries[0].body), {}, { timeout: 5000 })
    // .toBeInTheDocument();
  });
});
