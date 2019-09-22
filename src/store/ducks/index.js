import { combineReducers } from 'redux';
import auth from './auth';
import navigate from './navigate';

const reducers = combineReducers({
  auth,
  navigate,
});

export default reducers;
