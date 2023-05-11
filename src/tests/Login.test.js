import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import Login from '../components/Login';
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

  it('should login with correct credentials', () => {
    const component = render(
      <MemoryRouter>
        <Provider store={mockedStore}>
          <Login />
        </Provider>
      </MemoryRouter>
    );
    const loginButton = component.getByTestId('login-btn');
    fireEvent.click(loginButton);
    const loginError = component.getByTestId('login-error');
    expect(loginError).toBeInTheDocument();
  });
});
