.. _testing:


Testing
=======

Rendering
---------

To execute a render test you need to know that ``@testing-library/react`` is already installed in a React project, included ``react-dom/test-utils`` tool as explained in the oficial `Testing Library <https://testing-library.com/docs/react-testing-library/intro/>`_ page.

Create a folder called test, and inside of it, create a new file namecomponent.test.js and import the next elements like this::

    import { render, screen } from "@testing-library/react";
    import { act } from "react-dom/test-utils";
    import BackSoon from "../components/landing/landing";

The third object imported is the component we want to test, next we write the test argument::

    test("renders switch on your meeting", () => {
        act(()=>{
        render(<BackSoon />);
        })
        const linkElement = screen.getByTestId("switch_off");
        expect(linkElement).toBeInTheDocument();
    });

Act process and test the units to the DOM, so we only require inside this function rendered our component. We need to pick one of the elements that are inside the component and assign to component.jsx module a  test ID, declared in this case as ``data-testid="switch_off``.

Remember this id must be in the html label from landing.jsx file::

    <input type="checkbox" name="switch_button" data-testid="switch_off" id="switch_label" onClick={turnOn} className={styles.switch_button__checkbox} />

Now we only need to declare a const variable to store the element and display it in the screen. The finally step is set that the element we want to test is content in the Document with ``toBeInTheDocument();`` matcher. The function is ready, please execute the test::

    npm test

This is our first render test with ``@testing-library/react`` and ``react-test-renderer``. An alternative is use enzyme and ``@wojtekmaj/enzyme-adapter-react-17`` so we must install both with the next comands::

    npm i --save-dev enzyme

    npm install --save-dev @wojtekmaj/enzyme-adapter-react-17

https://github.com/wojtekmaj/enzyme-adapter-react-17

Create another file inside tests folder as othercomponent.test.js and configurate it as follows::

    import { shallow, mount, configure } from "enzyme";
    import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
    configure({ adapter: new Adapter() });

Remeber to import React and your component also in this file. The code structure looks like this::

    describe("UsersList", () => {
        it("renders correctly", () => {
            shallow(<UsersList />);
        });

        it("detect div container", () => {
            const wrapper = shallow(<UsersList />);
            expect(wrapper.find("div").length).toEqual(1);
        });
    });

We will test if it's renderd and the elements are displayed well. The render testing works with ``shallow`` component from :ref:`enzyme <Events>` indicating the html label we want to corroborate. In this example is selecting a div that function as a container. In the next page we will learn how to apply this library to test events in a component too. Remember to execute ``npm test`` to run the tests.

Events
------

To perform this kind of tests we need ``enzyme`` and ``@wojtekmaj/enzyme-adapter-react-17`` so we must install both with the next comands::

    npm i --save-dev enzyme

    npm install --save-dev @wojtekmaj/enzyme-adapter-react-17

https://github.com/wojtekmaj/enzyme-adapter-react-17

Creat an other file inside tests folder as othercomponent.test.js and configurate it as follows::

    import { shallow, mount, configure } from "enzyme";
    import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
    configure({ adapter: new Adapter() });

Remeber to import React and your component also in this file. The code structure looks like this::

    import React from "react";
    import { shallow, mount, configure } from "enzyme";
    import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
    configure({ adapter: new Adapter() });
    import UsersList from "../components/usersList/usersList";

    describe("UsersList", () => {

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

The mock is set by the ``jest.fn();`` then we ``mount`` the component and pass to this one the onClick action that is stablished in the hook of the useState inside the component file.jsx, like this ``const [usersList, setUsersList] = useState(false);``, ``jest.spyOn`` pointed to this hook after we simuleated the state change with ``handleClick.mockImplementation``. Very important in this simulation is that we also need an id in the html label that acts as a button. In this case is::

        <div id="toggle"
          className={styles.userslist}
          onClick={() => {
            setUsersList((previousState) => !previousState);
          }}
        > 

Before we execute ``npm test`` we will try the library Getusermedia for our video and audio components, is very easy to implement this test but first you need to install it::

    npm install getusermedia

And you must install ``npm tape`` too::

    npm install tape --save-dev

Create a file named getusermedia.js in the root folder of the project and paste this code::

    // getUserMedia helper by @HenrikJoreteg used for navigator.getUserMedia shim
    var adapter = require('webrtc-adapter');

    module.exports = function (constraints, cb) {
        var error;
        var haveOpts = arguments.length === 2;
        var defaultOpts = {video: true, audio: true};

        var denied = 'PermissionDeniedError';
        var altDenied = 'PERMISSION_DENIED';
        var notSatisfied = 'ConstraintNotSatisfiedError';

        // make constraints optional
        if (!haveOpts) {
            cb = constraints;
            constraints = defaultOpts;
        }

        // treat lack of browser support like an error
        if (typeof navigator === 'undefined' || !navigator.getUserMedia) {
            // throw proper error per spec
            error = new Error('MediaStreamError');
            error.name = 'NotSupportedError';

            // keep all callbacks async
            return setTimeout(function () {
                cb(error);
            }, 0);
        }

        // normalize error handling when no media types are requested
        if (!constraints.audio && !constraints.video) {
            error = new Error('MediaStreamError');
            error.name = 'NoMediaRequestedError';

            // keep all callbacks async
            return setTimeout(function () {
                cb(error);
            }, 0);
        }

        navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
            cb(null, stream);
        }).catch(function (err) {
            var error;
            // coerce into an error object since FF gives us a string
            // there are only two valid names according to the spec
            // we coerce all non-denied to "constraint not satisfied".
            if (typeof err === 'string') {
                error = new Error('MediaStreamError');
                if (err === denied || err === altDenied) {
                    error.name = denied;
                } else {
                    error.name = notSatisfied;
                }
            } else {
                // if we get an error object make sure '.name' property is set
                // according to spec: http://dev.w3.org/2011/webrtc/editor/getusermedia.html#navigatorusermediaerror-and-navigatorusermediaerrorcallback
                error = err;
                if (!error.name) {
                    // this is likely chrome which
                    // sets a property called "ERROR_DENIED" on the error object
                    // if so we make sure to set a name
                    if (error[denied]) {
                        err.name = denied;
                    } else {
                        err.name = notSatisfied;
                    }
                }
            }

            cb(error);
        });
    };

Next in your component.test.js file you should structure your code like this::

    import React from "react";
    import Room from "../components/room/room";

    "use strict";
    // This is a basic test file for use with testling.
    // The test script language comes from tape.
    /* jshint node: true */
    /* global Promise */
    const test = require("tape");

    const getUserMedia = require("../getusermedia");

    test("getUserMedia audio-only", function (t) {
        let constraints = {audio: true, fake: true};
        getUserMedia(constraints, function (err, stream) {
            if (err) {
                t.fail(err.toString());
                return;
            }
            t.pass("got stream");
            t.end();
        }); 
    });

    test("getUserMedia video-only", function (t) {
        let constraints = {video: true, fake: true};
        getUserMedia(constraints, function (err, stream) {
            if (err) {
                t.fail(err.toString());
                return;
            }
            t.pass("got stream");
            t.end();
        });
    });

    test("getUserMedia audio-video", function (t) {
        let constraints = {audio: true, video: true, fake: true};
        getUserMedia(constraints, function (err, stream) {
            if (err) {
                t.fail(err.toString());
                return;
            }
            t.pass("got stream");
            t.end();
        });
    });

And as you can see this mocks test audio first, video second and both at the same time for the last. Please feel free to visit the official github from this library at `getusermedia <https://github.com/otalk/getUserMedia>`_.

Snapshots
---------

This kind of tests is the easy ones, you only need to install ``react-test-renderer`` executing::

    npm install --save--dev react-test-renderer

Create a file inside tests folder named componentName.test.js and import your new library::

    import renderer from "react-test-renderer";

Remember to import the component that you want to test and then structure your snapshot code as follows::

    import renderer from "react-test-renderer";
    import BackSoon from "../components/landing/landing";

    it("renders the Landing snapshot", () => {
        const tree = renderer.create(<BackSoon />).toJSON();
        expect(tree).toMatchSnapshot();
    });

``renderer.create`` is like taking a picture of your html code from your component. Declare a const variable to store the element and with ``toMatchSnapshot()`` we'll create the snapshot inside a folder that???s created automatically.


.. image:: ./_templates/resources/tests.png
    :alt: Snapshots test file
    :align: center
    :scale: 65%


The snapshot  result looks like this::

    // Jest Snapshot v1,  

    exports[renders the Landing snapshot 1] = `<divclassName="Landing_page"

    <divclassName="left_side"/><divclassName="center_down"
    <div
        className="slider"
    >
        <div
        className="switch_button"
        >
        <input
            className="switch_button__checkbox"
            data-testid="switch_off"
            id="switch_label"
            name="switch_button"
            onClick={[Function]}
            type="checkbox"
        />
        <label
            className="switch_button__label"
            htmlFor="switch_label"
        />
        </div>
    </div>
    </div><divclassName="right_side"
    <div
        className="logo"
    />
    <div
        className="startmeeting"
    />
    </div>
    </div>`;

A disadvantage of this kind of test is that there???s no automatic update after executing ``npm test`` and if you change some htm labels, you must press ``u`` to update the snapshot files. Moreover, these don???t detect changes in states or verify argumnets. If you want to know more about snapshot test click `this link <https://semaphoreci.com/community/tutorials/snapshot-testing-react-components-with-jest>`_.