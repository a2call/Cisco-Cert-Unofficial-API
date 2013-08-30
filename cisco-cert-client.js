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
		    
		    var responseCert = "init";
		    var responseName = "init";
		    
		    // pull <b> tag items for cert name and user name
			$('b').each(function(i, elem) {
				console.log('assignment index is ' + i);
				console.log('b text is ' + $(this).text());
				if (i === 0) {
					responseCert = $(this).text();
				}
				if (i === 1) {
					responseName = $(this).text();
				}
			});

			var o = {'cert': responseCert, 'name': responseName};
			callback(JSON.stringify(o));
		}
	});
}




