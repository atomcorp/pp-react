import React, {Component} from 'react';
import {Fixture} from '../components/fixture.jsx';
import {getMatchData, getGameweekPoints} from '../xhr-requests.js';

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
      canPredict: this.props.gameData.canPredict,
      predictionResult: null,
      predictionSubmitError: false
    }
    this.onPredictionSubmit = this.onPredictionSubmit.bind(this);
    this.onPredictionChange = this.onPredictionChange.bind(this);
    this.setPredictions = this.setPredictions.bind(this);
    this.handleWeekChange = this.handleWeekChange.bind(this);
  }

  componentDidMount() {
    const predictions = this.setPredictions(this.props.fixtures, this.props.predictions);
    this.setState({
      predictions: predictions,
      canRender: true
    });
  }

  // this sets up what's diplayed in the score boxes
  // if user has made predictions before will show those
  // if not just defaults to the predictions 0-0
  setPredictions(fixtures, predictions = null) {
    if (predictions) {
      return predictions;
    } 
    const newPredictions = {};
    for (const id in fixtures) { 
      newPredictions[id] = {
        homeScore: '-',
        awayScore: '-',
        id: id
      }
    }    
    return newPredictions;
  }

  // when users changes the scores
  onPredictionChange(input, homeOrAway, id) {
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
      if (arePredictionsValid(this.state.predictions)) {
        this.props.submitPredictions(this.state.predictions, this.state.gameweekInView);
        this.setState({predictionSubmitError: false});
      } else {
        this.setState({predictionSubmitError: true})
      }
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
        getMatchData(this.props.gameData.season, 'predictions', this.props.player.id, [`gameweek${gameweek}`]),
        getGameweekPoints(this.props.player.id, this.props.gameData.season, [`gameweek${gameweek}`])
      ]).then((data) => {
        if (!data[1][`gameweek${gameweek}`]) {
          data[1][`gameweek${gameweek}`] = this.setPredictions(data[0][`gameweek${gameweek}`]);
        }
        return data;
      }).then((data) => {
        this.setState({
          fixtures: data[0][`gameweek${gameweek}`],
          gameweekInView: gameweek,
          predictions: data[1][`gameweek${gameweek}`],
          canPredict: canPredictHelper(gameweek, this.props.gameData.gameweek, this.props.gameData.canPredict),
          predictionResult: data[2] ? data[2] : null
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
        onPredictionChange={this.onPredictionChange} 
        canPredict={this.state.canPredict}
        />;
    });

    return (
      <div className="fixture-list">
        Gameweek: {this.state.gameweekInView}
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
          ? <button type="button" onClick={(event) => this.handleWeekChange(event, this.state.gameweekInView - 1)}>Previous week</button>
          : null }
        {this.state.gameweekInView < this.props.gameData.gameweek + 1
          ? <button type="button" onClick={(event) => this.handleWeekChange(event, this.state.gameweekInView + 1)}>Next week</button>
          : null }
        {this.state.predictionResult
          ?  (<div>Your predictions: {this.state.predictionResult}</div>)
          : (<div>No results yet</div>)
        }
        {this.state.predictionSubmitError
          ?  (<div>There was an error submitting your predictions, please make sure each team has been predicted</div>)
          : (<div></div>)
        }
      </div>
    );
  }
}

/**
 * @param  {Number}
 * @param  {Number}
 * @return {Boolean}
 */
function canPredictHelper(requestedWeek, currentGameweek, canPredict) {

  if (requestedWeek < currentGameweek) {
    return false;
  }
  if (requestedWeek > currentGameweek) {
    return true;
  }
  return canPredict;
}

function arePredictionsValid(predictions) {
  console.log(predictions)
  for (const id in predictions) {
    if (!Number.isInteger(predictions[id].homeScore) || !Number.isInteger(predictions[id].awayScore)) {
      return false;
    } else {
    }
  }
  return true;
}