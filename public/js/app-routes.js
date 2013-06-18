App.Router.map(function() {
    this.resource("home");
    this.resource("agenda");
    this.resource("rede", function(){
        this.route('perfil', { path: '/perfil/:user_username' });
        this.route('avatar');
        this.route('editar');
        this.route('add');
    });
    this.resource("timeline", { path: '/timeline/:user_username' }, function(){
        this.route("editar");
    });
    this.resource("blog",function(){
        this.route("post", { path: '/post/:post_id' });
        this.route("recentes", { path: '/recentes/:page_num' });
    });
    this.resource("upac");
    this.resource("user",function(){
        this.route("cadastrar");
    });
    this.route('logout');
});

// TIMELINE

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
        controller.set('model', model);
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

// REDE

App.RedeRoute = Em.Route.extend({
    setupController: function(controller, model) {
        App.MapController.isMarking = false;
        App.MapController.getMarkers();
    }
});

App.RedeIndexRoute = Em.Route.extend({
    setupController: function (controller, model){
        this._super(this, arguments);
    }
});

App.RedePerfilRoute = Em.Route.extend({
    model: function (param){
        console.log('App.UserModel.find', param.user_username);
        return App.UserModel.find(param.user_username);
    },
    serialize: function(model) {
        if(model) return { user_username: model.username };
    },
    setupController: function (controller, model){
        this._super(this, arguments);
        if(model.isLoaded){
            controller.focusUser();
        }
    },
    deactivate: function(){
         App.MapController.unFocusAll();
    }
});

App.RedeEditarRoute = Em.Route.extend({
    setupController: function (controller, model){
        this._super(this, arguments);
    }
});

// BLOG

App.BlogIndexRoute = Em.Route.extend({
    redirect: function() {
        this.transitionTo('blog.recentes', Ember.Object.create({page_num: 1}));   
    }
});

App.BlogRecentesRoute = Em.Route.extend({
    model: function(param){
        return Ember.Object.create({page_num: param.page_num});
    },
    serialize: function(model) {
        if(model) return { page_num: model.page_num };
    },
    setupController: function (controller, model){
        controller.set('model', model);
        controller.getcontent();
        this._super(this, arguments);
    }
});

App.BlogPostRoute = Em.Route.extend({
    model: function(param){
        return Ember.Object.create({post_id: param.post_id});
    },
    serialize: function(model) {
        if(model) return { post_id: model.post_id };
    },
    setupController: function (controller, model){
        controller.set('model', model);
        controller.getcontent();
        this._super(this, arguments);
    }
});

// LOGOUT

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