var nodemailer = require('nodemailer')
  , jade = require('jade')
  , _ = require('underscore')

module.exports = function(config) {
	var transport = nodemailer.createTransport(config.transport, config.nodemailer_config);
	return {
		send: function(to, view, data, options) {
			var opts = _.defaults(config.default_options, options);
			jade.renderFile(config.template_path+view+".jade", data, function(err, body) {
				if(err) console.error(err);
				var maildata = {
					to: to,
					sender: opts.sender,
					reply_to: opts.reply_to || opts.sender,
					subject: data.subject || opts.subject,
					html: body
				};
				transport.sendMail(maildata, function(err, response) {
					if(err) {
						console.warn("Error!")
						console.warn(err);
					} else {
						console.info('Email sent to %s:', to);
						console.info(response);
					}
				})
			})
		}
	}
}