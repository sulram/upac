module.exports = {
	development: {
		app: {
			name: "UPAC"
		},
		db: "mongodb://localhost/upac",
		secret: "your secret string here",
		cdn_server_url: "//blablablablabla.cdn.com/", // url for the root path of the CDN server - without http: so it might work over secure connections
		cdn: { // this section is for configuring the pkgcloud library
			provider: "rackspace", // or "amazon", or "azure"
			// rackspace uses username - apiKey
			// amazon uses key - keyId
			// azure uses storageAccount - storageAccessKey
			username: "username",
			apiKey: "foobar"
		}
	},
	test: {

	},
	production: {

	}
}