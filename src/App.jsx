import React, { Component } from 'react';
import './App.css';
// fixtures is an array of fixture objects
// in future it will pull from the server
// each user will get their own predictions list,
// that way they can alter them over and again
import Predictions from './containers/predictions.jsx';
// import {SubmitPredictions} from './components/submit-predictions.jsx';
// import SetFixtures from './actions/set-fixtures.jsx';

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
