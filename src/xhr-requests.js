import {FB_DATA_API} from './api.js';
import {db} from './firebase-connect';
import firebase from './firebase';
const leagueData = 'http://api.football-data.org/v1/competitions/445';

const header = { 
  headers: { 'X-Auth-Token': FB_DATA_API }
};

// grab the game setting data we need,
// gets current gameweek and season
export const bootstrapGame = fetch(`${leagueData}`, header).then(function(response) {
  // send request to the api for browser to check we're allowed
  if (response.status === 200) {
    return response.json();
  }
  else throw new Error('Something went wrong on api server!');
});

export const updateGame = function(gameweek, season) {
  db.ref('game').set({
    time: firebase.database.ServerValue.TIMESTAMP,
    gameweek: gameweek,
    season: season
  });
}



