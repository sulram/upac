var fixtures = require('pow-mongoose-fixtures'),
	User = require('./models/user'),
	Article = require('./models/article');

fixtures.load({
	User: [
		{
			name: 'Tiago Rezende',
			username: 'tiagosr',
			password: 'password',
		}
	],
	Article: [
	],
});