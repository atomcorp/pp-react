import React, { Component } from 'react';
import './App.css';

import Predictions from './containers/predictions.jsx';
// import SetFixtures from './xhr-requests/set-fixtures';
// SetFixtures();
class App extends Component {

  render() {
    return (
      // we will return 
      // - <FixtureList />
      // --- <Fixture />
      // ----- Home & Away Team 
      <div className="container">
        <div className="fixture-list">
          <Predictions />
        </div>
      </div>
    );
  }
}


export default App;
