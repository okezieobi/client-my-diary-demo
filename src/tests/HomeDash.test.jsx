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
    expect(await screen.findByText(utils.response.entry.data.entries[0].title))
      .toBeInTheDocument();

    // userEvent.click(screen.getByRole('row', { name: /Submit/ }));
  });
});
