
/**
 * Module dependencies.
 */

var express = require('express')
  , env = process.env.NODE_ENV || 'development'
  , routes = require('./routes')
  , user = require('./routes/user')
  , config = require('./config/config')[env]
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

var app = express();

mongoose.connect(config.db);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
