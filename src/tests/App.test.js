import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from "react-dom/test-utils";
import App from '../App';

test('renders learn react link', () => {
  act(()=>{
    render(<App />);
  })
  const linkElement = screen.getByText("NEW MEETING");
  expect(linkElement).toBeInTheDocument();
});

it('renders a snapshot', () => {
  const tree = renderer.create(<App/>).toJSON();
  expect(tree).toMatchSnapshot();
});