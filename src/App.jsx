import React, { Component } from 'react';
import './App.css';
// fixtures is an array of fixture objects
// in future it will pull from the server
// each user will get their own predictions list,
// that way they can alter them over and again
import {FixtureList} from './components/fixture-list.jsx';
// import {SubmitPredictions} from './components/submit-predictions.jsx';
// import SetFixtures from './actions/set-fixtures.jsx';
import getFixtures from './actions/get-fixtures.jsx';
import sendPredictions from './actions/set-predictions.jsx';

class App extends Component {
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
      predictions: null
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
    return (
      // we will return 
      // - <FixtureList />
      // --- <Fixture />
      // ----- Home & Away Team 
      <div className="container">
        <div className="fixture-list">
          <FixtureList fixtures={this.state.fixtures} predictions={this.state.predictions} submitPredictions={this.submitPredictions} />
        </div>
      </div>
    );
  }
}

export default App;
