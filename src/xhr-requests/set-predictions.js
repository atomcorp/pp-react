// import React, {Component} from 'react';
import {db} from '../firebase-connect';

export default function sendPredictions(uid, gameData, predictions) {
  const refString = `/usersPredictions/${uid}/${gameData.season}/${gameData.gameweek}/predictions/`;
  const request = db.ref(refString);
  console.log(uid, refString);
  request.set(predictions);
}