import reduxThunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { forceLogout, signup } from '../index';
import { AUTH_USER } from '../types';

const middleware = [reduxThunk];
const mockStore = configureMockStore(middleware);

describe('test sync actions', () => {
  it('has correct type and payload on force logout', () => {
    const action = forceLogout();

    expect(action.type).toEqual(AUTH_USER);
    expect(action.payload).toEqual(false);
  });
});

describe('test async actions', () => {
  it('signs up successfully', () => {
    const expectedActions = [
      {
        type: AUTH_USER,
        payload: true
      }
    ];

    const store = mockStore({});

    return store
      .dispatch(signup({ email: 'test@test.com', password: 1234 }))
      .then(() => {
        const actualAction = store.getActions();

        expect(actualAction[0].type).toEqual(expectedActions[0].type);
        expect(actualAction[0].payload).toEqual(expectedActions[0].payload);
      });
  });
});
