import React, {Component} from 'react';

import {Fixture} from '../components/fixture.jsx';
import {getMatchData} from '../xhr-requests.js';
// there should also be a check here somewhere to see 
// if changes are allowed or not (ie games have been played, or set arbitary cut-off time, say Friday 6PM)
// if changes not allowed, will auto attempt to calc score using
export default class FixtureList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixtures: this.props.fixtures,
      predictions: null,
      gameweekInView: this.props.gameData.gameweek,
      canRender: false,
      canPredict: true
    }
    this.onPredictionSubmit = this.onPredictionSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setPredictions = this.setPredictions.bind(this);
    this.handleWeekChange = this.handleWeekChange.bind(this);
  }

  componentDidMount() {
    this.setPredictions();
  }

  // this sets up what's diplayed in the score boxes
  // if user has made predictions before will show those
  // if not just defaults to the predictions 0-0
  setPredictions() {
    if (this.props.predictions) {
      this.setState({
        predictions: this.props.predictions,
        canRender: true
      });
      return;
    } 
    const fixtures = this.props.fixtures;
    const predictions = {};
    for (const id in fixtures) { 
      predictions[id] = {
        homeScore: 0,
        awayScore: 0,
        id: id
      }
    }    
    this.setState({
      predictions: predictions,
      canRender: true
    })
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
    if (this.state.canPredict) {
      this.props.submitPredictions(this.state.predictions);
    }
  }

  /**
   * @param  {Event}
   * @param  {Number} gameweek
   * Will set new state for the fixtures
   */
  handleWeekChange(event, gameweek) {
    event.preventDefault();
    if (gameweek) {
      Promise.all([
        getMatchData(this.props.gameData.season, 'fixtures', null, [`gameweek${gameweek}`]),
        getMatchData(this.props.gameData.season, 'predictions', this.props.player.id, [`gameweek${gameweek}`])
      ]).then((data) => {
        this.setState({
          fixtures: data[0][`gameweek${gameweek}`],
          predictions: data[1][`gameweek${gameweek}`],
          gameweekInView: gameweek,
          canPredict: gameweek !== this.props.gameData.gameweek ? false : true 
        })
      })
    }
  }

  // this will need to print one fixture for length of fixture list
  render() {
    if (!this.state.canRender) {
      return <div>Loading fixture list</div>;
    }
    const fixtures = this.state.fixtures;
    
    // order the fixtures by date, so we can add the dates
    // may just remove this later, not really important what time fixture is for game
    const sortFixtures = Object.keys(fixtures).sort(function(a,b) {
      let first = Date.parse(`${fixtures[a].date}`)/1000;
      let second = Date.parse(`${fixtures[b].date}`)/1000;
      return first - second;
    });
    const fixtureElements = sortFixtures.map((id, index) => {
      return <Fixture 
        id={id} 
        key={index} 
        fixture={fixtures[id]}
        prediction={this.state.predictions[id]}
        onChange={this.onChange} 
        canPredict={this.state.canPredict}
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
          {
            this.state.canPredict 
            ? <button type="submit">Submit</button>
            : <div>Can't submit anymore</div>
          }
        </form>
        {this.state.gameweekInView > 1 
          ? <a onClick={(event) => this.handleWeekChange(event, this.state.gameweekInView - 1)} href="#">Previous week</a>
          : null }
          {this.state.gameweekInView < this.props.gameData.gameweek
            ? <a onClick={(event) => this.handleWeekChange(event, this.state.gameweekInView + 1)} href="#">Next week</a>
            : null }
      </div>
    );
  }
}