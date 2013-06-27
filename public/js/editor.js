Dropzone.autoDiscover = false;

$(document).ready(function(){
	
	var article_id = $('body').data('article-id');
	var is_uploading = false;

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

	// TITLE

	$('#title').focus();
	$('#title').val($('#title').val());

	// REDACTOR

	$('#content').redactor({
	    lang: 'pt_br',
	    buttons: ['formatting', '|', 'bold', 'italic', 'deleted', '|', 'link', 'video', '|', 'unorderedlist', 'orderedlist', 'table'],
	    formattingTags: ['p', 'blockquote', 'pre', 'h3', 'h4'],
	    minHeight: 300,
	    autoresize: false,
	    plugins: ['medialibrary']
	});

	// EXCERPT

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

	// IMAGE GALLERY

	$("#image-gallery").dropzone({
		paramName:"image",
		url: "/article/"+article_id+"/imageupload",
		maxFilesize: 5,
		acceptedMimeTypes:'image/gif,image/jpeg,image/pjpeg,image/png,image/x-windows-bmp,image/bmp',
		init: function() {
			this.on("success", function(file, xhr) {
				console.log(xhr);
				$img = $('<input name="images[]" type="hidden">').attr('value', xhr.image._id);
				$("#images-hidden").append($img);
			});
		}
	});

	// RESIZE

	$(window).resize(resize);

	function resize(e){
		var win = $(window);
		$('.redactor_editor').height(win.height() - 240);
	}

	resize();
});





