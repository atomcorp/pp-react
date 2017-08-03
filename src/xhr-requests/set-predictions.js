// import React, {Component} from 'react';
import firebase from '../firebase';

export default function sendPredictions(userData, gameData, predictions) {
  const refString = `/usersPredictions/${userData.id}/${gameData.season}/${gameData.gameweek}/predictions/`;
  const request = firebase.database().ref(refString);
  request.set(predictions);
}