var request = require('request');
var cheerio = require('cheerio');

exports.find = function(certCode, callback) {
	// POST verification form and assign to $ object
	var url = 'http://www.ciscocertificates.com/verify.cfm';
	request.post(url, {form:{'code':certCode,'fsubmitCheck':'Check'}}, function(err, resp, body) {
	    if (err)
	        throw err;
	    if (resp.statusCode == 200) {
	    	$ = cheerio.load(body);
		    // pull <b> tag items for cert name and user name

			// var responseCert = $('b').eq(0).text();
			// var responseName = $('b').eq(1).text();
			var responseCert = "";
			var responseName = "";

			$('b').each(function(i, elem) {
				if (i === 0) {
					responseCert = elem;
				}
				if (i === 1) {
					responseName = elem;
				}
			});

			var o = {'cert': responseCert, 'name': responseName};
			callback(JSON.stringify(o));
		}
	});
}




