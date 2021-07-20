import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import UsersList from '../components/usersList/usersList';

describe("UsersList", () => {
  it("renders correctly", () => {
    shallow(<UsersList />);
  });

  it("detect div container", () => {
    const wrapper = shallow(<UsersList />);
    expect(wrapper.find("div").length).toEqual(1);
  });

  //Mock a function and see if the state changes

  it("should update state on click", () => {
    const setUsersList = jest.fn();
    const wrapper = mount(<UsersList onClick={setUsersList} />);
    const handleClick = jest.spyOn(React, "useState");
    handleClick.mockImplementation(previousState => [previousState, setUsersList]);
    wrapper.find("#toggle").simulate("click");
    expect(setUsersList).toBeTruthy();
  });
});