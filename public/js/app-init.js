//// CONSOLE FIX

if (typeof console == "undefined" || typeof console.log == "undefined") {
    var console = {
        log: function() {}
    };
}

//// INIT

moment.lang('pt-br');

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