// component

import React from 'react';

import {calculateResult} from './calculate-result.jsx';

export default function PredictionsResult(props) {
  // get fixtures and results
  // compare them
  // print out result

  calculateResult(props);

  return (
    <div>Result</div>
  );
}