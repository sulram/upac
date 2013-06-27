var article_id = $('body').data('article-id');
var is_uploading = false;

var updatePreview = function() {
	$("#preview").html(showdown.makeHtml(editor.getValue()+'\n'+$('#link-refs').val()));
	$('#preview .image-upload').each(function(index){
		var $this = $(this);
		$this.find(".fallback").hide(0);
		$this.filedrop({
			url: '/article/'+article_id+'/imageupload',
			paramname: 'image',
			maxfiles: 1,
			maxfilesize: 5,
			error: function(err, file) {
				switch(err) {
					case 'BrowserNotSupported':
						$this.find(".fallback").show(0);
						break;
					case 'TooManyFiles':
						alert("Por favor, carregue somente um arquivo de imagem.");
						break;
					case 'FileTooLarge':
						alert('Por favor, reduza o tamanho do arquivo a ser subido (Máximo 5MB)');
						break;
					case 'FileTypeNotAllowed':
						alert('Por favor, utilize somente arquivos de imagem (JPEG, GIF, PNG, BMP)');
						break;
				}
			},
			allowedFileTypes: [
				'image/gif',
				'image/jpeg',
				'image/pjpeg',
				'image/png',
				'image/x-windows-bmp',
				'image/bmp'
			],
			dragOver: function(){
				$this.addClass('hover');
			},
			dragLeave: function(){
				$this.removeClass('hover');
			},
			uploadStarted: function(){
				$this.addClass('uploading');
				is_uploading = true;
			},
			uploadFinished: function(i, file, response, time) {
				is_uploading = false;
				console.log(response);
				var occ = Number($this.data('match-num'));
				console.log(occ);
				var idx = $("#image-refs input").length / 2
				var $img_id = $('<input type="hidden">').attr('name', 'images['+idx+'][0]').attr('value', response.image._id);
				var $img_size = $('<input type="hidden">').attr('name', 'images['+idx+'][1]').attr('value', '');
				$('#image-refs').append($img_id).append($img_size);
				$('#link-refs').append('['+response.image._id+']: '+response.image.original_cdn_url+"\n");
				var text_replace = editor.getValue();
				var parts = text_replace.split(/!img\b/g)
				console.log(parts);
				var first = parts.splice(0, occ+1).join('!img')
				console.log(parts)
				var rest = parts.join("!img")
				console.log("first: %s, rest: %s", first, rest)
				console.log(parts);
				editor.setValue(first+'!['+response.image._id+'][]'+rest);
			}

		})
	})

	/*.dropzone({
		param:"image",
		url: "/article/imageupload",
		maxFilesize: 5,
		acceptedMimeTypes: [
			'image/gif',
			'image/jpeg',
			'image/pjpeg',
			'image/png',
			'image/x-windows-bmp',
			'image/bmp'
		],
		init: function(done) {
			this.on("success", function(file, xhr, formdata) {
				var json = $.parseJSON(xhr.responseText);
				console.log(json);
			});
			done();
		}
	});*/
}

// REDACTOR

$('#title').focus();
$('#title').val($('#title').val());

$('#content').redactor({
    lang: 'pt_br',
    buttons: ['formatting', '|', 'bold', 'italic', 'deleted', '|', 'link', 'video', '|', 'unorderedlist', 'orderedlist', 'table'],
    formattingTags: ['p', 'blockquote', 'pre', 'h3', 'h4'],
    minHeight: 300,
    autoresize: false,
    plugins: ['medialibrary']
});

$('#excerpt').on('keypress keyup paste',function(e){

	var limit = 140;
	var text = $(this).val();
	var chars = text.length;
	if(chars > limit){
		text.substring(0, limit);
		chars = limit;
		$('#excerpt').val(text);
		return false;
	}
	if(e.keyCode && e.keyCode==13){
		return false;
	}
	$('#excerpt_count').text(limit-chars);
});

$('#excerpt').keyup();

// DATE PICKER

var Picker = function(){
		
	var _that = this;

	this.target = $('#datetimepicker');
	this.input = $('#publicationDate');
	
	this.target.datetimepicker({
		language: 'pt-BR'
	});
	
	this.picker = this.target.data('datetimepicker');
	
	this.input.click(function(){
		$('span', _that.target).click();
	});

	this.convertToView = function(){
		this.picker.setLocalDate(new Date(this.input.val()));
	};

	this.convertToSubmit = function(){
		this.input.val(this.picker.getLocalDate());	
	};
	//console.log(this.input.val());
	if(this.input.val() === ""){
		//console.log(0);
		this.picker.setLocalDate(new Date());
	}else{
		//console.log(1);
		this.convertToView();
	}

	return this;

}();

// RESIZE

var more_info = false;

$(window).resize(resize);

function resize(e){
	var win = $(window);
	$('.redactor_editor').height(win.height() - 240);
}

resize();

// NOTIFY

function notify(msg,log) {
	$('<div></div>')
		.addClass('notification')
		.text(msg)
		.appendTo('#info')
		.fadeIn(500)
		.delay(4000)
		.slideUp(250,function(){$(this).remove();});

	console.log(msg,log);
}

// FORM SUBMIT

var form = $('#editor_form');
var submit = $('#submit_anchor');
submit.click(function(e){
	e.preventDefault();
	$('#submit').click();	
});
form.submit(function(e){
	var data, action, loading = $('#loading');
	e.preventDefault();
	Picker.convertToSubmit();
	data = form.serialize();
	action = form.attr('action');
	console.log('saving... ', action, data);
	loading.addClass('show');
	$.ajax({
		type: 'POST',
		url: action,
		data: data,
		success: function(data, status, jqXHR){
			var url = '/#/blog/post/'+data.article._id;
			$('#post_remove').removeClass('hide');
			$('#post_view').attr('href',url).removeClass('hide');
			notify('A publicação foi salva com sucesso!', data);
			Picker.convertToView();
			loading.removeClass('show');
		},
		error: function(jqXHR,status,error){
			notify('Erro ao salvar, tente novamente.', params);
			Picker.convertToView();
			loading.removeClass('show');
		}
	});
});


