var request = require('request');
var cheerio = require('cheerio');

exports.find = function(certCode, callback) {
	// POST verification form and assign callback w/ cert or HTTP error
	request.post({url: 'http://www.ciscocertificates.com/verify.cfm', timeout: 5000, form:{'code':certCode,'fsubmitCheck':'Check'}}, function(err, resp, body) {
	    if (err) { 
	        callback(500);
	    } else if (resp.statusCode === 200) {
	    	$ = cheerio.load(body);
		    
		    var responseCert = $('b').eq(0).text();
			var responseName = $('b').eq(1).text();

			if (responseCert === 'Check' && responseName === 'Instructions: ') { 
				callback(404); 
			} else {
				var o = {'cert': responseCert, 'name': responseName};
				callback(JSON.stringify(o));
			}
		} else callback(500);
	});
}