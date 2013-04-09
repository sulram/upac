if (typeof console == "undefined" || typeof console.log == "undefined") {
    var console = {
        log: function() {}
    };
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
/*
(function(window, $) {

    var $window = $(window);

    var APP = {

        init: function(){       

            $window.resize( this.resize );
            $window.resize();

            $('.menuit').on('click',function(){
                window.current = $(this).attr('href');

            })

        },

        resize: function(e) {


        }
    };

window.APP = APP;

}(window, jQuery));

jQuery('document').ready(function($){
    APP.init();
});
*/


window.App = Ember.Application.create();



App.Router.map(function() {
    this.route("agenda");
    this.route("rede");
    this.route("blog");
    this.resource('upac', { path: '/upac' }, function() {
        this.route('quem');
        this.route('video');
        this.route('voce');
        this.route('contato');
    });
});

App.ApplicationRoute = Ember.Route.extend({
  setupController: function(controller) {
    // `controller` is the instance of ApplicationController
    controller.set('title', "Hello world!");
  }
});

App.ApplicationController = Ember.Controller.extend({
  appName: 'UPAC'
});