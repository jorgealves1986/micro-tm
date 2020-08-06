import _ from 'lodash';
import {
  NEW_PROJECT,
  GET_PROJECTS,
  GET_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_PROJECTS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case NEW_PROJECT:
    case UPDATE_PROJECT:
    case GET_PROJECT:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_PROJECT:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
