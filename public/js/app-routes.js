App.Router.map(function() {
    this.resource("home");
    this.resource("agenda");
    this.resource("rede", function(){
        this.route('perfil', { path: '/perfil/:user_username' });
        this.route('avatar');
        this.route('editar');
    });
    this.resource("timeline", { path: '/timeline/:user_username' }, function(){
        this.route("editar");
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
    this.route('logout');
});

App.IndexRoute = Em.Route.extend({
    redirect: function() {
        this.transitionTo('home');   
    }
});

App.TimelineRoute = Em.Route.extend({
    model: function (param){
        console.log('App.UserModel.find', param.user_username);
        return App.UserModel.find(param.user_username);
    },
    serialize: function(model) {
        return { user_username: model.username };
    },
    setupController: function (controller, model){
        console.log('PERFIL', model);
        this._super(this, arguments);
    }
});

App.TimelineIndexRoute = Em.Route.extend({
    model: function (param){
        return this.modelFor('timeline');
    }
});

App.TimelineEditarRoute = Em.Route.extend({
    model: function (param){
        return this.modelFor('timeline');
    }
});

App.RedeRoute = Em.Route.extend({
    setupController: function(controller, song) {
        App.MapController.isMarking = false;
        App.MapController.getMarkers();
    }
});

App.RedeIndexRoute = Em.Route.extend({
    setupController: function (controller, model){
        this._super(this, arguments);
        App.MapController.unFocusAll();
    }
});

App.RedePerfilRoute = Em.Route.extend({
    model: function (param){
        console.log('App.UserModel.find', param.user_username);
        return App.UserModel.find(param.user_username);
    },
    serialize: function(model) {
        return { user_username: model.username };
    },
    setupController: function (controller, model){
        this._super(this, arguments);
        if(model.isLoaded){
            controller.focusUser();
        }
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