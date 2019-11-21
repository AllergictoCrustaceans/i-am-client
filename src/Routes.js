import React, {useState} from "react";
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
  const [sub, setSub] = useState();
  const [email, setEmail] = useState();

  const setUser = (subFromLogin, emailFromLogin) => {
    setSub(subFromLogin);
     setEmail(emailFromLogin);
  }

  return (
    <Switch>
        <AppliedRoute path="/" exact component={Home} appProps={appProps} />
        <AppliedRoute path="/login" exact component={Login} appProps={{...appProps, setUser}}/>
        <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />
        <AppliedRoute path='/main' expact component={Main} appProps={appProps} />
        <AppliedRoute path="/mia" exact component={Mia} appProps={{...appProps, sub, email}} />
        <AppliedRoute path="/messages" exact component={Messages} appProps={appProps} />
        <AppliedRoute path="/moods" exact component={Mood} appProps={{...appProps, sub, email}} />
        <Route component={NotFound} />
    </Switch>
  );
}