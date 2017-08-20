import {db} from './firebase-connect';
import firebase from './firebase';

const gameRefString = `/game`;
const game = db.ref(gameRefString);

// grab the game setting data we need,
// gets current gameweek and season
export const bootstrapApp = new Promise((resolve, reject) => {
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

/*
* @param {string} uid
* @param {Number} season
* 
*/
export const updateUsersPoints = function(uid, season) {
  // first get current user points
  // then update 
  const usersPointsURL = `/${season}points/${uid}`;
  const usersURL = `/users/${uid}/points`;
  db.ref(usersPointsURL).once('value').then((snapshot) => {
    const request = snapshot.val();
    let score = 0;
    for (const result in request) {
      score += request[result];
    }
    return score;
  }).then((points) => {
    const updateUsersPointsRef ={};
    updateUsersPointsRef[usersURL] = points;
    db.ref().update(updateUsersPointsRef);
  });
}

/**
 * @param {Number} [season] [eg 2017]
 * @param {String} [dataType] ['fixtures' or 'predictions']
 * @param {String} [uid] 
 * @param {Array} [gameweek] [eg ['gameweek1', gameweek2']]
 * @return {Promise} Object of fixtures, 
 * Either a selection or all
 * see: https://stackoverflow.com/a/38193091/2368141
 */
export function getMatchData(season, dataType, uid = null, gameweeks = null) {
  const fixturesRef = db.ref(`/${season}fixtures/`);
  const predictionsRef = db.ref(`/${season}predictions/${uid}/`);
  const ref = (dataType === 'fixtures') ? fixturesRef : predictionsRef;
  const matchData = {};

  return ref.once('value').then((snapshot) => {
    const request = snapshot.val();
    if (gameweeks) {
      if (!Array.isArray(gameweeks)) {console.log('Gameweeks must be array')};
      for (var i = 0; i < gameweeks.length; i++) {
        matchData[gameweeks[i]] = request[gameweeks[i]];
      }
      // send down selection of games
      
      return matchData;
    }
    // send all the games
    return request;
  });
}

export function sendPredictions(uid, gameData, predictions) {
  const refs = {};
  // refs[`${gameData.season}gameweek${gameData.gameweek}/${uid}`] = predictions;
  refs[`${gameData.season}predictions/${uid}/gameweek${gameData.gameweek}`] = predictions;
  db.ref().update(refs, function(error) {
    if (error) {
      console.log("Error updating data:", error);
    }
  })
}

