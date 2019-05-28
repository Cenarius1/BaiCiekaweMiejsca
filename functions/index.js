const functions = require('firebase-functions');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.get('/rs/:id?',(request, response)=>
{
    let myid = request.params.id;
    console.log('xxxxxxxxxxxxxxxxx  '+ myid)
    response.send("<h1>Your parametr in URL is " + myid+"</h1>");
});

app.post('/rs2',(request, response)=>
{
    console.log("ZZZZZZZZZ  " + request.body.Name);
    let body =  JSON.stringify(request.body);
    response.send("<h1>Your parametr in URL iss "+request.body.Name + " , " + body);
});

exports.app = functions.https.onRequest(app);   