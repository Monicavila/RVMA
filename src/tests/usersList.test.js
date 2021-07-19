import { shallow, mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import UsersList from '../components/usersList/usersList';

describe("UsersList", () => {
  it("renders correctly", () => {
    shallow(<UsersList />);
  });
 });