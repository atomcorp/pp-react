import React, {Component} from 'react';

import {Fixture} from './fixture.jsx';

// there should also be a check here somewhere to see 
// if changes are allowed or not (ie games have been played, or set arbitary cut-off time, say Friday 6PM)
// if changes not allowed, will auto attempt to calc score using
export class FixtureList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      predictions: this.setPredictions()
    }
    this.onPredictionSubmit = this.onPredictionSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setPredictions = this.setPredictions.bind(this);
  }

  // this turns our array of fixtures into an object
  setPredictions() {
    let type = !this.props.predictions ? this.props.fixtures : this.props.predictions;

    // https://stackoverflow.com/a/37215730/2368141
    const result = type.reduce(function(array, object) {
      console.log(array, object)
      array[object.id] = {
        homeScore: object.homeScore,
        awayScore: object.awayScore,
        id: object.id
      };
      return array;
    }, {});
    
    return result;
  }

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
    const fixtures = this.props.fixtures.map((fixture) => {
      return <Fixture 
        id={fixture.id} 
        key={fixture.id} 
        homeScore={this.state.predictions[fixture.id].homeScore} 
        awayScore={this.state.predictions[fixture.id].awayScore} 
        home={fixture.home} 
        away={fixture.away} 
        onChange={this.onChange} 
        />;
    });

    return (
      <form action="prediction" onSubmit={this.onPredictionSubmit}>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Home</th>
              <th>Prediction</th>
              <th>Away</th>
            </tr>
          </thead>
          <tbody> 
            {fixtures}
          </tbody>
        </table>
        <button type="submit">
          Submit
        </button>

      </form>
    );
  }
}
