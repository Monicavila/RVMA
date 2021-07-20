import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from "react-dom/test-utils";
import BackSoon from "../components/landing/landing";

test('renders switch on your meeting', () => {
    act(()=>{
    render(<BackSoon />);
    })
    const linkElement = screen.getByTestId("switch_off");
    expect(linkElement).toBeInTheDocument();
});

it("renders the Landing snapshot", () => {
    const tree = renderer.create(<BackSoon />).toJSON();
    expect(tree).toMatchSnapshot();
});