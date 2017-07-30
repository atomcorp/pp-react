import React, { Component } from 'react';

export class Fixture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prediction: {
        home: 0,
        away: 0
      }
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(event, team) {
    const score = parseInt(event.target.value, 10);
    // https://stackoverflow.com/a/38779819/2368141
    this.setState((prevState) => {
      prevState.prediction[team] = score;
      return prevState;
    })
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
          <input type="number" value={this.state.prediction.home} onChange={(event) => this.onChange(event, "home")} />
          - 
          <input type="number" value={this.state.prediction.away} onChange={(event) => this.onChange(event, "away")} />  
        </td>
        <td>{this.props.away}</td>
      </tr>
    );
  }
}

