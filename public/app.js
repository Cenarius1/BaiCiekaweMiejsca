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



$(document).ready(function () {
    const app = firebase.app();
    const db = firebase.firestore();
    const myPost = db.collection('test').doc('Id');
    myPost.get()
        .then(doc => {
            const data = doc.data();
            console.log(data);
        })

    // $('#inputId').change(function () {
    //     alert(1);
    // });

    $('#inputId').on('input', function () {
        let value = $('#inputId')[0].value;
        const db = firebase.firestore();
        const myPost = db.collection('test').doc('Id');
        myPost.update({col1:"aa"})
    });
});

