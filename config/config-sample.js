module.exports = {
	development: {
		app: {
			name: "UPAC"
		},
		db: "mongodb://localhost/upac",
		secret: "your secret string here",
		cdn: { // this section is for 
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