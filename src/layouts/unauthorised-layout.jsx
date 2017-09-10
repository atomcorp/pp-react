// @flow
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from '../components/header.jsx';
import SignIn from '../containers/sign-in.jsx';
import SignUp from '../containers/sign-up.jsx';

const UnauthorisedLayout = () => (
    <div>
      <Header isAuth={false} />
      <Switch>
        <Route path="/auth/sign-in" component={SignIn} />
        <Route path="/auth/sign-up" component={SignUp} />
        <Redirect to="/auth/sign-in" />
      </Switch>
    </div>
);

export default UnauthorisedLayout;