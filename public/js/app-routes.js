App.Router.map(function() {
    this.resource("home");
    this.resource("agenda");
    this.resource("rede", function(){
        this.route('profile', { path: '/perfil/:user_username' });
    });
    this.resource("perfil", function(){
        this.route('profile', { path: '/:user_username' });
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

App.PerfilIndexRoute = Em.Route.extend({
    redirect: function() {
        if(User.model !== null){
            this.transitionTo('rede.profile', User.model); 
        } else {
            this.transitionTo('user'); 
        }
    }
});

App.PerfilProfileRoute = Em.Route.extend({
    model: function (param){
        console.log('App.UserModel.find', param.user_username);
        return App.UserModel.find(param.user_username);
    },
    serialize: function(model) {
        return { user_username: model.username };
    },
    setupController: function (controller, model){
        console.log('profile!', model);
        this._super(this, arguments);
    }
});

App.RedeRoute = Em.Route.extend({
    setupController: function(controller, song) {
        App.MapController.isMarking = false;
        App.MapController.getMarkers();
    }
});

App.RedeProfileRoute = Em.Route.extend({
    model: function (param){
        console.log('App.UserModel.find', param.user_username);
        return App.UserModel.find(param.user_username);
    },
    serialize: function(model) {
        return { user_username: model.username };
    },
    setupController: function (controller, model){
        console.log('profile!', model);
        this._super(this, arguments);
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