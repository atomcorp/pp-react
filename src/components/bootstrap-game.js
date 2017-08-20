import {db} from '../firebase-connect';
import TotalPoints from '../components/total-points.js';

export default function bootstrapGame(uid, gameData) {
  // https://stackoverflow.com/questions/33178738/how-to-execute-multiple-firebase-request-and-receive-a-callback-when-all-request
  const predictionsRefString = `/${gameData.season}predictions/${uid}/gameweek${gameData.gameweek}/`;
  const predictions = db.ref(predictionsRefString);
  const fixturesRefString = `/${gameData.season}fixtures/gameweek${gameData.gameweek}`;
  const fixtures = db.ref(fixturesRefString);
  const userRefString = `/users/${uid}/`;
  const user = db.ref(userRefString);
    // this all mighty mess makes 
    // 1. call to football-data for fixtures
    // 2. call to firebase for predictions (if available)
  return new Promise((resolveData, reject) => {
    new Promise((resolve, reject) => {
      const ensureUpToDatePoints = TotalPoints(uid, gameData);
      ensureUpToDatePoints.then((result) => {
        resolve();
      })
    }).then(() => {
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
        resolveData(dataObject);
      })
    })
  });


}


