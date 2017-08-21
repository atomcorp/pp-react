// 3 possibilites: predicted, not predicted, ...

// get total matchdays
// get current gameweek
// check 2017computed/uid/gameweeks prior to current gameweek (req)
// if any false collect ids (eg gameweek4)
//  check the gameweek predictions (eg 2017-gameweek4/uid) (req)
//    if empty, mark '2017computed' true and score 0 points (req)
//    else, calculate the result, update '2017results' and mark '2017computed' true (req)
//      check '2017results' (req)
//      if not populated, add data from football api  (req)
//      else pull in
// if any true, ignore
// update users score (req)
import {compareScores} from './calculate-result.jsx';
import {
  checkResultsComputed,
  updateComputedResults,
  updateComputedPoints,
  updateComputedPredictions,
  updateUsersPoints,
  getMatchData
} from '../xhr-requests.js';

export default function TotalPoints(uid, gameData) {
  const season = gameData.season;
  let gameweeksToCheck = gameData.gameweek > 1 ? gameData.gameweek - 1 : 1;
  return checkResultsComputed(season, uid).then((computedResult) => {
    if (computedResult === null) {
      // literally nothing,
      // get all fixtures and results
      return Promise.all([
        getMatchData(season, 'fixtures').then((fixtureResults) => {
          return fixtureResults;
        }),
        getMatchData(season, 'predictions', uid).then((predictionsResults) => {
          return predictionsResults;
        })
      ]).then((promises) => {
        return checkAllPredictions(promises[0], promises[1]);
      });
    } else {
      // grab any weeks that are missing, push into array
      const weeksToCalculate = [];
      for (var i = 1; i <= gameweeksToCheck; i++) {
        if (!computedResult[`gameweek${i}`]) {
          weeksToCalculate.push(`gameweek${i}`);
        }
      }
      if (weeksToCalculate.length) {
        return Promise.all([
          getMatchData(season, 'predictions', uid, weeksToCalculate).then((fixtureResults) => {
            return fixtureResults;
          }),
          getMatchData(season, 'fixtures', null, weeksToCalculate).then((predictionsResults) => {
            return predictionsResults;
          })
        ]).then((promises) => {
          return checkAllPredictions(promises[0], promises[1]);
        });
      }
    }
  }).then((computedScores) => {
    if (!computedScores) {
      return;
    }
    const predictions = {};
    const scores = {};
    const updated = {};
    for (const id in computedScores) {
      if (computedScores[id]) {
        predictions[id] = computedScores[id].predictions;
        scores[id] = computedScores[id].score;
        updated[id] = true;
      }
    }
    updateComputedResults(uid, season, updated);
    updateComputedPoints(uid, season, scores);
    updateComputedPredictions(uid, season, predictions);
  }).then(() => {
    gameweeksToCheck = gameweeksToCheck ? `gameweek${gameweeksToCheck}` : null
    updateUsersPoints(uid, season, gameweeksToCheck);
    return true;
  });
}


/*
* @param {Object} fixtures
* @param {Object} predictions
* @returns {Object} score and updated predictions for each gameweek
* note: the returned predictions object has had scores added to it
*/
function checkAllPredictions(fixtures, predictions) {
  const resultsToUpload = {};
  // go through the predictions
  for (const gameweek in predictions) {
    resultsToUpload[gameweek] = compareScores(predictions[gameweek], fixtures[gameweek]);
  }
  // this has 
  return resultsToUpload;
}