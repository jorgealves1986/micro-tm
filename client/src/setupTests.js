import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('./actions/requests');

beforeEach(async () => {
  jest.clearAllMocks();
});
