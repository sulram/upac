Dropzone.autoDiscover = false;

$(document).ready(function(){
    $('#content').redactor({
        lang: 'pt_br',
        buttons: ['formatting', '|', 'bold', 'italic', 'deleted', '|', 'link', 'video', '|', 'unorderedlist', 'orderedlist', 'table'],
        formattingTags: ['p', 'blockquote', 'pre', 'h3', 'h4'],
        minHeight: 300,
        autoresize: false
    });
});