// @flow
import React from 'react';

import type {PlayerType, GameType} from '../types.js';

type Props = {
  player: PlayerType,
  gameData: GameType
}; 

export default function PlayerInfo(props: Props) {

  return (
    <div className="player-info__container">
      <div className="player-info">
        <div className="player-info__team">{props.player.team}</div>
        <div className="player-info__manager">Managed by {props.player.name}</div>
        <div className="player-info__total-points">
          <div className="player-info__label">Total points</div>
          <div className="player-info__points">{props.player.points}</div>
        </div>
        {
          props.player.lastWeeksPoints 
            ? (<div className="player-info__last-points">
                <div className="player-info__label">Last weeks points</div>
                <div className="player-info__points">{props.player.lastWeeksPoints}</div>
              </div>)
            : null
        }
        <div className="player-info__gameweek">
          <div className="player-info__label">Active game week</div>
          <div className="player-info__points">{props.gameData.gameweek}</div>
        </div>
      </div>
    </div>
  );
}