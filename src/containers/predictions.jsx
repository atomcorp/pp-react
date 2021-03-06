// @flow
import React, {Component} from 'react';
import Fixture from './fixture.jsx';
import Stats from '../components/stats.jsx';
import {getMatchData, getGameweekPoints} from '../xhr-requests.js';
import type {PlayerType, GameType, FixturesType, PredictionsType} from '../types.js';

type State = {
  fixtures: FixturesType,
  predictions: {} | PredictionsType,
  gameweekInView: number,
  canRender: boolean,
  canPredict: boolean,
  predictionResult: null | number,
  predictionSubmitError: boolean,
  hasEditedPrediction: boolean,
  hasSubmittedPredictions: boolean
};

type Props = {
  player: PlayerType,
  gameData: GameType,
  fixtures: FixturesType,
  predictions: {} | PredictionsType,
  submitPredictions: (predictions: any, gameweek: number) => void
};

// there should also be a check here somewhere to see 
// if changes are allowed or not (ie games have been played, or set arbitary cut-off time, say Friday 6PM)
// if changes not allowed, will auto attempt to calc score using
export default class FixtureList extends Component<void, Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);
    // todo: this needs a clear up
    this.state = {
      fixtures: this.props.fixtures,
      predictions: {},
      gameweekInView: this.props.gameData.gameweek,
      canRender: false,
      canPredict: this.props.gameData.canPredict,
      predictionResult: null,
      predictionSubmitError: false,
      hasEditedPrediction: false,
      hasSubmittedPredictions: false
    }
    const self: any = this;
    self.onPredictionSubmit = this.onPredictionSubmit.bind(this);
    self.onPredictionChange = this.onPredictionChange.bind(this);
    self.setPredictions = this.setPredictions.bind(this);
    self.handleWeekChange = this.handleWeekChange.bind(this);
    self.setStar = this.setStar.bind(this);
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
  // if not just defaults to - : -
  setPredictions(fixtures: FixturesType, predictions: {} | PredictionsType = {}) {
    if (Object.getOwnPropertyNames(predictions).length) {
      this.setState({
        hasSubmittedPredictions: true
      });
      return predictions;
    } 
    const newPredictions = {};
    for (const id in fixtures) { 
      newPredictions[id] = {
        homeScore: '-',
        awayScore: '-',
        id: id,
        star: false
      }
    }
    this.setState({
      hasSubmittedPredictions: false
    });
    return newPredictions;
  }

  // when users changes the scores
  onPredictionChange(input: string | number, homeOrAway: string, id: string) {
    const score = parseInt(input, 10);
    // https://stackoverflow.com/a/38779819/2368141
    this.setState((prevState) => {
      prevState.predictions[id][homeOrAway] = score;
      prevState.hasEditedPrediction = true;
      return prevState;
    });
  }

  // when someone hits the submit button
  onPredictionSubmit(event: Event) {
    event.preventDefault();
    if (this.state.canPredict) {
      if (arePredictionsValid(this.state.predictions)) {
        this.props.submitPredictions(this.state.predictions, this.state.gameweekInView);
        this.setState({
          predictionSubmitError: false,
          hasEditedPrediction: false,
          hasSubmittedPredictions: true
        });
      } else {
        this.setState({predictionSubmitError: true})
      }
    }
  }

  setStar(starId: string) {
    this.setState((prevState) => {
      if (prevState.predictions[starId].star) {
        prevState.predictions[starId].star = false;
      } else {
        for (const id in prevState.predictions) {
          prevState.predictions[id].star = false;
        }
        prevState.predictions[starId].star = true;
      }
      return prevState;
    });
  }

  /**
   * @param  {Event}
   * @param  {Number} gameweek
   * Will set new state for the fixtures
   */
  handleWeekChange(event: Event, gameweek: number) {
    event.preventDefault();
    if (gameweek) {
      Promise.all([
        getMatchData(this.props.gameData.season, 'fixtures', '', [`gameweek${gameweek}`]),
        getMatchData(this.props.gameData.season, 'predictions', this.props.player.id, [`gameweek${gameweek}`]),
        getGameweekPoints(this.props.player.id, this.props.gameData.season, `gameweek${gameweek}`)
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
          predictionResult: data[2] ? data[2] : null,
          hasEditedPrediction: false,
          hasSubmittedPredictions: arePredictionsValid(data[1][`gameweek${gameweek}`])
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
      let first = Date.parse(fixtures[a].date)/1000;
      let second = Date.parse(fixtures[b].date)/1000;
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
          setStar={this.setStar}
          hasSubmittedPredictions={this.state.hasSubmittedPredictions}
          hasEditedPrediction={this.state.hasEditedPrediction}
        />;
    });
    return (
      <div className="game">
        <div className="game__header">
          <div className="gameweek">
            {
              this.state.gameweekInView > 1 
              ? (
                  <div className="gameweek__previous">
                    <button aria-label="Previous week" type="button" onClick={(event) => this.handleWeekChange(event, this.state.gameweekInView - 1)}>◀</button>
                  </div>
                )
              : null 
            }
            <div className="gameweek__current">
              Game week {this.state.gameweekInView}
            </div>
            {
              this.state.gameweekInView < this.props.gameData.gameweek
              ? (
                  <div className="gameweek__next">
                    <button aria-label="Next week" type="button" onClick={(event) => this.handleWeekChange(event, this.state.gameweekInView + 1)}>▶</button>
                  </div>
                )
              : null 
            }
          </div>
          {
            this.state.predictionResult !== null
            ? (
                <Stats results={this.state.predictions} points={this.state.predictionResult} />
              )
            : null
          }
        </div>
        {this.state.predictionSubmitError
          ?  (<div className="game__errors">There was an error submitting your predictions, please double check your predictions</div>)
          : (<div></div>)
        }
        <form action="prediction" onSubmit={this.onPredictionSubmit} className="fixtures">
          {fixtureElements}
          {
            this.state.canPredict 
            ? (
              <div className="fixtures__submit">
                <button type="submit">Submit</button>
              </div>
            )
            : <div className="fixtures__cant-submit"><button>Submit</button></div>
          }
        </form>
      </div>
    );
  }
}

/**
 * @param  {Number}
 * @param  {Number}
 * @return {Boolean}
 */
function canPredictHelper(requestedWeek: number, currentGameweek: number, canPredict: boolean) {

  if (requestedWeek < currentGameweek) {
    return false;
  }
  if (requestedWeek > currentGameweek) {
    return true;
  }
  return canPredict;
}

function arePredictionsValid(predictions: PredictionsType) {
  for (const id in predictions) {
    if (!Number.isInteger(predictions[id].homeScore) || !Number.isInteger(predictions[id].awayScore)) {
      return false;
    }
  }
  return true;
}