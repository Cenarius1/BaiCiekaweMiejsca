const admin = require('firebase-admin');
const functions = require('firebase-functions');

const firebaseConfig = {
    apiKey: "AIzaSyAdyBU9OJSLdVFyJ4g4OWaTghDWNM1G5Tg",
    authDomain: "bai-1212.firebaseapp.com",
    databaseURL: "https://bai-1212.firebaseio.com",
    projectId: "bai-1212",
    storageBucket: "bai-1212.appspot.com",
    messagingSenderId: "947233879048",
    appId: "1:947233879048:web:998d8ff27b5f72c3"
};

admin.initializeApp(firebaseConfig);
var db = admin.firestore();

exports.setupDB = functions.https.onRequest((request, response) => {
    insertEventsToDB();
    response.status(200).send("Setup done");
    
});

exports.getAllEvents = functions.https.onRequest((request, response) => {
    db.collection("Events").get()
        .then(snapshot => {
            let arr = [];
            snapshot.forEach(doc => {
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



exports.addEvent = functions.https.onRequest((request, response) => {
    db.collection("Events").orderBy("id", "desc").limit(1)
    .get().then(snapshot => {
        let gowno = snapshot.docs[0].id;
        const idInt = parseInt(gowno, 10) + 1;
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

        response.status(201).json('Event has been added.');
        return null;
    })
    .catch(err => {
        console.log('Error getting documents', err.message);
    });
});

exports.getEventById = functions.https.onRequest((request, response) => {
    if (request.query.id === null) {
        response.send("Invalid Argument");
    }

    const doc = db.collection("Events").doc(request.query.id);
    doc.get().then(doc => {
        const data = doc.data();
        response.json(data);
        return null;
    }).catch(err => {
        console.log('Error getting documents', err.message);
        response.send(err.message);
    });
});

//https://us-central1-bai-1212.cloudfunctions.net/deleteEventById?id=1
exports.deleteEventById = functions.https.onRequest((request, response) => {
    const id = request.query.id;
    if (id === null) {
        response.send("Invalid Argument");
    }
    db.collection('Events').doc(id).delete();
    response.status(200).send("deleted id: " + id);
});

function insertEventsToDB(){
    db.collection("Events").doc("1").set({
        id:1,
        title:"Ice Hokey Match",
        date:"10-12-2019",
        cost:0,
        organizers:"UEK",
        rating: 10,
        localization: "Nowakowska 10",
        contact:4444,
        description: "Awesome place to see many intresting facts",
        fullDescription: "ssssss",
        latitude:"11",
        longitude:"33"
    });
    db.collection("Events").doc("2").set({
        id:2,
        title:"Super Sam",
        date:"10-12-222",
        cost:10,
        organizers:"ABC",
        rating: 10,
        localization: "Zauk 40",
        contact:364,
        description: "Awesome place to see many intresting facts",
        fullDescription: "zzzz",
        latitude:"11",
        longitude:"33"
    });
    db.collection("Events").doc("3").set({
        id:3,
        title:"Kana Domeks",
        date:"9-12-9",
        cost:88,
        organizers:"CCC",
        rating: 3,
        localization: "Krupy 15",
        contact:987,
        description: "Awesome place to see many intresting facts",
        fullDescription: "ggg",
        latitude:"11",
        longitude:"33"
    });
}