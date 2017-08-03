import firebase from '../firebase';

export default function getFixturesFromFirebase(userData, gameData, callback) {

  // https://stackoverflow.com/questions/33178738/how-to-execute-multiple-firebase-request-and-receive-a-callback-when-all-request
  const fixturesRefString = `/${gameData.season}/${gameData.gameweek}/`;
  const predictionsRefString = `/usersPredictions/${userData.id}/${gameData.season}/${gameData.gameweek}/predictions`;
  const fixtures = firebase.database().ref(fixturesRefString);
  const predictions = firebase.database().ref(predictionsRefString);

  const getData = Promise.all([
    new Promise((resolve, reject) => {
      fixtures.on('value', (snapshot) => {
        resolve(snapshot.val());
      })
    }),
    new Promise((resolve, reject) => {
      predictions.on('value', (snapshot) => {
        resolve(snapshot.val());
      })
    }),

  ]);

  // arrays return in order
  getData.then((data) => {
    const dataObject = {
      fixtures: data[0],
      predictions: data[1]
    }
    callback(dataObject);
  })
}