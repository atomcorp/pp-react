// @flow
import TotalPoints from '../components/total-points.js';
import {getMatchData} from '../xhr-requests.js';

type GameData = {
  canPredict: boolean,
  gameweek: number,
  season: string,
  time: number,
  totalGameweeks: number
};

export default function bootstrapGame(uid: string, gameData: GameData) {
  // https://stackoverflow.com/questions/33178738/how-to-execute-multiple-firebase-request-and-receive-a-callback-when-all-request
  const gameweek = `gameweek${gameData.gameweek}`;
    // here we make sure all the past predictions have been calculated
    // to ensure we have up-to-date points for the user
    // then we grab the current weeks fixtures and predictions 
  return new Promise((resolveData, reject) => {
    new Promise((resolve, reject) => {
      const ensureUpToDatePoints = TotalPoints(uid, gameData);
      ensureUpToDatePoints.then((result) => {
        resolve();
      })
    }).then(() => {
      Promise.all([
        getMatchData(gameData.season, 'fixtures', null, [gameweek]),
        getMatchData(gameData.season, 'predictions', uid, [gameweek])
      ]).then((data) => {
        // arrays return in order
        const dataObject = {
          fixtures: data[0][gameweek],
          predictions: data[1][gameweek]
        }
        resolveData(dataObject);
      })
    })
  });
}


