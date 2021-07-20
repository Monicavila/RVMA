import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./components/landing/landing";
import Meeting from "./components/createRoom/createRoom";
import Room from "./components/room/room";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Meeting} />
        <Route path="/room/:roomID" render={(props) => {const { match } = props; return <Room {...props} roomID={match.params.roomID} />}}/>
        <Route path="/back-soon" exact component={Landing} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;