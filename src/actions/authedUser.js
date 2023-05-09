export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const LOGOUT = 'LOGOUT';
export function setAuthedUser(user) {
  return {
    type: SET_AUTHED_USER,
    user
  };
}
