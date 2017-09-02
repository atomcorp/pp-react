// @flow
import {db} from './firebase-connect';
import firebase from './firebase';
import type {PredictionsType} from './types.js';

// grab the game setting data we need,
// gets current gameweek and season
export function bootstrapApp(uid: string) {
  return Promise.all([
    db.ref(`/game`).once('value').then((snapshot) => {
      return snapshot.val();
    }),
    db.ref(`/users/${uid}`).once('value').then((snapshot) => {
      return snapshot.val();
    })
  ]).then((result) => {
      const resolve = {
        game: result[0],
        player: result[1]
      }
      return resolve;
    })
};

type Result = {
  currentMatchday: number,
  year: string,
  numberOfMatchdays: number
};

export const updateGame = function(result: Result) {
  db.ref('game').set({
    time: firebase.database.ServerValue.TIMESTAMP,
    gameweek: result.currentMatchday,
    season: result.year,
    totalGameweeks: result.numberOfMatchdays
  });
}

export function checkUserResults(uid: string, gameweek: number) {
  const userRefString = `/2017-gameweek1/jl0WOxfgipe0IiavUyfbdjBOPmp1/predicted`;
  db.ref(userRefString).on('value', (snapshot) => {

  })
}

/*
* @params: uid [String]
* Return an object with {gameweek*: true/false}
*/
export function checkResultsComputed(season: string, uid: string) {
  const computedResultURL = `/${season}computed/${uid}/`;
  const computedResultsRef = db.ref(computedResultURL); 
  return computedResultsRef.once('value').then((snapshot) => {
    return snapshot.val();
  });
} 

/*
* @param {string} uid
* @param {Number} season
* @param {Object} updated {gameweek1: true, etc}
* note: the returned predictions object has had scores added to it
*/
type Computed = {
  [key: string]: boolean
}
export const updateComputedResults = function(uid: string, season: string, updated: Computed) {
  const updateComputedRef = {};
  for (const id in updated) {
    updateComputedRef[`/${season}computed/${uid}/${id}`] = updated[id];
  }
  
  db.ref().update(updateComputedRef);
}

/*
* @param {string} uid
* @param {Number} season
* @param {Object} points
* @returns {Object} score and updated predictions for each gameweek
* note: the returned predictions object has had scores added to it
*/
export const updateComputedPoints = function(uid: string, season: string, points: {[key: string]: number}) {
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
export const updateComputedPredictions = function(uid: string, season: string, predictions: PredictionsType) {
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
export const updateUsersPoints = function(uid: string, season: string, lastweek: string = '') {
  // first get current user points
  // then update 
  db.ref(`/${season}points/${uid}`).once('value').then((snapshot) => {
    const request = snapshot.val();
    const data = {};
    let score = 0;
    for (const result in request) {
      score += request[result];
    }
    if (lastweek && request) {
      data.lastWeeksPoints = request[lastweek];
    }
    data.score = score;
    return data;
  }).then((data) => {
    if (!data) {
      return;
    }
    const updateUsersPointsRef ={};
    updateUsersPointsRef[`/users/${uid}/points`] = data.score;
    if (data.lastWeeksPoints !== undefined) {
      updateUsersPointsRef[`/users/${uid}/lastWeeksPoints`] = data.lastWeeksPoints;
    }
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
export function getMatchData(season: string, dataType: string, uid: string = '', gameweeks: Array<string> = []) {
  const fixturesRef = db.ref(`/${season}fixtures/`);
  const predictionsRef = db.ref(`/${season}predictions/${uid}/`);
  const ref = (dataType === 'fixtures') ? fixturesRef : predictionsRef;
  const matchData = {};

  return ref.once('value').then((snapshot) => {
    const request = snapshot.val();
    if (!request) {
      return {};
    }
    if (gameweeks.length) {
      if (!Array.isArray(gameweeks)) {console.log('Gameweeks must be array')};
      for (var i = 0; i < gameweeks.length; i++) {
        matchData[gameweeks[i]] = request[gameweeks[i]];
      }
      return matchData;
    }
    // send all the games
    return request;
  });
}

export function sendPredictions(uid: string, season: string, week: number, predictions: PredictionsType) {
  const refs = {};
  // refs[`${gameData.season}gameweek${gameData.gameweek}/${uid}`] = predictions;
  refs[`${season}predictions/${uid}/gameweek${week}`] = predictions;
  db.ref().update(refs, function(error) {
    if (error) {
      console.log("Error updating data:", error);
    }
  })
}

/**
 * @param {String} uid
 * @param {String} season
 * @param {String} [uid] 
 * @param {String} [gameweek] <eg 'gameweek1'>
 * @return {Promise} Object {gameweek: number}
 * Either a selection or all
 * see: https://stackoverflow.com/a/38193091/2368141
 */
export function getGameweekPoints(uid: string, season: string, gameweek: string) {
  return db.ref(`/${season}points/${uid}`).once('value').then((snapshot) => {
    const request = snapshot.val();
    if (!request) {
      return null;
    }
    const points = request[gameweek];
    return points;
  })
}

// really
export function getUsers() {
  return db.ref(`/users/`).once('value').then((snapshot) => {
    const request = snapshot.val();
    if (!request) {
      return null;
    }
    return request;
  })
}

