import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import LeaderBoard from '../components/Leaderboard';
import { store } from '../index';

describe('Leaderboard', () => {
  it('will create a snapshot', () => {
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <LeaderBoard />
        </Provider>
      </MemoryRouter>
    );
    expect(component).toMatchSnapshot();
  });
  it('should render specific text', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LeaderBoard />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Answered')).toBeInTheDocument();
    expect(screen.getByText('Created')).toBeInTheDocument();
  });
});
