/****************************************/
/*	Name: LOTTE HOTEL
/*	PART: Javascript
/*	Version: 1.0
/*	Author: Hyun-Ah Park
/****************************************/

$(function(){
	/*
		Part : Layout
	*/

	/*Margin*/
	// Margin adjustments when the word(imgTxtV) containing
	//variable announce
	var $splitImgTxtV = $('.split.imgTxtV, .virtualT, .lst');
	var $splitImgTxtVColSec = $splitImgTxtV.find('>.colSec');
	
	/*Depending on the class column margin control*/
	$splitImgTxtVColSec.each(function(index){
		//variable announce
		var colIndexOf = $(this).parent().attr('class').indexOf('col')+3;
		var intCol = Number($(this).parent().attr('class').charAt(colIndexOf));
		var thisIndex = Number($(this).index() + 1);

		if(thisIndex % intCol == 0){
			$(this).css('margin-right', '0px');
			if($(this).parent().is('ol')){
				$(this).css('padding-right', '0px');
			}
		}//end if

		if(thisIndex <= intCol){
			$(this).css('margin-top',"0px");
		}//end if

	}); //end each

	//Margin of the last element control
	//variable announce
	var $wrapContent =$('.bodyContent, .dep02Sec, .dep03Sec, .popBody');

	$wrapContent.each(function(){
		$(this).children().last().css('margin-bottom', '0px');
	}); //end each

	/**** GNB ****/
	/* When there is no sub-gnb background css none */
	//variable announce
	var $gnbLiA = $('.gnb>li>a');

	$gnbLiA.on('mouseenter', function(){
		if(!$(this).next().is('.sub_gnb')){
			$(this).parent().css('background', 'none');
		} //end if
	}); //end mouseenter

	$gnbLiA.on('focus', function(){
		$(this).trigger('mouseenter');
	}); //end focus
	


	/*
		Part : Element
	*/
	/*Imgage Element*/
	//variable announce
	var $imgLsitType1 = $('.list_thumb');
	var imgLsitW = $('.list_thumb a').outerWidth();
	
	/*galleryThumb title type append*/
	$imgLsitType1.each(function(){
		var galleryThumbAlt = $(this).find('a>img').attr('alt');
		var galleryThumbTit = $('<span class="tit">'+galleryThumbAlt+'</span>');
		$(this).find('a').append(galleryThumbTit);
	}); //end each

	// galleryThumb type title beginning setting
	$imgLsitType1.find('span.tit').css({'opacity': '0.7', 'width': imgLsitW - 20});

	/*Table border*/
	var userAgent = navigator.userAgent;
	$('.tbl.lineL thead tr th,.tbl.lineL thead tr td, .tbl.lineL tbody tr th,.tbl.lineL tbody tr td').each(function(){
		var tableRowspan = $(this).attr('rowspan');
		if(tableRowspan > 1){
			$(this).addClass('rowspan');
			$(this).parents('table').css({'border-collapse': 'separate'});
			if(userAgent.match(/MSIE 7/) != null){
				$(this).parents('table').css({'border-collapse': 'collapse'});
			}//end if
		} //end if
	}); //end each

	/*
		Part : Chain Main Reservation Position
	*/
	var $reservListRoom = $('.reserv_area .list_room');
	var reservListRoomH = $reservListRoom.outerHeight();
	
	$reservListRoom.css('top', -reservListRoomH);

	/*
		Part : Wedding Menus image Title bg
	*/

	var $galleryThumbS = $('.wrap_gallery.type2.thumb_small');
	$galleryThumbS.find('.view').append('<span class="bg"></span>');
	$galleryThumbS.find('.view .bg').css('opacity', 0.7);
	
	/*Main reservation*/
	var userA = navigator.userAgent;
	
	if(userA.match('MSIE 7') !=null || userA.match('MSIE 8') !=null){
		$('.reserv_area .quick_reserv>li').css('padding','11px 0 5px 14px;');
		$('.reserv_area .quick_reserv>li.sel_room input, .reserv_area .quick_reserv>li.person input').css('margin', 0);
		$('.reserv_area .quick_reserv>li.sel_reserv a').css('background-position', '0 -1677px');
		$('.reserv_area .quick_reserv>li.cal_check').css('padding','10px 0 6px 14px;');
		$('.reserv_area .quick_reserv>li.cal_check>a').css('background-position', '-11px -299px');
	} //end if
	
	/* Adjust the main image on the screen resolution */
	if(screen.availWidth <= 1280){
		$('.main .view_visual').css({'width': '1280px', 'overflow':'hidden', 'margin-left': '-179px'});
	} //end if
	if(screen.availWidth == 1024){
		$('.main .view_visual').css({'width': '1024px', 'overflow':'hidden', 'margin-left':'-51px'});
	} //end if

	/* input placeholder css */
	/*$('input.placeholder').focus(function(){
		$(this).val('').css('color', '#666');
	});
	$('.auto_on input').focus(function(){
		$(this).val('');
	});*/

}); //end function

