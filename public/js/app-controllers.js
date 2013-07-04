
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
        this.notices = 0;
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
    postsLimit: 8,
    getcontent: function(){
        var _this = this;
        var page = this.get('model.page_num');
        $.getJSON( '/article', {from: (page-1) * this.postsLimit, limit: this.postsLimit, sort_by: 'publicationDate', order: -1}, function(data){
            _this.buildFromData(data);
        });
    },
    buildFromData: function(data){
        var articles = [];
        var k = 0;
        //var palette = ['palette-turquoise','palette-green-sea','palette-emerland','palette-nephritis','palette-peter-river', 'palette-belize-hole', 'palette-amethyst', 'palette-wisteria', 'palette-wet-asphalt', 'palette-midnight-blue', 'palette-sun-flower', 'palette-orange', 'palette-carrot', 'palette-pumpkin', 'palette-alizarin', 'palette-pomegranate'];
        var palette = ['palette-turquoise','palette-peter-river', 'palette-wisteria', 'palette-pomegranate', 'palette-carrot', 'palette-sun-flower'];

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
    getcontent: function(){
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
    getcontent: function(){

        var _this = this;
        var id = this.get('model.post_id');
        
        this.set('comments', Ember.A([]));
        this.set('model.edit_link','/editor/'+id);

        $.getJSON('/article/'+id, function(data){
            console.log('OWNERS: ',data.article.owners[0]._id, data.auth.id);
            _this.set('article', data.article);
            _this.set('isOwner', data.article.owners[0] ? data.article.owners[0]._id == data.auth.id : null);
            _this.set('profile', data.article.owners[0] ? App.UserModel.build(data.article.owners[0]) : null);
            _this.set('isLoaded', true);
            _this.getComments();
            Ember.run.next(function(){
                $('.post_content table').addClass('table table-condensed');
            });
        });

    },
    getComments: function(){
        
        var _this = this;
        var id = this.get('model.post_id');

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


// TIMELINE

App.TimelineIndexController = Ember.ObjectController.extend({
    isTheLoggedUser: function(){
        return this.get('model.username') == User.auth.username;
    }.property('model.username','User.auth.username')
});

App.TimelineEditarController = Ember.ObjectController.extend({
    isTheLoggedUser: function(){
        return this.get('model.username') == User.auth.username;
    }.property('model.username','User.auth.username')
});

// REDE

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
    focusUser: function(){
        console.log('profile is loaded?',this.get('content.isLoaded'));
        if(this.get('content.isLoaded')){
            App.MapController.focusUser(this.get('content.username'));
        }
    }.observes('content.isLoaded')
});

App.RedeEditarController = Ember.ObjectController.extend({
    isPosting: false,
    flashMsg: null,
    tags: [],
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