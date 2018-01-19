const Onvif = require('onvif');
require('../lib/snapshot.js');

const Cam = new Onvif.Cam({
	hostname: process.env.HOSTNAME,
	username: process.env.USER,
	password: process.env.PASSWORD
}, function(err){
	if(err) throw err;

	this.getSnapshot((err, data) => {
		if(err) throw err;

		console.log(data);
	});
}); 