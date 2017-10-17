// @flow

import React, {Component} from 'react';
import Player from '../components/player-info.jsx';
import {getUsers} from '../xhr-requests.js';
import type {PlayerType, GameType} from '../types.js'; 

type Props = {
  canRender: boolean,
  player: PlayerType,
  game: GameType
};

type State = {
  rows: ?Array<any>,
  render: boolean
};

export default class Leagues extends Component<void, Props, State> {
  state: State
  // gets given criteria (eg total points, lastweeks points, or gameweek points)
  // get user name, team name and (if needed) gameweek 
  // should update a bit of database, and request this resource first
  constructor(props: Props) {
    super(props);
    this.state ={
      rows: [],
      render: false
    };
    console.log(props);
    (this:any).handlePoints = this.handlePoints.bind(this);
    (this:any).renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    this.handlePoints();
  }

  handlePoints() {
    getUsers().then((response) => {
      const sortPoints = Object.keys(response).sort(function(a,b) {
        let first = response[a].points;
        let second = response[b].points;
        return second - first;
      });
      const outcome = {};
      outcome.sortPoints = sortPoints;
      outcome.points = response;
      return outcome;
    }).then((outcome) => {
      console.log(outcome);
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

  renderRow(user: PlayerType) {
    return (
      <tr key={user.id} style={
        this.props.player.id === user.id ? divStyle : null
      }>
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

    return (
      <section className="main">
        <Player 
          gameData={this.props.gameData}
          player={this.props.player}
        />
        <div className="league">
          <div className="league__header">
            Total Points
          </div>
          <div className="league__table">
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
        </div>
      </section>
    );
  }
}

const divStyle = {
  color: '#fff',
  background: '#729871'
};