/****************************************/
/*	Name: LOTTE HOTEL
/*	PART: Javascript
/*	Version: 1.0
/*	Author: Hyun-Ah Park
/****************************************/

$(function(){
	/*
		Part : Global
	*/
	var $autoComplete = $('.auto_complete ul');
	var $btnAutoSch = $('.auto_on .btn_sch');
	//$autoComplete.hide();
	//$btnAutoSch.hide();

	/*
		Part : Chain
	*/
	/**** Chain Main Calendar Layer ****/
	var $btnLayerCal = $('.btn_layerCal');
	var btnTarget2;
	var index;
	$(this).on('click', '.btn_layerCal', function(){
		//prevent default action (hyperlink)
		//event.preventDefault ? event.preventDefault() : event.returnValue = false;
		
		//Get clicked link href
		//calendar URL
		//var href = "/front/html/ko/chain/hotel/popLayer_cal.html #popWrap";		
		var href = "/library/asp/calendar/popCalendarLayer.asp?id="+$inputThis.attr("id")+"&date="+$inputThis.val()+" #popWrap";
		var overlayer = '<div class="layerCont3"></div>';
		index = $(this).parent().index();
		btnTarget2 = $(this);
		if($(this).parent().hasClass('on')){
			$('.cal_check').removeClass('on');
			$('.layerCont3').remove();
			//$(this).parent().addClass('on');
		}else{
			$.HeadUtilLangHide();

			$('.sel_list').css('height', '0px');
			$('.sel_reserv').removeClass('on');
			$('.sel_reserv a').attr('title', '국가 리스트 열기');

			$('.cal_check').removeClass('on');
			$(this).parent().addClass('on');
			$(this).parent().append(overlayer);
			var positionL = $(this).parent().position().left;

			$('.layerCont3').load(href, function(){
				var layerContH = $('.layerCont3').height();
				$(this).css({'left':positionL, 'top':-(layerContH +2), 'border': '1px solid #999', 'height': layerContH});
			}); //end load
		}//end if */

		
		return false
	}); //end click
	
	// Click on the calendar defines the focus
	$(this).on('click', '.tbl_calendar a', function(){
		$('.quick_reserv li').eq(index+1).find('a:eq(0)').focus();
	}); //end click

	$(this).on('click', '#popWrap .btnClose', function () {

		$('.layerCont3').remove();
		$('.cal_check').removeClass('on');
		//if(!$(event.target).parents().is('.box_calendar')){
			if(btnTarget2 != undefined){
				btnTarget2.focus();
			}//end if
		//}
		
		return false;
	});//end click

	$('input').focus(function(){
		if($(this).next().is('.btn_layerCal') || $(this).next().is('.ico_calenda')){
			btnTarget2 = undefined;
			
			$inputThis = $(this);
		
		} //end if
	}); //end focus


	/*
		Part : Quick Reservation
	*/
	/**** Select a room type ****/
	var $btnRoomSel =$('.sel_room a');

	$btnRoomSel.on('click', function(){
		$.HeadUtilLangHide();

		//if($('.cal_check').hasClass('on')){
			$('.reserv_area .layerCont3').remove();
			$('.cal_check').removeClass('on');
		//} //end if
		return false;
	}); //end click
	
	/**** Select a country , hotel ****/
	var $btnGlobalSel = $('.sel_reserv a');
	$btnGlobalSel.next().hide();

	$btnGlobalSel.on('click', function(){

		if($(this).parent().hasClass('on')){
			$btnGlobalSel.parent().removeClass('on');
			$btnGlobalSel.next().css('height', '0px').end().next().hide();
			$(this).attr('title', '국가 리스트 열기');
		}else{
			$btnGlobalSel.parent().removeClass('on');
			$(this).parent().addClass('on');
			$btnGlobalSel.next().css('height', '0px').end().next().hide();
			$btnGlobalSel.attr('title', '국가 리스트 열기');
			$(this).next().show()
			var selListH = 0;
			$(this).next().find('li').each(function(){
				selListH += $(this).height();
			}); //end each

				$(this).next().css({'height': selListH, 'top':-(selListH+20)}).end().next().show();
			$(this).attr('title', '국가 리스트 닫기');
			
		}//end if
		$('.cal_check').removeClass('on');
		$('.layerCont3').remove();

	}); //end click

	/*
		Part : Rolling
	*/

	/*****Main Visual Rolling****/
	jQuery.mainVisual = function(data){
		/*Variable declaration*/
		var $listVisual = $('.list_visual');
		var $listVisualLi = $listVisual.find('li');
		var nowBtnIndex = 0;
		var mainVisualTimer = 0;
		
		/*The initial setting */
		$listVisualLi.not($listVisualLi.eq(0)).find('>strong, >span').hide();
		$listVisualLi.eq(0).find('a').css('width' , '47px').end().addClass('on');
		$listVisualLi.eq(0).find('a').find('.bg_r').css({'width': '35px'});

		$listVisualLi.find('a').on('click', function(){
			if($(this).parent().hasClass('on')){
				return false;
			}else{
				$listVisualLi.removeClass('on');
				$(this).parent().siblings().find('a').stop().animate({'width': '24px'});
				$(this).parent().siblings().find('a').find('.bg_r').stop().animate({'width': '12px'});
				$(this).parent().addClass('on');
				$(this).stop().animate({'width': '47px'});
				$(this).find('.bg_r').stop().animate({'width': '35px'});

				var index = $(this).parent().index();
				var $viewVisual = $('.view_visual');
				var $viewVisualImg = $viewVisual.find('img');
				var $viewVisualTit = $viewVisual.find('>strong');
				
				$viewVisualTit.html($(this).text());
				$viewVisualImg.stop().animate({'opacity': '0'}, 1600, function(){
					$viewVisualImg.attr({'src': data[index].src,'alt': data[index].alt});
					$viewVisualImg.stop().animate({'opacity': '1'}, 1000);
				});
				
				$listVisualLi.find('>strong, >span').stop().animate({'opacity': '0'}, 1600, function(){
					$listVisualLi.eq(index).find('>strong, >span').show().stop().animate({'opacity': '1'}, 1000);
				});
			} //end if
			nowBtnIndex = index;
			return false;
		}); //end click
		
		function mainVisualMove(){
			var nextmainVisualIndex = nowBtnIndex + 1;
			if (nextmainVisualIndex >= $listVisualLi.length) {
				nextmainVisualIndex = 0;
			} //end if
			$listVisualLi.eq(nextmainVisualIndex).find('a').trigger('click')
		}; //end mainVisualMove

		function mainVisualTimerStart(){
			if (mainVisualTimer == 0) {
				oneVisualTimer=setTimeout(mainVisualMove,3000);
				mainVisualTimer = setInterval(mainVisualMove, 12000);
			} //end if
		}; //end mainVisualTimerStart

		function mainVisualStop() {
			if (mainVisualTimer != 0) {
				clearTimeout(oneVisualTimer);
				clearInterval(mainVisualTimer);
				mainVisualTimer = 0;
			}//end if
		}; //end mainVisualStop

		//Auto rolling
		mainVisualTimerStart();

		$listVisualLi.find('a').on('mouseenter', function(){
			mainVisualStop();
		});//end mouseenter

		$listVisualLi.find('a').on('mouseleave', function(){
			if(!$btnPause.hasClass('on')){
				mainVisualTimerStart();
			}
		}); //end mouseleave

		$listVisualLi.find('a').on('focus', function(){
			mainVisualStop();
		});//end mouseenter
	}//end mainVisual
	

	/***** Button to pause playback *****/
	var $btnPause = $('.btn_pause');

	$btnPause.on('click', function(){
		if($(this).hasClass('on')){
			$(this).find('span').html('일시 정지');
			$(this).removeClass('on');
			mainVisualTimerStart();
		}else{
			$(this).find('span').html('재생');
			$(this).addClass('on');
			mainVisualStop();
		} //end if
		return false;
	}); //end click
	
	/** wedding **/
	var $weddingBannerMore = $('.main.wedding .wrap_contens .contR .banner a');
	var $weddingBannerImg = $('.wrap_contens .contR .banner img');
	$weddingBannerImg.css('opacity', '0.3');

	$weddingBannerMore.on('mouseenter', function(){
		$weddingBannerImg.css('opacity', '0');
		$(this).parent().css('background-color', '#8a7a6c');
	}); //end mouseenter

	$weddingBannerMore.on('mouseleave', function(){
		$weddingBannerImg.css('opacity', '0.3');
		$(this).parent().css('background-color', '#000');
	}); //end mouseenter

	$weddingBannerMore.on('focusin', function(){
		$(this).trigger('mouseenter');
	}); //end focusIn

	$weddingBannerMore.on('focusout', function(){
		$(this).trigger('mouseleave');
	}); //end focusIn

	/******main visual button position******/
	var visualTitH = $('.list_visual li .tit_visual').outerHeight() + 10;
	$('.list_visual li').not('.wedding .list_visual li').css({'padding-top': visualTitH});
	$('.btn_pause').not('.wedding .btn_pause').css('top', (visualTitH+48));

	/*
		Part : Timer
	*/
	/******Chain Timer******/
	printTime();
	setInterval("printTime()",1000);
	
	/*
		Part : Info
	*/

	/**** Chain Main Info****/
	var $wrapInfo = $('.wrap_info');
	var $wrapWeather = $('.wrap_weather');
	var $btnInfoOpen = $('.wrap_info .btn_wtOpen');
	var $btnInfoClose = $('.wrap_weather .btn_wtClose');
	$wrapWeather.hide();

	$btnInfoOpen.on('click', function(){
		$wrapInfo.hide();
		$wrapWeather.show();
		$('.wrap_weather .ico_temperature').each(function(){
		var icoTempImgH = $(this).find('img').height()/2;
		$(this).css('margin-bottom', -icoTempImgH);
	}); //end each
		return false;
	}); //end click

	$btnInfoClose.on('click', function(){
		$wrapInfo.show();
		$wrapWeather.hide();
		return false;
	}); //end click

	/**** Document Click ****/
	$(document).on('click', function(event){
		// Global Main Quick Reservation

		if(!$(event.target).parents().is('.quick_reserv')){
			
			$('.cal_check').removeClass('on');
			$('.layerCont3').remove();
			$('.sel_reserv').removeClass('on');
			$('.sel_list').css('height', '0px').end().hide();
			$('.sel_reserv a').attr('title', '국가 리스트 열기');
		}//end if

		if(!$(event.target).parents().is('.cal_check')){
			
			if(btnTarget2 != undefined){
				btnTarget2.focus();
			} //end if
			
		}//end if

	}); //end click

}); //end function

/*Chain Main Timer*/
function printTime(){
	var time = new Date();
	var hour = time.getHours();
	var minute = time.getMinutes();
	var ampm;

	if(hour >=12){
		hour = hour -12;
		ampm = "P.M";
	}else{
		ampm = "A.M";
	}//end if

	hour=(hour==0) ? 12:hour;
	
	if(hour <10){
		hour = '0' + hour;
	}//end if

	if(minute <10){
		minute = '0' + minute;
	}//end if

	$('.hours').html(hour);
	$('.minutes').html(minute);
	$('.meridiem').html(ampm);
} //end printTime