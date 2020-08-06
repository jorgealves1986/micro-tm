import projectReducer from '../projectReducer';
import { NEW_PROJECT } from '../../actions/types';

it('handles actions of type NEW_PROJECT', () => {
  const project = {
    id: 1,
    name: 'Proj 1',
    userId: 1
  };

  const action = {
    type: NEW_PROJECT,
    payload: project
  };

  const newState = projectReducer({}, action);

  expect(newState[1].name).toEqual(project.name);
});

it('handles action with unknown type', () => {
  const newState = projectReducer({}, {});

  expect(newState).toEqual({});
});
