import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import utils from './utils';
import App from '../App';

describe('Home dashboard page should render', () => {
  test('Renders diary content for large screens', () => {
    utils.renderWithRouter(<App />, { route: '/compose' });

    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Back/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Compose/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Profile/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Signout/i })).toBeInTheDocument();
  });

  /*
  test('Renders diary content for large screens and displays input error', async () => {
    utils.renderWithRouter(<App />, { route: '/compose' });

    userEvent.click(screen.getByRole('button', { name: /Submit/ }));

    expect(await screen.findByText(utils.response.entry.err400.error.messages[0].msg))
      .toBeInTheDocument();
  });

  test('Renders diary content for large screens and displays input error', async () => {
    utils.renderWithRouter(<App />, { route: '/compose' });
    await userEvent.type(screen.getByLabelText(/Title/i), utils.inputs.data.entry.title);
    await userEvent.type(screen.getByLabelText(/Body/i), utils.inputs.data.entry.body);
    userEvent.click(screen.getByRole('button', { name: /Submit/ }));

    expect(await screen.findByText(utils.inputs.data.entry.title))
      .toBeInTheDocument();
  });
  */
});
