// import React, {Component} from 'react';
import {db} from '../firebase-connect';

export default function sendPredictions(uid, gameData, predictions) {
  const refString = `/usersPredictions/${uid}/season${gameData.season}/gameweek${gameData.gameweek}/predictions/`;
  const request = db.ref(refString);
  console.log(uid, refString);
  request.set(predictions);
}