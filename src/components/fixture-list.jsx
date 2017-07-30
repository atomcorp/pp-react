import React, {Component} from 'react';

import {Fixture} from './fixture.jsx';

export class FixtureList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      predictions: {}
    }
    this.onChange = this.onChange.bind(this);
    this.setPredictions = this.setPredictions.bind(this);
  }

  // this turns our array of fixtures into an object
  setPredictions() {
    let fixturesObject = {}
    // make an object of the fixtures, with home & away team, and id
    const fixtures = this.props.fixtures.map(function(element, index) {
      const prediction = {};
      prediction.home = element.home;
      prediction.away = element.away;
      prediction.homeScore = 0;
      prediction.awayScore = 0;
      fixturesObject[element.id] = prediction;
    })
    this.setState((prevState) => {
      predictions: fixturesObject
    });
  }

  onChange(event, homeOrAway, id) {
    console.log(event, homeOrAway, id)

    const score = parseInt(event, 10);
    // https://stackoverflow.com/a/38779819/2368141
    this.setState((prevState) => {
      prevState.predictions[id] = {[homeOrAway]: score};
      return prevState;
    })
  }

  // this will need to print one fixture for length of fixture list
  render() {
    const fixtures = this.props.fixtures.map((fixture) => {
      return <Fixture 
        id={fixture.id} 
        key={fixture.id} 
        homeScore={fixture.homeScore} 
        awayScore={fixture.homeScore} 
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
