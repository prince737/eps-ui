const axios = require("axios");

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const REGISTER_USER_BEGIN = 'REGISTER_USER_BEGIN'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE'

export function loginUser(id, password) {
  return dispatch => {
    dispatch(dispatchLoginSuccesss({id: id, pwd: password}));
  }
}

export const dispatchLoginSuccesss = user => ({
  type: LOGIN_SUCCESS,
  payload: user
})

export const dispatchRegisterUserBegin = () => ({
  type: REGISTER_USER_BEGIN
})

export const dispatchRegisterUserSuccess = (data) => ({
  type: REGISTER_USER_SUCCESS,
  payload: data
})

export const dispatchRegisterUserFailure = (data) => ({
  type: REGISTER_USER_FAILURE,
  payload: data
})


export function registerUser(data) {
  return async dispatch => {
    dispatch(dispatchRegisterUserBegin());
    let url = '/register'
    try{
      var res = await axios.post(url, data)
      dispatch(dispatchRegisterUserSuccess(res.data));
    }catch(err){
      console.log(err.response.data)
      dispatch(dispatchRegisterUserFailure(err.response.data));
    }
    
  }
}