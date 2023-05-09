import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';

function getDate(timestamp) {
  const date = new Date(timestamp);
  const time = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  return (
    '' +
    time +
    ' | ' +
    date.getDate() +
    '/' +
    date.getMonth() +
    '/' +
    date.getFullYear()
  );
}

const QuestionCard = ({ questions, users, id }) => {
  const navigate = useNavigate();

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Paper elevation={12} align='center' style={{ padding: 6 }}>
        <Typography variant='h6' align='center'>
          {questions[id].author}
        </Typography>
        <Typography variant='body2' align='center' sx={{ fontStyle: 'italic' }}>
          {getDate(questions[id].timestamp)}
        </Typography>
        <Button
          variant='outlined'
          size='small'
          fullWidth
          onClick={(e) => navigate(`/questions/${id}`)}
        >
          Show
        </Button>
      </Paper>
    </Grid>
  );
};
const mapStateToProps = ({ questions, users }, { id }) => ({
  questions,
  users,
  id
});

export default connect(mapStateToProps)(QuestionCard);
