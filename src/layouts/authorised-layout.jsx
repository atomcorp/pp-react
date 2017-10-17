// @flow
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from '../containers/header.jsx';
import Game from '../containers/game.jsx';
import Profile from '../components/profile.jsx';
import Leagues from '../components/leagues.jsx';

import type {PlayerType, GameType} from '../types.js';

type Props = {
  canRender: boolean,
  player: PlayerType,
  game: GameType
};

const AuthorisedLayout = (props: Props) => {
  if (!props.canRender) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <Header isAuth={true} />
      <Switch>
        <Route path="/app/profile">
          <Profile player={props.player} />
        </Route>
        <Route path="/app/leagues">
          <Leagues uid={props.player.id} />
        </Route>
        <Route path="/app">
          <Game player={props.player} gameData={props.game} />
        </Route>
        <Redirect to="/app" />
      </Switch>
    </div>
  )
};

export default AuthorisedLayout;