import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Fixture} from '../components/fixture.jsx';

// there should also be a check here somewhere to see 
// if changes are allowed or not (ie games have been played, or set arbitary cut-off time, say Friday 6PM)
// if changes not allowed, will auto attempt to calc score using
export default class FixtureList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      predictions: this.setPredictions()
    }
    this.onPredictionSubmit = this.onPredictionSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setPredictions = this.setPredictions.bind(this);
  }

  // this sets up what's diplayed in the score boxes
  // if user has made predictions before will show those
  // if not just defaults to the predictions 0-0
  setPredictions() {
    if (this.props.predictions) {
      return this.props.predictions;
    } 

    const fixtures = this.props.fixtures;
    const result = {};
    for (const fixture in fixtures) { 
      const fixture = fixtures[fixture];
      result[fixture.id] = {
        homeScore: fixture.homeScore,
        awayScore: fixture.awayScore,
        id: fixture.id
      };
    }    
    return result;
  }

  // when users changes the scores
  onChange(input, homeOrAway, id) {
    const score = parseInt(input, 10);
    // https://stackoverflow.com/a/38779819/2368141
    this.setState((prevState) => {
      prevState.predictions[id][homeOrAway] = score;
      return prevState;
    });
  }

  // when someone hits the submit button
  onPredictionSubmit(event) {
    event.preventDefault();
    this.props.submitPredictions(this.state.predictions);
  }

  // this will need to print one fixture for length of fixture list
  render() {
    const fixtures = this.props.fixtures;
    const sortFixtures = Object.keys(fixtures).sort(function(a,b) {
      let first = Date.parse(`${fixtures[a].date} ${fixtures[a].time}`)/1000;
      let second = Date.parse(`${fixtures[b].date} ${fixtures[b].time}`)/1000;
      return (
        first - second
      );
    })

    const fixtureElements = sortFixtures.map((id, index) => {
      return <Fixture 
        id={fixtures[id].id} 
        key={fixtures[id].id} 
        homeScore={this.state.predictions[id].homeScore} 
        awayScore={this.state.predictions[id].awayScore} 
        home={fixtures[id].home} 
        away={fixtures[id].away} 
        time={fixtures[id].time}
        date={fixtures[id].date}
        onChange={this.onChange} 
        />;
    });

    return (
      <form action="prediction" onSubmit={this.onPredictionSubmit}>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Home</th>
              <th>Prediction</th>
              <th>Away</th>
            </tr>
          </thead>
          <tbody> 
            {fixtureElements}
          </tbody>
        </table>
        <button type="submit">
          Submit
        </button>

      </form>
    );
  }
}


Fixture.propTypes = {
  fixtures: PropTypes.array,
  predictions: PropTypes.array,
  submitPredictions: PropTypes.func,
};
