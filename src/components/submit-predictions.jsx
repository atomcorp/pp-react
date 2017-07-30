// import React from 'react';

import {results} from '../data/result.js';

// On submit this will add predictions 
export function SubmitPredictions(state) {
  debugCompareScores(state)
}

function debugCompareScores(predictions) {
  
  var score = 0;
  for (const prediction in predictions) {
    const id = prediction;
    const scores = predictions[prediction];
    if (scores.homeScore === results[id].homeResult && scores.awayScore === results[id].awayResult) {
      score += 3;
    } else if (calculateWinType(scores.homeScore, scores.awayScore) === calculateWinType(results[id].homeResult, results[id].awayResult)) {
      score += 1;
    }
    console.log(`Prediction: ${scores.homeScore} - ${scores.awayScore}. Result ${results[id].homeResult} - ${results[id].awayResult}`);
  }
  console.log(score);
}

function calculateWinType(home, away) {
  if (home > away) {
    return 'home';
  } else if (home < away) {
    return 'away';
  } else {
    return 'draw'
  }
}