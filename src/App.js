import React, { Component } from 'react';
import './App.css';
// fixtures is an array of fixture objects
// in future it will pull from the server
// each user will get their own predictions list,
// that way they can alter them over and again
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
          {/*
            for debugging hardcoding the 1 for gameweek
            latter on this will be pulled from somewhere else (url or server?) 
          */}
          <FixtureList fixtures={fixtures[1]} />
        </div>
      </div>
    );
  }
}

export default App;
