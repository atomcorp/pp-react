import React, { Component } from 'react';
import './App.css';
// fixtures is an array of fixture objects
import fixtures from './data/fixtures.js';

class App extends Component {

  render() {
    return (
      // we will return 
      // - <FixtureList />
      // --- <Fixture />
      // ----- Home & Away Team 
      <div className="container">
        <div className="fixture-list">
          <FixtureList fixtures={fixtures} />
        </div>
      </div>
    );
  }
}

function FixtureList(props) {

  const fixtures = props.fixtures.map((fixture) => {
    return <Fixture key={fixture.id} home={fixture.home} away={fixture.away} />;
  });

  // this will need to print one fixture for length of fixture list
  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Home</th>
          <th></th>
          <th></th>
          <th>Away</th>
        </tr>
      </thead>
      <tbody> 
        {fixtures}
      </tbody>
    </table>
  );
}

function Fixture(props) {
  // props will be fixture
  // take 2 team names
  // and print the tds 
  return (
    <tr>
      <td>{props.home}</td>
      <td>0</td>
      <td>0</td>
      <td>{props.away}</td>
    </tr>
  );
}


export default App;
