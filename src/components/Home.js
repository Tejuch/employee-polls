import { connect } from 'react-redux';
import {
  Grid,
  Container,
  Switch,
  FormControlLabel,
  FormGroup
} from '@mui/material/';
import QuestionCard from './QuestionCard';
import { useState } from 'react';

function Home({ questionIds, authedUser, questions }) {
  const authedID = authedUser.id;
  const [unanswered, setUnanswered] = useState(true);
  const [toggleLabel, setToggleLabel] = useState('Show answered');
  const filteredQuestions = questionIds.filter(
    (id) =>
      !(
        questions[id].optionOne.votes.includes(authedID) ||
        questions[id].optionTwo.votes.includes(authedID)
      )
  );
  const unansweredQuestions = filteredQuestions.sort(
    (a, b) => questions[b].timestmap - questions[a].timestamp
  );
  const answeredQuestions = questionIds
    .filter((id) => !unansweredQuestions.includes(id))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  const handleToggle = () => {
    if (unanswered === true) {
      setUnanswered(false);
      setToggleLabel('Show unanswered');
    } else {
      setUnanswered(true);
      setToggleLabel('Show answered');
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <FormGroup>
        <FormControlLabel
          control={<Switch onClick={handleToggle} />}
          label={toggleLabel}
        />
      </FormGroup>
      {unanswered === true ? (
        <div>
          <h3>Unanswered</h3>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            {unansweredQuestions.map((id) => (
              <QuestionCard id={id} key={id} />
            ))}
          </Grid>
        </div>
      ) : (
        <div>
          <h3>Answered</h3>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            {answeredQuestions.map((id) => (
              <QuestionCard id={id} key={id} />
            ))}
          </Grid>
        </div>
      )}
    </Container>
  );
}

const mapStateToProps = ({ questions, authedUser }) => ({
  questionIds: Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  ),
  authedUser,
  questions
});

export default connect(mapStateToProps)(Home);
