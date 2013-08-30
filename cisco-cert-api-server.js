#!/usr/bin/env node
var express = require('express');
var client = require('./cisco-cert-client.js');

var app = express();
app.use(express.logger());

app.get('/verify', function(req, res) {
  	client.find(req.query.code, function(certJson) {
		res.send(certJson);
		console.log(certJson);
	});
});

app.get('/*', function(req, res) {
	res.send('<h3 style="text-align: center;">Please see usage <a href="https://github.com/matplaysbass/Cisco-Cert-Unofficial-API" title="Cisco-Cert-Unofficial-API">here: https://github.com/matplaysbass/Cisco-Cert-Unofficial-API</a></h3>');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});