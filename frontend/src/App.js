// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Landing from "./components/Landing"
import Hosting from "./components/Hosting"
import SingleSession from "./components/SingleSession"
import Profile from "./components/Profile";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showNav, setShowNav] = useState(true);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} nav={ showNav }/>
      <Switch>
        <Route exact path='/'>
          <Landing nav={() => setShowNav(true)}/>
        </Route>
        <Route exact path='/host'>
          <Hosting nav={() => setShowNav(false)}/>
        </Route>
        <Route path='/sessions/:sessionId'>
          <SingleSession nav={() => setShowNav(true)}/>
        </Route>
        <Route path='/profile/:userId'>
          <Profile />
        </Route>
      </Switch>
    </>
  );
}

export default App;
