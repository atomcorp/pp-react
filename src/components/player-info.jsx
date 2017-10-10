// @flow
import React from 'react';

import type {PlayerType, GameType} from '../types.js';

type Props = {
  player: PlayerType,
  gameData: GameType
}; 

export default function Player(props: Props) {

  return (
    <div className="player">
      <div className="player__container">
        <div className="player__personal">
          <div className="player__team">{props.player.team}</div>
          <div className="player__manager">Managed by <span>{props.player.name}</span></div>
        </div>
        <div className="player__stats">  
          <div className="player__points">
            <div className="player__total">{ props.player.lastWeeksPoints ? props.player.lastWeeksPoints : '-' }</div>
            <div>Last weeks points</div>
          </div>
          <div className="player__points">
            <div className="player__total">{props.player.points}</div>
            <div>Total points</div>
          </div>
        </div>
        <div className="player__status">
          <div className="player__gameweek">
            <div className="player__label">Active game week</div>
            <div className="player__points">{props.gameData.gameweek}</div>
          </div>
        </div>
      </div>
    </div>
  );
}