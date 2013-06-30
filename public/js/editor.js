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

	// EXCLUIR POST

	var isRemoving = false;

	$('#post_remove').click(function(e){
		e.preventDefault();
		$('#post_remove').hide();
		$('#post_remove_confirm').show();
	}).mouseover(function(e){
		e.preventDefault();
		$('#post_remove').addClass('btn-danger');
	}).mouseout(function(e){
		e.preventDefault();
		$('#post_remove').removeClass('btn-danger');
	});

	$('#post_remove_no').click(function(e){
		e.preventDefault();
		$('#post_remove').show();
		$('#post_remove_confirm').hide();
	});

	$('#post_remove_yes').click(function(e){
		e.preventDefault();
		if(isRemoving) return;
		isRemoving = true;
		e.preventDefault();
		$.ajax({
			type: 'DEL',
			url: '/article/'+article_id,
			success: function(data, status, jqXHR){
				notify('A publicação foi excluída com sucesso! Você será redirecionado para o blog em 2s.', null);
				setTimeout(function(){
					window.location = '/#/blog';
				},2000);
			},
			error: function(jqXHR,status,error){
				isRemoving = false;
				notify('Erro ao excluir publicação, tente novamente.', arguments);
			}
		});
	});

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
				notify('Erro ao salvar, tente novamente.', arguments);
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

	// RESIZE

	$(window).resize(resize);

	function resize(e){
		var win = $(window);
		$('.redactor_editor').height(win.height() - 240);
	}

	resize();
});





