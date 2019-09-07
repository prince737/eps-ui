export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export const dispatchLoginSuccesss = user => ({
  type: LOGIN_SUCCESS,
  payload: user
})


export function loginUser(id, password) {
  return dispatch => {
    dispatch(dispatchLoginSuccesss({id: id, pwd: password}));
  }
}