// @flow

import React, {Component} from 'react';

import FixtureList from './fixture-list.jsx';

import bootstrapGame from '../components/bootstrap-game.js';
import {makeCancelable} from '../make-cancelable.js';
import {sendPredictions} from '../xhr-requests.js';
import type {PlayerType, GameType, FixturesType, PredictionsType} from '../types.js';

type State = {
  fixtures: {} | FixturesType,
  predictions: {} | PredictionsType,
  loadFixtureList: boolean
};

type Props = {
  player: PlayerType,
  gameData: GameType
};

export default class Game extends Component<void, Props, State> {
  state: State

  constructor(props: Props) {
    super(props);
    // username, season and gameweek will be retrieved form server on load
    // will move this back up to app or something later
    this.state = {
      fixtures: {},
      predictions: {},
      loadFixtureList: false
    };

    (this:any).submitPredictions = this.submitPredictions.bind(this);
  }

  // https://daveceddia.com/where-fetch-data-componentwillmount-vs-componentdidmount/
  componentDidMount() {
    const cancelablePromise = makeCancelable(
      bootstrapGame(this.props.player.id, this.props.gameData).then((returnedRequest) => {
        console.log(returnedRequest);
        this.setState({
          fixtures: returnedRequest.fixtures,
          predictions: returnedRequest.predictions,
          loadFixtureList: true
        });
      })
    );
    cancelablePromise
      .promise
      .then((a) => {
        console.log(a)
      })
      .catch((reason) => console.log('isCanceled', reason.isCanceled));
    cancelablePromise.cancel(); // Cancel the promise
  }
 
  submitPredictions(predictions: PredictionsType, gameweek: number) {
    sendPredictions(this.props.player.id, this.props.gameData.season, gameweek, predictions);
  }

  render() {
    if (!this.state.loadFixtureList) {
      return <div>Loading fixtures...</div>;
    }
    return (
      <div className="game">
        <h2>{this.props.player.team}</h2>
        <h4>Managed by {this.props.player.name}</h4>
        <h4>Total points: {this.props.player.points}</h4>
        {
          this.props.player.lastWeeksPoints 
            ? <h4>Last weeks points: {this.props.player.lastWeeksPoints}</h4>
            : null
        }
        <h4>Current gameweek {this.props.gameData.gameweek}</h4>
        <FixtureList gameData={this.props.gameData} player={this.props.player} fixtures={this.state.fixtures} predictions={this.state.predictions} submitPredictions={this.submitPredictions} />
      </div>
    );
  }

}