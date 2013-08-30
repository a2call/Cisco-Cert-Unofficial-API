var http = require('http');
var certFinder = require('./findCertName.js');

http.createServer(function  (request, response) {
	certFinder.find(request.url.substr(1), function(certJson) {
		response.writeHead(200);
		response.write(certJson);
		response.end();
		console.log(certJson);
	});
}).listen(80);