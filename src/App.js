import React, { Component } from 'react';
import './App.css';
// fixtures is an array of fixture objects
import fixtures from './data/fixtures.js';
import {FixtureList} from './components/fixture-list.jsx';

class App extends Component {


  render() {
    return (
      // we will return 
      // - <FixtureList />
      // --- <Fixture />
      // ----- Home & Away Team 
      <div className="container">
        <div className="fixture-list">
          <FixtureList fixtures={fixtures} />
        </div>
      </div>
    );
  }
}

export default App;
