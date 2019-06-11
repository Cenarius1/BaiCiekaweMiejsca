const functions = require('firebase-functions');
const admin = require('firebase-admin');

//Express imports
const express = require('express');
const cors = require('cors');
const newGuid = require('uuid/v4');

//Auth imports
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const facebookStrategy = require('passport-facebook').Strategy;
const jwt = require('jsonwebtoken');
const jwtStrategy = require('passport-jwt').Strategy;

const facebookConfig = require("./configs/facebookStrategyConfig");
const jwtConfig = require("./configs/jwtStrategyConfig");
const localConfig = require("./configs/localStrategyConfig");
const firebaseConfig = require("./configs/firebaseConfig");

//Encryption
const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = 12;

admin.initializeApp(firebaseConfig);
const db = admin.firestore();
const app = express();
app.use(cors());
app.use(passport.initialize());

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

passport.use('jwt', new jwtStrategy(jwtConfig, async (jwt_payload, done) => {
	try {
		console.log("ID: " + jwt_payload.id);
		const documentSnapshot = await db.collection("Users").doc(jwt_payload.id).get();

		if (!documentSnapshot.exists) {
			done(null, false, { message: `Unable to find user '${jwt_payload.username}'` });
		} else {
			done(null, documentSnapshot.data())
		}
	} catch (err) {
		done(err);
	}
}));

passport.use(new facebookStrategy(facebookConfig,
	async (accessToken, refreshToken, profile, done) => {
		console.log("AccessToken: " + JSON.stringify(accessToken));
		console.log("RefreshToken: " + JSON.stringify(refreshToken));
		console.log("Profile: " + JSON.stringify(profile));
		try {
			const querySnapshot = await db.collection("Users").where("facebookId", "==", profile.id).limit(1).get();

			const userData = {
				id: undefined,
				vendor: "facebook",
				username: profile.emails[0].value,
				password: "",
				facebookId: profile.id,
				displayName: profile.displayName
			};

			if (!querySnapshot.empty) {
				const user = querySnapshot.docs[0].data();
				userData.id = user.id;
				await db.collection("Users").doc(user.id).set(userData);

				return done(null, user);
			} else {
				const newId = newGuid();
				userData.id = newId;
				await db.collection("Users").doc(newId).set(userData);
				return done(null, userData);
			}
		} catch (err) {
			return done(err);
		}
	}
));

passport.use('register-local', new localStrategy(localConfig, async (req, username, password, done) => {
	try {
		if (!req.body.displayName && !req.body.displayName.length < 3) {
			return done(null, false, { message: "displayName is required and must have at least 3 characters" });
		}

		console.log("Inside RegisterLocal Strategy...");
		const querySnapshot = await db.collection("Users").where("username", "==", username).limit(1).get();

		if (!querySnapshot.empty) {
			return done(null, false, { message: "Username already taken" });
		} else {
			const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

			const id = newGuid();
			const newUser = {
				id: id,
				vendor: "local",
				username: username,
				password: hashedPassword,
				displayName: req.body.displayName,
				facebookId: ""
			};

			await db.collection("Users").doc(id).set(newUser);
			console.log("Query done...");

			return done(null, newUser);
		}
	} catch (err) {
		return done(err);
	}
}));

passport.use('login-local', new localStrategy(localConfig, async (req, username, password, done) => {
	const querySnapshot = await db.collection("Users").where("username", "==", username).limit(1).get();

	if (!querySnapshot.empty) {
		const user = querySnapshot.docs[0].data();
		const compareResult = await bcrypt.compare(password, user.password);

		console.log("Compare result:" + compareResult);

		if (compareResult) {
			return done(null, user);
		} else {
			return done(null, false, { message: "Wrong password" });
		}
	} else {
		return done(null, false, { message: `Unable to find user '${username}'` });
	}
}));

app.get("/auth/facebook", passport.authenticate("facebook", { scope: 'email' }));

app.get("/auth/facebook/callback", (req, res, next) => {
	passport.authenticate("facebook", (err, user, info) => {
		const result = BuildResultModel();

		if (err) {
			result.success = false;
			result.errorMessage = "Error occured during authenticating user using facebook, message: " + err.message;
		} else {
			if (!user) {
				result.success = false;
				result.errorMessage = `Unable to authorize user using facebook, message: '${info.message}'`;
			} else {
				delete user.password;
				var token = GenerateJWTToken(user);
				result.data = {
					user: user,
					token: token
				}
			}
		}

		console.log(JSON.stringify(result));

		SendResponse(result, res);
	})(req, res, next);
});

app.post('/auth/register-local', async (req, res, next) => {
	passport.authenticate('register-local', (err, user, info) => {
		console.log("Inside auth");
		const result = BuildResultModel();
		if (err) {
			result.success = false;
			result.errorMessage = "Error occured during registering user, message: " + err.message;
		} else {
			if (!user) {
				result.success = false;
				result.errorMessage = "Unable to register user, message: '" + info.message + "'";
			} else {
				delete user.password;
				var token = GenerateJWTToken(user);
				result.data = {
					user: user,
					token: token
				}
			}
		}

		console.log(JSON.stringify(result));

		SendResponse(result, res);
	})(req, res, next);
});

app.post('/auth/login-local', async (req, res, next) => {
	passport.authenticate('login-local', (err, user, info) => {
		const result = BuildResultModel();
		if (err) {
			result.success = false;
			result.errorMessage = `Error occured during authenticating user, error: '${err.message}'`;
		} else {
			if (!user) {
				result.success = false;
				result.errorMessage = "Unable to authenticate user, message: '" + info.message + "'";
			} else {
				delete user.password;
				var token = GenerateJWTToken(user);
				result.data = {
					user: user,
					token: token
				}
			}
		}

		SendResponse(result, res);
	})(req, res, next)
});

app.get('/events', passport.authenticate('jwt'), async (req, res) => {
	const result = BuildResultModel();

	try {
		const eventsQuerySnapshot = await db.collection("Events").get();
		const ratingQuerySnapshot = await db.collection("Ratings").get();

		const events = [];

		eventsQuerySnapshot.forEach(eventDoc => {
			const event = eventDoc.data();
			let ratingSum = 0;
			let ratingCount = 0;
			let ratingRated = false;

			if (!ratingQuerySnapshot.empty) {
				ratingQuerySnapshot.forEach(ratingDock => {
					const rating = ratingDock.data();
					if (rating.eventId === event.id) {
						ratingSum += rating.rate;
						ratingCount += 1;

						if (rating.userId === req.user.id && ratingRated === false) {
							ratingRated = true;
						}
					}
				});
			}

			let average = 0;
			if (ratingCount !== 0) {
				average = ratingSum / ratingCount;
			}

			event.rating = {
				count: ratingCount,
				average: average,
				rated: ratingRated
			}

			events.push(event);
		})

		result.data = events;
	} catch (err) {
		result.success = false;
		result.errorMessage = err.message;
		result.data = undefined;
	}

	SendResponse(result, res);
});

app.get('/events/:id', passport.authenticate('jwt'), async (req, res) => {
	const result = BuildResultModel();

	if (req.params.id === null) {
		result.data = undefined;
		result.success = false;
		result.errorMessage = "Invalid argument, EventId is required";
	} else {
		try {
			const eventsDocumentSnapshot = await db.collection("Events").doc(req.params.id).get();
			if (eventsDocumentSnapshot.exists) {
				const event = eventsDocumentSnapshot.data();

				const ratingQuerySnapshot = await db.collection("Ratings").where("eventId", "==", event.id).get();

				if (!ratingQuerySnapshot.empty) {
					let ratingSum = 0;
					let ratingCount = 0;
					let ratingRated = false;

					ratingQuerySnapshot.forEach(ratingDoc => {
						const rating = ratingDoc.data();
						ratingCount += 1;
						ratingSum += rating.rate;

						if (rating.userId === req.user.id && ratingRated === false) {
							ratingRated = true;
						}
					});

					let average = 0;
					if (ratingCount > 0) {
						average = ratingSum / ratingCount
					}

					event.rating = {
						count: ratingCount,
						average: average,
						rated: ratingRated
					}
				} else {
					event.rating = {
						count: 0,
						average: 0,
						rated: false
					}
				}

				result.data = event;
			} else {
				result.data = undefined;
				result.success = false;
				result.errorMessage = `There is no event with id: '${req.params.id}'`;
			}
		} catch (err) {
			result.success = false;
			result.errorMessage = err;
			result.data = undefined;
		}
	}

	SendResponse(result, res);
});

// {
// 	"name": "name",
// 	"description": "someDescription",
// 	"localization": {
// 		"longitude": 12.34,
// 		"latitude": 12.123,
// 	},
// 	"date": 1234567890,
// 	"type": "event"
// }
app.post('/events', passport.authenticate('jwt'), async (req, res) => {
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
			name: req.body.name,
			description: req.body.description,
			localization: {
				longitude: req.body.localization.longitude,
				latitude: req.body.localization.latitude
			},
			date: req.body.date,
			type: req.body.type,
			user: {
				id: req.user.id,
				displayName: req.user.displayName
			}
		}

		try {
			await db.collection("Events").doc(id).set(event);

			event.rating = {
				count: 0,
				average: 0,
				rated: false
			}

			result.data = event;
		} catch (err) {
			result.success = false;
			result.errorMessage = err.message;
			result.data = undefined;
		}
	}

	SendResponse(result, res)
});

app.delete('/events/:id', passport.authenticate('jwt'), async (req, res) => {
	const result = BuildResultModel();

	if (req.params.id === null) {
		result.data = undefined;
		result.success = false;
		result.errorMessage = "Invalid argument, EventId is required";
	} else {
		try {
			const documentSnapshot = await db.collection("Events").doc(req.params.id).get();

			if (documentSnapshot.exists) {
				const event = documentSnapshot.data();

				if (event.user.id === req.user.id) {
					await db.collection('Events').doc(req.params.id).delete();
					result.data = `'${req.params.id}' sucessfully deleted`;
				} else {
					result.data = undefined;
					result.success = false;
					result.errorMessage = `You can't delete event with id: '${req.params.id}', you aren't owner of this event.`;
				}
			} else {
				result.data = undefined;
				result.success = false;
				result.errorMessage = `Event with id: '${req.params.id}' doesn't exist and can't be deleted`;
			}

		} catch (err) {
			result.data = undefined;
			result.success = false;
			result.errorMessage = err.message;
		}
	}

	SendResponse(result, res);
});

// {
// 	"eventId": "someId",
// 	"rate": 3
// }

app.get('/rating', passport.authenticate('jwt'), async (req, res) => {
	const result = BuildResultModel();

	const ratingsQuerySnapshot = await db.collection("Ratings").get();

	const ratings = [];
	ratingsQuerySnapshot.forEach(doc => {
		ratings.push(doc.data());
	});

	result.data = ratings;

	SendResponse(result, res);
});

app.post('/rating', passport.authenticate('jwt'), async (req, res) => {
	const result = BuildResultModel();

	const evnetId = req.body.eventId;
	const rate = req.body.rate;

	try {
		if (rate <= 0 || rate > 5) {
			result.data = undefined;
			result.success = false;
			result.errorMessage = "Invalid argument, Rate must be between 1 - 5";
		} else {
			if (evnetId === null) {
				result.data = undefined;
				result.success = false;
				result.errorMessage = "Invalid argument, EventId is required";
			} else {
				const documentSnapshot = await db.collection("Events").doc(evnetId).get();

				if (!documentSnapshot.exists) {
					result.data = undefined;
					result.success = false;
					result.errorMessage = `Event with EventId '${evnetId}' doesn't exist`;
				} else {
					const ratingQuerySnapshot = await db.collection("Ratings").where("eventId", "==", evnetId).where("userId", "==", req.user.id).get();

					if (!ratingQuerySnapshot.empty) {
						result.data = undefined;
						result.success = false;
						result.errorMessage = `Unable to rate Event with EventId: '${evnetId}'. You already rated this event`;
					} else {
						const id = newGuid();
						const rating = {
							id: id,
							eventId: evnetId,
							userId: req.user.id,
							rate: rate
						}

						await db.collection("Ratings").doc(id).set(rating);
						result.data = rating;
					}
				}
			}
		}
	} catch (err) {
		result.data = undefined;
		result.success = false;
		result.errorMessage = err.message;
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

	if (!req.body.name)
		validationErrors.push("Name is required");
	if (!req.body.description)
		validationErrors.push("Description is required");

	if (!req.body.localization) {
		validationErrors.push("Localization is required");
	} else {
		if (!req.body.localization.longitude) {
			validationErrors.push("Localization longitude is required");
		}
		if (!req.body.localization.latitude) {
			validationErrors.push("Localization latitude is required");
		}
	}

	if (!req.body.date)
		validationErrors.push("Date is required");

	if (!req.body.type) {
		validationErrors.push("Type is required");
	} else {
		if (req.body.type !== "event" && req.body.type !== "place") {
			validationErrors.push("Type must be 'event' or 'place'");
		}
	}

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

function GenerateJWTToken(user) {
	return jwt.sign(user, jwtConfig.secretOrKey);
}
