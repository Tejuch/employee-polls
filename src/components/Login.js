import React, { useState } from 'react';
import { _getUser } from '../utils/api';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = ({ users, dispatch }) => {
  const [selectedUser, setSelectedUser] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const handleSubmit = (e) => {
    e.preventDefault();
    const getUser = async () => {
      _getUser(selectedUser).then((user) => {
        if (user) {
          dispatch(setAuthedUser(user));
        }
      });
    };
    getUser();
    if (path === '/') {
      navigate('/home');
    }
  };

  return (
    <div className='form-container'>
      <form>
        <h1>Login</h1>
        <label>Select a user:</label>
        <div>
          {users.map((user) => {
            const { id, avatarURL, name } = user;

            return (
              <div key={id}>
                <img src={avatarURL} alt={name} />
                <label>{name}</label>
                <input
                  type='radio'
                  name='user'
                  value={user.id}
                  onChange={(e) => setSelectedUser(e.target.value)}
                />
              </div>
            );
          })}
        </div>
        <button className='user-button' type='submit' onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  return {
    users: Object.keys(users).map((id) => users[id])
  };
};

export default connect(mapStateToProps)(Login);
