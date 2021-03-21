import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import utils from './utils';
import App from '../App';

describe('Home dashboard page should render', () => {
  test('Renders diary content for large screens', async () => {
    utils.renderWithRouter(<App />, { route: '/compose' });
    sessionStorage.setItem('authorization', JSON.stringify(utils.data.token));

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
    expect(await screen.findByText(utils.inputs.entry.title)).toBeInTheDocument();
    expect(screen.getByText(utils.inputs.entry.body)).toBeInTheDocument();
  }, 10000);

  test('Renders diary content for large screens and displays input error', async () => {
    utils.renderWithRouter(<App />, { route: '/compose' });
    sessionStorage.setItem('authorization', JSON.stringify(utils.data.token));

    userEvent.click(screen.getByRole('button', { name: /Submit/ }));

    expect(await screen.findByText(utils.errors.entry.title.msg))
      .toBeInTheDocument();
  }, 10000);
});
