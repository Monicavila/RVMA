import React from "react";
import renderer from 'react-test-renderer';
import { act } from "react-dom/test-utils";
import Room from "../components/room/room";

test('renders learn react link', () => {
    act(()=>{
      render(<Room />);
    })
    const linkElement = screen.getByText("OK!");
    expect(linkElement).toBeInTheDocument();
  });

it("renders the Landing snapshot", () => {
    const tree = renderer.create(<Room />).toJSON();
    expect(tree).toMatchSnapshot();
    console.log(tree);
});