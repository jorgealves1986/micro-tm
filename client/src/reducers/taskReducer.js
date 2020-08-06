import _ from 'lodash';
import {
  NEW_TASK,
  GET_TASKS,
  GET_TASK,
  UPDATE_TASK,
  DELETE_TASK
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_TASKS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case NEW_TASK:
    case UPDATE_TASK:
    case GET_TASK:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_TASK:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
