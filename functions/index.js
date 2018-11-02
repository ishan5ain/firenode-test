const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');
const moment = require('moment');
moment().format('MMDDYYYY');

const app = express();
// const firestore = new Firestore();
// const settings = {timestampsInSnapshots: true};
//
// firestore.settings(settings);

// const timestamp = snapshot.get('created_at');
// const date = timestamp.toDate();

// var d = new Date();
// var date = d.getUTCDate();
// console.log(date);

var date = moment().format('MMDDYYYY');

admin.initializeApp(functions.config().firebase);
var db = admin.firestore();



app.get('/home', (req, res) => {
  res.send('Hello from the other side');
});


app.get('/get', (req, res) => {
  var docRef2 = db.collection('11012018');
  var fireCol = [];

  docRef2.get().then(snapshot => {
    snapshot.forEach(doc => {
      // console.log(doc.id, '=>', doc.data());
      var data = {
        docId: doc.id,
        docData: doc.data()
      }
      fireCol.push(data);
    });

    console.log(JSON.stringify(fireCol, undefined, 2);
    res.send(JSON.stringify(fireCol, undefined, 2);
  });
}, (e) => {
  res.send(e);
});


app.post('/send', (req, res) => {
  var time = moment().format('H:mm:ss');
  var docRef = db.collection(`${date}`).doc(`${time}`);

  var message = req.body;
  // console.log(JSON.stringify(req.body, undefined, 2));
  console.log(message);

  docRef.set({
    msg: `${message}`,
    date: date,
    time: time
  });

  res.status(200).send(req.body);
  console.log('posted!');
}, (e) => {
  console.log('ERROR', e);
  res.status(400).send(e);
});








// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.app = functions.https.onRequest(app);
