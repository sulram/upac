// MENU PRINCIPAL

App.MenuView = Em.View.extend({
    templateName: 'menu'
});

App.AddModalView = Em.View.extend({
    templateName: 'modal-content'
});

// UPLOAD DE FOTO

App.UserPhoto = Ember.View.extend({
    templateName: 'user_photo',
    didInsertElement: function(){
        var controller = this.get('controller');
        controller.set('landed',true);
        var myDropzone = this.$("#avatar-dropzone").dropzone({
            url: '/user/'+User.auth.id+'/updateimage',
            paramName: 'image',
            dictDefaultMessage: 'Clique aqui ou arraste uma <br/>imagem para fazer upload.<br/><small>Tamanho máximo: 2mb</small>',
            parallelUploads: 1,
            init: function(){
                var _this = this;
                this.on('selectedfiles', function(){
                    controller.set('landed',false);
                    Ember.run.next(function(){
                        _this.removeAllFiles();
                    });
                });
                this.on('complete', function(){
                    window.location.hash = '/rede/perfil/' + User.auth.username;
                });
            }
        });
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

// UTIL

App.AutoFocusTextField = Ember.TextField.extend({
    didInsertElement: function() {
        this.$().focus();
    },
    click: function(){
        console.log(this.get('target'));
        this.get('controller').send('onFocus');
    }
});