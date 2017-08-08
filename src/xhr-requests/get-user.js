import {db} from '../firebase-connect';

export default function getUser(uid, callback) {
  // https://stackoverflow.com/questions/33178738/how-to-execute-multiple-firebase-request-and-receive-a-callback-when-all-request
  const userRefString = `/users/${uid}/`;
  const user = db.ref(userRefString);

  const cancelablePromise = makeCancelable(
    new Promise((resolve, reject) => {
        user.on('value', (snapshot) => {
          resolve(snapshot.val());
        })
      }).then((data) => {
        callback(data);
      })
  );

  cancelablePromise
    .promise
    .then(() => console.log('resolved'))
    .catch((reason) => console.log('isCanceled', reason.isCanceled));

  cancelablePromise.cancel(); // Cancel the promise

}

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