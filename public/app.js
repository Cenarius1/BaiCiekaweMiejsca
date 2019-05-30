// // const functions = require("firebase-functions");
// // function getFromDb(){
// //     const app = firebase.app();
// //     const db = firebase.firestore();
// //     const myPost = db.collection('test').doc('Id');
// //     myPost.get()
// //     .then(doc=>{
// //         const data = doc.data();
// //         console.log(data);
// //     })
// // };

// // getFromDb();



// $(document).ready(function () {
//     const app = firebase.app();
//     const db = firebase.firestore();
//     const myPost = db.collection('test3').doc('1');
//     myPost.get()
//         .then(doc => {
//             const data = doc.data();
//             console.log(data);
//         })

// $('#inputId').change(function () {
//     alert(1);
// });

// $('#inputId').on('input', function () {
//     let value = $('#inputId')[0].value;
//     const db = firebase.firestore();
//     const myPost = db.collection('test').doc('Id');
//     myPost.update({ col1: "aa" })
// });
// });


$(document).ready(function () {
    // insertEventsToDB();
});

function insertEventsToDB(){
    const db = firebase.firestore();
    db.collection("Events").doc("1").update({
        id:1,
        title:"Ice Hokey Match",
        date:"10-12-2019",
        cost:0,
        organizers:"UEK",
        rating: 10,
        localization: "Nowakowska 10",
        contact:4444,
        description: "Awesome place to see many intresting facts",
        fullDescription: "ssssss"
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
        fullDescription: "zzzz"
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
        fullDescription: "ggg"
    });
    db.collection("Events").doc("4").set({
        id: 4,
        title: "Maran",
        date: "19-1-1",
        cost: 23,
        organizers: "YYY",
        rating: 2,
        localization: "Kaza 65",
        contact: 12,
        description: "Awesome place to see many intresting facts",
        fullDescription: "kkk"
    });
}


