// kind of need to make this a cron job, 
// of a lest a page I can load up to set game params

import {db} from '../firebase-connect';
import firebase from '../firebase';
import {footballDataOrg} from '../api.js';
const header = { 
  headers: { 'X-Auth-Token': footballDataOrg }
};
// request the game data, get:
// gameweek, 
export const setGame = fetch('http://api.football-data.org/v1/competitions/445/', header)
  .then(function(response) {
    // send request to the api for browser to check we're allowed
    if (response.status === 200) {
      return response.json();
    }
    else throw new Error('Something went wrong on api server!');
  })
  .then(function(response) {
    // if succesful we get data!
    // convert the array we receive into an object
    // and assign an id
    const gameweek = response.currentMatchday;

    db.ref('game').set({
      time: firebase.database.ServerValue.TIMESTAMP,
      gameweek: gameweek,
      inPlay: true
    });
  });


