const Onvif = require('onvif');
require('../lib/snapshot.js');

const Cam = new Onvif.Cam({
	hostname: process.env.HOSTNAME,
	username: process.env.USER,
	password: process.env.PASSWORD
}, async function(err){
	if(err) throw err;


	try{
		var data = await this.getSnapshot();
	}catch(e){
		return console.error(e);
	}

	console.log(data);
}); 