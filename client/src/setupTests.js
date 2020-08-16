import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('./actions/requests');

beforeEach(async () => {
  jest.clearAllMocks();
});

export const wait = (wrapped, callback, timeout = 10) => {
  return new Promise((resolve, reject) => {
    if (callback(wrapped)) {
      return resolve(true);
    }
    setTimeout(() => {
      wrapped.update();
      return callback(wrapped)
        ? resolve(true)
        : reject(new Error('Timeout expired'));
    }, timeout);
  });
};
