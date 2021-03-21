import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import utils from './utils';
import App from '../App';

describe('Home dashboard page should render', () => {
  test('Renders home dashboard page of app for large screens', async () => {
    utils.renderWithRouter(<App />, { route: '/entries' });
    sessionStorage.setItem('authorization', JSON.stringify(utils.data.token));

    expect(await screen.findByRole('table')).toBeInTheDocument();
    expect(await screen.findByText(utils.data.entries[0].body))
      .toBeInTheDocument();
    expect(screen.getByText(utils.data.entries[0].title)).toBeInTheDocument();
  });

  /*
  test('Renders home dashboard page of app then navigates to profile', async () => {
    utils.renderWithRouter(<App />, { route: '/entries' });
    sessionStorage.setItem('authorization', JSON.stringify(utils.data.token));

    const profileFormBtn = screen.getByRole('button', { name: /Profile/i });
    expect(profileFormBtn).toBeInTheDocument();
    userEvent.click(profileFormBtn);
    expect(await screen.findByText('heading', { name: /Number of entries/i })).toBeInTheDocument();
  }, 10000);
  */
});
