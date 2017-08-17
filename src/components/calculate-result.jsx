// Component

export function calculateResult(props) {
  const score = compareScores(props.predictions, props.fixtures);
  return score;
}

export function compareScores(predictions, results) {
  let cumulativeScore = 0;
  for (const id in predictions) {
    // ensure there are actuall results, otherwise quit
    if (results[id].status !== "FINISHED") {
      return null;
    }
    let score = 0;
    const scores = predictions[id];
    if (scores.homeScore === results[id].result.goalsHomeTeam && scores.awayScore === results[id].result.goalsAwayTeam) {
      score = 3;
    } else if (calculateWinType(scores.homeScore, scores.awayScore) === calculateWinType(results[id].result.goalsHomeTeam, results[id].result.goalsAwayTeam)) {
      score = 1;
    }
    cumulativeScore += score;
    // const test = `${results[id].home} v ${results[id].away}: ${results[id].result.goalsHomeTeam}:${scores.awayScore} | ${scores.homeScore}:${results[id].result.goalsAwayTeam}`;
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