import {db} from '../firebase-connect';
import TotalPoints from '../components/total-points.js';
import {getMatchData} from '../xhr-requests.js';
export default function bootstrapGame(uid, gameData) {
  // https://stackoverflow.com/questions/33178738/how-to-execute-multiple-firebase-request-and-receive-a-callback-when-all-request
  const gameweek = `gameweek${gameData.gameweek}`;
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
        getMatchData(gameData.season, 'fixtures', null, [gameweek]),
        getMatchData(gameData.season, 'predictions', uid, [gameweek]),
        new Promise((resolve, reject) => {
          db.ref(`/users/${uid}/`).once('value').then((snapshot) => {
            resolve(snapshot.val());
          });
        })
      ]).then((data) => {
        // arrays return in order
        const dataObject = {
          fixtures: data[0][gameweek],
          predictions: data[1][gameweek],
          user: data[2],
        }
        resolveData(dataObject);
      })
    })
  });
}


