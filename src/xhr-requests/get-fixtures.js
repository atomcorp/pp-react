import {db} from '../firebase-connect';

import {FB_DATA_API} from '../api.js';

export default function getFixturesFromFirebase(uid, gameData, callback) {
  const header = { 
    headers: { 'X-Auth-Token': FB_DATA_API }
  };
  
  // https://stackoverflow.com/questions/33178738/how-to-execute-multiple-firebase-request-and-receive-a-callback-when-all-request
  const predictionsRefString = `/${gameData.season}-gameweek${gameData.gameweek}/${uid}`;
  const predictions = db.ref(predictionsRefString);
  const fixturesRefString = `/${gameData.season}fixtures/gameweek${gameData.gameweek}`;
  const fixtures = db.ref(fixturesRefString);
  const userRefString = `/users/${uid}/`;
  const user = db.ref(userRefString);
  const premierLeagueData = 'http://api.football-data.org/v1/competitions/445';

  const cancelablePromise = makeCancelable(
    // this all mighty mess makes 
    // 1. call to football-data for fixtures
    // 2. call to firebase for predictions (if available)

    Promise.all([
      new Promise((resolve, reject) => {
        fixtures.once('value').then((snapshot) => {
          resolve(snapshot.val());
        });
      }),
      new Promise((resolve, reject) => {
        predictions.once('value').then((snapshot) => {
          resolve(snapshot.val());
        });
      }),
      new Promise((resolve, reject) => {
        user.once('value').then((snapshot) => {
          resolve(snapshot.val());
        });
      })
    ]).then((data) => {
      // arrays return in order
      const dataObject = {
        fixtures: data[0],
        predictions: data[1],
        user: data[2],
      }
      callback(dataObject);
    })
  );

  cancelablePromise
    .promise
    .then(() => console.log('resolved'))
    .catch((reason) => console.log('isCanceled', reason.isCanceled));

  cancelablePromise.cancel(); // Cancel the promise

}

// Fix for warning:
// "Can only update a mounted or mounting component. This usually means you called setState() on an unmounted component. 
// This is a no-op. Please check the code for the <ComponentName> component.""
// https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
const makeCancelable = (promise) => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
      error => hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};

