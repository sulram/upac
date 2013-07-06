// MENU PRINCIPAL

App.MenuView = Em.View.extend({
    templateName: 'view_menu'
});

App.AddModalView = Em.View.extend({
    templateName: 'view_modal'
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

// VIEW CALENDAR

App.CalendarView = Ember.View.extend({
    templateName: 'view_calendar',
    didInsertElement: function(){
        var _controller = this.get('controller');
        $('#calendar').fullCalendar({
            events: null,
            monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
            dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
            buttonText: {
                today: 'hoje',
                month: 'mês',
                week: 'semana',
                day: 'dia'
            },
            viewDisplay: function (element) {
                var cal = $('#calendar')
                var d = cal.fullCalendar('getDate');
                console.log(element, d.getMonth(), d.getFullYear())
                $.getJSON( '/events/bymonth/'+d.getFullYear ()+'/'+(d.getMonth()+1), function(data){
                    _.each(data.events, function(item,i){
                        var event = {start: item.startDate, end: item.endDate, id: item._id, title: item.title, className: palette[i % palette.length]};
                        console.log('event', event);
                        cal.fullCalendar('renderEvent', event)
                    });
                });
            },
            eventClick: function(calEvent, jsEvent, view) {
                window.location.hash = '/agenda/evento/' + calEvent._id;
                //alert('Event: ' + calEvent._id);
                //alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                //alert('View: ' + view.name);
            }
        });
    }
});

// VIEW TAGS

App.TagsView = Ember.View.extend({
    input: null,
    templateName: 'view_tags',
    didInsertElement: function(){
        this.startTags();
    },
    startTags: function(){
        console.log("START TAGS!");
        var _controller = this.get('controller');
        var input = $('#select2').select2({
            tags: true,
            //minimumInputLength: 1,
            multiple: true,
            id: function(e) {
                return e._id + ":" + e.name;
            },
            ajax: { 
                url: "/tags/query",
                dataType: 'json',
                data: function (term, page) {
                    return {
                        start: term,
                    };
                },
                results: function (data, page) {
                    return {results: data.tags};
                }
            },
            formatResult: function(item) {
                return item.name;
            },
            formatSelection: function(item) {
                return item.name;
            },
            createSearchChoice: function(term, data) {
                var _this = this;
                if ($(data).filter(function() {
                    return this.name.localeCompare(term) === 0;
                }).length === 0) {
                    return {
                        _id: 'new',
                        name: term
                    };
                }
            },
        });

        input.on('change',function(e){
            var data = input.select2('data');
            var _tags = [];
            for(var i in data){
                var item = data[i];
                if(item && item._id){
                    var val = (item._id != 'new' ? item._id : item.name);
                    _tags.push(val);
                }
            }
            _controller.set('tags',_tags);
        });

        this.set('input',input);

        var data = input.select2('data');

        if(_controller.get('getUserTags')){
            _.each(User.model.tags, function(tag,i){
                data[i] = {_id: tag._id, name: tag.name};
            });
            input.select2('data', data);
        }

        

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

App.FocusTextArea = Ember.TextArea.extend({
    click: function(){
        console.log(this.get('target'));
        this.get('controller').send('onFocus');
    }
});

App.TextFieldUsername = Ember.TextField.extend({
    regex: /[a-z0-9\._]/g,
    click: function(){
        this.get('controller').send('onFocus');
    },
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