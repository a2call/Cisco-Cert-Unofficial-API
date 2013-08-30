#!/usr/bin/env node
var express = require('express');
var client = require('./cisco-cert-client.js');

var app = express();
app.use(express.logger());

app.get('/verify', function(req, res) {
	console.log('code = ' + req.query.code);
  	client.find(req.query.code, function(certJson) {
		res.send(certJson);
		console.log(certJson);
	});
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});