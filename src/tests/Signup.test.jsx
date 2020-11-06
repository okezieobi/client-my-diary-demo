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
  });

  test('navigates to dashboard when signup is successful', async () => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <App />
      </MemoryRouter>,
    );

    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(utils.successResponse),
    }));

    await userEvent.type(screen.getByLabelText(/Full Name/i), utils.inputs.fullName);
    await userEvent.type(screen.getByLabelText(/Username/i), utils.inputs.username);
    await userEvent.type(screen.getByLabelText(/Email Address/i), utils.inputs.email);
    await userEvent.type(screen.getByLabelText(/Password/i), utils.inputs.password);
    await userEvent.click(screen.getByRole('button', { name: /Submit/ }));

    await wait(() => expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument());

    global.fetch.mockRestore();
  });

  test('does not navigate to dashboard when signup is not successful if input is not valid', async () => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <App />
      </MemoryRouter>,
    );

    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(utils.ErrRes400),
    }));

    await userEvent.click(screen.getByRole('button', { name: /Submit/ }));

    await wait(() => expect(screen.getByRole('heading', { name: /Sign up/i })).toBeInTheDocument());

    global.fetch.mockRestore();
  });

  test('does not navigate to dashboard when signup is not successful', async () => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <App />
      </MemoryRouter>,
    );

    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(utils.errRes),
    }));

    await userEvent.type(screen.getByLabelText(/Full Name/i), utils.inputs.fullName);
    await userEvent.type(screen.getByLabelText(/Username/i), utils.inputs.username);
    await userEvent.type(screen.getByLabelText(/Email Address/i), 'test-404@email.com');
    await userEvent.type(screen.getByLabelText(/Password/i), utils.inputs.password);
    await userEvent.click(screen.getByRole('button', { name: /Submit/ }));

    await wait(() => expect(screen.getByRole('heading', { name: /Sign up/i })).toBeInTheDocument());

    global.fetch.mockRestore();
  });
});
