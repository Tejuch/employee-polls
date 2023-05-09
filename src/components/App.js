import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Home from './Home';
import Nav from './Nav';
import Login from './Login';
import LoadingBar from 'react-redux-loading-bar';
import NewQuestion from './NewQuestion';
import ShowQuestion from './ShowQuestion';
import NotFound from './NotFound';
import LeaderBoard from './LeaderBoard';
import '../App.css';

const App = ({ dispatch, authedUser, loading }) => {
  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <div>
      {authedUser === null ? (
        <Login />
      ) : (
        <div>
          <LoadingBar />
          <Nav />
          {loading === true ? null : (
            <Routes>
              <Route path='/questions/:id' element={<ShowQuestion />} />
              <Route path='/home' element={<Home />} />
              <Route path='/add' element={<NewQuestion />} />
              <Route path='/leaderboard' element={<LeaderBoard />} />
              <Route path='/404' element={<NotFound />} />
            </Routes>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser
  };
};

export default connect(mapStateToProps)(App);
