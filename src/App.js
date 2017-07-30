import React, { Component } from 'react';
import './App.css';
// fixtures is an array of fixture objects
// in future it will pull from the server
// each user will get their own predictions list,
// that way they can alter them over and again
// import fixtures from './data/fixtures.js';
import {FixtureList} from './components/fixture-list.jsx';
// import SetFixtures from './actions/set-fixtures.jsx';
import getFixturesFromFirebase from './actions/get-fixtures.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = null;
    this.requestFixtures = this.requestFixtures.bind(this);
    this.setFixtures = this.setFixtures.bind(this);
  }

  componentWillMount() {
    this.requestFixtures();
  }

  requestFixtures() {
    getFixturesFromFirebase('14-15/gameweek1', this.setFixtures);
  }

  setFixtures(fixtures) {
    this.setState({
      fixtures: fixtures
    });
  }

  render() {
    if (!this.state) {
      return <div>Loading...</div>;
    }
    return (
      // we will return 
      // - <FixtureList />
      // --- <Fixture />
      // ----- Home & Away Team 
      <div className="container">
        <div className="fixture-list">
          <FixtureList fixtures={this.state.fixtures} />
        </div>
      </div>
    );
  }
}

export default App;
