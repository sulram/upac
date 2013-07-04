
// CUSTOM INPUTS

App.userinput = Ember.TextField.extend({
    regex: /[a-z0-9\._]/g,
    keyPress: function(e) {
        return this.restrict(e, this.regex);
    },
    restrict: function(e, restrictionType){
        if (!e) var e = window.event
        if (e.keyCode) code = e.keyCode;
        else if (e.which) code = e.which;
        var character = String.fromCharCode(code);

        // if they pressed esc... remove focus from field...
        if (code==27) { this.blur(); return false; }

        if(this.value.length >= 16) return false;
        
        // ignore if they are press other keys
        // strange because code: 39 is the down key AND ' key...
        // and DEL also equals .
        if (!e.ctrlKey && code!=9 && code!=8 && code!=36 && code!=37 && code!=38 && (code!=39 || (code==39 && character=="'")) && code!=40) {
            if (character.match(restrictionType)) {
                return true;
            } else {
                return false;
            }
            
        }
    }
});


//// USER MODEL


App.UserModel = Ember.Object.create({
    id: null,
    username: null
});
App.UserModel.reopen({
    buildAvatar: function(user,size){
        if(user.get('avatar.upload_complete')){
            return _.findWhere(user.get('avatar.sizes'),{size: size}).cdn_url
        } else if (user.get('avatar.original_cdn_url')) {
            return user.get('avatar.original_cdn_url');
        } else {
            return '/img/perfil_user.png';
        }
    },
    build: function(obj){

        var _this = this;

        var user = Ember.Object.create({});

        user.setProperties(obj);
        user.set('isLoaded', true);
        user.set('nick',user.get('name') || user.get('username'));
        user.set('avatar_medium', _this.buildAvatar(user,'medium'));
        user.set('avatar_icon', _this.buildAvatar(user,'icon'));

        return user;

    },
    find: function(username) {
        var _this = this;

        var user = Ember.Object.create({
            isLoaded: false
        });

        $.getJSON('/user/' + username, function(data) {
            user.setProperties(data.user);
            user.set('isLoaded', true);
            user.set('nick',user.get('name') || user.get('username'));
            user.set('avatar_medium', _this.buildAvatar(user,'medium'));
            user.set('avatar_icon', _this.buildAvatar(user,'icon'));
        });

        return user;
    }
});

//// THE USER Object

App.UserAuth = Ember.Object.extend({
  auth: {
    id: null,
    loggedIn: false,
    username: null,
  },
  model: null,
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
    this.set('auth', auth);
    if(auth.username){
      this.set('model', App.UserModel.find(auth.username));
    } else {
      this.set('model', null);
    }
    console.log('auth!', auth);
  }
});

var User = App.UserAuth.create();