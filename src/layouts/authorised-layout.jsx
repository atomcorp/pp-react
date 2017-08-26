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
        <Route path="/profile">
          <Profile player={props.player} />
        </Route>
        <Route path="/leagues">
          <Leagues uid={props.player.id} />
        </Route>
        <Route path="/">
          <Game player={props.player} gameData={props.game} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  )
};

export default AuthorisedLayout;