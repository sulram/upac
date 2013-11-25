module.exports = {
	development: {
		app: {
			name: "UPAC"
		},
		everyone_is_admin: true, // set to false when you assign the first admin users in the admin interface
		db: "mongodb://localhost/upac",
		secret: "your secret string here",
		cdn_server_url: "//blablablablabla.cdn.com/", // url for the root path of the CDN server - without http: so it might work over secure connections
		cdn_container: "upac",
		cdn: { // this section is for configuring the pkgcloud library
			provider: "rackspace", // or "amazon", or "azure"
			// rackspace uses username - apiKey
			// amazon uses key - keyId - region
			// azure uses storageAccount - storageAccessKey
			username: "username",
			apiKey: "foobar"
		},
		image_config: {
			variants: {
				profile:{
					large: {w: 640, h: 480, ops: ['resize-crop']},
					medium: {w: 320, h: 240, ops: ['resize-crop']},
					small: {w: 160, h: 120, ops: ['resize-crop']},
					icon: {w: 64, h: 64, ops: ['resize-crop']},
				},
				content:{
					large: {w: 640, h: 480, ops: ['resize-crop']},
					medium: {w: 320, h: 240, ops: ['resize-crop']},
					small: {w: 160, h: 120, ops: ['resize-crop']},
					icon: {w: 80, h: 80, ops: ['resize-crop']},
				},
				notice: {
					normal: {w: 720, h: 360, ops: ['resize-crop']},
					icon: {w: 72, h: 36, ops: ['resize-crop']},
				},
			},
			format: "jpg",
			quality: 90
		},
		mailer_config: {
			transport: "sendmail", // or "SMTP", or "SES", or ...
			// options are the same as nodemailer's, with our own extras
			nodemailer_config: {
				// for sendmail
				path: '/usr/local/bin/sendmail',
				args: ['-t', '-f from@e.mail'],
			},
			default_options: {
				from: "from@e.mail",
				subject: "Mensagem do site UPAC"
			},
			template_path: 'views/mail/'
		},
		analytics: {
			base_url: 'http://analytics.example.com/',
			site_id: '12345678909876543210'
		}
	},
	test: {

	},
	production: {

	}
}