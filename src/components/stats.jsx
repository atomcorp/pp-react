import React from 'react';

export default function Stats(props) {
  let breakdown = {};
  const matches = Object.keys(props.results).length;
  breakdown = breakDownPredictionResults(props.results);
  return (
    <div className="stats">
      <div className="stats__points">
        <div className="stats__point">
          {props.points}
        </div>
        <div className="">
         Points
        </div>
      </div>
      <div className="stats__charts">
        <div className="stats__labels">
          <div className="stats__label">
            Star point
          </div>
          <div className="stats__label">
            3 pointers
          </div>
          <div className="stats__label">
            1 pointer
          </div>
          <div className="stats__label">
            0 pointers
          </div>
        </div>
        <div className="stats__bars">
          <div className="stats__bar stats__bar--great" data-bar={breakdown['star']} style={{width: breakdown['star'] * 100 + '%'}}>
            <span>{breakdown['star']}</span>
          </div>

          <div className="stats__bar stats__bar--good" data-bar={breakdown['3']} style={{width: breakdown['3'] / matches * 100 + '%'}}>
            <span>{breakdown['3']}</span>
          </div>
          <div className="stats__bar stats__bar--ok" data-bar={breakdown['1']} style={{width: breakdown['1'] / matches * 100 + '%'}}>
            <span>{breakdown['1']}</span>
          </div>
          <div className="stats__bar stats__bar--bad" data-bar={breakdown['0']} style={{width: breakdown['0'] / matches * 100 + '%'}}>
            <span>{breakdown['0']}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function breakDownPredictionResults(predictions: PredictionsType) {
  console.log(predictions);
  // flow doesn't like keys being numbers
  const result = {
    '3': 0,
    '1': 0,
    '0': 0,
    'star': 0
  };
  for (const id in predictions) {
    if (predictions[id].points !== null && predictions[id].points !== undefined) {
      result[predictions[id].points]++;
    }
    if (predictions[id].star) {
      if (predictions[id].points !== null && predictions[id].points !== undefined) {
        result.star++;
      }
      
    }
  }
  return result;
}