// import React, {Component} from 'react';
import {db} from '../firebase-connect';

// export default function sendPredictions(uid, gameData, predictions) {
//   const refString = `/usersPredictions/${uid}/season${gameData.season}/gameweek${gameData.gameweek}/predictions/`;
//   const request = db.ref(refString);
//   console.log(uid, refString);
//   request.set(predictions);
// }

export default function sendPredictions(uid, gameData, predictions) {
  const refs = {};
  refs[`${gameData.season}gameweek${gameData.gameweek}/${uid}`] = predictions;
  refs[`${gameData.season}predictions/${uid}/gameweek${gameData.gameweek}`] = true;
  db.ref().update(refs, function(error) {
    if (error) {
      console.log("Error updating data:", error);
    }
  })
}