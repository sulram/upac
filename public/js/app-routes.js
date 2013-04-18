App.Router.map(function() {
    this.resource("home");
    this.resource("agenda");
    this.resource("rede",function(){
        this.resource('perfil', { path: '/perfil/:user_username' });
    });
    this.resource("blog",function(){
        this.route("recentes");
        this.route("populares");
        this.route("user");
    });
    this.resource("upac");
    this.resource("user",function(){
        this.route("cadastrar");
    });
    this.resource("perfil");
    this.route('logout');
});

App.IndexRoute = Em.Route.extend({
    redirect: function() {
        this.transitionTo('home');   
    }
});



App.RedeRoute = Em.Route.extend({
    setupController: function(controller, song) {
        App.MapController.isMarking = false;
        App.MapController.getMarkers();
    }
});

App.LogoutRoute = Ember.Route.extend({
    redirect: function() {
        var _route = this;
        $.ajax({
            type: 'GET',
            url: '/logout',
            success: function(data, status, jqXHR){
                User.authenticate(data.auth);
                //_route.transitionTo('home');
                window.history.go(-1);
            }
        });
    }
});