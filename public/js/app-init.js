//// CONSOLE FIX

if (typeof console == "undefined" || typeof console.log == "undefined") {
    var console = {
        log: function() {}
    };
}

//// INIT

moment.lang('pt-br');
var showdown = new Showdown.converter({extensions:["table", "ufm"]});

//// EMBER APP

window.App = Ember.Application.create({
    // mostrar transicoes
    LOG_TRANSITIONS: true,
    // salvar path
    currentPath: ''
});

//// EMBER Helpers

Ember.Handlebars.registerBoundHelper('momentago', function(value, options) {
  var escaped = Handlebars.Utils.escapeExpression(value);
  return new Handlebars.SafeString('<span class="momentago">' + moment(escaped).fromNow() + '</span>');
});

Ember.Handlebars.registerBoundHelper('ufm', function(value, options) {
  //var escaped = Handlebars.Utils.escapeExpression(value);
  //return new Handlebars.SafeString(showdown.makeHtml(escaped));
  if(value) return new Handlebars.SafeString(showdown.makeHtml(value));
});