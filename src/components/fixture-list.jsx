import React from 'react';

import {Fixture} from './fixture.jsx';

export function FixtureList(props) {

  const fixtures = props.fixtures.map((fixture) => {
    return <Fixture id={fixture.id} key={fixture.id} home={fixture.home} away={fixture.away} />;
  });

  // this will need to print one fixture for length of fixture list
  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Home</th>
          <th>Prediction</th>
          <th>Away</th>
        </tr>
      </thead>
      <tbody> 
        {fixtures}
      </tbody>
    </table>
  );
}
