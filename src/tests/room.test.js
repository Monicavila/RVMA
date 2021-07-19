import renderer from 'react-test-renderer';
import Room from '../components/room/room';

it("renders the Landing snapshot", () => {
    const tree = renderer.create(<Room />).toJSON();
    expect(tree).toMatchSnapshot();
});