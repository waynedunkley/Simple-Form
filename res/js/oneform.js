/*	
 oneform.js - v1.0 - 2014
 https://github.com/waynedunkley/OneForm
 Copyright (c) 2014 Wayne Dunkley - www.waynedunkley.com; 
 Licensed under the MIT License 
*/

var oneform = function(form){

	var cf = form;
	
	$('#' + cf.submit_id).click(function (e) {
		e.preventDefault();
		var result = validateForm(cf._id);

		if(result == true){
			$('#' + cf.submit_id).html('sending...');

			var serialform = $('#' + cf._id).serializeArray();
			$.ajax({
				url: './res/php/mailform.php',
				type: 'POST',
				data: serialform,
				success: function (res) {
					if (res) {
						var height = $('#' + cf._id ).height();
						var padding = parseInt($('.sentoverlay').css('padding-top'));
						$('#' + cf._id ).addClass('sent');
						$('.sentoverlay').css('height', height - padding);
						$('.sentoverlay').fadeIn(600);
					} else {
						var height = $('#' + cf._id ).height();
						var padding = parseInt($('.erroroverlay').css('padding-top'));
						$('#' + cf._id ).addClass('sent');
						$('.erroroverlay').css('height', height - padding);
						$('.erroroverlay').fadeIn(600);
					}
				}
			});
			
		}
		
	});
	
	function validateForm(id){
		//remove any previously highlighted errors
		$('#' + id + ' input,select,textarea').removeClass('error');
		
		var validform = true;

		$('#' + id + ' input,textarea,select').each(function (index) {
			var type = $(this).attr('name');
			var input = $(this).val();
			var required = $(this).attr('required');

			//Simple Global required field check, if required checks it has at least 1 character
			// if(required && input.length == 0){
			// 	$(this).addClass('error');
			// 	validform = false;
			// }

			//For more detailed Validation checks per input field
			if(required){		
				switch(type){
					case "name":
						if(input.length == 0){
							$(this).addClass('error');
							validform = false;
						};break;
					case "email":
						var atpos = input.indexOf("@");
						var dotpos = input.lastIndexOf(".");
						if (atpos<1 || dotpos<atpos+2 || dotpos+2 >= input.length){
							$(this).addClass('error');
							validform = false;
						}break;
					case "phone":
						if(input.length < 10){
							$(this).addClass('error');
							validform = false;
						};break;
					case "date":
						if(input.length < 10){
							$(this).addClass('error');
							validform = false;
						};break;
					case "website":
						if(input.length == 0){
							$(this).addClass('error');
							validform = false;
						};break;
					case "company":
						if(input.length == 0){
							$(this).addClass('error');
							validform = false;
						};break;
					case "heardfrom":
						if(input.length == 0){
							$(this).addClass('error');
							validform = false;
						};break;
					case "message":
						if(input.length == 0){
							$(this).addClass('error');
							validform = false;
						};break;
					case "blank":
						if(input != ""){
							validform = false;
						}break;
					case "code":
						if(input != cf._code){
							$('#contact-area').append('<p>There was an error, form cannot be processed!</p>');
							validform = false;
						}break;
				}
			}
		});
		
		if(validform == true){
			return true;
		}else{
			return false;
		}
	}
}

