import React, {Component} from 'react';

import {Fixture} from './fixture.jsx';

export class FixtureList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      predictions: this.setPredictions()
    }
    this.onChange = this.onChange.bind(this);
    this.setPredictions = this.setPredictions.bind(this);
  }

  // this turns our array of fixtures into an object
  setPredictions() {
    var fixtures = this.props.fixtures;
    // https://stackoverflow.com/a/37215730/2368141
    var result = fixtures.reduce(function(fixtures, fixture){
      fixtures[fixture.id] = {
        homeScore: 0,
        awayScore: 0,
      };
      return fixtures;
    }, {});
    return result;
  }

  onChange(event, homeOrAway, id) {
    const score = parseInt(event, 10);
    // https://stackoverflow.com/a/38779819/2368141
    this.setState((prevState) => {
      prevState.predictions[id][homeOrAway] = score;
      return prevState;
    });
  }

  // this will need to print one fixture for length of fixture list
  render() {
    console.log(this.state);
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
    );
  }
}
