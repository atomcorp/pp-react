// This container sets up the game

import React, {Component} from 'react';

import FixtureList from './fixture-list.jsx';

import PredictionsResult from '../components/predictions-result.jsx';

import getFixtures from '../xhr-requests/get-fixtures.js';
import sendPredictions from '../xhr-requests/set-predictions.js';

export default class Game extends Component {

  constructor(props) {
    super(props);
    // username, season and gameweek will be retrieved form server on load
    // will move this back up to app or something later
    this.state = {
      fixtures: null,
      predictions: null,
      player: null,
      canSubmit: true,
      settings: {
        season: "season2017",
        gameweek: "gameweek1",
      },
    };

    this.setRequest = this.setRequest.bind(this);
    this.submitPredictions = this.submitPredictions.bind(this);
  }

  // https://daveceddia.com/where-fetch-data-componentwillmount-vs-componentdidmount/
  componentDidMount() {
    getFixtures(this.props.uid, this.state.settings, this.setRequest);
  }
 
  // receives data returned from xhr firebase
  // and sets the apps state
  setRequest(returnedRequest) {
    console.log(returnedRequest)
    this.setState({
      fixtures: returnedRequest.fixtures,
      predictions: returnedRequest.predictions,
      player: returnedRequest.player
    });
  }

  submitPredictions(predictions) {
    sendPredictions(this.props.uid, this.state.settings, predictions);
  }

  render() {

    if (!this.state.fixtures) {
      return <div>Loading...</div>;
    }
    
    return (
      <div>
        <h2>{this.state.player.team}</h2>
        <h4>Managed by {this.state.player.name}</h4>
        <FixtureList uid={this.props.uid} fixtures={this.state.fixtures} predictions={this.state.predictions} submitPredictions={this.submitPredictions} />
        {this.state.predictions 
          ?  <PredictionsResult fixtures={this.state.fixtures} predictions={this.state.predictions} />
          : (<div>No results yet</div>)
        }
      </div>
    );
  }

}