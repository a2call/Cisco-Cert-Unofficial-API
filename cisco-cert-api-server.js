#!/usr/bin/env node
var http = require('http');
var client = require('./cisco-cert-client.js');

http.createServer(function  (request, response) {
	client.find(request.url.substr(1), function(certJson) {
		response.writeHead(200);
		response.write(certJson);
		response.end();
		console.log(certJson);
	});
}).listen(80);