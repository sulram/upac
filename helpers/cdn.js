
module.exports = function (config) {
	var create = function() {
		return require('pkgcloud').storage.createClient(config.cdn);
	}
	if (config.cdn.provider == "amazon") {
		create = function() {
			var aws = require('aws-sdk')
			aws.config.update({
				accessKeyId: config.keyId,
				secretAccessKey: config.key,
				sslEnabled: false,
				region: "sa-east-2"
			});
			return {
				upload:function(params, cb){
					var s3 = new aws.S3({
						params: {
							Bucket:params.container,
							Key:params.remote,
						}});
					s3.listObjects({Bucket:params.container}, function(err, data) {
						console.info(err);
						console.info(data);
					});
					s3.putObject({
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