const express = require('express'),
	cors = require('cors'),
	multer = require('multer'),
	path = require('path'),
	storage = multer.diskStorage({
	destination: function (req, file, cb) {
		fs.mkdir('./public/uploads/' + req.body.id + '/');
		cb(null, './public/uploads/' + req.body.id + '/');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
	}
	}),
 	upload = multer({ storage: storage }),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
	fs = require('file-system'),
	shortId = require('shortid'),
	features = 'features.json',
	accounts = 'accounts.json',
    app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use(cors({origin:true,credentials: true}));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

// Save user
app.post('/api/new-user', (req, res) => {
	const usersData = getUsersFromDB(),
		user = req.body;
	let users = usersData;
	// Check if user with this username already exists
	if (users.accounts.find(account => account.username == user.username)) {
		res.send({});
	} else {
		usersData.accounts.push(user);
		setUsersToDB(usersData);
		res.send(user);
	}
});

// Get user
app.get('/api/get-user/:username&:password', (req, res) => {
	const usersData = getUsersFromDB();
	let user = usersData;
	user.accounts = usersData.accounts.filter(function (e) {
		return e.username == req.params.username;
	})
	// Check if password for this user is correct
	if (user.accounts[0].password == req.params.password) {
		res.send(user);
	} else {
		res.send({});
	}
});

// Get all features
app.get('/api/features', (req, res) => res.send(getFeaturesFromDB()));

// Save feature
app.post('/api/feature', (req, res) => {
	const featuresData = getFeaturesFromDB(),
		feature = req.body;

	featuresData.features.push(feature);
	setFeaturesToDB(featuresData);

	res.send(feature);
});

// Get feature
app.get('/api/feature/:id', (req, res) => {
	const featuresData = getFeaturesFromDB();
	let feature = featuresData;
	feature.features = featuresData.features.filter(function (e) {
		return e.properties.id == req.params.id;
	})
	res.send(feature);
});

// Remove feature
app.delete('/api/feature/:id', (req, res) => {
    const featuresData = getFeaturesFromDB();
	let updatedData = featuresData;
    updatedData.features = featuresData.features.filter(function (e) {
		return e.properties.id != req.params.id;
	});

    setFeaturesToDB(updatedData);

	const folder = './public/uploads/' + req.params.id +'/';
	const fs = require('fs');

	fs.rm(folder, { recursive: true, force: true});
	console.log('Folder "' + folder + '" was removed.' );

    res.sendStatus(204);
});

// Upload photos
app.post('/api/photos/upload', upload.array('img'), function (req, res, next) {
	// req.files is array of `photos` files
	// req.body will contain the text fields, if there were any
});

// Get files
app.get('/api/public/uploads/:id', (req, res) => {
	const id = req.params.id;
	
	const folder = './public/uploads/' + id +'/';
	const fs = require('fs');

	fs.readdir(folder, (err, files) => {
		res.send(files);
	});
});

function getUsersFromDB() {
    return JSON.parse(fs.readFileSync(accounts, 'utf8'));
}

function setUsersToDB(usersData) {
    fs.writeFileSync(accounts, JSON.stringify(usersData));
}

function getFeaturesFromDB() {
    return JSON.parse(fs.readFileSync(features, 'utf8'));
}

function setFeaturesToDB(featuresData) {
    fs.writeFileSync(features, JSON.stringify(featuresData));
}

app.listen(3000, () => console.log('Server has been started...'));
