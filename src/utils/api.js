import { _getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer, allUsers } from "./_DATA.js";

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

export function _getUser(userId, password) {

  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve(
          allUsers
            .filter((user) => user.id === userId && user.password === password)
            .pop()
        ),
      1000
    );
  });
}

export function saveQuestion (question) {
  return _saveQuestion(question)
}

export function saveQuestionAnswer(props) {
  return _saveQuestionAnswer(props);
}
