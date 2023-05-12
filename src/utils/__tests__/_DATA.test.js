import { _saveQuestion, _saveQuestionAnswer } from '../_DATA';

describe('Save question', () => {
  it('should return a question if successful', async () => {
    const question = {
      optionOneText: 'One',
      optionTwoText: 'Two',
      author: 'Random author'
    };
    const result = await _saveQuestion(question);
    expect(result.optionOne).toBeDefined();
    expect(result.optionTwo).toBeDefined();
    expect(result.author).toBeDefined();
  });

  it('should return an error if unsuccessful', async () => {
    const invalidQuestion = {
      optionOneText: '',
      optionTwoText: '',
      author: ''
    };
    await expect(_saveQuestion(invalidQuestion)).rejects.toEqual(
      'Please provide optionOneText, optionTwoText, and author'
    );
  });

  it('should return an error if one field missing', async () => {
    const invalidQuestion = {
      optionTwoText: '',
      author: ''
    };
    await expect(_saveQuestion(invalidQuestion)).rejects.toEqual(
      'Please provide optionOneText, optionTwoText, and author'
    );
  });
});

describe('save Question Answer', () => {
  it('should return an answer if successful', async () => {
    const answer = {
      authedUser: 'sarahedo',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionOne'
    };
    const result = await _saveQuestionAnswer(answer);
    expect(result).toBeTruthy();
  });

  it('should return an error if unsuccessful', async () => {
    const invalidAnswer = {
      authedUser: '',
      qid: '',
      answer: ''
    };
    await expect(_saveQuestionAnswer(invalidAnswer)).rejects.toEqual(
      'Please provide authedUser, qid, and answer'
    );
  });

  it('should return an error if one field missing', async () => {
    const invalidAnswer = {
      authedUser: '',
      qid: ''
    };
    await expect(_saveQuestionAnswer(invalidAnswer)).rejects.toEqual(
      'Please provide authedUser, qid, and answer'
    );
  });
});
