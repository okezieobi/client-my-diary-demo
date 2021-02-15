import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import utils from './utils';
import App from '../App';

describe('Home dashboard page should render', () => {
  test('Renders diary content for large screens', async () => {
    utils.renderWithRouter(<App />, { route: '/login' });

    await userEvent.type(screen.getByLabelText(/Email Address or Username/i), utils.data.users[0].email);
    await userEvent.type(screen.getByLabelText(/Password/i), utils.data.users[0].password);
    userEvent.click(screen.getByRole('button', { name: /Submit/ }));

    const composeBtn = await screen.findByRole('button', { name: /Compose/ });
    expect(composeBtn).toBeInTheDocument();
    userEvent.click(composeBtn);

    const titleTxtBox = screen.getByLabelText(/Title/i);
    const bodyTxtBox = screen.getByLabelText(/Body/i);
    const composeFormBtn = screen.getByRole('button', { name: /Submit/ });
    expect(titleTxtBox).toBeInTheDocument();
    expect(bodyTxtBox).toBeInTheDocument();
    expect(composeFormBtn).toBeInTheDocument();

    await userEvent.type(titleTxtBox, utils.inputs.entry.title);
    await userEvent.type(bodyTxtBox, utils.inputs.entry.body);
    userEvent.click(composeFormBtn);

    expect(screen.getByRole('button', { name: /Home/ })).toBeInTheDocument();
  }, 10000);

  /*
  test('Renders diary content for large screens and displays input error', async () => {
    utils.renderWithRouter(<App />, { route: '/compose' });

    userEvent.click(screen.getByRole('button', { name: /Submit/ }));

    expect(await screen.findByText(utils.response.entry.err400.error.messages[0].msg))
      .toBeInTheDocument();
  });
  */
});
