// avoid auto dropzone detection, as it causes eventual errors because of double attachment.
Dropzone.autoDiscover = false;

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
	$('#preview form.dropzone').dropzone({
		maxFilesize: 5,
		dictDefaultMessage: "Arraste e solte imagens aqui para fazer upload (ou clique para escolher o arquivo)"
	});
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