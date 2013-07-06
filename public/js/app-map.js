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

var actionIcon = new UIcon({});
var userIcon = new UIcon({iconUrl: 'img/pin_user.png'});
var eventIcon = new UIcon({iconUrl: 'img/pin_cal.png'});

var upac_new_marker = null;

function eventPopup(event) {
    var excerpt = event.excerpt || '';
    return '<p><strong>' + event.title + '</strong></p><p style="color:#666;">'+moment(event.startDate).format('LLLL')+'<br/>'+moment(event.endDate).format('LLLL')+'</p><p>'+excerpt+'</p><p><a href="#/agenda/evento/' + event._id + '">Clique para ver o evento</a></p>';
}

function pagePopup(page) {
    var excerpt = page.excerpt || '';
    return '<p><strong>' + page.title + '</strong><br/>'+excerpt+'</p><p><a href="#/rede/local/' + page.slug + '">Clique para ver mais informações</a></p>';
}

function userPopup(user) {
    var usermodel = App.UserModel.build(user);
    var username = user.username
    var name = user.name || user.username;
    var about = user.about || '';
    return '<figure class="post_avatar"><img src="'+usermodel.avatar_icon+'"/></figure><p><strong>' + name + '</strong><br/>'+about+'</p><p><a href="#/rede/perfil/' + username + '">Clique para ver o perfil</a></p>';
}

function createEventPin(event){
    return {
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [
                event.geo[1],
                event.geo[0]
                ]
            },
        properties: {
            _id: event._id,
            type: "event",
            title: event.title,
            slug: event.slug,
            excerpt: event.excerpt,
            startDate: event.startDate,
            endDate: event.endDate,
        }
    };
};

function createPagePin(page){
    return {
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [
                page.geo[1],
                page.geo[0]
                ]
            },
        properties: {
            _id: page._id,
            type: "page",
            title: page.title,
            slug: page.slug,
            excerpt: page.excerpt
        }
    };
};

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
            username: user.username,
            about: user.about,
            avatar: user.avatar
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
                if(props.type == "page"){
                    window.location.hash = "/rede/local/" + props.slug;
                }
                if(props.type == "event"){
                    window.location.hash = "/agenda/evento/" + props._id;
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
        if(!element) return;
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
    pages: [],
    events: [],
    cluster: null,
    focus: null,
    findTheUser: function(){
        return _.findWhere(App.MapController.users,{username: User.auth.username});
    },
    updateUser: function(user){
        var pin = this.findUserPin(user.username);
        pin.setPopupContent(userPopup(user));
    },
    findUserPin: function(username){
        var user;
        _.each(this.geojson._layers, function(el,i){
            if(el.feature.properties.username && el.feature.properties.username == username){
                user = el;
            }
        });
        return user;
    },
    findPlacePin: function(slug){
        var place;
        _.each(this.geojson._layers, function(el,i){
            if(el.feature.properties.type == "page" && el.feature.properties.slug == slug){
                place = el;
            }
        });
        return place;
    },
    focusPlace: function(slug){
        if(!this.get('isFetching')){
            //console.log("focus " + username);
            var pin = this.findPlacePin(slug);
            if(pin){
                console.log('place pin',pin);
                App.map.panTo(pin._latlng);
                pin.openPopup();
            }
        }
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
        this.pages = [];
        this.events = [];
        this.set('isFetching',true);
        $.ajax({
            type: 'GET',
            url: '/everything2d',
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
                $.each(data.pages, function(i,page){
                    that.pages.push(page);
                    if(page.geo && page.geo.length){
                        geodata.features.push(createPagePin(page));
                    }
                });
                $.each(data.articles, function(i,event){
                    that.events.push(event);
                    if(event.geo && event.geo.length){
                        geodata.features.push(createEventPin(event));
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
                User.authenticate(JSON.parse(jqXHR.responseText));
                that.set('isFetching',false);
            }
        });
    },
    afterLoaded: function(geodata){
        var that = this;
        this.fullMapClear();
        that.geojson = L.geoJson(geodata,{
            pointToLayer: function(feature, latlng){
                if(feature.properties && feature.properties.type == "user"){
                    return new UpacMarker(latlng, {icon: userIcon});    
                }
                if(feature.properties && feature.properties.type == "event"){
                    return new UpacMarker(latlng, {icon: eventIcon});    
                }
                return new UpacMarker(latlng, {icon: actionIcon});
            },
            onEachFeature: function(feature, layer){
                if (feature.properties && feature.properties.type == "user") {
                    layer.bindPopup(userPopup(feature.properties), {showOnMouseOver: true, closeButton: false});
                } else if(feature.properties && feature.properties.type == "page") {
                    layer.bindPopup(pagePopup(feature.properties), {showOnMouseOver: true, closeButton: false});
                } else {
                    layer.bindPopup(eventPopup(feature.properties), {showOnMouseOver: true, closeButton: false});
                }
                //console.log('feat',feature);
            }
        });

        // adiciona geojson no mapa
        that.cluster = L.markerClusterGroup({
            maxClusterRadius: 50,
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
        var pin = App.MapController.findUserPin(user.username)
        
        console.log( 'mark!', e.latlng, App.MapController.users, user, pin );

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
