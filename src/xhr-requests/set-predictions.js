// import React, {Component} from 'react';
import {db} from '../firebase-connect';

export default function sendPredictions(userData, gameData, predictions) {
  const refString = `/usersPredictions/${userData.id}/${gameData.season}/${gameData.gameweek}/predictions/`;
  const request = db.ref(refString);
  request.set(predictions);
}