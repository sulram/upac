moment.lang('pt-br');

$('.moment-me').each(function(i,el){
    var _this = $(this);
    var date = _this.text();
    _this.text(moment(date).fromNow() + ' (' + moment(date).format('L') + ')');
});
/*
var notices_upload = $('.image-upload.notices');
notices_upload.filedrop({
    paramname: 'image',
    maxfiles: 1,
    maxfilesize: 5,
    allowedFileTypes: [
        'image/gif',
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/x-windows-bmp',
        'image/bmp'
    ],
    dragOver: function(){
        notices_upload.addClass('hover');
    },
    dragLeave: function(){
        notices_upload.removeClass('hover');
    },
});*/