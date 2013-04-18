
//// USER MODEL


App.UserModel = Ember.Object.create({
    id: null,
    username: null
});
App.UserModel.reopen({
    find: function(username) {
        // Set some default properties here.
        var user = Ember.Object.create({
            isLoaded: false
        });

        $.getJSON('/user/' + username, function(data) {
            user.setProperties(data.user);
            user.set('isLoaded', true);
            console.log('loaded profile',user);
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