import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import App from '../App';

describe('Home dashboard page should render', () => {
  test('Renders home dashboard page of app for large screens', () => {
    const { getAllByText } = render(
      <MemoryRouter initialEntries={['/home']}>
        <App />
      </MemoryRouter>,
    );

    expect(getAllByText(/Entries/)[0]).toBeInTheDocument();
  });
});
