const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const newGuid = require('uuid/v4');

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
const db = admin.firestore();
const app = express();
app.use(cors());

app.get('/events', async (req, res) => {
	const result = BuildResultModel();

	try {
		const queryResult = await db.collection("Events").get();

		const events = [];
		queryResult.forEach(doc => {
			events.push(doc.data());
		});

		result.data = events;
	} catch (err) {
		result.success = false;
		result.errorMessage = err.message;
		result.data = undefined;
	}

	SendResponse(result, res);
});

app.get('/events/:id', async (req, res) => {
	const result = BuildResultModel();

	if (req.params.id === null) {
		result.data = undefined;
		result.success = false;
		result.errorMessage = "Invalid argument, EventId is required";
	} else {
		try {
			const queryResult = await db.collection("Events").doc(req.params.id).get();
			const event = queryResult.data();
			result.data = event;
		} catch (err) {
			result.errorMessage = err.message;
			result.success = false;
			result.data = undefined;
		}
	}

	SendResponse(result, res);
});

app.post('/events', async (req, res) => {
	const result = BuildResultModel();

	const validationErrors = ValidateEventRequest(req);

	if (validationErrors.length > 0) {
		result.success = false;
		result.errorMessage = validationErrors.join('; ');
		result.data = undefined;
	} else {
		const id = newGuid();
		const event = {
			id: id,
			title: req.body.title,
			date: req.body.date,
			cost: req.body.cost,
			organizers: req.body.organizers,
			rating: req.body.rating,
			localization: req.body.localization,
			contact: req.body.contact,
			description: req.body.description,
			fullDescription: req.body.fullDescription
		};

		try {
			await db.collection("Events").doc(id).set(event);
			result.data = event;
		} catch (err) {
			result.success = false;
			result.errorMessage = err.message;
			result.data = undefined;
		}
	}

	SendResponse(result, res)
});

app.delete('/events/:id', async (req, res) => {
	const result = BuildResultModel();

	if (req.params.id === null) {
		result.data = undefined;
		result.success = false;
		result.errorMessage = "Invalid argument, EventId is required";
	} else {
		try {
			await db.collection('Events').doc(req.params.id).delete();
			result.data = `'${req.params.id}' sucessfully deleted`;
		} catch (err) {
			result.data = undefined;
			result.success = false;
			result.errorMessage = err.message;
		}
	}

	SendResponse(result, res);
});

const SendResponse = (result, res) => {
	if (result.success)
		res.status(200).json(result);
	else
		res.status(500).json(result);
}

const ValidateEventRequest = (req) => {
	const validationErrors = [];

	if (!req.body.title)
		validationErrors.push("Title is required");
	if (!req.body.date)
		validationErrors.push("Date is required");
	if (!req.body.cost)
		validationErrors.push("Cost is required");
	if (!req.body.organizers)
		validationErrors.push("Organizers is required");
	if (!req.body.localization)
		validationErrors.push("Localization is required");
	if (!req.body.contact)
		validationErrors.push("Contact is required");
	if (!req.body.description)
		validationErrors.push("Description is required");
	if (!req.body.fullDescription)
		validationErrors.push("FullDescription is required");
	if (!req.body.rating)
		validationErrors.push("Rating is required");

	return validationErrors;
}

const BuildResultModel = (success, data, errorMessage) => {
	return {
		success: success || true,
		errorMessage: errorMessage || undefined,
		data: data || undefined
	};
}

exports.api = functions.https.onRequest(app);


