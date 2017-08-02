import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Fixture extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event, homeOrAway, id) {
    const score = ensurePositiveNumber(event.target.value);
    console.log(score);
    this.props.onChange(score, homeOrAway, id);
  }

  // props will be fixture
  // take 2 team names
  // and print the tds 
  render() {
    return (
      <tr>
        <td>{this.props.home}</td>
        <td>
          {/* on change */}
          <input type="number" value={this.props.homeScore} onChange={(event) => this.onChange(event, "homeScore", this.props.id)} />
          {' - '} 
          <input type="number" value={this.props.awayScore} onChange={(event) => this.onChange(event, "awayScore", this.props.id)} />  
        </td>
        <td>{this.props.away}</td>
      </tr>
    );
  }
}

function ensurePositiveNumber(input) {
  let score = parseInt(input);
  console.log(score);
  if (score < 0) {
    score = Math.abs(score);
  }
  if (isNaN(score)) {
    score = 0;
  }
  return score;
}

Fixture.propTypes = {
  homeScore: PropTypes.number,
  awayScore: PropTypes.number,
  id: PropTypes.number,
  home: PropTypes.string,
  away: PropTypes.string,
  onChange: PropTypes.func
};

