// CONSOLE FIX

if (typeof console == "undefined" || typeof console.log == "undefined") {
    var console = {
        log: function() {}
    };
}

//// EMBER APP

window.App = Ember.Application.create({
    // mostrar transicoes
    LOG_TRANSITIONS: true,
    // salvar path
    currentPath: ''
});

//// ROUTES

// ROUTER PRINCIPAL

App.Router.map(function() {
    this.route("home");
    this.route("agenda");
    this.route("rede");
    this.route("blog");
    this.resource('upac', function() {
        this.route('video');
        this.route('voce');
        this.route('contato');
    });
});

App.IndexRoute = Em.Route.extend({
    redirect: function() {
        this.transitionTo('home');   
    }
});

//// CONTROLLERS

// CONTROLLER PRINCIPAL

App.ApplicationController = Ember.Controller.extend({
    route_class: null,
    // variavel com hash atual
    updateCurrentPath: function() {
        var path_array = this.get('currentPath').split('.');
        var route_class = path_array.length > 1 ? path_array[0] + ' ' + path_array.join('-') : path_array[0];
        this.set('route_class',route_class);
        App.set('currentPath', route_class);
    }.observes('currentPath')
});

//// VIEWS

// MENU PRINCIPAL

App.MenuView = Em.View.extend({
    templateName: 'menu'
});


