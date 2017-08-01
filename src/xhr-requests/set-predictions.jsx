// import React, {Component} from 'react';
import firebase from '../firebase';

export default function sendPredictions(userData, predictions) {
  const refString = `/users/${userData.id}/${userData.season}/${userData.gameweek}/`;
  const request = firebase.database().ref(refString);
  const arrayPredictions = Object.keys(predictions).map(key => predictions[key]);
  request.set(predictions);
}