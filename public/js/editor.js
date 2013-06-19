// avoid auto dropzone detection, as it causes eventual errors because of double attachment.
//Dropzone.autoDiscover = false;
//Dropzone.dictDefaultMessage = "Arraste e solte imagens aqui para fazer upload (ou clique para escolher o arquivo)";

var article_id = $('body').data('article-id');
var delay, showdown = new Showdown.converter({extensions:["table", "ufm"]});
var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
	mode: 'markdown',
	lineNumbers: false,
    lineWrapping: true,
	theme: "default",
	extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
});
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
			uploadFinished: function(i, file, response, time) {
				console.log(response);
				var occ = Number($this.data('match-id'));
				var idx = $("#image-refs input").length / 2
				var $img_id = $('<input type="hidden">').attr('name', 'images['+idx+'][0]').attr('value', response.image._id);
				var $img_size = $('<input type="hidden">').attr('name', 'images['+idx+'][1]').attr('value', '');
				$('#image-refs').append($img_id).append($img_size);
				$('#link-refs').append('['+response.image._id+']: '+response.image.original_cdn_url+"\n");
				var text_replace = editor.getValue();
				var parts = text_replace.split(/\b!img\b/)
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
editor.on("change", function() {
	clearTimeout(delay);
	delay = setTimeout(updatePreview, 300);
});

updatePreview();

// RESIZE

$(window).resize(resize);

function resize(e){
	var win = $(window);
	if(!more){
		$('.CodeMirror').height(win.height() - 206);
		$('#preview').height(win.height() - 206);
	} else {
		$('.CodeMirror').height(win.height() - 476);
		$('#preview').height(win.height() - 476);
	}
}

resize();

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

// MORE INFO

var more = true;

$('#toggle').click(function(e){
	e.preventDefault();
	toggleHeader();
});

$('#title').on('click focus',function(e){
	openHeader();
});

$('.CodeMirror').on('click',function(e){
	closeHeader();
});

function toggleHeader(){
	if(more){
		$('.editor_header').addClass('less');
	} else {
		$('.editor_header').removeClass('less');
	}
	more = !more;
	resize();
}

function openHeader(){
	more = false;
	toggleHeader();
}

function closeHeader(){
	more = true;
	toggleHeader();
}

// FORM SUBMIT

var form = $('#editor_form');

form.submit(function(e){
	var data, action;
	e.preventDefault();
	Picker.convertToSubmit();
	data = form.serialize();
	action = form.attr('action');
	console.log('saving... ', action, data);
	$.ajax({
        type: 'POST',
        url: action,
        data: data,
        success: function(data, status, jqXHR){
            console.log('success', data);
            Picker.convertToView();
        },
        error: function(jqXHR,status,error){
            console.log('error', arguments);
            Picker.convertToView();
        }
    });
});


