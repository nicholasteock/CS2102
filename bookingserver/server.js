// server.js

// Base Setup

// Call required packages

var express 		= require('express'),
	app 			= express(),
	router 			= express.Router(),
	bodyParser 		= require('body-parser'),
	async 			= require('async'),
	http 			= require('http').Server(app),
	globals 		= require('globals'),
	movies 			= require('movies');

// Configure app to use bodyParser()
// Allows us to get the data from a POST
app.use(bodyParser());

// Set port
var port = process.env.PORT || globals.port_default;

// Routes for API
router.get('/', function(req, res) {
	res.json({ message: "HELLO FROM THE API!" });
});

/*****************************************************************************
*	MOVIE CODE
******************************************************************************/

router.post('/register', function( req, res ) {
	function reply( response ) {
		res.send( response );
	}

	movies.register(req.body, reply);
});

router.post('/login', function( req, res ) {
	function reply( response ) {
		res.send( response );
	}

	movies.login(req.body, reply);
});

router.post('/movielisting', function( req, res ) {
	function reply( response ) {
		res.send( response );
	}

	movies.listing(req.body, reply);
});

router.get('/movie', function( req, res ) {
	function reply( response ) {
		res.send( response );
	}

	movies.details(req.query, reply);
});

router.get('/showtimes', function( req, res ) {
	function reply( response ) {
		res.send( response );
	}

	movies.showtimes(req.query, reply);
});

router.get('/seats', function( req, res ) {
	function reply( response ) {
		res.send( response );
	}

	movies.seats(req.query, reply);
});

router.post('/book', function( req, res ) {
	function reply( response ) {
		res.send( response );
	}

	movies.book(req.body, reply);
});

router.post('/bookings', function( req, res ) {
	function reply( response ) {
		res.send( response );
	}

	movies.getBookings(req.body, reply);
});

router.post('/addmovie', function( req, res ) {
	function reply( response ) {
		res.send( response );
	}

	movies.addmovie(req.body, reply);
});

router.post('/admininfo', function( req, res ) {
	function reply( response ) {
		res.send(response);
	}

	movies.adminpanelInfo(req.body, reply);
});

router.post('/userinfo', function( req, res ) {
	function reply( response ) {
		res.send(response);
	}

	movies.userInfo(req.body, reply);
});

router.post('/removeuser', function( req, res ) {
	function reply( response ) {
		res.send(response);
	}

	movies.removeuser(req.body, reply);
});

router.post('/removebooking', function( req, res ) {
	function reply( response ) {
		res.send(response);
	}

	movies.removebooking(req.body, reply);
});

/*****************************************************************************/

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Origin', 'http://nicholasteock.github.io');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Register routes
// all routes prefixed with /api
app.use('/api', router);

// Start server
app.listen(port);
console.log('Server listening on port ' + port);