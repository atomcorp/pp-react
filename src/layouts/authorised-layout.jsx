import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from '../components/header.jsx';
import Game from '../containers/game.jsx';
import Profile from '../components/profile.jsx';
import Leagues from '../components/leagues.jsx';

const AuthorisedLayout = (props) => {
  console.log(props);
  if (!props.canRender) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <Header isAuth={true} />
      <Switch>
        <Route path="/">
          <Game player={props.player} gameData={props.game} />
        </Route>
        <Route path="/profile" component={Profile} />
        <Route path="/leagues" component={Leagues} />
        <Redirect to="/" />
      </Switch>
    </div>
  )
};

export default AuthorisedLayout;