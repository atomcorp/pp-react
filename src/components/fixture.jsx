// @flow
import React, {Component} from 'react';

import type {FixturesType, PredictionsType} from '../types.js';

type Props = {
  fixture: FixturesType,
  onPredictionChange: (score: number, homeOrAway: string, id: string) => void,
  id: string,
  prediction: PredictionsType
};

export class Fixture extends Component<void, Props, void> {
  constructor(props:Props) {
    super(props);

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
      this.props.onPredictionChange(score, homeOrAway, id);
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
    return (
      <tr>
        <td>{formatDate(this.props.fixture.date)}</td>
        <td>{this.props.fixture.homeTeamName}</td>
        <td>
          {
            this.props.canPredict 
            ? <input 
                type="text" 
                size="2"
                maxLength="2"
                value={this.props.prediction.homeScore} 
                onFocus={this.onFocus}
                onChange={(event) => this.onScoreChange(event, "homeScore", this.props.id)} 
              />
            : this.props.prediction.homeScore
          }
          {' : '} 
          {
            this.props.canPredict
            ? <input 
                type="text" 
                size="2"
                maxLength="2"
                value={this.props.prediction.awayScore} 
                onFocus={this.onFocus}
                onChange={(event) => this.onScoreChange(event, "awayScore", this.props.id)} 
              />  
            : this.props.prediction.awayScore
          }
          {
            this.props.fixture.status === 'FINISHED' 
            ? <div>{this.props.fixture.result.goalsHomeTeam} : {this.props.fixture.result.goalsAwayTeam}</div>
            : null
          }
          {
            this.props.prediction.points !== undefined 
              ? <div>Points: {this.props.prediction.points}</div> 
              : null
          }
        </td>
        <td>{this.props.fixture.awayTeamName}</td>
      </tr>
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

let isUnique = true;

// should probablt do all this on submit
function formatDate(day: string): string {
  let formattedTime = Date.parse(`${day}`)/1000;
  formattedTime = new Date(formattedTime * 1000);
  const dayOfTheWeek = weekday[formattedTime.getDay()];
  const date = formattedTime.getDate();
  const month = formattedTime.getMonth();
  const minutes = formatMinutes(formattedTime);
  const formattedDate = `${dayOfTheWeek} ${date}/${month} ${formattedTime.getHours()}:${minutes}`;
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