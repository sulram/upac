//
//  UPAC-Flavored Markdown
//  Collection of rules adapted from GFM and Twitter
//
//  @username   ->  <a href="/#/user/username">@username</a>
//  #hashtag    ->  <a href="/#/tag/hashtag">#hashtag</a>
//

(function(){

    var UFM = function(converter) {
        var img_uploader_count = 0;
        return [
            {
                type: 'lang', 
                regex: '^[^\[]https?://([\S]+\.)+[\S]+(/[a-z0-9\._/~%\-\+&\#\?!=\(\)@]*)?',
                replace: function(match, leadingSlash, url) {
                    if (leadingSlash === '\\') {
                        return match;
                    } else {
                        return '<a href="' + url + '">' + url + '</a>';
                    }
                }
            },
            // @username syntax
            { type: 'lang', regex: '\\B(\\\\)?@([\\S]+)\\b', replace: function(match, leadingSlash, username) {
                // Check if we matched the leading \ and return nothing changed if so
                if (leadingSlash === '\\') {
                    return match;
                } else {
                    return '<a href="/#/user/' + username + '">@' + username + '</a>';
                }
            }},

            // #hashtag syntax (causing trouble with @username syntax)
            /*{ type: 'lang', regex: '\\B(\\\\)?#([\\S]+)\\b', replace: function(match, leadingSlash, tag) {
                // Check if we matched the leading \ and return nothing changed if so
                if (leadingSlash === '\\') {
                    return match;
                } else {
                    return '<a href="/\\#/tag/' + tag + '">#' + tag + '</a>';
                }
            }},*/

            // Escaped @'s
            { type: 'lang', regex: '\\\\@', replace: '@' },

            // !img upload tag
            { type: 'lang', regex: '!img', 
            init: function() { img_uploader_count = 0; },
            replace: function(match, leadingSlash, tag) {
                if (leadingSlash === '\\') {
                    return match;
                } else {
                    return '<div data-match-num="'+(img_uploader_count++)+'" class="image-upload">'+
                        '<div class="aviso">'+
                            'Clique ou solte uma imagem aqui para fazer upload.'+
                        '</div>'+
                        '<div class="fallback">'+
                            '<form action="/editor/upload" method="POST" enctype="multipart/form-data" data-match-num="'+(img_uploader_count++)+'">'+
                            '<input type="file" name="image"/>'+
                            '<button type="submit">Enviar</button>'+
                            '</form>'+
                        '</div>'+
                    '</div>';
                }
            }},

            {
              // strike-through
              // NOTE: showdown already replaced "~" with "~T", so we need to adjust accordingly.
              type    : 'lang',
              regex   : '(~T){2}([^~]+)(~T){2}',
              replace : function(match, prefix, content, suffix) {
                  return '<del>' + content + '</del>';
              }
            }
        ];
    };

    // Client-side export
    if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) { window.Showdown.extensions.ufm = UFM; }
    // Server-side export
    if (typeof module !== 'undefined') module.exports = UFM;

}());
