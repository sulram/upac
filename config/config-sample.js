module.exports = {
	development: {
		app: {
			name: "UPAC"
		},
		db: "mongodb://localhost/upac",
		secret: "your secret string here",
		cdn_server_url: "//blablablablabla.cdn.com/", // url for the root path of the CDN server - without http: so it might work over secure connections
		cdn_container: "upac",
		cdn: { // this section is for configuring the pkgcloud library
			provider: "rackspace", // or "amazon", or "azure"
			// rackspace uses username - apiKey
			// amazon uses key - keyId
			// azure uses storageAccount - storageAccessKey
			username: "username",
			apiKey: "foobar"
		},
		image_config: {
			sizes: [
				{w:640, h:480},
				{w:320, h:240},
				{w:160, h:120},
				{w:80,  h:60}
			],
			format: "jpg",
		}
	},
	test: {

	},
	production: {

	}
}