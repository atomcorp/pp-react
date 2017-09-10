// @flow
import React from 'react';

import type {PlayerType} from '../types.js';

type Props = {
  player: PlayerType
};

export default function Profile(props: Props) {

  return(
    <div className="profile">
      <h1>User page</h1>
      <div className="user__name">Name: { props.player.name }</div>
      <div className="user__team">Team : { props.player.team }</div>
      <div className="user__points">Points : { props.player.points }</div>
    </div>
  );
}