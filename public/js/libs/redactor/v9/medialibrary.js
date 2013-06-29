if (typeof RedactorPlugins === 'undefined') var RedactorPlugins = {};

RedactorPlugins.medialibrary = {
    init: function()
    {   
        var _this = this;

        var article_id = $('body').data('article-id');

        this.tabs = $('#medialibrary ul.nav.nav-pills li');
        this.panels = $('#medialibrary .panel');

        var $btn_add = $('#medialibrary #img_add');
        var $btn_cover = $('#medialibrary #img_cover');
        var $imgs = $('#medialibrary #images-gallery .gallery-image');

        $(document).on('click', '#images-gallery figure.loaded', function() {
            $('#images-gallery figure').removeClass('selected');
            $(this).addClass('selected');
        });

        // adicionar imagem

        $btn_add.bind('click',function(){
            var selected = $('#images-gallery figure.selected');
            if (selected) {
                _this.selectionRestore();
                _this.execCommand('inserthtml', '<p class="img"><img src="'+selected.attr('data-src')+'"></p>');
                _this.closeModal();
            }
        });

        // definir como capa

        $btn_cover.bind('click',function(){
            $('#images-gallery figure').removeClass('cover');
            var selected = $('#images-gallery figure.selected');
            selected.addClass('cover');
            //alert('cover is image ' + selected.attr('data-id'));
            $('#featuredImage').val(selected.attr('data-id').split('"').join(''));
        });

        // click na aba

        $('a', this.tabs).click(function(e){
            e.preventDefault();
            _this.selectTab($(this).attr('href').substring(1));
        });

        // clique no overlay, sai do media library

        $('#medialibrary a.overlay, #medialibrary #close_modal').click(function(e){
            e.preventDefault();
            _this.closeModal();
        });

        $("#dropzone").dropzone({
            dictDefaultMessage: 'Clique ou solte uma imagem aqui para fazer upload.<br/><small>Tamanho máximo: 2mb</small>',
            paramName:"image",
            url: "/article/"+article_id+"/imageupload",
            maxFilesize: 5,
            acceptedMimeTypes:'image/gif,image/jpeg,image/pjpeg,image/png,image/x-windows-bmp,image/bmp',
            init: function() {
                this.on("success", function(file, xhr, elem) {

                    var image = xhr.image;
                    console.log(image);

                    var $input = $('<input name="images[]" type="hidden">').attr('value', image._id);
                    $("#images-hidden").append($input);

                    var $img = $('<figure><img/><span class="icon fui-heart"></span></figure>');
                    $img.data('image-id', image._id);

                    // verificar se a imagem já tem miniaturas criadas

                    var try_loading_image;

                    try_loading_image = function() {
                        console.log('try_loading_image', image._id);
                        $.getJSON('/image/'+image._id,{},function(data, status, xhr) {
                            if(data && data.image && data.image.upload_complete) {
                                console.log('loaded_image', image._id, data.image.sizes);
                                $img.addClass('loaded')
                                $img.attr('data-id', image._id);
                                $img.attr('data-src', _.find(data.image.sizes, function(size) { return size.size == 'large'; }).cdn_url);
                                $img.find('img').attr('src', _.find(data.image.sizes, function(size) { return size.size == 'icon'; }).cdn_url);
                                $('#images-gallery figure.loaded:last').click();
                            } else {
                                setTimeout(try_loading_image, 3000);
                            }
                        });
                    }
                    setTimeout(try_loading_image, 3000);

                    $("#images-gallery").append($img);

                    // remove da lista de uploads

                    this.removeFile(file);

                    // vai pra aba: gallery

                    _this.selectTab('gallery');

                });
            }
        });

        var callback = $.proxy(function(){

            this.selectionSave();
            this.openModal();

        }, this);

        this.buttonAddAfter('link', 'medialibrary', 'Imagens', callback);
    },
    openModal: function(){
        $('#medialibrary').addClass('show');
        // TODO: checar se existe imagem, senao, upload
        if($("#images-gallery figure").length){
            this.selectTab('gallery');
            $('#images-gallery figure.loaded:last').click();
        } else {
            this.selectTab('upload');
        }
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