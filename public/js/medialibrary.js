if (typeof RedactorPlugins === 'undefined') var RedactorPlugins = {};

RedactorPlugins.medialibrary = {
    init: function()
    {   
        var callback = $.proxy(function(){
            
            var btn = $('#medialibrary .window .btn');
            var _this = this;

            this.saveSelection();

            $('#medialibrary').addClass('show');
            
            btn.bind('click',function(){
                $('#medialibrary').removeClass('show');
                btn.unbind('click');

                _this.restoreSelection();
                _this.execCommand('inserthtml', '<p class="img">[IMAGEM AQUI]</p>');
            });

        }, this);

        $('#medialibrary a.overlay').click(function(e){
            e.preventDefault();
            $('#medialibrary').removeClass('show');
        });

        this.addBtnAfter('link', 'medialibrary', 'Media Library', callback);
    }
}