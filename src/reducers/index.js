import { combineReducers } from 'redux';
import commonReducer from './commonReducers';

const reducers = {
  commonReducer: commonReducer
}

const rootReducer = combineReducers(reducers);

export default rootReducer;
