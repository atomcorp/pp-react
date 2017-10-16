// @flow
import React, {Component} from 'react';

import type {FixtureType, PredictionType} from '../types.js';

type Props = {
  fixture: FixtureType,
  onPredictionChange: (score: number, homeOrAway: string, id: string) => void,
  id: string,
  prediction: PredictionType,
  setStar: (id: string) => void
};

type State = {
  modified: boolean
};

export default class Fixture extends Component<void, Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      modified: false
    };
    // console.log(this.props)
    (this:any).onScoreChange = this.onScoreChange.bind(this);
    (this:any).colour = this.colour.bind(this);
    (this:any).onFocus = this.onFocus.bind(this);
  }

  colour(points: number): string {
    let colour = '';
    if (points === 3) {
      colour = 'green';
    } else if (points === 1) {
      colour = 'yellow';
    } else if (points === 0) {
      colour = 'red';
    }
    return colour;
  }

  onScoreChange(event: Event, homeOrAway: string, id: string) {
    if (event.currentTarget instanceof HTMLInputElement) {
      const score = ensurePositiveNumber(event.currentTarget.value);
      this.setState({
        modified: true
      })
      this.props.onPredictionChange(score, homeOrAway, id);
    }
  }

  componentDidUpdate() {
    if (!this.props.hasEditedPrediction && this.state.modified) {
      this.setState({
        modified: false
      })
    }
  }

  onFocus(event: FocusEvent) {
    // I don't really get this, but there you go...
    // https://github.com/facebook/flow/issues/218#issuecomment-74119319
    if (event.currentTarget instanceof HTMLInputElement) {
      event.currentTarget.select();
    }
  }

  // props will be fixture
  // take 2 team names
  // and print the tds 
  render() {
    const fixtureData = formatDate(this.props.fixture.date);
    const pointsColour = handlePointsResultClasses(this.props.prediction.points, 'fixture__result');
    const fixtureColour = handlePointsResultClasses(this.props.prediction.points, 'fixture');
    return (
      <section>
        { 
          fixtureData
          ? <div className="fixture__date">{fixtureData}</div>
          : null
        }
        <div className={'fixture ' + fixtureColour}>
          <div className="fixture__star">          
            {
               this.props.canPredict
                ? (<button className="star" onClick={() => this.props.setStar(this.props.id)}>
                    <div className="star__icon">
                      {this.props.prediction.star ? starFilled() : starUnfilled()}
                    </div> 
                  </button>)
                : (this.props.prediction.star ? starFilled() : null)
            }
          </div>
          <div className="fixture__match">
            <div className="fixture__home">{this.props.fixture.homeTeamName}</div>
            <div className="fixture__scores">
              {
                this.props.fixture.status === 'FINISHED' 
                ? <div className="fixture__result fixture__result--home">({this.props.fixture.result.goalsHomeTeam})</div>
                : null
              }
              <div className="fixture__predictions">
                {
                  this.props.fixture.status === 'TIMED' 
                  ? <input 
                      className="fixture__input"
                      type="text" 
                      size="2"
                      maxLength="2"
                      value={this.props.prediction.homeScore} 
                      onFocus={this.onFocus}
                      onChange={(event) => this.onScoreChange(event, "homeScore", this.props.id)} 
                    />
                  : <input className="fixture__input fixture__input--disabled" disabled value={this.props.prediction.homeScore} />
                }
                {<div className="fixture__colon">:</div>} 
                {
                  this.props.fixture.status === 'TIMED'
                  ? <input 
                      className="fixture__input"
                      type="text" 
                      size="2"
                      maxLength="2"
                      value={this.props.prediction.awayScore} 
                      onFocus={this.onFocus}
                      onChange={(event) => this.onScoreChange(event, "awayScore", this.props.id)} 
                    />  
                  : <input className="fixture__input fixture__input--disabled" disabled value={this.props.prediction.awayScore} />
                }
              </div>
              {
                this.props.fixture.status === 'FINISHED' 
                ? <div className="fixture__result fixture__result--away">({this.props.fixture.result.goalsAwayTeam})</div>
                : null
              }
            </div>
            <div className="fixture__away">{this.props.fixture.awayTeamName}</div>
          </div>
          <div className="fixture__state">
            <div className="fixture__update">
            {
              this.props.prediction.points !== undefined 
                ? <div className={'fixture__result ' + pointsColour}>{this.props.prediction.points}</div> 
                : this.state.modified
                  ? warningIcon()
                  : this.props.hasSubmittedPredictions 
                    ? okIcon()
                    : errorIcon()
            }
            </div>
          </div>
        </div>
      </section>
    );
  }
}

// helpers

const weekday = new Array(7);
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

const monthName = new Array(12);
monthName[0] =  "January";
monthName[1] = "February";
monthName[2] = "March";
monthName[3] = "April";
monthName[4] = "May";
monthName[5] = "June";
monthName[6] = "July";
monthName[7] = "August";
monthName[8] = "September";
monthName[9] = "October";
monthName[10] = "November";
monthName[11] = "December";

let isUnique = true;

// should probablt do all this on submit
function formatDate(day: string): string {
  let formattedTime = Date.parse(`${day}`)/1000;
  formattedTime = new Date(formattedTime * 1000);
  const dayOfTheWeek = weekday[formattedTime.getDay()];
  const date = formattedTime.getDate();
  const month = monthName[formattedTime.getMonth()];
  const minutes = formatMinutes(formattedTime);
  // const formattedDate = `${dayOfTheWeek} ${date}/${month} ${formattedTime.getHours()}:${minutes}`;
  const formattedDate = `${dayOfTheWeek} ${date} ${month}`;
  if (isUnique && isUnique !== formattedDate) {
    isUnique = formattedDate;
    return formattedDate;
  } 
  return '';
}

function formatMinutes(time: Date): string | number {
  let minutes = time.getMinutes();
  if (minutes < 9) {
    minutes = '0' + minutes;
  }
  return minutes;
}

function handlePointsResultClasses(point, className) {
  if (point === 0) {
    return className += '--lost';
  }
  if (point === 1) {
    return className += '--draw';
  }
  if (point === 3) {
    return className += '--win';
  }
  if (point === 2 || point === 6) {
    return className += '--star';
  }
  return className;
}

// todo: user can still input a dot (.) after a number
// but this isn't carried over to DB
function ensurePositiveNumber(input: string): number {
  let score = parseInt(input, 10);
  if (score < 0) {
    score = Math.abs(score);
  }
  if (isNaN(score)) {
    score = 0;
  }
  return score;
}

const starUnfilled = () => {
  return (<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24">
        <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
    </svg>)
};

const starFilled = () => {
  return (<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
    </svg>)
};

const warningIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="warning-fill" fill="#000000" height="24" viewBox="0 0 24 24" width="24">
        <path d="M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z"/>
        <path d="M0 0h24v24H0V0z" fill="none"/>
    </svg>
  );
}

const okIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="ok-fill" fill="#000000" height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
    </svg>
  );
}

const errorIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="bad-fill" fill="#000000" height="24" viewBox="0 0 24 24" width="24">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
  );
}