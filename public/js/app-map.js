
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
        App.map = L.map('map_canvas');
        App.map_tiles = new L.TileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: 'Powered by Leaflet & OpenStreetMap'});
        App.map.addLayer(App.map_tiles).setView(new L.LatLng(0,0), 2);
    }
});


var userIcon = L.icon({
    iconUrl: 'img/pin_user_25x41.png'
});


App.MapController = Em.Object.create({
    isMarking: false,
    isFetching: true,
    markers: [],
    rawmarkers: [],
    geojson: {},
    focus: null,
    findTheUser: function(){
        return _.findWhere(App.MapController.markers,{username: User.auth.username});
    },
    findUser: function(username){
        return _.findWhere(App.MapController.markers,{username: username});
    },
    focusUser: function(username){
        return false;
        if(this.get('isFetching')){
            console.log('saved focus', username);
            this.set('saveFocus', username);
        }else{
            console.log("focus " + username);
            var current = _.findWhere(App.MapController.markers,{username: username});
            this.unFocusAll();
            if(current.marker){
                google.maps.event.trigger(current.marker, 'mouseover');
                current.marker.setIcon(App.MapStyles.pin.user_select[0]);
                current.marker.setShape(App.MapStyles.pin.user_select[1]);
                current.selected = true;
                App.map.panTo(current.marker.getPosition());
                var zoom = App.map.getZoom();
                App.map.setZoom( zoom < 5 ? 11 : zoom);
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
        var geojson;
        var geodata = {type: "FeatureCollection", features: []};

        this.markers = [];
        this.rawmarkers = [];

        that.set('isFetching',true);

        $.ajax({
            type: 'GET',
            url: '/users',
            data: { limit: 0 },
            success: function(data, status, jqXHR){
                console.log('map: loaded users');
                User.authenticate(data.auth);
                $.each(data.users, function(i,user){
                    var marker = user.geo && user.geo.length;
                    if(marker){
                        marker = {
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
                        geodata.features.push(marker);
                    }
                });

                that.set('isFetching',false);

                geojson = L.geoJson(geodata,{
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
                            layer.bindPopup('<strong>' + name + '</strong><br/><a href="#/rede/perfil/'+username+'">Ver perfil</a>', {/*closeButton: false*/});
                        }
                        console.log('feat',feature);
                    }
                });

                App.map.addLayer(geojson);

                /*if(that.get('saveFocus') != null){
                    console.log('delayed focus');
                    that.focusUser(that.get('saveFocus'));
                    that.set('saveFocus',null);
                }*/
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
        App.map.setOptions({draggableCursor:'pointer'});
    },
    finishMarking: function(save){
        var that = this;
        var user = App.MapController.findTheUser();
        if(save && user.marker != null){
            var pos = [
                user.marker.getPosition().lat(),
                user.marker.getPosition().lng()
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
                    App.map.setOptions({draggableCursor: App.MapStyles.cursor.hand});
                    console.log('saved',pos);
                },
                error: function(jqXHR,status,error){
                    console.log(jqXHR);
                    User.authenticate(JSON.parse(jqXHR.responseText));
                }
            });
        } else {
            if(user.geo.length == 0){
                if(user.marker){
                    user.marker.setMap(null)
                    user.marker = null;
                }
            } else {
                user.marker.setPosition(
                    new google.maps.LatLng(user.geo[0],user.geo[1])
                )
            }
            that.set('isMarking',false);
            App.map.setOptions({draggableCursor: App.MapStyles.cursor.hand});
        }
        
    },
    createMarker: function(username, latLng, select){
        var _this = this;
        var pin_type = select ? App.MapStyles.pin.user_select : App.MapStyles.pin.user;
        var marker = new google.maps.Marker({
            position: latLng,
            map: App.map,
            icon: pin_type[0],
            shadow: null,
            shape: pin_type[1]
        });
        google.maps.event.addListener(marker, 'map_changed', function() {
            var user = App.MapController.findUser(username);
            if(user.selected){
                //_this.unFocusAll();
                //console.log(App.map_infobox)
                App.map_infobox.close();
            }
        });
        google.maps.event.addListener(marker, 'click', function() {
            if(App.MapController.isMarking) return false;
            //App.map.panTo(marker.getPosition());
            //App.MapController.focusUser(username);
            window.location.hash = '/rede/perfil/'+username;
        });
        google.maps.event.addListener(marker, 'mouseover', function() {
            var user = App.MapController.findUser(username);
            App.map_infobox.setContent(App.MapStyles.info_box.split('{{content}}').join(user.name || user.username));
            App.map_infobox.open(App.map, this);
        });
        google.maps.event.addListener(marker, 'mouseout', function() {
            //App.map_infobox.close();
            var last = _.findWhere(App.MapController.markers,{selected: true});
            if(last && last.marker != this){
                google.maps.event.trigger(last.marker, 'mouseover');
            }
        });
        return marker;
    },
    onMapClick: function(e){

        if(!App.MapController.isMarking){
            
            App.MapController.unFocusAll();
            window.location.hash = '/rede';
            //console.log( 'get position!', e.latLng );

        } else {

            var user = App.MapController.findTheUser();
            
            console.log( 'mark!', e.latLng.kb, user, user.marker );

            if(user.marker === null){
                user.marker = App.MapController.createMarker(user.username, e.latLng, true);
            } else {
                user.marker.setPosition(e.latLng);
            }
        }
    }
});
