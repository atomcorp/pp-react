// import React, {Component} from 'react';
import firebase from '../firebase';

export default function sendPredictions(userData) {
  const refString = `/users/${userData.id}/${userData.season}/${userData.gameweek}/`;
  const request = firebase.database().ref(refString);
  const arrayPredictions = Object.keys(userData.predictions).map(key => userData.predictions[key]);
  console.log(arrayPredictions);
  request.set(arrayPredictions);
}