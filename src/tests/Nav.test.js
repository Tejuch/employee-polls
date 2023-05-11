import React from 'react';
import { Provider } from 'react-redux';
import {
  screen,
  render,
  fireEvent,
  getByAltText,
  getByRole
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import Nav from '../components/Nav';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('NewQuestion', () => {
  let mockedStore;

  beforeEach(() => {
    mockedStore = mockStore({
      users: {
        testuser: {
          id: 'testuser',
          password: 'abc345',
          name: 'Test user',
          avatarURL: 'https://i.pravatar.cc/150?img=3',
          answers: {},
          questions: []
        }
      },
      authedUser: 'testuser'
    });
  });

  it('should render specific text', () => {
    render(
      <MemoryRouter>
        <Provider store={mockedStore}>
          <Nav />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.findAllByText('Home')).toBeTruthy();
    expect(screen.findAllByText('Employee Polls')).toBeTruthy();
    expect(screen.findAllByText('Leaderboard')).toBeTruthy();
    expect(screen.findAllByText('Add')).toBeTruthy();
  });

  it('uses correct image src', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Provider store={mockedStore}>
          <Nav />
        </Provider>
      </MemoryRouter>
    );

    const avatar = getByTestId('avatar');
    expect(avatar.src !== '').toBeTruthy();
  });
});
