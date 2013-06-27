if (typeof RedactorPlugins === 'undefined') var RedactorPlugins = {};

RedactorPlugins.medialibrary = {
    init: function()
    {   
        var callback = $.proxy(function(){
            $('#medialibrary').addClass('show');
        }, this);

        $('#medialibrary a.overlay').click(function(e){
            e.preventDefault();
            $('#medialibrary').removeClass('show');
        });

        this.addBtnAfter('link', 'medialibrary', 'Media Library', callback);
    }
}