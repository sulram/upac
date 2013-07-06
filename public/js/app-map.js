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

var upac_new_marker = null;

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

var UpacMarker = L.Marker.extend({
    bindPopup: function(htmlContent, options) {        
        if (options && options.showOnMouseOver) {
            // call the super method
            L.Marker.prototype.bindPopup.apply(this, [htmlContent, options]);
            // unbind the click event
            //this.off("click", this.openPopup, this);
            this.on("click", function(e){
                var props = this.feature.properties;
                if(props.type == "user"){
                    window.location.hash = "/rede/perfil/" + props.username;
                }
                console.log(e,props);
            });
            // bind to mouse over
            this.on("mouseover", function(e) {
                // get the element that the mouse hovered onto
                var target = e.originalEvent.fromElement || e.originalEvent.relatedTarget;
                var parent = this._getParent(target, "leaflet-popup");
                // check to see if the element is a popup, and if it is this marker's popup
                if (parent == this._popup._container)
                    return true;
                // show the popup
                this.openPopup();
            }, this);
            // and mouse out
            this.on("mouseout", function(e) {
                // get the element that the mouse hovered onto
                var target = e.originalEvent.toElement || e.originalEvent.relatedTarget;
                // check to see if the element is a popup
                if (this._getParent(target, "leaflet-popup")) {
                    L.DomEvent.on(this._popup._container, "mouseout", this._popupMouseOut, this);
                    return true;
                }
                // hide the popup
                this.closePopup();
            }, this);
        }
    },
    _popupMouseOut: function(e) {
        // detach the event
        L.DomEvent.off(this._popup, "mouseout", this._popupMouseOut, this);
        // get the element that the mouse hovered onto
        var target = e.toElement || e.relatedTarget;
        // check to see if the element is a popup
        if (this._getParent(target, "leaflet-popup"))
            return true;
        // check to see if the marker was hovered back onto
        if (target == this._icon)
            return true;
        // hide the popup
        this.closePopup();
    },
    _getParent: function(element, className) {
        var parent = element.parentNode;
        while (parent != null) {
            if (parent.className && L.DomUtil.hasClass(parent, className))
                return parent;
            parent = parent.parentNode;
        }
        return false;
    }
});


//// VIEW

App.RedeMapaView = Ember.View.extend({
    templateName: 'view_mapa',
    hasMap: false,
    handleZoom: function() {
        //if (App.map.getZoom() < 2){
        //    App.map.setZoom(2);
        //}
        //console.log('zoom factor',App.map.getZoom());
    },
    didInsertElement: function(){
        var _this = this;
        App.map = L.map('map_canvas',{minZoom: 3});
        App.map_tiles = new L.TileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: 'Powered by Leaflet & OpenStreetMap'});
        App.map.addLayer(App.map_tiles).setView(new L.LatLng(0,0), 2);
        App.map.zoomControl.setPosition('bottomleft');
        Ember.run.next(function(){
            App.MapController.set('mapIsLoaded', true);
        });
    }
});

App.MapController = Em.Object.create({
    mapIsLoaded: false,
    isMarking: false,
    isFetching: true,
    geojson: {},
    users: [],
    cluster: null,
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
                //console.log(pin);
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

                that.afterLoaded(geodata);

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
    afterLoaded: function(geodata){
        var that = this;
        that.geojson = L.geoJson(geodata,{
            pointToLayer: function(feature, latlng){
                if(feature.properties && feature.properties.type == "user"){
                    return new UpacMarker(latlng, {icon: userIcon});    
                }
                return new UpacMarker(latlng);
            },
            onEachFeature: function(feature, layer){
                if (feature.properties && feature.properties.type == "user") {
                    var username = feature.properties.username
                    var name = feature.properties.name || username;
                    layer.bindPopup(userPopup({username: username, name: name}), {showOnMouseOver: true, closeButton: false});
                } else {
                    layer.bindPopup("evento", {showOnMouseOver: true, closeButton: false});
                }
                //console.log('feat',feature);
            }
        });

        // adiciona geojson no mapa
        that.cluster = L.markerClusterGroup({
            maxClusterRadius: 40,
            iconCreateFunction: function (cluster) {
                return L.divIcon({ html: cluster.getChildCount(), className: 'upac_cluster', iconSize: L.point(40, 40) });
            },
        });
        if(!that.isMarkingNew){
            that.cluster.addLayer(that.geojson);
            App.map.addLayer(that.cluster);
        }
    },

    // NEW MARKER

    isMarkingNew: false,
    marker_new: null,
    marker_new_pos: null,

    startNewMarker: function(){
        $('#map_canvas').addClass('marking');
        this.isMarkingNew = true;
        App.MapController.set('marker_new_pos', null);
        App.map.on('click', this.newMarker);
        this.fullMapClear();
    },
    stopNewMarker: function(){
        $('#map_canvas').removeClass('marking');
        this.isMarkingNew = false;
        App.map.off('click', this.newMarker);
        if(upac_new_marker){
            App.map.removeLayer(upac_new_marker);
            upac_new_marker = null;
        }
        this.fullMapShow();
    },
    newMarker: function(e){
        console.log(e.latlng)
        console.log('upac_new_marker',upac_new_marker)
        if(!upac_new_marker) {
            upac_new_marker = new L.Marker(e.latlng,{icon: new UIcon()});
            App.map.addLayer(upac_new_marker);
        } else {
            upac_new_marker.setLatLng(e.latlng);
        }
        App.map.panTo(e.latlng);
        App.MapController.set('marker_new_pos', e.latlng);
    },
    fullMapClear: function(){
        if(this.cluster){
            this.cluster.clearLayers();
            App.map.removeLayer(this.cluster);
        }
    },
    fullMapShow: function(){
        if(this.cluster){
            this.cluster.addLayer(this.geojson);
            App.map.addLayer(this.cluster);
        }
    },

    // CHANGE USER MARK

    startMarking: function(){
        $('#map_canvas').addClass('marking');
        this.set('isMarking',true);
        App.map.on('click', this.onMapClick);
        this.clusterClear();
    },
    finishMarking: function(save){
        $('#map_canvas').removeClass('marking');
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
        this.clusterShow();
    },
    clusterClear: function(){
        this.cluster.clearLayers();
        App.map.removeLayer(this.cluster);
        App.map.addLayer(this.geojson);
    },
    clusterShow: function(){
        App.map.removeLayer(this.geojson);
        this.cluster.addLayer(this.geojson);
        App.map.addLayer(this.cluster);
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
