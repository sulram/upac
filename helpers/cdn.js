
module.exports = function (config) {
	var create = function() {
		return require('pkgcloud').storage.createClient(config.cdn);
	}
	if (config.cdn.provider == "amazon") {
		create = function() {
			var aws = require('aws-sdk')
			aws.config.update({
				accessKeyId: config.cdn.keyId,
				secretAccessKey: config.cdn.key,
				//sslEnabled: false,
				region: config.cdn.region
			});
			return {
				upload:function(params, cb){
					var s3 = new aws.S3({
						params: {
							Bucket:params.container,
							//Key:params.remote,
							region: config.cdn.region,
						}});
					s3.putObject({
						Key: params.remote,
						Body: require('fs').createReadStream(params.local)
					}, cb);
				}
			};
		}
	}
	return {
		server_url: config.cdn_server_url,
		container: config.cdn_container,
		create: create
	}
}