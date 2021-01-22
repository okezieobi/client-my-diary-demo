import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import utils from './utils';
import App from '../App';

describe('Home dashboard page should render', () => {
  test('Renders home dashboard page of app for large screens', async () => {
    utils.renderWithRouter(<App />, { route: '/home' });

    expect(screen.getByRole('button', { name: /Compose/i })).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Profile/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Signout/i })).toBeInTheDocument();
    expect(await screen.findByText(utils.response.entry.data.entries[0].title))
      .toBeInTheDocument();
    expect(await screen.findByText(utils.response.entry.data.entries[0].body))
      .toBeInTheDocument();
  });

  /*
  test('Navigates to profile page from home dashboard', async () => {
    utils.renderWithRouter(<App />, { route: '/home' });

    userEvent.click(screen.getByRole('button', { name: /Profile/ }));
    expect(await screen.findByRole('button', { name: /Compose/i })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /Number of entries/i })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /Set reminder/i })).toBeInTheDocument();
    expect(await screen.findByText('Off' || 'On')).toBeInTheDocument();
  });
  */
});
