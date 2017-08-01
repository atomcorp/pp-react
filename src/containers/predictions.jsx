import React, {Component} from 'react';

import FixtureList from '../components/fixture-list.jsx';

import getFixtures from '../xhr-requests/get-fixtures.jsx';
import sendPredictions from '../xhr-requests/set-predictions.jsx';


export default class Predictions extends Component {

  constructor(props) {
    super(props);
    // username, season and gameweek will be retrieved form server on load
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
    this.requestFixtures = this.requestFixtures.bind(this);
    this.setFixtures = this.setFixtures.bind(this);
    this.submitPredictions = this.submitPredictions.bind(this);
  }

  // https://daveceddia.com/where-fetch-data-componentwillmount-vs-componentdidmount/
  componentDidMount() {
    this.requestFixtures();
  }

  requestFixtures() {
    // will need to request 
    // user -> season -> week
    getFixtures(this.state.user, this.setFixtures);
  }

  setFixtures(fixtures) {
    console.log(fixtures);
    this.setState({
      fixtures: fixtures.fixtures,
      predictions: fixtures.predictions
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
      <FixtureList fixtures={this.state.fixtures} predictions={this.state.predictions} submitPredictions={this.submitPredictions} />
    );
  }

}