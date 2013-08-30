Cisco-Cert-Unofficial-API
===========

Verify Cisco Certs from within your app. This utility will post the Cisco Cert verification code and name inorder to verify a Cisco Cert for that person.

Dependencies
===========
Node.js

request

cheerio

express

underscore

Usage
===========
Send an HTTP GET request with query string that includes code to get back the Cisco Certification name and the user's name.
E.g.

http://yourhosthere/verify?code=XXXXXXXXXXXXXXXXXXXXXX

Returned JSON object will look like:
{"cert":"CCNP","name":"John Smith"}