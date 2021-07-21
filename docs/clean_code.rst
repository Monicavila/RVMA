======================
Deliver sanitized code
======================

Before I developed this documentation, I trusted in the warning "Compiled successfully!" when I run the comand ``npm start`` in a React project, I believed that my code is ready to go.  After this documentation I realized as a developer one of your priorities is the duty to guarantee your code is sanitized because it helps to set a proper intregration within the code team and to prepare it for the production step.

So I took the Video Meeting App we developed in Rockstars G6 training and apply a series of libraries to manage how to standarize, document, test and deploy the code. Below is enlisted the libraries utilized in this development task:

* Jest - snapshots testing.

* React testing library - rendering test.

* React-dom/test-utils - processed and applied units to DOM testing.

* Enzyme and @wojtekmaj/enzyme-adapter-react-17 - render and event testing.

* Getusermedia -video and audio testing.

* Enlist - secure your code are under ECMAscript standars.

* Jsdoc - helps document classes or functions.

* Github Webflow - control in pull requests in new branch, merge and deploy the code.

To fulfill the purpose of this documentation all the libraries were selected so that beginner developers can execute them following the steps. So the level of mocks are very elementary and the components connected to `Socket.IO <https://socket.io/>`_ are excluded this time.
