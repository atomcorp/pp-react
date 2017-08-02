import firebase from '../firebase';

export default function getFixturesFromFirebase(id, callback) {
  // https://stackoverflow.com/questions/33178738/how-to-execute-multiple-firebase-request-and-receive-a-callback-when-all-request
  const userRefString = `/users/${id}/`;
  const user = firebase.database().ref(userRefString);

  const getData = Promise.all([
    new Promise((resolve, reject) => {
      user.on('value', (snapshot) => {
        resolve(snapshot.val());
      })
    })
  ]);

  // arrays return in order
  getData.then((data) => {
    const dataObject = {
      user: data[0]
    }
    callback(dataObject);
  })
}