import React, {Component} from 'react';

import {getTotalPoints} from '../xhr-requests.js';


export default class Leagues extends Component {
  // gets given criteria (eg total points, lastweeks points, or gameweek points)
  // get user name, team name and (if needed) gameweek 
  // should update a bit of database, and request this resource first
  constructor(props) {
    super(props);
    this.state ={
      rows: [],
      render: false
    };
    this.handlePoints = this.handlePoints.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    this.handlePoints();
  }

  handlePoints() {
    const request = getTotalPoints().then((response) => {
      const sortPoints = Object.keys(response).sort(function(a,b) {
        let first = `${response[a].points}`;
        let second = `${response[b].points}`;
        return second - first;
      });
      const outcome = {};
      outcome.sortPoints = sortPoints;
      outcome.points = response;
      return outcome;
    }).then((outcome) => {
      const result = outcome.sortPoints.map((id, index) => {
        return this.renderRow(outcome.points[id]);
      });
      return result;
    }).then((result) => {
      this.setState({
        rows: result,
        render: true
      })
    })
  }

  renderRow(user) {
    return (
      <tr style={
        this.props.uid === user.id ? divStyle : null
      } key={user.id}>
        <td>{user.name}</td>
        <td>{user.team}</td>
        <td>{user.points}</td>
      </tr>
    );
  }

  render() {
    if (!this.render) {
      return;
    }
    console.log(this.state.rows)

    return (
      <div>
        <h1>Total Points</h1>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>User</th>
              <th>Team</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {this.state.rows}
          </tbody>
        </table>
      </div>
    );
  }
}

const divStyle = {
  color: 'blue'
};