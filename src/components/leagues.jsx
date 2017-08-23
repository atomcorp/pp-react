import React, {Component} from 'react';

export default class Leagues extends Component {
  // gets given criteria (eg total points, lastweeks points, or gameweek points)
  // get user name, team name and (if needed) gameweek 
  // should update a bit of database, and request this resource first

  render() {
    return (
      <div>
        Gameweek $, Total Points(!), Last weeks points
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Team</th>
              <th>Points</th>
              <th>Away</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Display points</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}