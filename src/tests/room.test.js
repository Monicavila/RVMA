import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from "react-dom/test-utils";
import Room from '../components/room/room';

it("renders the Landing snapshot", () => {
    const tree = renderer.create(<Room />).toJSON();
    expect(tree).toMatchSnapshot();
    console.log(tree);
});