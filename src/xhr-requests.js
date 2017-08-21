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
* @param {String} [gameweek] [eg 'gameweek1']
* get all season points, add together, then post to user
*/
export const updateUsersPoints = function(uid, season, gameweek = null) {
  // first get current user points
  // then update 
  db.ref(`/${season}points/${uid}`).once('value').then((snapshot) => {
    const request = snapshot.val();
    const data = {};
    let lastWeeksPoints = null;
    if (gameweek) {
      lastWeeksPoints = request[gameweek];
    }
    let score = 0;
    for (const result in request) {
      score += request[result];
    }
    data.lastWeeksPoints = lastWeeksPoints;
    data.score = score;
    return data;
  }).then((data) => {
    const updateUsersPointsRef ={};
    updateUsersPointsRef[`/users/${uid}/points`] = data.score;
    updateUsersPointsRef[`/users/${uid}/lastWeeksPoints`] = data.lastWeeksPoints ? data.lastWeeksPoints : null;
    db.ref().update(updateUsersPointsRef);
  });
}

/**
 * @param {Number} [season] [eg 2017]
 * @param {String} [dataType] ['fixtures' or 'predictions']
 * @param {String} [uid] 
 * @param {Array} [gameweek] [eg ['gameweek1', gameweek2']]
 * @return {Promise} Object
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
    if (!request) {
      return {};
    }
    if (gameweeks) {
      if (!Array.isArray(gameweeks)) {console.log('Gameweeks must be array')};
      for (var i = 0; i < gameweeks.length; i++) {
        if (request[gameweeks[i]]) {
          matchData[gameweeks[i]] = request[gameweeks[i]];
        }
      }
      return matchData;
    }
    // send all the games
    return request;
  });
}

export function sendPredictions(uid, season, week, predictions) {
  const refs = {};
  // refs[`${gameData.season}gameweek${gameData.gameweek}/${uid}`] = predictions;
  refs[`${season}predictions/${uid}/gameweek${week}`] = predictions;
  db.ref().update(refs, function(error) {
    if (error) {
      console.log("Error updating data:", error);
    }
  })
}

export function getGameweekPoints(uid, season, gameweek) {
  // return db.ref(`/${season}points/${uid}`).once('value').then((snapshot) => {
  //   const request = snapshot.val();
  //   const points = request[gameweek];
  //   return points;
  // })
}

