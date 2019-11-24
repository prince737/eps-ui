import {
  LOGIN_SUCCESS,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE
} from '../actions/commonActions'

const initialState = {
    isLoggedIn: false, 
    registerInProgress: false,
    phoneInUse: false,
    emailInUse: false,
    imageUploadFailure: false,
    showRegisterFailureModal: false,
    showRegisterSuccessModal: false,
    user: {}
};

export default function commonReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER_BEGIN:
      return{
        ...state,
        registerInProgress: true
      }
    case REGISTER_USER_SUCCESS:
      return{
        ...state,
        registerInProgress: false,
        user: action.payload,
        showRegisterSuccessModal: true
      }
    case REGISTER_USER_FAILURE:
      let err = action.payload
      for(let i=0; i<err.reason.length; i++){
        if(err.reason[i].code === 'EMAIL_IN_USE')
          state.emailInUse = true
        else if(err.reason[i].code === 'MOBILE_NUMBER_IN_USE')
          state.phoneInUse = true
        else if(err.reason[i].code === 'USER_IMAGE_FODLER')
          state.imageUploadFailure = true
        else
          state.showRegisterFailureModal = true
      }
      return{
        ...state,
        registerInProgress: false
      }
    case LOGIN_SUCCESS:
      return {
          ...state,
          isLoggedIn: true
      };
    default:
      return state
  }
}