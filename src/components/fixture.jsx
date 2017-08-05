import React, {Component} from 'react';

export class Fixture extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.colour = this.colour.bind(this);
  }

  componentDidMount() {

  }

  colour(points) {
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

  onChange(event, homeOrAway, id) {
    const score = ensurePositiveNumber(event.target.value);
    this.props.onChange(score, homeOrAway, id);
  }

  // props will be fixture
  // take 2 team names
  // and print the tds 
  render() {
    return (
        <tr style={{backgroundColor: this.colour(this.props.points)}}>
          <td>{formatDate(this.props.date, this.props.time)}</td>
          <td>{this.props.home}</td>
          <td>
            {this.props.homeResult}
            <input type="number" value={this.props.homeScore} onChange={(event) => this.onChange(event, "homeScore", this.props.id)} />
            {' - '} 
            <input type="number" value={this.props.awayScore} onChange={(event) => this.onChange(event, "awayScore", this.props.id)} />  
            {this.props.awayResult}
          </td>
          <td>{this.props.away}</td>
        </tr>
    );
  }
}

var weekday = new Array(7);
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

let isUnique = true;

// should probablt do all this on submit
function formatDate(day, time) {
  let formattedTime = Date.parse(`${day} ${time}`)/1000;
  formattedTime = new Date(formattedTime * 1000);
  const dayOfTheWeek = weekday[formattedTime.getDay()];
  const date = formattedTime.getDate();
  const formattedDate = `${dayOfTheWeek} ${date} ${time}`;
  if (isUnique && isUnique !== formattedDate) {
    isUnique = formattedDate;
    return formattedDate;
  } 
}

// todo: user can still input a dot (.) after a number
// but this isn't carried over to DB
function ensurePositiveNumber(input) {
  let score = parseInt(input, 10);
  if (score < 0) {
    score = Math.abs(score);
  }
  if (isNaN(score)) {
    score = 0;
  }
  return score;
}