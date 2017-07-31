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
      id: "0",
      season: "14-15",
      gameweek: "gameweek1", // this should be a string, otherwise firebase gets upset
      fixtures: null
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
    getFixtures('14-15/0', this.setFixtures);
  }

  setFixtures(fixtures) {
    this.setState({
      fixtures: fixtures
    });
  }

  submitPredictions(predictions) {
    const userData = {};
    userData.id = this.state.id;
    userData.season = this.state.season;
    userData.gameweek = this.state.gameweek;
    userData.predictions = predictions;
    console.log(predictions);
    sendPredictions(userData);
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
          <FixtureList fixtures={this.state.fixtures} submitPredictions={this.submitPredictions} />
        </div>
      </div>
    );
  }
}

export default App;
