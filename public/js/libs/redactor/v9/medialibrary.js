if (typeof RedactorPlugins === 'undefined') var RedactorPlugins = {};

RedactorPlugins.medialibrary = {
    init: function()
    {   
        var _this = this;

        this.tabs = $('#medialibrary ul.nav.nav-pills li');
        this.panels = $('#medialibrary .panel');

        $('#medialibrary #images-gallery .gallery-image').bind('click', function() {
            $img = $(this);
            _this.selectionRestore();
            _this.execCommand('inserthtml','<p class="img"><img src="'+$img.data('image-url')+'"></p>')
            _this.closeModal();
        })
        /*
        $('#medialibrary #img_add').bind('click',function(){
            _this.selectionRestore();
            _this.execCommand('inserthtml', '<p class="img">[IMAGEM AQUI]</p>');
            _this.closeModal();
        });
        */
        $('a', this.tabs).click(function(e){
            e.preventDefault();
            _this.selectTab($(this).attr('href').substring(1));
        });

        var callback = $.proxy(function(){

            this.selectionSave();
            this.openModal();

        }, this);

        $('#medialibrary a.overlay').click(function(e){
            e.preventDefault();
            _this.closeModal();
        });

        this.buttonAddAfter('link', 'medialibrary', 'Imagens', callback);
    },
    openModal: function(){
        $('#medialibrary').addClass('show');
        // TODO: checar se existe imagem, senao, upload
        this.selectTab('upload');
    },
    closeModal: function(){
        this.selectTab(null);
        $('#medialibrary').removeClass('show');
    },
    selectTab: function(tab){
        this.tabs.removeClass('active').has('a[href=#'+tab+']').addClass('active');
        this.panels.removeClass('show').filter('.'+tab).addClass('show');
    }
}