//// ESTILOS E TEMPLATES

var UIcon = L.Icon.extend({
    options: {
        iconUrl: 'img/pin_action.png',
        shadowUrl: 'img/pin_shadow.png',
        iconSize: [44, 56],
        iconAnchor: [22, 56],
        popupAnchor: [0, -50],
        shadowSize: [50, 30],
        shadowAnchor: [15, 30]
    }
});

var userIcon = new UIcon({iconUrl: 'img/pin_user.png'});
var calIcon = new UIcon({iconUrl: 'img/pin_cal.png'});

function userPopup(user) {
    return '<strong>' + user.name + '</strong><br/><a href="#/rede/perfil/'+user.username+'">Ver perfil</a>';
}

function createUserPin(user){
    return {
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [
                user.geo[1],
                user.geo[0]
                ]
            },
        properties: {
            type: "user",
            name: user.name,
            username: user.username
        }
    };
};


//// VIEW

App.RedeMapaView = Ember.View.extend({
    templateName: 'rede_mapa',
    handleZoom: function() {
        //if (App.map.getZoom() < 2){
        //    App.map.setZoom(2);
        //}
        //console.log('zoom factor',App.map.getZoom());
    },
    didInsertElement: function(){
        App.map = L.map('map_canvas',{minZoom: 3});
        App.map_tiles = new L.TileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: 'Powered by Leaflet & OpenStreetMap'});
        App.map.addLayer(App.map_tiles).setView(new L.LatLng(0,0), 2);
    }
});

App.MapController = Em.Object.create({
    isMarking: false,
    isFetching: true,
    geojson: {},
    users: [],
    focus: null,
    findTheUser: function(){
        return _.findWhere(App.MapController.users,{username: User.auth.username});
    },
    updateUser: function(user){
        var pin = this.findUserPin(user.username);
        pin.bindPopup(userPopup(user), {closeButton: false});
    },
    findUserPin: function(username){
        var user;
        _.each(this.geojson._layers, function(el,i){
            if(el.feature.properties.username && el.feature.properties.username == username){
                console.log('findUserPin ', i, el.feature, el.feature.properties.username)
                user = el;
            }
        });
        return user;
    },
    focusUser: function(username){
        if(this.get('isFetching')){
            //console.log('saved focus', username);
            this.set('saveFocus', username);
        }else{
            //console.log("focus " + username);
            var pin = this.findUserPin(username);
            if(pin){
                console.log(pin);
                App.map.panTo(pin._latlng);
                pin.openPopup();
            }
        }
    },
    unFocusAll: function(){
        var last = _.findWhere(App.MapController.markers,{selected: true});
        if(last){
            last.marker.setIcon(App.MapStyles.pin.user[0]);
            last.marker.setShape(App.MapStyles.pin.user[1]);
            last.selected = false;
        }
    },
    getMarkers: function(){
        var that = this;
        var geodata = {type: "FeatureCollection", features: []};
        this.users = [];
        this.set('isFetching',true);
        $.ajax({
            type: 'GET',
            url: '/users',
            data: { limit: 0 },
            success: function(data, status, jqXHR){
                console.log('map: loaded users');
                User.authenticate(data.auth);
                $.each(data.users, function(i,user){
                    that.users.push(user);
                    if(user.geo && user.geo.length){
                        geodata.features.push(createUserPin(user));
                    }
                });

                that.set('isFetching',false);


                // cria geojson

                that.geojson = L.geoJson(geodata,{
                    pointToLayer: function(feature, latlng){
                        if(feature.properties && feature.properties.type == "user"){
                            return L.marker(latlng, {icon: userIcon});    
                        }
                        return L.marker(latlng);
                    },
                    onEachFeature: function(feature, layer){
                        if (feature.properties && feature.properties.type == "user") {
                            var username = feature.properties.username
                            var name = feature.properties.name || username;
                            layer.bindPopup(userPopup({username: username, name: name}), {closeButton: false});
                        }
                        //console.log('feat',feature);
                    }
                });

                // adiciona geojson no mapa

                App.map.addLayer(that.geojson);

                // foca usuario se o foco estava salvo

                if(that.get('saveFocus') != null){
                    console.log('delayed focus');
                    that.focusUser(that.get('saveFocus'));
                    that.set('saveFocus',null);
                }
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
        App.map.on('click', this.onMapClick);
    },
    finishMarking: function(save){
        var that = this;
        var user = this.findTheUser();
        var pin = this.findUserPin(user.username);
        App.map.off('click', this.onMapClick);
        if(save && pin){
            var pos = [
                pin._latlng.lat,
                pin._latlng.lng
            ];
            $.ajax({
                type: 'PUT',
                url: '/user/'+User.get('auth.id'),
                data: { geo: pos },
                success: function(data, status, jqXHR){
                    user.geo[0] = pos[0];
                    user.geo[1] = pos[1];
                    User.authenticate(data.auth);
                    that.set('isMarking',false);
                    console.log('saved',pos);
                    user.firsttime = false;
                },
                error: function(jqXHR,status,error){
                    console.log(jqXHR);
                    User.authenticate(JSON.parse(jqXHR.responseText));
                }
            });
        } else {
            console.log('cancel user',user);
            if(user.firsttime){
                user.geo = [];
                if(pin){
                    console.log(pin);
                    //delete App.MapController.geojson._layers[pin];
                    App.map.removeLayer(pin);
                }
            } else {
                pin.setLatLng(new L.LatLng(user.geo[0],user.geo[1]));
            }
            that.set('isMarking',false);
        }
        
    },
    createMarker: function(username, latLng, select){
        
    },
    onMapClick: function(e){

        var user = App.MapController.findTheUser();
        var pin = App.MapController.findUserPin(user.username);
        
        console.log( 'mark!', e.latlng, user, pin );

        if(!pin){
            user.firsttime = 1;
            user.geo[0] = e.latlng.lat;
            user.geo[1] = e.latlng.lng;
            pin = createUserPin(user);
            App.MapController.geojson.addData(pin);
        } else {
            pin.setLatLng(e.latlng);
            pin.addTo(App.map);
        }
        
    }
});
