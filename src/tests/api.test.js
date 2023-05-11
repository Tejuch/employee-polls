import { saveQuestion, _getUser, saveQuestionAnswer } from '../utils/api';

describe('_getUser', () => {
  it('will return user if id and password both are found', async () => {
    var userId = 'sarahedo';
    var password = 'password123';
    var result = await _getUser(userId, password);
    expect(result.id).toEqual(userId);
    expect(result.password).toEqual(password);
  });
});

describe('saveQuestion', () => {
  const author = 'Author';
  const optionOneText = 'Author1';
  const optionTwoText = 'Author2';

  it('will throw an error if the wrong input in provided.', async () => {
    try {
      await saveQuestion({ author });
    } catch (err) {
      expect(err).toEqual(
        'Please provide optionOneText, optionTwoText, and author'
      );
    }
  });

  it('will return question object', async () => {
    var result = await saveQuestion({ author, optionOneText, optionTwoText });
    expect(Object.keys(result)).toEqual([
      'id',
      'timestamp',
      'author',
      'optionOne',
      'optionTwo'
    ]);
    expect(result.author).toEqual('Author');
    expect(result.optionOne.text).toEqual('Author1');
    expect(result.optionTwo.text).toEqual('Author2');
  });
});

describe('saveQuestionAnswer', () => {
  it('will return true when correct data is passed', async () => {
    const data = {
      authedUser: 'sarahedo',
      qid: 'vthrdm985a262al8qx3do',
      answer: 'optionTwo'
    };
    const result = await saveQuestionAnswer(data);
    expect(result).toEqual(true);
  });

  it('will return error when incorrect data is passed', async () => {
    const data = {
      answer: ''
    };
    await expect(saveQuestionAnswer(data)).rejects.toEqual(
      'Please provide authedUser, qid, and answer'
    );
  });
});
