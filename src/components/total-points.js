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
        if (Object.keys(promises[1]).length === 0) {
          return null; // no predictions made
        }
        return checkAllPredictions(promises[0], promises[1], gameweeksToCheck);
      });
    } else {
      // grab any weeks that are missing, push into array
      const weeksToCalculate = [];
      for (let i = 1; i < gameweeksToCheck + 1; i++) {
        if (!computedResult[`gameweek${i}`]) {
          weeksToCalculate.push(`gameweek${i}`);
        }
      }
      if (weeksToCalculate.length) {
        return Promise.all([
          getMatchData(season, 'fixtures', null, weeksToCalculate).then((predictionsResults) => {
            return predictionsResults;
          }),
          getMatchData(season, 'predictions', uid, weeksToCalculate).then((fixtureResults) => {
            return fixtureResults;
          }),
        ]).then((promises) => {
          return checkAllPredictions(promises[0], promises[1], gameweeksToCheck);
        });
      }
    }
  }).then((computedScores) => {
    if (!computedScores) {
      return null;
    }
    const predictions = {};
    const scores = {};
    const updated = {};
    for (const id in computedScores) {
      updated[id] = true;
      if (computedScores[id]) {
        predictions[id] = computedScores[id].predictions;
        scores[id] = computedScores[id].score;
      }
    }
    console.log(updated)
    if (Object.keys(updated).length !== 0) { updateComputedResults(uid, season, updated)};
    if (Object.keys(scores).length !== 0) { updateComputedPoints(uid, season, scores)};
    if (Object.keys(predictions).length !== 0) { updateComputedPredictions(uid, season, predictions)};
  }).then((reject) => {
    gameweeksToCheck = gameweeksToCheck ? `gameweek${gameweeksToCheck}` : null;
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
function checkAllPredictions(fixtures, predictions, gameweeksToCheck) {
  const resultsToUpload = {};
  // go through the predictions
  for (const gameweek in predictions) {
    if (predictions[gameweek] === undefined) {
      resultsToUpload[gameweek] = null;
    } else if (parseInt(gameweek.slice(gameweek.length - 1)) <= gameweeksToCheck ) {
      resultsToUpload[gameweek] = compareScores(predictions[gameweek], fixtures[gameweek]);
    }
    
  }
  // this has 
  return resultsToUpload;
}