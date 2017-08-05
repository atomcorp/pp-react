import React, {Component} from 'react';

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
    let predictionResult = {};
    // https://stackoverflow.com/a/4215753/2368141
    predictionResult = fixtures.reduce(function(result, currentValue, currentIndex, array) {
      result[`fixture${currentIndex}`] = {
        homeScore: array[currentIndex].result.goalsHomeTeam ? array[currentIndex].result.goalsHomeTeam : 0,
        awayScore: array[currentIndex].result.goalsAwayTeam ? array[currentIndex].result.goalsAwayTeam : 0,
        id: `fixture${currentIndex}`
      };
      return result;
    }, {});
    // for (const id in fixtures) { 
    //   const fixture = fixtures[id];
    //   result[fixture.id] = {
    //     homeScore: fixture.homeScore,
    //     awayScore: fixture.awayScore,
    //     id: fixture.id
    //   };
    // }    
    return predictionResult;
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
    const fixtures = this.props.fixtures.reduce(function(obj, item, index) {
      obj = Object.assign(obj, {[`fixture${index}`]: item})
      console.log(obj)
      return obj;
    }, {});
    // order the fixtures by date, so we can add the dates
    // may just remove this later, not really important what time fixture is for game
    console.log(fixtures);
    const sortFixtures = Object.keys(fixtures).sort(function(a,b) {
      let first = Date.parse(`${fixtures[a].date} ${fixtures[a].time}`)/1000;
      let second = Date.parse(`${fixtures[b].date} ${fixtures[b].time}`)/1000;
      return first - second;
    });
    const fixtureElements = sortFixtures.map((id, index) => {
      return <Fixture 
        id={fixtures[id].id} 
        key={fixtures[id].id} 
        points={this.state.predictions[id].points}
        homeScore={this.state.predictions[id].homeScore} 
        awayScore={this.state.predictions[id].awayScore} 
        homeResult={fixtures[id].homeScore} 
        awayResult={fixtures[id].awayScore} 
        home={fixtures[id].homeTeamName} 
        away={fixtures[id].awayTeamName} 
        time={fixtures[id].time}
        date={fixtures[id].date}
        onChange={this.onChange} 
        />;
    });

    return (
      <div className="fixture-list">
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
      </div>
    );
  }
}