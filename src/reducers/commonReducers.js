import {
  LOGIN_SUCCESS
} from '../actions/commonActions'

const initialState = {
    isLoggedIn: false
};

export default function commonReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
          ...state,
          isLoggedIn: true
      };
    default:
      return state
  }
}