// avoid auto dropzone detection, as it causes eventual errors because of double attachment.
Dropzone.autoDiscover = false;

var delay, showdown = new Showdown.converter({extensions:["table", "ufm"]});
var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
	mode: 'markdown',
	lineNumbers: true,
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
