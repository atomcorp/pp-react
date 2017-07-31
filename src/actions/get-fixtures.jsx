import firebase from '../firebase';

export default function getFixturesFromFirebase(week, callback) {
  console.log('Gos');
  const fixtures = firebase.database().ref(week);
  fixtures.on('value', (snapshot) => {
    console.log(snapshot.val());
    callback(snapshot.val());
    
  })
}