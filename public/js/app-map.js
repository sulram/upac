
//// VIEW

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
            App.MapController.onMapClick(e);
        });
        google.maps.event.addListener(App.map, 'zoom_changed', this.handleZoom);
    }
});

//// OBJECTS

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
    findUser: function(username){
        return _.findWhere(App.MapController.markers,{username: User.auth.username});
    },
    getMarkers: function(){  
        var that = this;
        that.set('isFetching',true);
        $.ajax({
            type: 'GET',
            url: '/users',
            data: { limit: 0 },
            success: function(data, status, jqXHR){
                User.authenticate(data.auth);
                $.each(data.users, function(i,user){
                    that.markers.push({
                        username: user.username,
                        geo: user.geo.length ? user.geo : [],
                        mark: user.geo.length ? new google.maps.Marker({
                            position: new google.maps.LatLng(user.geo[0],user.geo[1]),
                            map: App.map
                        }) : null
                    });
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
    },
    finishMarking: function(save){
        var that = this;
        var user = App.MapController.findUser();
        if(save && user.mark != null){
            var pos = [
                user.mark.getPosition().lat(),
                user.mark.getPosition().lng()
            ];
            $.ajax({
                type: 'PUT',
                url: '/user/'+User.get('auth.id'),
                data: { geo: pos },
                success: function(data, status, jqXHR){
                    User.authenticate(data.auth);
                    that.set('isMarking',false);
                    console.log('saved',pos);
                },
                error: function(jqXHR,status,error){
                    console.log(jqXHR);
                    User.authenticate(JSON.parse(jqXHR.responseText));
                }
            });
        } else {
            if(user.geo.length == 0){
                if(user.mark){
                    user.mark.setMap(null)
                    user.mark = null;
                }
            } else {
                user.mark.setPosition(
                    new google.maps.LatLng(user.geo[0],user.geo[1])
                )
            }
            that.set('isMarking',false);
        }
        
    },
    onMapClick: function(e){

        if(!App.MapController.isMarking){
            
            console.log( 'get position!', e.latLng );

        } else {

            console.log( 'mark!', e.latLng.kb );

            var user = App.MapController.findUser();

            if(user.mark === null){
                user.mark = new google.maps.Marker({
                    position: e.latLng,
                    map: App.map
                });
            } else {
                user.mark.setPosition(e.latLng);
                console.log(user.username,e.latLng);
            }
        }
    }
});
