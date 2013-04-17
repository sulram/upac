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

//// USER

App.User = Ember.Object.extend({
  auth: {
    id: null,
    loggedIn: false,
    username: null,
  },
  init: function() {
    this._super();
    var _self = this;
    $.ajax({
        type: 'GET',
        url: '/users',
        data: { limit: 1 },
        success: function(data, status, jqXHR){
            _self.authenticate(data.auth);
        },
        error: function(jqXHR,status,error){
            console.log(jqXHR);
            _self.authenticate(JSON.parse(jqXHR.responseText));
        }
    });
  },
  authenticate: function(auth){
    this.set('auth',auth);
    console.log('auth!',auth);
  }
});

var User = App.User.create();

//// ROUTES

// ROUTER PRINCIPAL

App.Router.map(function() {
    this.resource("home");
    this.resource("agenda");
    this.resource("rede");
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

//// CONTROLLERS

// CONTROLLER PRINCIPAL

App.ApplicationController = Ember.Controller.extend({
    route_class: null,
    needs: ['rede'],
    // variavel com hash atual
    updateCurrentPath: function() {
        var path_array = this.get('currentPath').split('.');
        var route_class = path_array.length > 1 ? path_array[0] + ' ' + path_array.join('-') : path_array[0];
        this.set('route_class',route_class);
        App.set('currentPath', route_class);
    }.observes('currentPath')
});

App.RedeController = Ember.Controller.extend({
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

//// VIEWS

// MENU PRINCIPAL

App.MenuView = Em.View.extend({
    templateName: 'menu'
});

// SLIDESHOW HOME

App.HomeSlidesView = Ember.View.extend({
    templateName: 'home_slides',
    t:-1,
    timer: null,
    tik: function(){
        this.t = (this.t+1)%3;
        this.$('.slideshow li').removeClass('lastshow');
        this.$('.slideshow li.show').addClass('lastshow');
        this.$('.slideshow li').removeClass('show');
        this.$('.slideshow li').eq(this.t).addClass('show').hide().fadeIn(500);
        //console.log('tick',this.t);
        this.timer = Ember.run.later(this, 'tik', 4000);
    },
    resize: function(e){
        //this.$()
    },
    didInsertElement: function(){
        //this.$().hide().show('slow');
        this.$('.slideshow li').each(function(i,el){
            var img = $(el).find('img');
            var src = img.attr('src');
            $(el).css({backgroundImage:'url('+src+')'});
            //img.remove();
        });
        this.tik();
        this.resize();
        this.$(window).bind('resize',this.resize);
    },
    willDestroyElement: function(){
        Ember.run.cancel(this.timer);
        this.$(window).unbind('resize');
    }
    
});

// MAPA

App.RedeMapaView = Ember.View.extend({
    templateName: 'rede_mapa',
    handleZoom: function() {
        if (App.map.getZoom() < 3){
            App.map.setZoom(3);
        }
        console.log('zoom factor',App.map.getZoom());
    },
    didInsertElement: function(){

        var MY_MAPTYPE_ID = "UPAC";

        var myOptions = {
            center: new google.maps.LatLng(0, 0),
            zoom: 3,
            mapTypeId: MY_MAPTYPE_ID,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
            },
            mapTypeControl: false,
            streetViewControl: false,
            panControl: false,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.MEDIUM,
                position: google.maps.ControlPosition.LEFT_BOTTOM
            }
        };
        
        // cria mapa
        App.map = new google.maps.Map($("#map_canvas").get(0),myOptions);
        // cria estilo
        var styledMapOptions = { name: 'UPAC Map' };
        var customMapType = new google.maps.StyledMapType(mapstyles.lightblue, styledMapOptions);
        // aplica estilo
        App.map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
        // eventos
        google.maps.event.addListener(App.map, 'click', function(e){
            App.MapController.createMark(e);
        });
        google.maps.event.addListener(App.map, 'zoom_changed', this.handleZoom);
    }
});

App.MapMarker = Ember.Object.extend({
    latLng: null,
    latitude: function () {return this.latLng.lat()}.property('latLng'),
    longitude: function () {return this.latLng.lng()}.property('latLng'),
    removeFromMap: function () {
        i = App.markers.get('content').indexOf(this);
        App.MapMarkers.removeAt(i);
    },
    markerClick: function () {
        App.MapMarkers.set('selection', this);
    }
});

App.MapController = Em.Object.create({
    isMarking: false,
    isFetching: true,
    markers: [],
    getMarkers: function(){
        
        var that = this;
        that.set('isFetching',true);

        $.ajax({
            type: 'GET',
            url: '/users',
            data: { limit: 0 },
            success: function(data, status, jqXHR){
                User.authenticate(data.auth);
                $.each(data.users, function(i,el){
                    //var user = data.users[u];
                    if(el.geo.length){
                        console.log('user',el.geo);
                        that.markers.push(new google.maps.Marker({
                            position: new google.maps.LatLng(el.geo[0],el.geo[1]),
                            map: App.map
                        }));
                    }
                });
            that.set('isFetching',false);
            },
            error: function(jqXHR,status,error){
                console.log(jqXHR);
                _self.authenticate(JSON.parse(jqXHR.responseText));
                that.set('isFetching',false);
            }
        });
    },
    startMarking: function(){
        this.set('isMarking',true);
        if(App.MapController.userPosition){
            App.MapController.userMark = new google.maps.Marker({
                position: e.latLng,
                map: App.map
            });
        }
    },
    finishMarking: function(save){
        var that = this;
        if(save){
            var pos = [
                App.MapController.userPosition.jb,
                App.MapController.userPosition.kb
            ];
            $.ajax({
                type: 'PUT',
                url: '/user/'+User.get('auth.id'),
                data: { geo: pos },
                success: function(data, status, jqXHR){
                    User.authenticate(data.auth);
                    that.set('isMarking',false);
                    console.log('saved',pos);
                    that.getMarkers();
                },
                error: function(jqXHR,status,error){
                    console.log(jqXHR);
                    _self.authenticate(JSON.parse(jqXHR.responseText));
                    
                }
            });
        }
        
    },
    createMark: function(e){

        if(!App.MapController.isMarking){
            
            console.log( 'get position!', e.latLng );

        } else {

            console.log( 'mark!', e.latLng.kb );
            
            if(App.MapController.userMark) App.MapController.userMark.setMap(null);

            App.MapController.userPosition = e.latLng;
            App.MapController.userMark = new google.maps.Marker({
                position: e.latLng,
                map: App.map
            });
        }
    }
});

//// MODELS


