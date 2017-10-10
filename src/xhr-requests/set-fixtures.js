import firebase from '../firebase';
import {FB_DATA_API} from '../api.js';
// Eventually turn this into a page all of it's own
// that only admin can access
// and upload data

// also need one for doing scores
const gameweekID = 6;
const header = { 
  headers: { 'X-Auth-Token': FB_DATA_API }
};

export default function SetFixtures() {
  const fixturesDatabase = firebase.database().ref(`2017fixtures/gameweek${gameweekID}`);
  const setFixtures = fetch(`http://api.football-data.org/v1/competitions/445/fixtures/?matchday=${gameweekID}`, header)
   .then(function(response) {
     // send request to the api for browser to check we're allowed
     if (response.status === 200) {
       return response.json();
     }
     else throw new Error('Something went wrong on api server!');
   })
   .then(function(response) {
     const fixtures = response.fixtures.reduce(function(obj, item, index) {
         const urlToArray = item._links.self.href.split("/");
         const id = urlToArray[urlToArray.length - 1];
         // obj is the {} at the end of reduce
         // each loop adds a new obj
         obj = Object.assign(obj, {[id]: item})
           return obj;
       }, {});

       console.log(fixtures);
       fixturesDatabase.set(fixtures);
   });
     
}