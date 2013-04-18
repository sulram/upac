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