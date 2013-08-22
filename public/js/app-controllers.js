
// APPLICATION

App.ApplicationController = Ember.Controller.extend({
    route_class: null,
    //needs: ['rede'],
    // variavel com hash atual
    updateCurrentPath: function() {
        var path_array = this.get('currentPath').split('.');
        var route_class = path_array.length > 1 ? path_array[0] + ' ' + path_array.join('-') : path_array[0];
        this.set('route_class',route_class);
        App.set('currentPath', route_class);
        this.hideContentModal();
    }.observes('currentPath'),
    contentModalVisible: false,
    showContentModal: function(){
        this.set('contentModalVisible',true);
        console.log('show modal content');
    },
    hideContentModal: function(){
        this.set('contentModalVisible',false);
        console.log('hide modal content');
    }
});


// HOME

App.HomeController = Ember.ObjectController.extend({
    notices: [],
    banners: [],
    banner: null,
    notice: null,
    bannerRun: null,
    enter: function(){
        var _this = this;
        this.notice = 0;
        this.banner = -1;
        $.getJSON('/notices', function(data){
            var notices = [], banners = [];
            $.each(data.notices, function(i, child) {
                var notice = Ember.Object.create(child);
                if(notice.image && notice.image.sizes.length){
                    var img = _.findWhere(notice.image.sizes,{size:'normal'}).cdn_url;
                    notice.set('bgimg','background-image: url(http:'+img+');');
                    notice.set('img',img);
                    banners.push(notice);
                } else {
                    notices.push(notice);
                }
            });
            _this.set('notices', notices);
            _this.set('banners', banners);
            _this.nextBanner();
            $('.destaque ul').width(banners.length * 720 * 2 + 50);
            $('.destaque').mouseover(function(){
                Ember.run.cancel(_this.bannerRun);
            });
            $('.destaque').mouseout(function(){
                _this.bannerRun = Ember.run.later(_this, 'nextBanner', 1000);
            });
        });
    },
    nextNotice: function(){
        this.notice = (this.notice + 1) % (this.notices.length - 1);
        $('.noticias').animate({
            scrollLeft: this.notice * 366
        }, 500);
    },
    nextBanner: function(){
        if(this.banners.length < 2) return false;
        this.banner = (this.banner + 1) % this.banners.length;
        console.log('slideshow',this.banner);
        $('.destaque').animate({scrollLeft: this.banner * 720 * 2},1000,'easeInOutQuart')
        this.bannerRun = Ember.run.later(this, 'nextBanner', 4000);
    },
    exit: function(){
        Ember.run.cancel(this.bannerRun);
    }
});


// BLOG

App.BlogRecentesController = Ember.ObjectController.extend({
    articles: [],
    isLoaded: false,
    postsCount: 0,
    postsLimit: 16,
    getContent: function(){
        var _this = this;
        var page = this.get('model.page_num');
        $.getJSON( '/article', {from: (page-1) * this.postsLimit, limit: this.postsLimit, sort_by: 'publicationDate', order: -1}, function(data){
            _this.buildFromData(data);
        });
    },
    buildFromData: function(data){
        var articles = [];
        var k = 0;

        $.each(data.articles, function(i, _article) {

            var article = Ember.Object.create(_article);

            article.set('post_id', article.get('_id'));
            article.set('profile', App.UserModel.build(_article.owners[0]));
            article.set('palette', 'palette-asbestos');

            if(_article.featuredImage && _article.featuredImage.sizes.length){
                var img = ''+_.findWhere(_article.featuredImage.sizes,{size:'medium'}).cdn_url; // não utilizar http: permite usar imagens dentro do site em https:
                article.set('img', img);
                article.set('bgimg', 'background-image: url('+img+');');
                console.log(img);
            } else {
                article.set('palette', palette[k]);
                k = (k + 1) % palette.length;
            }
            articles.push(article);
        });
        //console.log(articles[0]);
        this.set('postsCount', data.count);
        this.set('articles', articles);
        this.set('isLoaded', true);
    },
    createModel: function(data){
        return Ember.Object.create(data);
    },
    needPagination: function(){
        return this.get('numPages') > 1;
    }.property('numPages'),
    numPages: function(){
        return Math.ceil(this.get('postsCount') / this.get('postsLimit'));
    }.property('postsCount','model.page_num'),
    prevPage: function(){
        var n = this.get('model.page_num');
        return this.createModel({page_num: n > 1 ? n - 1 : 1});
    }.property('model.page_num'),
    nextPage: function(){
        var n = this.get('model.page_num');
        var total = this.get('numPages');
        return this.createModel({page_num: n < total ? Number(n) + 1 : total});
    }.property('numPages','model.page_num'),
    pages: function(){
        var p = [];
        for(var i = 1; i <= this.get('numPages'); i++){
            p.push(this.createModel({page_num: i, is_current: i == this.get('model.page_num')}));
        }
        return p;
    }.property('numPages','model.page_num')
});

App.BlogTagController = App.BlogRecentesController.extend({
    tagName: null,
    postsLimit: 8,
    getContent: function(){
        var _this = this;
        var tag = this.get('model.tag_slug');
        var page = this.get('model.page_num');
        $.getJSON( '/articles/bytag/'+tag , {from: (page-1) * this.postsLimit, limit: this.postsLimit, sort_by: 'publicationDate', order: -1}, function(data){
            _this.buildFromData(data);
            _this.set('tagName',data.tag.name);
        });
    },
    createModel: function(data){
        data.tag_slug = this.get('model.tag_slug');
        return Ember.Object.create(data);
    }
});

App.BlogUserController = App.BlogRecentesController.extend({
    tagName: null,
    postsLimit: 8,
    getContent: function(){
        var _this = this;
        var username = this.get('model.user_username');
        var page = this.get('model.page_num');
        var url = username == User.auth.username ? '/articles/byuser' : '/user/'+username+'/articles';
        $.getJSON( url, {from: (page-1) * this.postsLimit, limit: this.postsLimit, sort_by: 'publicationDate', order: -1}, function(data){
            _this.buildFromData(data);
            _this.set('user',data.articles[0].owners[0]);
        });
    },
    createModel: function(data){
        data.user_username = this.get('model.user_username');
        return Ember.Object.create(data);
    }
});

App.BlogPostController = Ember.ObjectController.extend({
    comments: Ember.A([]),
    commentCount: function(){
        return this.comments.length;
    }.property('comments.@each'),
    isLoaded: false,
    commentsLoaded: false,
    isPostingComment: false,
    openTag: function(tag){
        window.location = '/#/blog/tag/'+tag.slug+'/1';
    },
    getContent: function(){

        var _this = this;
        var id = this.get('model.post_id');
        
        this.set('comments', Ember.A([]));
        this.set('model.edit_link','/editor/'+id);

        $.getJSON('/article/'+id, function(data){
            console.log('OWNERS: ',data.article.owners[0]._id, data.auth.id);
            _this.set('article', data.article);
            _this.set('isOwner', data.article.owners[0] ? data.article.owners[0]._id == data.auth.id || data.auth.admin : null);
            _this.set('profile', data.article.owners[0] ? App.UserModel.build(data.article.owners[0]) : null);
            _this.set('isLoaded', true);
            _this.getComments(id);
            Ember.run.next(function(){
                $('.post_content table').addClass('table table-condensed');
            });
        });

    },
    getComments: function(id){
        
        var _this = this;

        $.getJSON('/article/'+id+'/comments', {
                from: 0,
                limit: -1,
                sort_by: 'createdAt',
                order: 1
            },
            function(data){
                $.each(data.articles, function(i, _article) {
                    var article = Ember.Object.create(_article);
                    article.set('profile', App.UserModel.build(article.owners[0]));
                    _this.comments.pushObject(article);
            });
            //console.log(articles[0]);
            _this.set('commentsLoaded', true);
        });
    },
    openProfile: function(owner){
        window.location.hash = '/rede/perfil/' + owner.username;
    },
    openUserArchive: function(owner){
        window.location = '/#/blog/user/'+owner.username+'/1';
    },
    postComment: function(){

        var _this = this;
        var id = this.get('model.post_id');
        var textarea = $('#new_comment');
        var comment = textarea.val();

        if(comment == '') return;

        this.set('isPostingComment', true);

        $.ajax({
            type: 'POST',
            url: '/article/new',
            data: {
                parent: String(id),
                publicationStatus: 'published',
                content: comment
            },
            success: function(data, status, jqXHR){
                var article = Ember.Object.create(data.article);
                article.set('profile', App.UserModel.build(User.model));
                _this.comments.pushObject(article);
                _this.set('isPostingComment', false);
            },
            error: function(jqXHR,status,error){
                console.log('!!!comment error', arguments);
                textarea.val(comment);
                _this.set('isPostingComment', false);
            }
        });

    }
});

// AGENDA

App.AgendaEventoController = App.BlogPostController.extend({
    openTag: function(tag){
        window.location = '/#/agenda/tag/'+tag.slug+'/1';
    },
    getContent: function(){

        var _this = this;
        var id = this.get('model.evento_id');
        
        this.set('comments', Ember.A([]));
        this.set('model.edit_link','/agenda/editor/'+id);

        $.getJSON('/event/'+id, function(data){
            console.log('OWNERS: ',data.event.owners[0]._id, data.auth.id);
            _this.set('article', data.event);
            _this.set('isOwner', data.event.owners[0] ? data.event.owners[0]._id == data.auth.id || data.auth.admin : null);
            _this.set('profile', data.event.owners[0] ? App.UserModel.build(data.event.owners[0]) : null);
            _this.set('isLoaded', true);
            if(data.event.geo.length){
                Ember.run.next(function(){
                    $('#address_map').addClass('loaded');
                    var map = L.map('address_map',{minZoom: 3})
                    var map_tiles = new L.TileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png');
                    map.addLayer(map_tiles).setView(new L.LatLng(data.event.geo[0],data.event.geo[1]), 15);
                    map.zoomControl.setPosition('bottomleft');  
                    var latlng = new L.LatLng(data.event.geo[0],data.event.geo[1]);
                    var marker = new L.marker(latlng,{icon: eventIcon}).addTo(map);
                });
            }
            _this.getComments(id);
            Ember.run.next(function(){
                $('.post_content table').addClass('table table-condensed');
            });
        });

    },
});

// REDE

App.RedeController = Ember.ObjectController.extend({
    mapIsLoaded: false
});

App.RedePerfilController = Ember.ObjectController.extend({
    isTheLoggedUser: function(){
        return this.get('model.username') == User.auth.username;
    }.property('model.username','User.auth.username'),
    startMarking: function(){
        App.MapController.startMarking();
    },
    finishMarking: function(){
        App.MapController.finishMarking(true);
    },
    cancelMarking: function(){
        App.MapController.finishMarking();
    },
    zoom: function(){
        App.MapController.focusUser(this.get('content.username'),true);
    },
    focusUser: function(){
        console.log('profile is loaded?',this.get('content.isLoaded'));
        if(this.get('content.isLoaded')){
            App.MapController.focusUser(this.get('content.username'));
        }
    }.observes('content.isLoaded'),
    openTimeline: function(username){
        window.location.hash = '/blog/user/'+username+'/1';
    },
    openArticle: function(post){
        /*if(post.endDate){
            window.location.hash = '/agenda/evento/'+post._id;
        } else {
            window.location.hash = '/blog/post/'+post._id;
        }*/
        window.location.hash = '/blog/post/'+post._id;
    },
});

App.RedeEditarController = Ember.ObjectController.extend({
    isPosting: false,
    flashMsg: null,
    tags: [],
    getUserTags: true,
    startMarking: function(){
        App.MapController.startMarking();
    },
    finishMarking: function(){
        App.MapController.finishMarking(true);
    },
    cancelMarking: function(){
        App.MapController.finishMarking();
    },
    onFocus: function(){
        this.set('flashMsg',null);
    },
    submit: function(){
        var data = $('form').serialize();
        var dataArray = $('form').serializeArray();
        var name = _.findWhere(dataArray,{name: 'name'}).value;
        if(name == ''){
            return this.set('flashMsg','escreva seu nome completo');
        }
        console.log(data);
        this.set('isPosting',true);
        this.set('flashMsg',null);
        var _controller = this;
        $.ajax({
            type: 'PUT',
            url: '/user/' + User.auth.id,
            data: data,
            success: function(data, status, jqXHR){
                console.log('success', data);
                _controller.set('isPosting',false);
                User.authenticate(data.auth);
                App.MapController.updateUser(data.user);
                window.location.hash = '/rede/perfil/' + data.user.username;
            },
            error: function(jqXHR,status,error){
                console.log('error', arguments);
                _controller.set('isPosting',false);
            }
        });
    }
});

App.RedeNovolocalController = Ember.ObjectController.extend({
    tags: [],
    isPosting: false,
    flashMsg: null,
    mapIsLoaded: function(){
        return App.map != null;
    }.property('App.MapController.mapIsLoaded'),
    enter: function(){
        var _this = this;
        console.log('enter')
        if(this.get('mapIsLoaded') && User.auth.loggedIn){
            App.MapController.startNewMarker();
        } else{
            Ember.run.later(function(){
                _this.enter();
            },500)
        }
    },
    exit: function(){
        App.MapController.stopNewMarker();
    },
    submit: function(){
        var _controller = this;
        var data = $('form').serialize();
        var dataArray = $('form').serializeArray();
        var title = _.findWhere(dataArray,{name: 'title'}).value;
        var excerpt = _.findWhere(dataArray,{name: 'excerpt'}).value;
        if(title == ''){
            return this.set('flashMsg','escreva o nome do ponto');
        }
        if(excerpt == ''){
            return this.set('flashMsg','escreva a descrição');
        }
        this.set('flashMsg',null);
        this.set('isPosting',true);
        console.log(data, dataArray, title, excerpt);
        
        $.ajax({
            type: 'POST',
            url: '/place/new',
            data: data,
            success: function(data, status, jqXHR){
                console.log('success', data);
                _controller.set('isPosting',false);
                User.authenticate(data.auth);
                App.MapController.getMarkers();
                window.location.hash = '/rede/local/'+data.place.slug;
            },
            error: function(jqXHR,status,error){
                console.log('error', arguments);
                _controller.set('isPosting',false);
            }
        });
    },
    onFocus: function(){
        this.set('flashMsg',null);
    },
});

App.RedeLocalController = Ember.ObjectController.extend({
    isLoaded: false,
    place: null,
    isTheLoggedUser: function(){
        if(this.get('place.owners').length){
            return this.get('place.owners')[0].username == User.auth.username;
        }
        return false;
    }.property('place.owners.length'),
    getContent: function(){
        var _this = this;
        var slug = this.get('model.place_slug');
        $.getJSON( '/place/bySlug/'+slug, function(data){
            _this.set('isLoaded', true);
            _this.set('place', Ember.Object.create(data.place));
            _this.set('place.editorUrl', '/place/editor/'+data.place._id);
        });
    },
    zoom: function(){
        App.MapController.focusPlace(this.get('place.slug'),true);
    },
    focusPlace: function(){
        //console.log('profile is loaded?',this.get('content.isLoaded'));
        if(this.get('content.isLoaded')){
            App.MapController.focusPlace(this.get('place.slug'));
        }
    }.observes('content.isLoaded'),
});

App.RedeEditarlocalController = Ember.ObjectController.extend({
    isLoaded: false,
    place: null,
    isTheLoggedUser: function(){
        return this.get('model.username') == User.auth.username;
    }.property('model.username'),
    getContent: function(){
        var _this = this;
        var slug = this.get('model.place_slug');
        $.getJSON( '/place/bySlug/'+slug, function(data){
            _this.set('isLoaded', true);
            _this.place = Ember.Object.create(data.place);
        });
    },
    focusPlace: function(){
        console.log('profile is loaded?',this.get('content.isLoaded'));
        if(this.get('content.isLoaded')){
            App.MapController.focusPlace(this.get('place.slug'));
        }
    }.observes('content.isLoaded'),
});

// USER

App.UserIndexController = Ember.Controller.extend({
    isPosting: false,
    flashMsg: null,
    onFocus: function(){
        this.set('flashMsg',null);
    },
    submit: function(){
        var data = $('form').serialize();
        this.set('isPosting',true);
        this.set('flashMsg',null);
        var _controller = this;
        $.ajax({
            type: 'POST',
            url: '/user/session',
            data: data,
            success: function(data, status, jqXHR){
                console.log(data);
                _controller.set('isPosting',false);
                User.authenticate(data.auth);
            },
            error: function(jqXHR,status,error){
                console.log(arguments);
                _controller.set('isPosting',false);
                _controller.set('flashMsg','verifique nome de usuário e senha');
            }
        });
    }
});

App.UserCadastrarController = Ember.Controller.extend({
    isPosting: false,
    flashMsg: null,
    onFocus: function(){
        this.set('flashMsg',null);
    },
    submit: function(){

        var _controller = this;
        var data = $('form').serialize();
        var dataArray = $('form').serializeArray();
        var empty = false;

        _.each(dataArray, function(e,i){
            //console.log(e);
            if(e.value == ""){
                empty = true;
            }
        });

        if(empty) return _controller.set('flashMsg', "por favor, preencha todos os campos");

        var pass1 = _.findWhere(dataArray,{name: 'password'}).value;
        var pass2 = _.findWhere(dataArray,{name: 'valpassword'}).value;

        if(pass1 != pass2) return _controller.set('flashMsg', "senhas não conferem, preencha novamente");

        this.set('isPosting',true);
        this.set('flashMsg',null);

        console.log(dataArray);
        
        $.ajax({
            type: 'POST',
            url: '/user',
            data: data,
            success: function(data, status, jqXHR){
                _controller.set('isPosting',false);
                User.authenticate(data.auth);
            },
            error: function(jqXHR,status,error){
                var responseText = jQuery.parseJSON(jqXHR.responseText);

                console.log(arguments);
                _controller.set('isPosting',false);

                if(responseText.error.errors.email && responseText.error.errors.email.type == 'inuse'){
                    _controller.set('flashMsg','este e-mail já está cadastrado no site, use o painel de login');
                } else if(responseText.error.errors.email && responseText.error.errors.email.type == 'invalid') {
                    _controller.set('flashMsg','verifique o e-mail informado');
                }else{
                    _controller.set('flashMsg','verifique se os campos estão preenchidos corretamente');
                }
            }
        });
    }
});

App.UserNovasenhaController = Ember.Controller.extend({
    isPosting: false,
    flashMsg: null,
    flashStatus: 'alert',
    onFocus: function(){
        this.set('flashMsg',null);
    },
    submit: function(){
        var email = $('form #email').val();
        this.set('isPosting',true);
        this.set('flashMsg',null);
        var _controller = this;
        $.ajax({
            type: 'GET',
            url: '/requestpasswordreset/'+email,
            data: {},
            success: function(data, status, jqXHR){
                console.log(data);
                _controller.set('isPosting',false);
                _controller.set('flashMsg','OK! Enviamos um e-mail para '+email+' com instruções para resetar sua senha.');
                _controller.set('flashStatus','alert alert-success');
                User.authenticate(data.auth);
                
            },
            error: function(jqXHR,status,error){
                console.log(arguments);
                _controller.set('isPosting',false);
                _controller.set('flashMsg','E-mail não encontrado no sistema');
                _controller.set('flashStatus','alert alert-error');
            }
        });
    }
});

// ACCOUNT

App.AccountController = Ember.Controller.extend({
    isLoaded: false,
    isPosting: false,
    flashMsg: null,
    flashStatus: 'alert',
    onFocus: function(){
        this.set('flashMsg',null);
    },
    getContent: function(){
        if(User.auth.id){
            this.loadProfile();
        }else{
            console.log('delayed');
            this.getContentRun = Ember.run.later(this, 'getContent', 300);
        }
    },
    exit: function(){
        Ember.run.cancel(this.getContentRun);
    },
    loadProfile: function(){
        var _this = this;
        $.getJSON( '/user/'+User.auth.username, function(data){
            _this.set('isLoaded', true);
             Ember.run.next(function(){
                $('#email').val(data.user.email);
             })
        });
    },
    submit: function(){

        var _controller = this;
        var data = $('form').serialize();
        var dataArray = $('form').serializeArray();

        var pass1 = _.findWhere(dataArray,{name: 'password'}).value;
        var pass2 = _.findWhere(dataArray,{name: 'valpassword'}).value;

        if(pass1 != pass2){
            _controller.set('flashMsg', "senhas não conferem, preencha novamente");
            _controller.set('flashStatus','alert alert-error');
            return false;
        }

        this.set('isPosting',true);
        this.set('flashMsg',null);

        console.log(dataArray);
        
        $.ajax({
            type: 'POST',
            url: '/user/'+User.auth.id+'/updateemailpassword',
            data: data,
            success: function(data, status, jqXHR){
                _controller.set('isPosting',false);
                _controller.set('flashMsg','dados alterados com sucesso');
                _controller.set('flashStatus','alert alert-success');
                User.authenticate(data.auth);
            },
            error: function(jqXHR,status,error){
                var responseText = jQuery.parseJSON(jqXHR.responseText);

                console.log(arguments);
                _controller.set('isPosting',false);
                _controller.set('flashStatus','alert alert-error');
                _controller.set('flashMsg','erro');
            }
        });
    }
});
