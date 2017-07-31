import React, {Component} from 'react';
import firebase from '../firebase';

export default function sendPredictions(userData) {
  console.log('y', userData);
  const refString = `/users/${userData.id}/${userData.season}/${userData.gameweek}/`;
  const request = firebase.database().ref(refString);
  request.set(userData.predictions);
}