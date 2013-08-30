var request = require('request');
var cheerio = require('cheerio');

// assign verification code parameter
var givenCode = process.argv[2];

// POST verification form and assign to $ object
var url = 'http://www.ciscocertificates.com/verify.cfm';
request.post(url, {form:{'code':givenCode,'fsubmitCheck':'Check'}}, function(err, resp, body) {
    if (err)
        throw err;
    if (!err && resp.statusCode == 200) {
    	$ = cheerio.load(body);
	    // pull <b> tag items for cert name and user name
	    var responseCert = $('b').eq(0).text();
		var responseName = $('b').eq(1).text();
		//debug
		console.log('Cert name is: ' + responseCert);
		console.log('User name is: ' + responseName);
	}
});


