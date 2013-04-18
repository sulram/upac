App.ApplicationController = Ember.Controller.extend({
    route_class: null,
    //needs: ['rede'],
    // variavel com hash atual
    updateCurrentPath: function() {
        var path_array = this.get('currentPath').split('.');
        var route_class = path_array.length > 1 ? path_array[0] + ' ' + path_array.join('-') : path_array[0];
        this.set('route_class',route_class);
        App.set('currentPath', route_class);
    }.observes('currentPath')
});

App.RedeProfileController = Ember.ObjectController.extend({
    isTheLoggedUser: function(){
        return this.get('model.username') == User.auth.username
    }.property('model.username','User.auth.username'),
    startMarking: function(){
        App.MapController.startMarking();
    },
    finishMarking: function(){
        App.MapController.finishMarking(true);
    },
    cancelMarking: function(){
        App.MapController.finishMarking();
    }
});

App.UserIndexController = Ember.Controller.extend({
    isPosting: false,
    flashMsg: null,
    onFocus: function(){
        this.set('flashMsg',null);
    },
    submit: function(){
        var data = $('form').serialize();
        this.set('isPosting',true);
        this.set('flashMsg',null);
        var _controller = this;
        $.ajax({
            type: 'POST',
            url: '/user/session',
            data: data,
            success: function(data, status, jqXHR){
                console.log(data);
                _controller.set('isPosting',false);
                User.authenticate(data.auth);
            },
            error: function(jqXHR,status,error){
                console.log(arguments);
                _controller.set('isPosting',false);
                _controller.set('flashMsg','verifique nome de usuário e senha');
            }
        });
    }
});

App.UserCadastrarController = Ember.Controller.extend({
    isPosting: false,
    flashMsg: null,
    onFocus: function(){
        this.set('flashMsg',null);
    },
    submit: function(){
        var data = $('form').serialize();
        this.set('isPosting',true);
        this.set('flashMsg',null);
        var _controller = this;
        $.ajax({
            type: 'POST',
            url: '/user',
            data: data,
            success: function(data, status, jqXHR){
                _controller.set('isPosting',false);
                User.authenticate(data.auth);
            },
            error: function(jqXHR,status,error){
                console.log(arguments);
                _controller.set('isPosting',false);
                _controller.set('flashMsg','verifique nome de usuário e senha');
            }
        });
    }
});