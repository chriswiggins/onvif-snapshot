# onvif-snapshot
Include this library to take a snapshot of a camera with the onvif library.

Returns an object:
```
{
	mimeType: 'jpg|png',
	rawImage: <Node.JS Buffer>
}
```

## Examples

### Promise

```javascript
const Onvif = require('onvif');
require('onvif-snapshot');

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
```

### Callback

```javascript
const Onvif = require('onvif');
require('onvif-snapshot');

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
```
