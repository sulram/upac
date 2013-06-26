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

App.BlogRecentesController = Ember.ObjectController.extend({
    articles: [],
    isLoaded: false,
    postsCount: 0,
    postsLimit: 8,
    getcontent: function(){
        var _this = this;
        var page = this.get('model.page_num');
        $.getJSON('/article', {from: (page-1) * this.postsLimit, limit: this.postsLimit, sort_by: 'publicationDate', order: -1}, function(data){
            var articles = [];
            $.each(data.articles, function(i, _article) {
                var article = Ember.Object.create(_article);
                article.set('post_id', article.get('_id'));
                if(_article.images.length && _article.images[0].image.sizes.length){
                    var img = 'http:'+_.findWhere(_article.images[0].image.sizes,{size:'medium'}).cdn_url;
                    article.set('img', img);
                    article.set('bgimg', 'background-image: url('+img+');');
                    console.log(img);
                }
                articles.push(article);
            });
            //console.log(articles[0]);
            _this.set('postsCount', data.count);
            _this.set('articles', articles);
            _this.set('isLoaded', true);
        });
    },
    needPagination: function(){
        return this.get('numPages') > 1;
    }.property('numPages'),
    numPages: function(){
        return Math.ceil(this.get('postsCount') / this.get('postsLimit'));
    }.property('postsCount','model.page_num'),
    prevPage: function(){
        var n = this.get('model.page_num');
        return Ember.Object.create({page_num: n > 1 ? n - 1 : 1});
    }.property('model.page_num'),
    nextPage: function(){
        var n = this.get('model.page_num');
        var total = this.get('numPages');
        return Ember.Object.create({page_num: n < total ? Number(n) + 1 : total});
    }.property('numPages','model.page_num'),
    pages: function(){
        var p = [];
        for(var i = 1; i <= this.get('numPages'); i++){
            p.push(Ember.Object.create({page_num: i, is_current: i == this.get('model.page_num')}));
        }
        return p;
    }.property('numPages','model.page_num')
});

App.BlogPostController = Ember.ObjectController.extend({
    isLoaded: false,
    getcontent: function(){
        var _this = this;
        var id = this.get('model.post_id');
        
        this.set('model.edit_link','/editor/'+id);

        $.getJSON('/article/'+id, function(data){
            _this.set('article', data.article);
            _this.set('isLoaded', true);
        });
    }
});

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
    onFocus: function(){
        this.set('flashMsg',null);
    },
    submit: function(){
        var data = $('form').serialize();
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
                window.location.hash = '/rede/perfil/' + data.user.username;
            },
            error: function(jqXHR,status,error){
                console.log('error', arguments);
                _controller.set('isPosting',false);
            }
        });
    }
});

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
        var data = $('form').serialize();
        this.set('isPosting',true);
        this.set('flashMsg',null);
        var _controller = this;
        $.ajax({
            type: 'POST',
            url: '/user',
            data: data,
            success: function(data, status, jqXHR){
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