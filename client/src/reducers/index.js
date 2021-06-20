import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import projectReducer from './projectReducer';
import taskReducer from './taskReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  projects: projectReducer,
  tasks: taskReducer
});
