var request = require('request');
var cheerio = require('cheerio');

// Define Cisco Cert Descriptions
var certDescriptions = {
	"CCENT": ["A Cisco Certified Entry Networking Technician (CCENT) has the ability to install, operate and troubleshoot a small enterprise branch network, including basic network security.",""],
	"CCT": ["Cisco Certified Technicians (CCT) have the skills to diagnose, restore, repair, and replace critical Cisco networking and system devices at customer sites.",""],
	"CCNA": ["CCNA Routing and Switching validates the ability to install, configure, operate, and troubleshoot medium-size routed and switched networks.",""],
	"CCNA Data Center": ["CCNA Data Center validates knowledge of data center operation, equipment installation, and maintenance.",""],
	"CCNA-Security": ["CCNA Security validates knowledge of security infrastructure, threats, and vulnerabilities to networks and threat mitigation.",""],
	"CCNA Service Provider": ["CCNA Service Provider validates the ability to configure and implement baseline Cisco Service Provider Next-Generation networks.",""],
	"CCNA Service Provider Operations": ["CCNA service provider operations validates skills in a prescriptive troubleshooting environment within a carrier class, IP NGN core network infrastructure.",""],
	"CCNA-Video": ["CCNA Video extends skills of audiovisual professionals working with traditional analog solutions into a Video-over-IP networked video environment",""],
	"CCNA-Voice": ["CCNA Voice validates skills for voice technologies, such as voice technologies administrator, voice engineer, and voice manager.",""],
	"CCNAW": ["CCNA Wireless covers wireless LANs, including networking associates/administrators, wireless support specialists, and WLAN project managers.",""],
	"CCDA": ["Cisco Certified Design Associate (CCDA) is for network design engineers, technicians, and support engineers, who enable efficient network environments with an understanding of network design fundamentals.",""],
	"CCDP": ["A Cisco Certified Design Professional (CCDP) is a network professional that can discuss, design, and create advanced addressing and routing, security, network management, data center, and IP multicast enterprise architectures that include virtual private networking and wireless domains.",""],
	"CCNP": ["The Cisco Certified Network Professional (CCNP) validates the ability to plan, implement, verify, and troubleshoot local and wide-area enterprise networks and work collaboratively with network technology specialists.",""],
	"CCNP Data Center": ["CCNP Data Center validates a deep level of knowledge in data center design, advanced equipment deployment, and maintenance.",""],
	"CCNP Security": ["CCNP Security is aligned to the job role of the Cisco Network Security Engineer, responsible for security in routers, switches, networking devices, and appliances, as well as choosing, deploying, supporting, and troubleshooting firewalls, VPNS, and IDS/IPS solutions for their networking environments.",""],
	"CCNP Service Provider": ["CCNP Service Provider is for service provider network engineers, systems engineers, and network specialists who are responsible for delivering a scalable carrier-grade infrastructure capable of rapid expansion to support ongoing introduction of new managed services and other customer requirements.",""],
	"CCNP Service Provider Operations": ["CCNP SP Operations validates knowledge and skills required to troubleshoot and maintain service provider IP NGN core network infrastructures.","CCNP SP Operations demonstrates knowledge and skills required to isolate network performance problems, implement proactive fault measures using operations management processes, frameworks, and network management systems."],
	"CCNP Voice": ["CCNP Voice validates advance knowledge required to integrate into underlying network architectures and a robust set of skills in implementing, operating, configuring, and troubleshooting a converged IP network.","This includes the ability to create a collaboration solution that is transparent, scalable, and manageable."],
	"CCNP Wireless": ["CCNP Wireless addresses the need for designing, implementing, and operating Cisco Wireless networks and mobility infrastructures.","It emphasizes knowledge of wireless networking principles and theory."]
};

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
				if (certDescriptions.hasOwnProperty(responseCert)){
					var o = {'cert': responseCert, 'name': responseName, 'description': certDescriptions[responseCert][0]};
				}
				var o = {'cert': responseCert, 'name': responseName, 'description': "No Description Present."};
				callback(JSON.stringify(o));
			}
		} else callback(500);
	});
}