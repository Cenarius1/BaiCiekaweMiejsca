const functions = require('firebase-functions');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/getAllEvent', (request, response) => {
    //request.setHeader('Content-Type', 'application/json');
    let eventArray = [
        {
            id:1,
            title:"Ice Hokey Match",
            date:"10-12-2019",
            cost:0,
            organizers:"UEK",
            rating: 10,
        },
        {
            id:2,
            title:"Super Summer",
            date:"05-07-2019",
            cost:100,
            organizers:"Krakov City",
            rating: 5
        }
    ]
    response.json(eventArray);
});


app.get('/getEventDetailById/:id?', (request, response) => {
    const id = parseInt(request.params.id, 10);
    let detailEveevent = [
        {
            id:1,
            title:"Ice Hokey Match",
            date:"10-12-2019",
            cost:0,
            organizers:"UEK",
            rating: 10,
            localization: "Nowakowska 10",
            contact:12345,
            description: "Awesome place to see many intresting facts",
            fullDescription: "The series was originally published in English by two major publishers, Bloomsbury in the United Kingdom and Scholastic Press in the United States. A play, Harry Potter and the Cursed Child, based on a story co-written by Rowling, premiered in London on 30 July 2016 at the Palace Theatre, and its script was published by Little, Brown. The original seven books were adapted.",
        },
        {
            id:2,
            title:"Super Summer",
            date:"05-07-2019",
            cost:100,
            organizers:"Krakov City",
            rating: 5,
            localization: "Wodna 10",
            contact:12345,
            description: "This article is about the series of novels. For other uses, including related topics and derivative works",
            fullDescription: "Since the release of the first novel, Harry Potter and the Philosopher's Stone, on 26 June 1997, the books have found immense popularity, critical acclaim and commercial success worldwide. They have attracted a wide adult audience as well as younger readers and are often considered cornerstones of modern young adult literature.[2] As of February 2018, the books have sold more",
        }
    ]
    const result = detailEveevent.filter(x=>x.id === id);

    response.json(result);
});

app.post('/addEvent', (request, response) => {
    let title = request.body.title;
    let date = request.body.date;
    let cost = request.body.cost;
    let organizers = request.body.organizers;
    let rating = request.body.rating;
    let localization = request.body.localization;
    let contact = request.body.contact;
    let description = request.body.description;
    let fullDescription = request.body.fullDescription;

    response.send(`
    <p>${title}</p>
    <p>${date}</p>
    <p>${cost}</p>
    <p>${organizers}</p>
    <p>${rating}</p>
    <p>${localization}</p>
    <p>${contact}</p>
    <p>${description}</p>
    <p>${fullDescription}</p>
    `);
});

exports.app = functions.https.onRequest(app);   