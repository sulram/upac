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
    this.resource("home");
    this.resource("agenda");
    this.resource("rede");
    this.resource("blog");
    this.resource("upac");
    this.resource("user",function(){
        this.route("entrar");
        this.route("sair");
        this.route("cadastrar");
        this.route("perfil");
    });
});

App.IndexRoute = Em.Route.extend({
    redirect: function() {
        this.transitionTo('home');   
    }
});
/*
App.UserRoute = Em.Route.extend({

});
*/
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

App.RedeView = Ember.View.extend({
    templateName: 'mapa',
    handleClick: function(e){
       console.log( e.latLng );
    },
    handleZoom: function() {
        if (App.map.getZoom() < 3){
            App.map.setZoom(3);
        }
        console.log('zoom factor',App.map.getZoom());
    },
    didInsertElement: function(){

        var MY_MAPTYPE_ID = "UPAC";

        var myOptions = {
            center: new google.maps.LatLng(-16, -45),
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
        google.maps.event.addListener(App.map, 'click', this.handleClick);
        google.maps.event.addListener(App.map, 'zoom_changed', this.handleZoom);

        console.log('maps!');
    }
});

//// VIEWS

// MENU PRINCIPAL

App.MenuView = Em.View.extend({
    templateName: 'menu'
});

// SLIDESHOW HOME

App.HomeSlidesView = Ember.View.extend({
    templateName: 'home_view',
    t:-1,
    timer: null,
    tik: function(){
        this.t = (this.t+1)%3;
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
