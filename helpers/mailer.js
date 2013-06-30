var nodemailer = require('nodemailer')
  , jade = require('jade')
  , _ = require('underscore')

module.exports = function(config) {
	var transport = nodemailer.createTransport(config.transport, config.nodemailer_options);
	return {
		send: function(to, view, data, options) {
			var opts = _.defaults(config.default_options, options);
			jade.renderFile(opts.path+view, {locals: data}, function(err, body) {
				if(err) console.error(err);
				var maildata = {
					to: opts.to,
					sender: opts.sender,
					reply_to: opts.reply_to || opts.sender,
					subject: data.subject || opts.subject,
					body: body
				};
				transport.send_mail(maildata, function(err, success) {
					if(err) {
						console.warn(err);
					} else if(success) {
						console.info('Email sent to %s', opts.to);
					}
				})
			})
		}
	}
}