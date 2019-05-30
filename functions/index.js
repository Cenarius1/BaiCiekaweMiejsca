const functions = require('firebase-functions');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const firebase = require("firebase");
// require("firebase/firestore");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const config = {
    apiKey: "AIzaSyAdyBU9OJSLdVFyJ4g4OWaTghDWNM1G5Tg",
    authDomain: "bai-1212.firebaseapp.com",
    projectId: "bai-1212",
    databaseURL: "https://bai-1212.firebaseio.com"
};
firebase.initializeApp(config);
const db = firebase.firestore();


app.get('/getAllEvent', (request, response) => {
    db.collection("Events").get()
        .then(snapshot => {
            let arr = [];
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                arr.push(doc.data());
            });
            response.json(arr);
            return null;
        })
        .catch(err => {
            console.log('Error getting documents', err.message);
            response.send(err.message);
        });

});

app.get('/getEventDetailById/:id?', (request, response) => {
    // const id = parseInt(request.params.id, 10);
    console.log("xxxxxxxxxxxxxxx " + request.params.id);
    if (request.params.id === null) {
        response.send("Invalid Argument");
    }

    const doc = db.collection("Events").doc(request.params.id);
    doc.get().then(doc => {
        const data = doc.data();
        console.log(data);
        response.json(data);
        return null;
    }).catch(err => {
        console.log('Error getting documents', err.message);
        response.send(err.message);
    });
});



app.post('/addEvent', (request, response) => {
    //validation

    db.collection("Events").orderBy("id", "desc").limit(1)
        .get().then(snapshot => {
            let gowno = snapshot.docs[0].id;
            const idInt = parseInt(gowno, 10) + 1;
            // console.log("xxxxxxxxxxxxxx " + idInt);

            db.collection("Events").doc(idInt.toString()).set({
                id: idInt,
                title: request.body.title,
                date: request.body.date,
                cost: request.body.cost,
                organizers: request.body.organizers,
                rating: request.body.rating,
                localization: request.body.localization,
                contact: request.body.contact,
                description: request.body.description,
                fullDescription: request.body.fullDescription
            });

            response.json('Works');
            return null;
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
});


exports.app = functions.https.onRequest(app);   