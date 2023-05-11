import React from 'react';
import { Provider } from 'react-redux';
import { screen, render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import NewQuestion from '../components/NewQuestion';
import reducer from '../reducers';
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
          <NewQuestion />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText('Would You Rather')).toBeInTheDocument();
    expect(screen.getByText('Create Your Own Poll')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });
});
