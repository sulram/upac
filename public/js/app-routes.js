App.Router.map(function() {
    this.resource("home");
    this.resource("agenda");
    this.resource("rede", function(){
        this.route('perfil', { path: '/perfil/:user_username' });
        this.route('avatar');
        this.route('editar');
        this.route('add');
        this.route('marker', { path: '/marker/:marker_slug' });
        this.route('markernew');
    });
    this.resource("blog",function(){
        this.route("post", { path: '/post/:post_id' });
        this.route("recentes", { path: '/recentes/:page_num' });
        this.route("tag", { path: '/tag/:tag_slug/:page_num' });
        this.route("user", { path: '/user/:user_username/:page_num' });
    });
    this.resource("upac");
    this.resource("user",function(){
        this.route("cadastrar");
    });
    this.route('logout');
});

App.UpacRoute = Em.Route.extend({
    setupController:function(controller,model){
        window.scrollTo(0, 0);
        this._super(this, arguments);
    }
});

App.IndexRoute = App.UpacRoute.extend({
    redirect: function() {
        this.transitionTo('home');   
    }
});

App.HomeRoute = App.UpacRoute.extend({
    setupController: function (controller){
        this._super(this, arguments);
        this.controller.enter();
    },
    exit: function(){
        this.controller.exit();
    }
});

// REDE

App.RedeRoute = App.UpacRoute.extend({
    setupController: function(controller, model) {
        App.MapController.set('mapIsLoaded', false);
        App.MapController.isMarking = false;
        App.MapController.getMarkers();
    }
});

App.RedeIndexRoute = App.UpacRoute.extend({
    setupController: function (controller, model){
        this._super(this, arguments);
    }
});

App.RedePerfilRoute = App.UpacRoute.extend({
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

App.RedeEditarRoute = App.UpacRoute.extend({
    setupController: function (controller, model){
        this._super(this, arguments);
        controller.set('tags',[]);
        if(User.model && User.model.username){
            App.MapController.focusUser(User.model.username);
        }
    }
});

App.RedeMarkernewRoute = App.UpacRoute.extend({
    setupController: function (controller){
        this._super(this, arguments);
        this.controller.enter();
    },
    exit: function(){
        this.controller.exit();
    }
});

// BLOG

App.BlogIndexRoute = App.UpacRoute.extend({
    redirect: function() {
        this.transitionTo('blog.recentes', Ember.Object.create({page_num: 1}));   
    }
});

App.BlogRecentesRoute = App.UpacRoute.extend({
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

App.BlogTagRoute = App.UpacRoute.extend({
    model: function(param){
        return Ember.Object.create({tag_slug: param.tag_slug, page_num: param.page_num});
    },
    serialize: function(model) {
        if(model) return { tag_slug: model.tag_slug, page_num: model.page_num };
    },
    setupController: function (controller, model){
        controller.set('model', model);
        controller.set('articles', []);
        controller.set('tagName', null);
        controller.getcontent();
        this._super(this, arguments);
    }
});

App.BlogUserRoute = App.UpacRoute.extend({
    model: function(param){
        return Ember.Object.create({user_username: param.user_username, page_num: param.page_num});
    },
    serialize: function(model) {
        if(model) return { user_username: model.user_username, page_num: model.page_num };
    },
    setupController: function (controller, model){
        controller.set('model', model);
        controller.set('articles', []);
        controller.getcontent();
        this._super(this, arguments);
    }
});

App.BlogPostRoute = App.UpacRoute.extend({
    model: function(param){
        return Ember.Object.create({post_id: param.post_id});
    },
    serialize: function(model) {
        if(model) return { post_id: model.post_id };
    },
    setupController: function (controller, model){
        controller.set('model', model);
        controller.set('isLoaded', false);
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