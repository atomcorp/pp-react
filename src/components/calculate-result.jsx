// @flow

import type {PredictionType} from '../types.js';

type Results = {
  [id: string]: {
    result: {
      goalsHomeTeam: number,
      goalsAwayTeam: number
    }
  }
};

export function compareScores(predictions: PredictionType, results: Results) {
  let cumulativeScore = 0;
  for (const id in predictions) {
    // ensure there are actuall results, otherwise quit
    if (results[id].status !== "FINISHED") {
      return null;
    }
    let score = 0;
    const prediction = predictions[id];
    if (prediction.homeScore === results[id].result.goalsHomeTeam && prediction.awayScore === results[id].result.goalsAwayTeam) {
      score = 3;
    } else if (calculateWinType(prediction.homeScore, prediction.awayScore) === calculateWinType(results[id].result.goalsHomeTeam, results[id].result.goalsAwayTeam)) {
      score = 1;
    }
    // const test = `${results[id].home} v ${results[id].away}: ${results[id].result.goalsHomeTeam}:${scores.awayScore} | ${scores.homeScore}:${results[id].result.goalsAwayTeam}`;
    if (prediction.star) {
      score = score * 2;
    }
    cumulativeScore += score;
    predictions[id].points = score;
  }
  const outcome = {
    predictions: predictions,
    score: cumulativeScore
  };
  return outcome;
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