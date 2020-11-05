import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import App from '../App';
// import utils from './utils';

describe('Signup page should render', () => {
  test('Renders signup page of app for large screens', () => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /Sign up/i })).toBeInTheDocument();
  });

  /*
  test('navigates to dashboard when signup is successful', async () => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <App />
      </MemoryRouter>,
    );

    await userEvent.type(screen.queryAllByRole(/textbox/)[0], utils.inputs.fullName);
    await userEvent.type(screen.queryAllByRole(/textbox/)[1], utils.inputs.username);
    await userEvent.type(screen.queryAllByRole(/textbox/)[2], utils.inputs.email);
    await userEvent.type(screen.queryAllByRole('textbox')[3], utils.inputs.password);
    await userEvent.click(screen.queryByText(/Submit/));

    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(utils.response.success),
    }));

    expect(screen.findAllByText(/Entries/)[0]).toBeInTheDocument();

    global.fetch.mockRestore();
  });
  */
});
