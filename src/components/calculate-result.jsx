// Component

export function calculateResult(props) {
  const score = compareScores(props.predictions, props.fixtures);
  return score;
}

function compareScores(predictions, results) {
  
  let cumulativeScore = 0;
  for (const prediction in predictions) {
    let score = 0;
    const id = prediction;
    const scores = predictions[id];
    if (scores.homeScore === results[id].homeScore && scores.awayScore === results[id].awayScore) {
      score = 3;
    } else if (calculateWinType(scores.homeScore, scores.awayScore) === calculateWinType(results[id].homeScore, results[id].awayScore)) {
      score = 1;
    }
    cumulativeScore += score;
    // const test = `${results[id].home} v ${results[id].away}: ${results[id].homeScore}:${scores.awayScore} | ${scores.homeScore}:${results[id].awayScore}`;
    predictions[id].points = score;
  }
  return cumulativeScore;
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