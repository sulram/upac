// MENU PRINCIPAL

App.MenuView = Em.View.extend({
    templateName: 'menu'
});

// UPLOAD DE FOTO

App.UserPhoto = Ember.View.extend({
    templateName: 'user_photo',
    didInsertElement: function(){
        this.$('#fileupload').fileupload({
            url: '/user/'+User.auth.id+'/updateimage',
            dataType: 'json',
            done: function (e, data) {
                $.each(data.result.files, function (index, file) {
                    $('<p/>').text(file.name).appendTo('#files');
                });
            },
            progressall: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $('#progress .bar').css(
                    'width',
                    progress + '%'
                );
            }
        });
        console.log('view!', this.get('controller').get('content._id'));
    }
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