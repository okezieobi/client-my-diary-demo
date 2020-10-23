import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import App from '../App';

describe('Signin page should render', () => {
  test('Renders signin page of app for large screens', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/signin']}>
        <App />
      </MemoryRouter>,
    );

    expect(getByText(/Sign in/)).toBeInTheDocument();
  });
});
