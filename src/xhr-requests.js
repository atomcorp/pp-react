import {db} from './firebase-connect';
import firebase from './firebase';

const gameRefString = `/game`;
const game = db.ref(gameRefString);

// grab the game setting data we need,
// gets current gameweek and season
export const bootstrapGame = new Promise((resolve, reject) => {
  game.once('value').then((snapshot) => {
    resolve(snapshot.val());
  });
});

export const updateGame = function(result) {
  db.ref('game').set({
    time: firebase.database.ServerValue.TIMESTAMP,
    gameweek: result.currentMatchday,
    season: result.year,
    totalGameweeks: result.numberOfMatchdays
  });
}

export function checkUserResults(uid, gameweek) {
  const userRefString = `/2017-gameweek1/jl0WOxfgipe0IiavUyfbdjBOPmp1/predicted`;
  db.ref(userRefString).on('value', (snapshot) => {
    console.log(snapshot.exists());
  })
}



