var delay, showdown = new Showdown.converter({extensions:["table", "ufm"]});
var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
	mode: 'markdown',
	lineNumbers: true,
    lineWrapping: true,
	theme: "default",
	extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
});
var updatePreview = function() {
	console.log(editor.getValue());
	console.log(showdown.makeHtml(editor.getValue()));
	$("#preview").html(showdown.makeHtml(editor.getValue()));
}
editor.on("change", function() {
	clearTimeout(delay);
	delay = setTimeout(updatePreview, 300);
});
