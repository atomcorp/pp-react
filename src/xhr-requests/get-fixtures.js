import {db} from '../firebase-connect';

export default function getFixturesFromFirebase(uid, gameData, callback) {

  // https://stackoverflow.com/questions/33178738/how-to-execute-multiple-firebase-request-and-receive-a-callback-when-all-request
  const fixturesRefString = `/${gameData.season}/${gameData.gameweek}/`;
  const predictionsRefString = `/usersPredictions/${uid}/${gameData.season}/${gameData.gameweek}/predictions`;
  const fixtures = db.ref(fixturesRefString);
  const predictions = db.ref(predictionsRefString);

  const cancelablePromise = makeCancelable(
    Promise.all([
        new Promise((resolve, reject) => {
          fixtures.on('value', (snapshot) => {
            resolve(snapshot.val());
          })
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

