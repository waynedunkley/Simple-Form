$(document).ready(function(){

	var cf = new Object();

	/*######################################################################################
	# UPDATE THESE FIELDS
	########################*/

	cf._id = 'contactform'; //Id of form you want to process, do not include id tag. ie. (#)
	cf.code = 'g4Kl!x*'; //This MUST match value of hidden code field in contactform
	cf.submit_id = 'submit-btn'; //Id of form submit button, do not include id tag. ie. (#)

	//Elements of form to validate, select true for areas of form to validate
	cf.req = new Object();
	cf.req.name = true;
	cf.req.email = true;
	cf.req.company = false;
	cf.req.phone = false;
	cf.req.website = false;
	cf.req.heardfrom = true;
	cf.req.message = true;

	/*######################################################################################*/
	/*######################################################################################*/

	


	$('#' + cf.submit_id).click(function (e) {
		e.preventDefault();
		var result = validateForm(cf._id);

		result = true;

		if(result == true){
			var formData = {
				'name': $('#' + cf._id + ' input[name="name"]').val(),
				'email': $('#' + cf._id + ' input[name="email"]').val(),
				'company': $('#' + cf._id + ' input[name="company"]').val(),
				'phone': $('#' + cf._id + ' input[name="phone"]').val(),
				'website': $('#' + cf._id + ' input[name="website"]').val(),
				'heardfrom': $('#' + cf._id + ' #form-heardfrom option:selected').val(),
				'message': $('#' + cf._id + ' textarea[name="message"]').val(),
				'confirmation': $('#' + cf._id + ' input[name="confirmation"]').is(':checked')
			};
			var dataString = $.param(formData);

			$.ajax({
				url: './res/php/mailform.php',
				type: 'POST',
				data: dataString,
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
		$('#' + id + ' input,textarea').removeClass('error');
		
		var validform = true;

		$('#' + id + ' input,textarea,select').each(function (index) {
			var type = $(this).attr('name');
			var input = $(this).val();
				
			if(cf.req[type]){		
				switch(type){
					case "name":
						if(input.length == 0){
							$(this).addClass('error');
							validform = false;
						};
						break;
					case "email":
						var atpos = input.indexOf("@");
						var dotpos = input.lastIndexOf(".");
						if (atpos<1 || dotpos<atpos+2 || dotpos+2 >= input.length){
							$(this).addClass('error');
							validform = false;
						}
						break;
					case "phone":
						if(input.length < 10){
							$(this).addClass('error');
							validform = false;
						};
						break;
						break;
					case "website":
						//perform validation
						break;
					case "company":
						if(input.length == 0){
							$(this).addClass('error');
							validform = false;
						};
						break;
					case "heardfrom":
						if(input == "default"){
							$(this).addClass('error');
							validform = false;
						};
						break;
					case "message":
						if(input.length == 0){
							$(this).addClass('error');
							validform = false;
						};
						break;
					case "blank":
						if(input != ""){
							validform = false;
						}
						break;
					case "code":
						if(input != cf.code){
							$('#contact-area').append('<p>There was an error, form cannot be processed!</p>');
							validform = false;
						}
						break;
				}
			}
		});
		
		if(validform == true){
			return true;
		}else{
			return false;
		}
	}
	
});