const Cam = require('onvif').Cam;
const Request = require('request');

var getSnapshot = module.exports = function(profileToken, callback) {

	if(!this.cachedSnapshotUris){
		this.cachedSnapshotUris = {}
	}

	if(typeof profileToken === 'function'){
		callback = profileToken;
		profileToken = false;
	}

	if(!profileToken){
		profileToken = this.activeSource.profileToken;
	}

	return new Promise((resolve, reject) => {

		const next = () => {
			Request({
				method: 'GET',
				uri: this.cachedSnapshotUris[profileToken],
				gzip: true,
				encoding: 'binary',
				'auth': {
					'user': this.username,
					'pass': this.password,
					'sendImmediately': false
				}
			},
			(err, response, body) => {
				if(err){
					return callback ? callback(err) : reject(err);
				}

				const mimeType = response.headers['content-type'];
				const data = {
					mimeType: mimeType,
					rawImage: Buffer.from(body, 'binary')
				};
				
				return callback ? callback(null, data) : resolve(data);
			});
		}


		if(!this.cachedSnapshotUris[profileToken]){
			this.getSnapshotUri({profileToken: profileToken}, (err, res) => {
				if(err){
					return callback ? callback(err) : reject(err);
				}

				this.cachedSnapshotUris[profileToken] = res.uri;

				return next();
			})
		}else{
			return next();
		}
	});
};

//Set the getSnapshot property on the Cam prototype so others can use it
Cam.prototype.getSnapshot = getSnapshot;
