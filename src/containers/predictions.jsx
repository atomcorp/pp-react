// container

import React, {Component} from 'react';

import FixtureList from './fixture-list.jsx';

import PredictionsResult from '../components/predictions-result.jsx';

import getFixtures from '../xhr-requests/get-fixtures.jsx';
import sendPredictions from '../xhr-requests/set-predictions.jsx';

// import {SubmitPredictions} from './components/submit-predictions.jsx';

export default class Predictions extends Component {

  constructor(props) {
    super(props);
    // username, season and gameweek will be retrieved form server on load
    // will move this back up to app or something later
    this.state = {
      user: {
        id: "0",
        season: "14-15",
        gameweek: "gameweek1", // this should be a string, otherwise firebase gets upset
      },
      fixtures: null,
      predictions: null,
      canSubmit: true
    };
    this.requestPredictions = this.requestPredictions.bind(this);
    this.setRequest = this.setRequest.bind(this);
    this.submitPredictions = this.submitPredictions.bind(this);
  }

  // https://daveceddia.com/where-fetch-data-componentwillmount-vs-componentdidmount/
  componentDidMount() {
    this.requestPredictions();
  }

  // send an xhr to firebase for fixtures
  // requests 2 data, fixtures (has teams, times etc)
  // and predictions (if exists)
  requestPredictions() {
    getFixtures(this.state.user, this.setRequest);
  }

  // receives data returned from xhr firebase
  // and sets the apps state
  setRequest(returnedRequest) {
    console.log(returnedRequest);
    this.setState({
      fixtures: returnedRequest.fixtures,
      predictions: returnedRequest.predictions
    });
  }

  submitPredictions(predictions) {
    console.log(predictions);
    sendPredictions(this.state.user, predictions);
  }

  render() {
    if (!this.state.fixtures) {
      return <div>Loading...</div>;
    }
    
    return(
      <div>
        <FixtureList fixtures={this.state.fixtures} predictions={this.state.predictions} submitPredictions={this.submitPredictions} />
        {this.state.predictions ? (
          <PredictionsResult fixtures={this.state.fixtures} predictions={this.state.predictions} />
        ) : (<div>No results yet</div>)}
      </div>
    );
  }

}