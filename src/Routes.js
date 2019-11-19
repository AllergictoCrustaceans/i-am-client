import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from './containers/Home';
import Login from './containers/Login';
import NotFound from './containers/NotFound';
import AppliedRoute from './components/AppliedRoute';
import Signup from './containers/Signup';
import Main from './containers/Main';
import Mia from './containers/Mia';
import Messages from './containers/Messages';
import Mood from './containers/Mood';

export default function Routes({appProps}) {
  return (
    <Switch>
        <AppliedRoute path="/" exact component={Home} appProps={appProps} />
        <AppliedRoute path="/login" exact component={Login} appProps={appProps}/>
        <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />
        <AppliedRoute path='/main' expact component={Main} appProps={appProps} />
        <AppliedRoute path="/mia" exact component={Mia} appProps={appProps} />
        <AppliedRoute path="/messages" exact component={Messages} appProps={appProps} />
        <AppliedRoute path="/messages/id" exact component={Mood} appProps={appProps} />
        <Route component={NotFound} />
    </Switch>
  );
}