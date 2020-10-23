import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import App from '../App';

describe('Home dashboard page should render', () => {
  test('Renders diary content for large screens', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/home/entry/compose']}>
        <App />
      </MemoryRouter>,
    );

    expect(getByText(/Submit/)).toBeInTheDocument();
  });
});
