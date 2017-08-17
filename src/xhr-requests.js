import {db} from './firebase-connect';
import firebase from './firebase';

const gameRefString = `/game`;
const game = db.ref(gameRefString);

// grab the game setting data we need,
// gets current gameweek and season
export const bootstrapGame = new Promise((resolve, reject) => {
  game.once('value').then((snapshot) => {
    resolve(snapshot.val());
  });
});

export const updateGame = function(result) {
  db.ref('game').set({
    time: firebase.database.ServerValue.TIMESTAMP,
    gameweek: result.currentMatchday,
    season: result.year,
    totalGameweeks: result.numberOfMatchdays
  });
}

export function checkUserResults(uid, gameweek) {
  const userRefString = `/2017-gameweek1/jl0WOxfgipe0IiavUyfbdjBOPmp1/predicted`;
  db.ref(userRefString).on('value', (snapshot) => {
    console.log(snapshot.exists());
  })
}

/*
* @params: uid [String]
* Return an object with {gameweek*: true/false}
*/

export function checkResultsComputed(season, uid) {
  const computedResultURL = `/${season}computed/${uid}/`;
  const computedResultsRef = db.ref(computedResultURL); 
  return computedResultsRef.once('value').then((snapshot) => {
    return snapshot.val();
  });
} 

// todo: gameweek should be able to recieve an array of weeks
export function getFixtures(season, gameweek) {
  let fixturesURL = `/${season}fixtures/`;
  (gameweek) ? `${fixturesURL}gameweek${gameweek}` : null;
  const fixturesRef = db.ref(fixturesURL); 
  return fixturesRef.once('value').then((snapshot) => {
    return snapshot.val();
  });
}

// todo: gameweek should be able to recieve an array of weeks
export function getPredictions(uid, season, gameweek) {
  let predictionsURL = `/${season}predictions/${uid}/`;
  (gameweek) ? `${predictionsURL}gameweek${gameweek}` : null;
  const predictionsRef = db.ref(predictionsURL); 
  return predictionsRef.once('value').then((snapshot) => {
    return snapshot.val();
  });
}

/*
* @param {string} uid
* @param {Number} season
* @param {Boolean} points
* @returns {Object} score and updated predictions for each gameweek
* note: the returned predictions object has had scores added to it
*/
export const updateComputedResults = function(uid, season, boolean) {
  const updateComputedRef = {};
  updateComputedRef[`/${season}computed/${uid}/`] = boolean;
  db.ref().update(updateComputedRef);
}

/*
* @param {string} uid
* @param {Number} season
* @param {Object} points
* @returns {Object} score and updated predictions for each gameweek
* note: the returned predictions object has had scores added to it
*/
export const updateComputedPoints = function(uid, season, points) {
  const updateComputedRef = {};
  updateComputedRef[`/${season}points/${uid}/`] = points;
  db.ref().update(updateComputedRef);
}

/*
* @param {string} uid
* @param {Number} season
* @param {Object} predictions
* @returns {Object} score and updated predictions for each gameweek
* note: the returned predictions object has had scores added to it
*/
export const updateComputedPredictions = function(uid, season, predictions) {
  const updateComputedRef = {};
  updateComputedRef[`/${season}predictions/${uid}/`] = predictions;
  db.ref().update(updateComputedRef);
}



