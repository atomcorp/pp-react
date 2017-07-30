import React, {Component} from 'react';

export class Fixture extends Component {
  constructor(props) {
    super(props);
    this.onPredictionChange = this.onPredictionChange.bind(this);
  }

  onPredictionChange(event, homeOrAway, id) {
    this.props.onChange(event.target.value, homeOrAway, id);
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
          <input type="number" value={this.props.homeScore} onChange={(event) => this.onPredictionChange(event, "homeScore", this.props.id)} />
          {' - '} 
          <input type="number" value={this.props.awayScore} onChange={(event) => this.onPredictionChange(event, "awayScore", this.props.id)} />  
        </td>
        <td>{this.props.away}</td>
      </tr>
    );
  }
}

