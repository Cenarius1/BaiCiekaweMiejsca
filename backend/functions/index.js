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

app.get('/auth/validate', async (req, res, next) => {
	passport.authenticate('jwt', (err, user, info) => {
		const result = BuildResultModel();
		if (err) {
			result.success = false;
			result.errorMessage = `Error occured during validating jwt token, error: '${err.message}'`;
		} else {
			if (!user) {
				result.success = false;
				result.errorMessage = "Unable to validate jwt token, message: '" + info.message + "'";
			} else {
				delete user.password;
				result.data = {
					user: user,
					tokenValid: true
				}
			}
		}

		if (result.success) {
			res.status(200).send(result);
		} else {
			res.status(401).send(result);
		}
	})(req, res, next);
})

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

app.get('/events-secured', passport.authenticate('jwt'), (req, res, next) => {
	res.send("This is ultra secured endpoint and only authenticated user can access this! shieeeeeeeeeeeeet :D");
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

function GenerateJWTToken(user) {
	return jwt.sign(user, jwtConfig.secretOrKey);
}
