"use strict"

var express = require('express');
var app = express();


var bodyParser = require('body-parser');
app.use(bodyParser());


var cookieParser = require('cookie-parser');
app.use(cookieParser());


var session = require('express-session');
app.use(session( { secret: 'supersecretive' } ));


var passport = require('passport');
passport.serializeUser( (user, done) => done(null, user) );
passport.deserializeUser( (obj, done) => done(null, obj) );


var strategy = require('passport-steam').Strategy;
var APIKEY = 'EC257F249047100940792BE95D9529A3';
var strategyOptions = {
	returnURL: 'http://localhost:3000/auth/steam/return',
	realm: 'http://localhost:3000',
	apiKey: APIKEY	
};
var strategyFunction = function (identifier, profile, done) {
	process.nextTick( () => {
		profile.identifier = identifier;
		return done(null, profile);
	});	
};
passport.use(new strategy(strategyOptions, strategyFunction));
app.use(passport.initialize());
app.use(passport.session());


var handlebars = require('express-handlebars');
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/auth/steam', passport.authenticate('steam'));
app.get('/auth/steam/return', passport.authenticate('steam', { failureRedirect: '/' }), (req, res) => res.redirect('/'));
app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});


app.get('/user', (req, res) => {
	req.user ? res.json(req.user._json) : res.sendStatus(404);
});

var request = require('request');
var async = require('async');
app.get('/friends', (req, res) => {
	if (!req.user) {
		res.sendStatus(404); 
		return;
	}

	async.waterfall([
		function (callback) {
			var path = 'http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=' + APIKEY + '&steamid=' + req.user._json.steamid + '&relationship=friend';
			request(path, function (e, r, body) {
				var IDs = JSON.parse(body).friendslist.friends.map(friend => friend.steamid);
				callback(null, IDs);
			});
		},
		function (friendIDs, callback) {
			var limit = 100;
			var friendChunks = [];
			var functions = [];
			for (var i = 0; i < friendIDs.length; i += limit) {
				let ids = friendIDs.slice(i, i + limit).join();
				var tempFunction = function (cb) {
					let userpath = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + APIKEY + '&steamids=' + ids;
					request(userpath, (e, r, body) => {
						cb(null, JSON.parse(body).response.players);
					})
				}
				functions.push(tempFunction);
			}
			async.parallel(functions, (err, result) => {
				var concat = [].concat.apply([], result);
				callback(null, concat);
			});
		}
	], function (err, result) {
		res.json(result);
	});
});



app.use(express.static(__dirname + '/public'));


var server = app.listen(3000, () => {
	console.log('Server listening on port 3000');
});