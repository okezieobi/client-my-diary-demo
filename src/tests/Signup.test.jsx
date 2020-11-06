import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import utils from './utils';

describe('Signup page should render', () => {
  test('Renders signup page of app for large screens', () => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /Sign up/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test('navigates to dashboard when signup is successful', async () => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <App />
      </MemoryRouter>,
    );

    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(utils.response.success),
    }));

    await userEvent.type(screen.getByLabelText(/Full Name/i), utils.inputs.fullName);
    await userEvent.type(screen.getByLabelText(/Username/i), utils.inputs.username);
    await userEvent.type(screen.getByLabelText(/Email Address/i), utils.inputs.email);
    await userEvent.type(screen.getByLabelText(/Password/i), utils.inputs.password);
    await userEvent.click(screen.getByRole('button', { name: /Submit/ }));

    await wait(() => expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument());

    global.fetch.mockRestore();
  });
});
