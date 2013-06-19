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
	$("#preview").html(showdown.makeHtml(editor.getValue()));
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