import {db} from '../firebase-connect';

import {footballDataOrg} from '../api.js';

export default function getFixturesFromFirebase(uid, gameData, callback) {
  const header = { 
    headers: { 'X-Auth-Token': footballDataOrg }
  };


  // https://stackoverflow.com/questions/33178738/how-to-execute-multiple-firebase-request-and-receive-a-callback-when-all-request
  const predictionsRefString = `/usersPredictions/${uid}/${gameData.season}/${gameData.gameweek}/predictions`;
  const predictions = db.ref(predictionsRefString);

  const cancelablePromise = makeCancelable(
    // this all mighty mess makes 
    // 1. call to football-data for fixtures
    // 2. call to firebase for predictions (if available)
    Promise.all([
      fetch('http://api.football-data.org/v1/competitions/445/fixtures/?matchday=1', header)
        .then(function(response) {
          // send request to the api for browser to check we're allowed
          if (response.status === 200) {
            return response.json();
          }
          else throw new Error('Something went wrong on api server!');
        })
        .then(function(response) {
          // if succesful we get data!
          // convert the array we receive into an object
          // and assign an id
          const fixtures = response.fixtures.reduce(function(obj, item, index) {
            // obj is the {} at the end of reduce
            // each loop adds a new obj
            obj = Object.assign(obj, {[`fixture${index}`]: item})
            return obj;
          }, {});
          return fixtures;
        }),
      new Promise((resolve, reject) => {
        predictions.on('value', (snapshot) => {
          resolve(snapshot.val());
        })
      }),
    ]).then((data) => {
    // arrays return in order
      const dataObject = {
        fixtures: data[0],
        predictions: data[1]
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

