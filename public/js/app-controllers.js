App.ApplicationController = Ember.Controller.extend({
    route_class: null,
    //needs: ['rede'],
    // variavel com hash atual
    updateCurrentPath: function() {
        var path_array = this.get('currentPath').split('.');
        var route_class = path_array.length > 1 ? path_array[0] + ' ' + path_array.join('-') : path_array[0];
        this.set('route_class',route_class);
        App.set('currentPath', route_class);
        this.hideContentModal();
    }.observes('currentPath'),
    contentModalVisible: false,
    showContentModal: function(){
        this.set('contentModalVisible',true);
        console.log('show modal content');
    },
    hideContentModal: function(){
        this.set('contentModalVisible',false);
        console.log('hide modal content');
    }
});

App.HomeController = Ember.ObjectController.extend({
    notices: [],
    current: 0,
    nextnews: function(){
        this.current = (this.current + 1) % (this.notices.length - 1);
        $('.noticias').animate({
            scrollLeft: this.current * 365
        }, 500);
    },
    init: function(){
        console.log('INIT HOME');
        var _this = this;
        $.getJSON('/notices', function(data){
            var notices = [];
            $.each(data.notices, function(i, child) {
                var notice = Ember.Object.create(child);
                notices.push(notice);
            });
            _this.set('notices', notices);
        });
    }
});

App.TimelineIndexController = Ember.ObjectController.extend({
    isTheLoggedUser: function(){
        return this.get('model.username') == User.auth.username;
    }.property('model.username','User.auth.username')
});

App.TimelineEditarController = Ember.ObjectController.extend({
    isTheLoggedUser: function(){
        return this.get('model.username') == User.auth.username;
    }.property('model.username','User.auth.username')
});

App.RedePerfilController = Ember.ObjectController.extend({
    isTheLoggedUser: function(){
        return this.get('model.username') == User.auth.username;
    }.property('model.username','User.auth.username'),
    startMarking: function(){
        App.MapController.startMarking();
    },
    finishMarking: function(){
        App.MapController.finishMarking(true);
    },
    cancelMarking: function(){
        App.MapController.finishMarking();
    },
    focusUser: function(){
        console.log('profile is loaded?',this.get('content.isLoaded'));
        if(this.get('content.isLoaded')){
            App.MapController.focusUser(this.get('content.username'));
        }
    }.observes('content.isLoaded')
});

App.RedeEditarController = Ember.ObjectController.extend({
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
            type: 'PUT',
            url: '/user/' + User.auth.id,
            data: data,
            success: function(data, status, jqXHR){
                console.log('success', data);
                _controller.set('isPosting',false);
                User.authenticate(data.auth);
                window.location.hash = '/rede/perfil/' + data.user.username;
            },
            error: function(jqXHR,status,error){
                console.log('error', arguments);
                _controller.set('isPosting',false);
            }
        });
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