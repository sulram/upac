
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
				region: "us-west-2"
			});
			var s3 = new aws.S3({params: {Bucket: config.cdn_container}});
			return {
				upload:function(params, cb){
					s3.putObject({
						ACL: "public-read",
						Bucket: config.cdn_container,
						Key: params.remote,
						Body: require('fs').ReadStream(params.local)
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