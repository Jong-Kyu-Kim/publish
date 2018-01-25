var use_like_placeholder = function(){
	var use_placeholder_label = jQuery('.use_placeholder').find('.label')
	var use_placeholder_input = jQuery('.use_placeholder').find('.input_txt')
	use_placeholder_label.click(function(){
		jQuery(this).hide().prev('span').find('.input_txt').focus();
	});
	use_placeholder_input.focus(function(){
		jQuery(this).parent('span').next('.label').hide();
	});
	use_placeholder_input.blur(function(){
		if (jQuery(this).val().length > 0)
		{	jQuery(this).parent('span').next('.label').hide();
			jQuery('.btn_enroll').removeClass('disabled')
		}else{
			jQuery(this).parent('span').next('.label').show();
			jQuery('.btn_enroll').addClass('disabled')
		}
	});
	use_placeholder_input.keyup(function(){
		if(jQuery(this).parent('span').siblings('.btn_enroll').length > 0){
			if (jQuery(this).val().length > 0)
			{	
				jQuery('.btn_enroll').removeClass('disabled')
			}else{
				jQuery('.btn_enroll').addClass('disabled')
			}
		}
	});
}


jQuery(document).ready(function(){
	
});