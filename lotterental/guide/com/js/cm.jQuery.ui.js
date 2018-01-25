/****************************************/
/*	Name: LOTTE HOTEL
/*	PART: Javascript
/*	Version: 1.0
/*	Author: Hyun-Ah Park
/****************************************/

$(function(){
	/*
		Part :Head Util
	*/
	/** Head util **/
	var $utilTopLang = $('.util_top .lang>a:first-child');
	var $utilListLang = $utilTopLang.next('.list_lang');
	var $utilListLangA = $utilListLang.find('li>a');
	
	$utilListLang.hide();
	
	$utilTopLang.on('click', function(){
		$('.cal_check, .sel_room').removeClass('on');
		$('.layerCont3').remove();
		$('.reserv_area .list_room').hide();
		$(this).HeadUtilLang();
		if($(this).parent().hasClass('on')){
			$(this).attr('title', '언어선택 닫기');
		}else{
			$(this).attr('title', '언어선택 열기');
		}
		return false;
	}); //end click

	$.fn.HeadUtilLang = function() {
		if($(this).parent().hasClass('on')){
			$(this).parent().removeClass('on');
			$utilListLang.hide();
			$(this).attr('title', '언어선택 닫기');
		}else{
			if($(this).parent().hasClass('sel')){
				$(this).parent().removeClass('sel');
			} //end if
			$(this).parent().addClass('on');
			$utilListLang.show();
			$('.global_menuLst').hide();
			$(this).attr('title', '언어선택 열기');
		} //end if
	} //end HeadUtilLang Plugin

	$utilListLangA.on('mouseenter', function(){
		$utilListLangA.parent().removeClass('on');
		$(this).parent().addClass('on');

	}); //end mouseenter

	$utilListLangA.on('mouseleave', function(){
		$utilListLangA.parent().removeClass('on');
	}); //end mouseleave

	$utilListLangA.on('click', function(){
		var thisText = $(this).text();
		$utilTopLang.html(thisText);
		$utilTopLang.parent().removeClass('on');
		$utilTopLang.parent().addClass('sel');
		$utilListLang.hide();
		$utilTopLang.attr('title', '언어선택 열기');
		$('.btn_ok').focus();
	}); //end click
	
	

	/*
		Part : GNB
	*/
	//variable announce
	var $gnb = $('.gnb');
	var $gnbLi = $gnb.find('>li');
	var $subGnb = $('.sub_gnb');
	var $subGnbLi = $subGnb.find('>li');
	var subGnbw = $subGnb.width()/2;

	//default setting
	$subGnb.hide();
	/*$gnbLi.each(function(i){
		$gnbLi.eq(i).css('width',$gnbLi.eq(i).find('>a').width())
	});*/

	/***** GNB *****/
	$gnbLi.find('>a').on('mouseenter', function(){
		$('.util_top .lang').removeClass('on');
		$utilListLang.hide();
		$utilTopLang.attr('title', '언어선택 열기');

		$gnbLi.removeClass('on');
		$(this).parent().addClass('on');
		
		$subGnb.hide();
		$(this).next().show();
		
		var subGnbMar = $(this).next().outerWidth()/2;
		var subLiH = 0;
		var subLiW = []
		$(this).next().find('li').each(function(i){
			subLiH += $(this).height();
			subLiW[i] = $(this).width();
		}); //end each
		
		var maxSubLiW = 0;
		for(var i=0; i<=subLiW.length; i++){
			var temp = subLiW[i]
			if(maxSubLiW < temp){
				maxSubLiW = temp;
			}
		}
		
		$(this).next().css({'width': maxSubLiW,'height': subLiH, 'padding':'2px 0 9px 0', 'margin-left': -maxSubLiW/2, 'overflow': 'visible'});
		
	}); //end mouseenter

	$gnb.on('mouseleave', function(){
		$gnbLi.removeClass('on');
		$subGnb.hide();
	}); //end mouseleave

	$gnbLi.find('>a').on('focus', function(){
		$(this).trigger('mouseenter');
	});

	/***** SUB *****/
	$subGnbLi.find('>a').on('mouseenter', function(){
		$subGnbLi.removeClass('on');
		$(this).parent().addClass('on');
	}); //end mouseenter

	$subGnb.on('mouseleave', function(){
		$subGnbLi.removeClass('on');
	}); //end mouseleave

	$subGnbLi.find('>a').on('focus', function(){
		$(this).trigger('mouseenter');
	}); //end focus

	// SUB last a focusOut
	$('#container a').eq(0).on('focus', function(){
		$gnbLi.removeClass('on');
		$subGnb.hide();
	}); //end focus

	/*
		Part : LNB
	*/
	//variable announce
	var $lnb = $('.lbnMenu');
	var $lnbLi = $lnb.find('>li');
	var $lnbLiA = $lnbLi.find('>a');
	var $lnbSub = $('.subMenu');
	var $lnbSubLi = $lnbSub.find('>li');
	var $lnbSubLiA = $lnbSubLi.find('>a');

	var $lnbOn = $lnb.find('>li.sub.on>a');
	var $lnbOnNext = $lnbOn.next('.subMenu');
	var $lnbOnNextLI = $lnbOnNext.find('li');
	var lnbOnNextLiLen = $lnbOnNext.children().length;
	var lnbOnSubH = $lnbOnNextLI.height()*lnbOnNextLiLen+10;
	var lnbOnIndex = $('.lbnMenu>li.on').index();
	
	/**** 2Dpth ****/
	//Default Setting
	$lnbSub.hide();
	$lnbOnNext.show();
	$lnbOn.css({'padding-bottom': '14px'});
	
	$lnbLiA.on('click', function(){
		var index = $(this).parent().index();
		var $thisNext = $(this).next('.subMenu');
		var $thisNextLi = $thisNext.find('li');
		var lnbSubLiLen = $thisNext.children().length;
		var lnbSubH = $thisNextLi.height()*lnbSubLiLen +10;

		if($(this).parent().hasClass('on')){
			return false;
		}else{
			$lnbLi.removeClass('on');
			$lnbLi.eq(index).addClass('on');
			$lnbSub.hide();
			$thisNext.show(400, function(){
				var lnbSubH = $thisNext.height();
				$(this).animate({'height': lnbSubH});
			}); //end show
		} //end if
	}); //end click

	$lnbLiA.on('mouseenter', function(){
		var index = $(this).parent().index();
		var lnbOnIndex = $lnb.find('>li.on').index();
		$(this).parent().not($lnb.find('>li.on').eq(lnbOnIndex)).addClass('over');
	}); //end mouseenter
	
	$lnbLiA.on('mouseleave', function(){
		var index = $(this).parent().index();
		var lnbOnIndex = $lnb.find('>li.on').index();
		$(this).parent().removeClass('over');
	}); //end mouseleave

	$lnbLiA.on('focusin', function(){
		if(!$(this).parent().hasClass('on')){
			$(this).trigger('mouseenter');
		} //end if
	}); //end focusin

	$lnbLiA.on('focusout', function(){
		$(this).trigger('mouseleave');
	}); //end focusout

	/**** 3Depth ****/
	

	$lnbSubLiA.on('click', function(){
		var snbOnIndex = $(this).parent().index();
		$lnbSubLi.removeClass('on');
		$(this).parent().addClass('on');
		
	}); //end click

	$lnbSubLiA.on('mouseenter', function(){
		$(this).parent().addClass('over');
	});//end mouseenter

	$lnbSubLiA.on('mouseleave', function(){
		$(this).parent().removeClass('over');
		
	}); //end mouseleave

	$lnbSubLiA.on('focusin', function(){
		$(this).trigger('mouseenter');
	}); //end focusin

	$lnbSubLiA.on('focusout', function(){
		//if(!$(this).parent().index() == snbOnIndex){
			$(this).parent().removeClass('over');
		//} //end if
	}); //end focusout

	/*
		Part : Chain Wedding head
	*/
	/***** Wedding Global Menu *****/
	var $btnGlobalMenu = $('.global_menu');
	var $globalMenu = $('.global_menuLst');
	var $globalMenuA = $('.global_menuLst>li>a');
	var $globalMenuSel = $('.global_menu_sel');
	
	$globalMenu.hide();
	$globalMenuSel.hide();

	$btnGlobalMenu.on('click', function(){
		var thisImg = $(this).find('img');
		if(!$(this).hasClass('on')){
			$(this).addClass('on');
			thisImg.attr("src", thisImg.attr("src").replace("on.png", "off.png"));
			$globalMenu.show();
			$(this).attr('title', '글로벌 메뉴 닫기');
		}else{
			$(this).removeClass('on');
			thisImg.attr("src", thisImg.attr("src").replace("off.png", "on.png"));
			$globalMenu.hide();
			$(this).attr('title', '글로벌 메뉴 열기');
		}//end if
		return false;
	}); //end click

	

	$globalMenuA.on('click', function(){
		var selMenu = $(this).text();
		//$btnGlobalMenu.hide();
		var thisImg = $btnGlobalMenu.find('img');

		thisImg.attr("src", thisImg.attr("src").replace("off.png", "on.png"));
		$globalMenuSel.show();
		$globalMenuSel.find('>strong>a').html(selMenu);
		$globalMenu.hide();
		$('.global_menu').attr('title', '글로벌 메뉴 열기');
	}); //end click

	$globalMenuSel.find('>strong>a').on('click', function(){
		if($globalMenuSel.css('display') == 'block'){
			$globalMenu.show();
			$('.global_menu').attr('title', '글로벌 메뉴 닫기');
		}
		return false;
	}); //end click
	

	$('.wedding .logo').on('focusin', function(){
		if($('.global_menu').is('.on')){
			$globalMenu.hide();
			$btnGlobalMenu.attr('title', '글로벌 메뉴 열기');
		} //end if
	}); //end focusin
	
	/*
		Part : Folding Content
	*/
	//variable announce
	var $acCont = $('.acCont');
	var $acContDt = $acCont.find('>dt');
	var $acContDtA = $acContDt.find('>a');
	
	//Default Setting
	if(!$acCont.hasClass('type_career')){
		$acContDt.css('margin-bottom', '10px');
	}//end if
	
	$acCont.find('>dd').not($acCont.find('>dd.enfold')).hide();

	$acContDtA.on('click', function(){
		//variable announce
		var $thisParent = $(this).parent();

		if($thisParent.hasClass('on')){
			$acContDt.removeClass('on').css('margin-bottom', '10px');
			$acCont.find('>dd').not($acCont.find('>dd.enfold')).hide();
			
			if($(this).parents('.acCont').hasClass('type02')){
				$(this).parent().next('dd').hide().removeClass('on');
				$('.acCont.type02 .icon_menu').hide();
				$('.btn_enfold').removeClass('on');
			}//end if
			if($acCont.hasClass('type_career')){
				$acContDt.removeClass('on').css('margin-bottom', '0px');
			}//end if
		}else{
			if($acCont.hasClass('type_career')){
				$acContDt.removeClass('on').css('margin-bottom', '0px');
				$thisParent.addClass('on');
				$acCont.find('>dd').hide().not($acCont.find('>dd.enfold')).removeClass('on');
				$thisParent.next().show().addClass('on');
			}else{
				$acContDt.removeClass('on').css('margin-bottom', '10px');
				$thisParent.addClass('on').css('margin-bottom', '0px');
				
				$acCont.find('>dd').not($acCont.find('>dd.enfold')).hide().removeClass('on');
				$thisParent.next().show().addClass('on');

				if($(this).parents('.acCont').hasClass('type02')){
					$('.acCont.type02 .icon_menu').show();
					$(this).parent().next('dd').show().addClass('on');
					$('.btn_enfold').addClass('on');
				} //end if
			} //end if
		} //end if
		
		return false;
	}); //end click

	//dining open close button
	var $btnEnfold = $('.btn_enfold');
	$('.acCont.type02 .icon_menu').hide();
	$btnEnfold.on('click', function(){
		if($acContDt.hasClass('on')){

			$acContDt.removeClass('on').css('margin-bottom', '0px');
			$acCont.find('>dd').not($acCont.find('>dd.enfold')).hide().removeClass('on');
			$(this).removeClass('on');
			$('.acCont.type02 .icon_menu').hide();
		}else{
			$acContDt.addClass('on').css('margin-bottom', '0px');
			$(this).parent().prev('dd').show().addClass('on');
			$(this).addClass('on');
			$('.acCont.type02 .icon_menu').show();
		}
		return false;
	}); //end click

	//dining menus scrollTop
	var $OurMenu =$('.acCont.type02');
	var $OurMenuListLi = $OurMenu.find('.lst_commend > li');
	var $OurMenuListA = $OurMenuListLi.find('> a');
	var targetOffsetT = [];
	var offsetT = [];

	$OurMenu.find('dt>a, .btn_enfold').on('click', function(){
		$OurMenuListA.each(function(index){
			var targetId = $($(this).attr('href'));
			offsetT[index] = targetId.offset().top;
			if(index == 0){
				targetOffsetT[index] = 0;
			}else{
				targetOffsetT[index] = (offsetT[index] - offsetT[index-1]);
				if(index > 1){
					targetOffsetT[index] = targetOffsetT[index-1] + (offsetT[index] - offsetT[index-1])
				} //end if
			}//end if
		});//end each
		return false
	});//end click

	/*$OurMenuListA.on('click', function(){
		
		var targetId = $($(this).attr('href'));
		var targetH = targetId.outerHeight();
		var index = $(this).parent().index();

		$OurMenuListA.removeClass('on')
		$(this).addClass('on');
		$(targetId).parents('li').scrollTop(targetOffsetT[index]);
		
		return false;
	}); //end click*/

	$OurMenuListA.each(function(index){
		$(this).on('click', function(){
		
			var targetId = $($(this).attr('href'));
			var targetH = targetId.outerHeight();

			$OurMenuListA.removeClass('on')
			$(this).addClass('on');
			$(targetId).parents('li').scrollTop(targetOffsetT[index]);
			
			return false;
		}); //end click*/
	})


	/*
		Part : Tab Content Plugin
	*/
	/*** Hard-coded tabs plugin ***/
	$.fn.subTab = function(){
		$(this).on('click', function(){
			var index = $(this).parent().index()+1;
			var tabHref = $(this).attr('href');
			var href = "con_"+urlInset + " #tab"+index;
			$('.tab_content').load(href, function(data) {
				$(data).html();
			}); //end load

			if(!$(this).parent().hasClass('on')){
				$('.sub_tab li').removeClass('on');
				$(this).parent().addClass('on');
			} //end if
			return false;
		}); //end click
		
	} //end subTab
	
	jQuery.subTabSetting = function(){
		//tab_content
		var localHref = document.location.href.split('/').reverse();
		urlInset = localHref[0];
		//start default
		if($('.tab_content').length < 1){
			var tabCont = '<div class="tab_content"></div>';
			$('.bodyContent').append(tabCont);
			$('.tab_content').load("con_"+urlInset+" #tab1", function(data) {
				$(data).html();
			}); //end load
		} //end if
	} //end subTab plugin

	/*
		Part :page util Share
	*/
		
	var $utilShare = $('.page_util .page_share');

	$utilShare.on('click', function(){
		if(!$(this).hasClass('on')){
			$(this).addClass('on');
			$('.shares').show();
		}else{
			$(this).removeClass('on');
			$('.shares').hide();
		}
		
	})


	/*
		Part : Reservation Tab
	*/
	/***** Chain Contents Reservation *****/
	$('.resvt_box .tab_menu li a').click(function(){
		var resvtHead = $(this).text();
		if(!$(this).parent().hasClass('on')){
			$('.tab_menu li').removeClass('on');
			$(this).parent().addClass('on');
			$('.form_box h3').html(resvtHead);
		}//end if
		if($(this).parent().index() != 0){
			$('.sel_hide').show();
		}else{
			$('.sel_hide').hide();
		}//end if
		return false;
	});//end click

	/*
		Part : VIRTUAL TOUR ThumbNail image
	*/
	//variable announce
	var $thumb = $('.list_thumb.virtualT');
	var $thumbA = $('.list_thumb.virtualT a');
	
	$thumbA.on('mouseenter', function(){
		//variable announce
		var $thumbTit = $(this).find('span.tit');
		var index = $(this).parent().index();
		var parentIndex =$(this).parent().parent().parent().index()-1;
		
		$thumb.eq(parentIndex).find('a').removeClass('on');
		$thumb.eq(parentIndex).find('a').eq(index).addClass('on');
	}); //end mouseenter

	$thumbA.on('focusin', function(){
		var $thumbTit = $(this).find('span.tit');
		var index = $(this).parent().index();
		var parentIndex =$(this).parent().parent().parent().index()-1;
		
		$thumb.eq(parentIndex).find('a').removeClass('on');
		$thumb.eq(parentIndex).find('a').eq(index).addClass('on');
	}); //end focusin

	/*
		Part : Gallery List
	*/

	//variable announce
	var $galleryListLi = $('.wrap_gallery .lst li').not($('.wrap_gallery .lst.type2 li'));
	var $galleryView = $('.wrap_gallery .view').not('.wrap_gallery.type2 .view');
	var galleryListIndex = $galleryListLi.filter('.on').index();
	var viewDlH = $galleryView.find('dl').outerHeight();
	
	jQuery.galleryListOn = function(){
		if(!$galleryListLi.filter('.on').find('span').is('.bg')){
			$galleryListLi.filter('.on').find('a').append('<span class="bg"></span>');
			$galleryListLi.filter('.on').find('a .bg').css('opacity', 0.7);
		};
	} //end galleryListOn
	
	$.galleryListOn();

	//select galleryThumb img view
	jQuery.fn.galleryListView = function(options) {
		var imgThumb = $(this).find('img');
		var imgView = $(this).parent().parent().next().find('img');
		var imgSrc = imgThumb.attr('src');
		var imgAlt = imgThumb.attr('alt');
		imgView.attr({'src': imgSrc.replace('/Thumbnail', ''),'alt': imgAlt});
	}; //end galleryListView

	$galleryListLi.find('>a').on('click', function(){
		/* The index of financial */
		galleryListIndex = $(this).parent().index();
		var galleryLiLen = $galleryListLi.length-1;

		$galleryListLi.removeClass('on');
		$(this).parent().addClass('on');
		$galleryListLi.last().removeClass('last');
		
		$.galleryListOn();
		/*Click to move the focus when the last list control condition*/
		if(galleryListIndex == galleryLiLen){
			$galleryListLi.removeClass('last');
			$galleryListLi.last().addClass('last');
		} //end if
		
		/*View img Change*/
		$(this).galleryListView();
		
		/*View focus*/
		$.tabIndexSetting();

		return false;
	}); //end click

	/* TabIndex Setting Plugin */
	jQuery.tabIndexSetting = function(){
		var tabIndex;
		$('a').each(function(index){
			
			$(this).attr('tabindex', index);
			
			tabIndex = Number($('.wrap_gallery li.on a').attr('tabindex'));

			if(index > tabIndex){
				$(this).attr('tabindex', index + 2);
			}
			
		});
		$('.btn_mult a').each(function(index){
			$(this).attr('tabindex', tabIndex+index+1);
		});

		$('.page_email').on('focus', function(){
			$galleryListLi.eq(0).find('>a').trigger('mouseleave');
		});
	} //end tabIndexSetting

	$galleryListLi.find('>a').on('mouseenter', function(){
		$galleryListLi.removeClass('on');
		$(this).parent().addClass('on');
		$.galleryListOn();
	}); //end mouseenter

	$galleryListLi.parent().on('mouseleave', function(){
		$galleryListLi.removeClass('on');
		$galleryListLi.eq(galleryListIndex).addClass('on');

	}); //end mouseleave
	
	$galleryListLi.find('>a').on('focusin', function(){
		$(this).trigger('mouseenter');
		$.galleryListOn();
	}); //end focusin

	$galleryListLi.last().find('>a').on('focusout', function(){
		$(this).trigger('mouseleave');

	});//end focusout

	
	$('.wrap_gallery .view .info_chain a').last().on('focusout', function(){
		$galleryListLi.eq(galleryListIndex+1).find('a').focus();
	}); //end focusout
	
	$galleryListLi.filter('.on').find('a').on('focusin', function(){
	//	$galleryView.find('a:first-child').focus();
	}); //end focusin
	
	/*
		Part : Layer Pop
	*/
	var btnTarget;
	var btnTarget2;

	$(this).on('click','.btn_layerPop', function (event) {
		//prevent default action (hyperlink)
		event.preventDefault ? event.preventDefault() : event.returnValue = false;

		//Get clicked link href
		var href = $(this).attr("href") + " #popWrap";
		var overlayerBg = '<div class="overlayerBg"></div>';
		var overlayer ='<div class="layerCont"></div>';
		var overlayer2 = '<div class="layerCont2"></div>';
		btnTarget2 = $(this);
		
		
		if($('.overlayerBg').length > 0 || $(this).hasClass('pos_layer')){

			

			if(!$(this).parent().next().is('.layerCont2')){

				$(this).parent().after(overlayer2);
			} //end if

			var layerW = $(this).outerWidth(true);
			var layerH = $(this).outerHeight(true)+1;
			var layerPos = $(this).position();

			//calendar URL
			if($(this).hasClass('pos_layer') && $(this).prev().attr('disabled') == undefined){

				var $inputThis = $(this).prev();
				$('input[type="text"].on').removeClass('on');
				$inputThis.addClass('on');

				//var href = "/front/html/ko/chain/hotel/popLayer_cal.html #popWrap";
				var href = "/library/asp/calendar/popCalendarLayer.asp?id="+$inputThis.attr("id")+"&date="+$inputThis.val()+" #popWrap";

				$('.layerCont2').load(href,function(){
					var layerContW = $('.layerCont2').outerWidth();
					var layerContH = $('.layerCont2').height();
					var marginL =$('.layerCont2').find('#popWrap').width()/2;
					var marginT = $('.layerCont2').find('#popWrap').height()/2;
					var maxH = 600;
					var inputOffset = $inputThis.offset();

					if(inputOffset.top -$('#header').outerHeight() > layerContH){
						$(this).offset({left:inputOffset.left, top:(inputOffset.top-layerContH)});
					}else{
						$(this).offset({left:inputOffset.left, top:(inputOffset.top+$inputThis.outerHeight())});
					}
					//$('.layerCont2').offset({left:inputOffset.left, top:(inputOffset.top-layerContH)});
					
					if(layerContH > maxH){
						$('.layerCont2').css('height', maxH)
						$('.layerCont2 .popBody').css({'overflow-x':'hidden', 'overflow-y':'scroll'});
					}
					if($('.layerCont2 a').is('.on')){
						$('.layerCont2 a.on').eq(0).focus();
					}else{
						$('.layerCont2 a').eq(0).focus();
					}
				})//end load
			}else{
				$('.layerCont2').load(href,function(){
					var layerContW = $('.layerCont2').outerWidth();
					var layerContH = $('.layerCont2').height();
					var marginL =layerContW/2;
					var marginT = layerContH/2;
					var maxH = 600;

					$('.layerCont2').css({'margin-left': -marginL, 'margin-top': -marginT});
					
					if(layerContH > maxH){
						$('.layerCont2').css('height', maxH)
						$('.layerCont2 .popBody').css({'overflow-x':'hidden', 'overflow-y':'scroll'});
					}//end if
					
				}); //end load
			}//end if
			return false;
		}else{
			if($('.cal_check').hasClass('on') || $('.btn_roomSel').hasClass('on')){
				$('.cal_check').find('.layerCont3').remove();
				$('.cal_check').removeClass('on');
				$('.sel_room').removeClass('on');
				$('.list_room').hide();
			} //end if
			$('#wrap').append(overlayerBg);
			btnTarget =$(this);

			if($(this).parent().is('.ico_set.alR')){
				$(this).parent().after(overlayer);
			}else{
				$(this).after(overlayer);
			} //end if
			
			$('.overlayerBg').css({'width': $(window).width(), 'height': $(document).height(), 'opacity': 0.7});
		} //end if

		$('.layerCont').load(href,function() {
			$('.popContainer').not($('.popContainer').eq(0)).hide();
			var layerContW = $('.layerCont').width();
			var layerContH = $('.layerCont').height();
			var marginL = $('.layerCont').find('#popWrap').width()/2;
			var marginT = $(window).scrollTop() + ($(window).height() - layerContH) / 2;
			var maxH = 600;
			var offsetL = ($(window).width()/2) - (layerContW/2)
			
			/*** Head Find a Hotel Layer Tab ***/
			$(this).on('click','.titR_lst>li>a', function(){
				var $titRlst = $('.titR_lst>li');
				var index = $(this).parent().index();

				$titRlst.removeClass('on');
				$(this).parent().addClass('on');

				if($('.layerCont').has('.layerCont2')){
					$('.layerCont2').remove();
				}
				$('.popContainer').hide();
				$('.popContainer').eq(index).show();

				return false;
			}); //end click

			$(this).offset({left: offsetL, top:marginT});
			//$('.layerCont').css({'margin-left': -($('.layerCont').find('#popWrap').width()/2), 'margin-top': marginT});

			if(layerContH > maxH){

				$('.layerCont').css('height', maxH)
				$('.layerCont .popBody').css({'overflow-x':'hidden', 'overflow-y':'scroll'});
			}//end if


		}); //end load
	}); //end click

	var btnTarget3;
	$(this).on('click','.btn_layerPop2', function (event) {
		//prevent default action (hyperlink)
		event.preventDefault ? event.preventDefault() : event.returnValue = false;
		//Get clicked link href
		
		var href = $(this).attr("href") + " #popWrap";
		var overlayer = '<div class="layerCont"></div>';
		btnTarget3 = $(this);

		if($('.layerCont').length > 0){
			return false;
		}else{
			$(this).after(overlayer);
			$('.layerCont').load(href,function(){
				var layerContH = $(this).outerHeight()+15;
				var wrapGalleryOffset = $('.wrap_gallery.type2').offset();
				$(this).css({'border': '1px solid #999'});
				$(this).offset({left:wrapGalleryOffset.left+1, top:wrapGalleryOffset.top})
				
			}); //end load
		} //end if

	});//end click

	//Address search
	$(this).on('click','.btn_layerPop3', function (event) {
		//prevent default action (hyperlink)
		event.preventDefault ? event.preventDefault() : event.returnValue = false;
		//Get clicked link href

		var href = $(this).attr("href") + " #popWrap";
		var overlayer = '<div class="overlayerBg"></div><div class="layerCont"></div>';
		btnTarget3 = $(this);

		if($('.overlayerBg').length > 0){
			return false;
		}else{
			$('#wrap').append(overlayer);
			$('.overlayerBg').css({'width': $(window).width(), 'height': $(document).height(), 'opacity': 0.7});
			$('.layerCont').load(href,function() {
				$('.popContainer').not($('.popContainer').eq(0)).hide();
				var layerContW = $('.layerCont').width();
				var layerContH = $('.layerCont').height();
				var marginL = $('.layerCont').find('#popWrap').width()/2;
				var marginT = $(window).scrollTop() + ($(window).height() - layerContH) / 2;
				var maxH = 600;
				var offsetL = ($(window).width()/2) - (layerContW/2)
				
				$(this).offset({left: offsetL, top:marginT});
				if(layerContH > maxH){

					$('.layerCont').css('height', maxH)
					$('.layerCont .popBody').css({'overflow-x':'hidden', 'overflow-y':'scroll'});
				}//end if

				if($(this).find('.box_sign')){
					var signInputId = $(this).find('input:eq(0)').attr('id');
					setTimeout(function () {
						document.getElementById(signInputId).focus();
					}, 100);
				}else{
					$(this).find('a').eq(0).focus();
				} //end if
				
				//alert("1");
				// 2014-01-09 : 팝업로그인 id save 쿠키
				function getSaveIdCookie2( name ){
				  var nameOfCookie = name + "=";
				  var x = 0;
				  while ( x <= document.cookie.length )
				  {
					var y = (x+nameOfCookie.length);
					if ( document.cookie.substring( x, y ) == nameOfCookie ) {
					  if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
						endOfCookie = document.cookie.length;
					  return unescape( document.cookie.substring( y, endOfCookie ) );
					}
					x = document.cookie.indexOf( " ", x ) + 1;
					if ( x == 0 )
					  break;
				  }
				  return "";
				}
				if (getSaveIdCookie2("saveIdcookieIsuse") == "done" ){
					$("input:checkbox[id='saveIdPop']").attr("checked","checked");
				}
				$("#userIdPop").val( getSaveIdCookie2("saveIdcookieValue") ); 
			}); //end load
		} //end if

	}); //end click

	var $inputThis;
	var $inputThisIndex;
	
	$('input[type="text"]').on('focus', function(){
		if($(this).next().is('.btn_layerCal') || $(this).next().is('.ico_calenda')){
			btnTarget2 = undefined;
			$('input[type="text"].on').removeClass('on');
			$inputThis = $(this).addClass('on');
			var $inputNext = $inputThis.next();
			$inputThisIndex = $inputThis.index();
			$inputThisOffset = $inputThis.offset();

			if($(this).attr('disabled') != undefined){
				return false;
			}else{

				if($inputThis.parent().hasClass('on')){
					$inputThis.parent().removeClass('on');
				}else{
					$('.cal_check').removeClass('on');
					$inputThis.parent().addClass('on');
				}

				//calendar URL
				//var href = "/front/html/ko/chain/hotel/popLayer_cal.html? #popWrap";			
				var href = "/library/asp/calendar/popCalendarLayer.asp?id="+$inputThis.attr("id")+"&date="+$inputThis.val()+" #popWrap";
				
				var overlayer2 = '<div class="layerCont2"></div>';
				var layerW = $(this).outerWidth(true);
				var layerH = $(this).outerHeight(true)+1;
				var layerPos = $(this).next().position()
				
				if(!$(this).parent().next().is('.layerCont2')){
					if($(this).parents().is('.cal_check')){
						$(this).after(overlayer2);
					}else{
						$(this).parent().after(overlayer2);
					}
					
				} //end if
				
				$('.layerCont2').load(href,function(){
					var layerContW = $('.layerCont2').outerWidth();
					var layerContH = $('.layerCont2').height();
					var marginL =$('.layerCont2').find('#popWrap').width()/2;
					var marginT = $('.layerCont2').find('#popWrap').height()/2;
					var maxH = 600;
					var layerPosLeft;
					var layerPosTop;

					if($inputThisOffset.top -$('#header').outerHeight() > layerContH){
						$(this).offset({left:$inputThisOffset.left, top:($inputThisOffset.top-layerContH)});
					}else{
						$(this).offset({left:$inputThisOffset.left, top:($inputThisOffset.top+$inputThis.outerHeight())});
					}

					if(layerContH > maxH){
						$('.layerCont2').css('height', maxH);
						$('.layerCont2 .popBody').css({'overflow-x':'hidden', 'overflow-y':'scroll'});
					}//end if

					//calendar focus
					if($('.layerCont2 a').is('.on')){
						$('.layerCont2 a.on').eq(0).focus()
					}else{
						$('.layerCont2 a').eq(0).focus();
					}
					
					btnTarget2 = $(this);
				}); //end load
				
			} //end if
		} //end if

		return false;
	});

	/***** Google API Map Layer *****/
	var $layerCont = $('.lcGuideMap #popWrap');
	$layerCont.hide();
	$(this).on('click', '.btn_mapLayer', function(){
		//prevent default action (hyperlink)
		event.preventDefault ? event.preventDefault() : event.returnValue = false;

		if($layerCont.hasClass('on')){
			return false;
		}else{
			$layerCont.addClass('on');
			$layerCont.show()
			var layerContH = $layerCont.height()/2;
			$layerCont.css({'margin-top':-layerContH});
		}//end if
	});
var $inputNext = $('input[type="text"].on').next();
	/***** Close Layer Pop *****/
	$(this).on('click', '#popWrap .btnClose', function () {

		if($(this).parent().parent().hasClass('layerCont')){
			if($('.overlayerBg').length > 0){
				//btnTarget.focus();
			} //end if
			
			$('.overlayerBg').remove();
			$('.layerCont').not('.roomMap_layer').remove();
		}else{

			if($(this).parents().hasClass('lcGuideMap')){
				$('.lcGuideMap #popWrap').hide();
				$layerCont.removeClass('on');
			}//end if

			if($(this).parent().has('#box_calendar')){

				//calrendar input
				if($inputThisIndex >= 0){
					$('input[type="text"].on + a').attr('id', 'calInputFocus'+$inputThisIndex);
					var inputOnNextId = $('input[type="text"].on + a').attr('id');
				
					setTimeout(function () {
						document.getElementById(inputOnNextId).focus();
					}, 100);
					
					$('input[type="text"].on').removeClass('on');
					
					$inputThisIndex = undefined;
				}//end if
				//calrendar button
				if(btnTarget2 != undefined){
					btnTarget2.focus();
					btnTarget2 = undefined;
				} //end if

			}//end if
			$('.layerCont2').remove();
		} //end if
		
		
		if($(this).parents('.mapArea')){

			//$('.btn_layerPop2').eq(0).focus();
			if(btnTarget3 != undefined){
				btnTarget3.focus();
				btnTarget3 = undefined;
			}
			
		} //end if
		
		return false;
	}); //end click

	/*
		Part : accommodation function
	*/

	var $facilt4Box = $('.facilt4_box');
	var $facilt4BoxTab2 = $facilt4Box.find('.sub_tab2');
	var $facilt4BoxTab2A = $facilt4BoxTab2.find('>ul>li>a');

	var $facilt4BoxTab2Warp = $facilt4BoxTab2.find('.wrap_cont');
	var $facilt4BoxTab2Cont = $facilt4BoxTab2Warp.find('>div>.dep03Sec');
	var $facilt4BoxMore = $('.sub_tab2 .underline');
	
	

	var contIndex = 1;
	$facilt4BoxTab2Cont.hide();
	$facilt4BoxMore.on('click', function(){
		if($(this).is('.on')){
			$facilt4BoxMore.removeClass('on');
			$facilt4BoxTab2Cont.hide();
			
		}else{
			$facilt4BoxMore.addClass('on');
			$facilt4BoxTab2Cont.show();
		
		}//end if

		return false;
	});//end click

	$facilt4BoxTab2A.on('click', function(){
		contIndex = $(this).parent().index() + 1;
		var $facilt4BoxTab2WarpCont = $facilt4BoxTab2.find('.wrap_cont > .cont'+contIndex)

		if(!$(this).parent().is('.on')){
			$facilt4BoxTab2A.parent().removeClass('on');
			$(this).parent().addClass('on');
			$facilt4BoxTab2Warp.find('>div').hide();
			$facilt4BoxTab2WarpCont.show();
		}//end if

		return false;
	}); //end click

	var $facilt4BoxLst = $facilt4Box.find('.lst03dep');
	var $facilt4BoxLstLi = $facilt4BoxLst.find('>li:eq(0), >li:eq(1), >li:eq(2)');
	$facilt4Box.find('.underline').not($facilt4BoxMore).parent().find('.txt_dsc').height('37px').css('overflow', 'hidden');

	$facilt4BoxLst.find('>li').not($facilt4BoxLstLi).hide();
	$facilt4Box.find('.underline').not($facilt4BoxMore).on('click', function(){
		if(!$(this).is('.on')){
			$(this).addClass('on');
			$(this).parent().find('.lst03dep>li').show();
			$(this).parent().find('.txt_dsc').height('auto');
		}else{
			$(this).removeClass('on');
			$(this).parent().find('.lst03dep').each(function(){
				$(this).find('>li').hide();
				$(this).find('>li:eq(0)').show();
				$(this).find('>li:eq(1)').show();
				$(this).find('>li:eq(2)').show();
			}); //end each
			
			$(this).parent().find('.txt_dsc').height('37px');

		}
		return false;
	});




	/***** Layer width, height adjustment when the browser is resized *****/
	$(window).resize(function(){ 
		if ($('.overlayerBg').length > 0) {
			if($('.overlayerBg').is(':visible')){
				$('.overlayerBg').css({'width': $(window).width(), 'height': $(document).height()});

				var marginT = $(window).scrollTop() + ($(window).height() - $('.layerCont').height()) / 2;
				var offsetL = ($(window).width()/2) - ($('.layerCont').width()/2);
				$('.layerCont').offset({left: offsetL, top:marginT});

			}
		} //end if

		if($('.layerCont2').find('#box_calendar') && $('input[type="text"]').is('.on')){
			var $inputThisOffset = $('input[type="text"].on').offset();
			var layerContH = $('.layerCont2').height();
			$('.layerCont2').offset({left:$inputThisOffset.left, top:($inputThisOffset.top-layerContH)})
		}
	}); //end resize


	$(document).on('click', function(event){

		//Wedding Global Menu
		if(!$(event.target).parent().is($btnGlobalMenu)){
			if(!$(event.target).parent().parent().is($globalMenu)){
				if(!$(event.target).parent().parent().is($globalMenuSel)){
					$btnGlobalMenu.removeClass('on');
					$globalMenu.hide();
					$btnGlobalMenu.attr('title', '글로벌 메뉴 열기');
					//hade util language
					$('.util_top .lang').removeClass('on');
					$utilListLang.hide();
					$utilTopLang.attr('title', '언어선택 열기');
				}//end if
			} //end if

		} //end if

		//Head Util Language
		if(!$(event.target).parent().is('.lang')){
			$.HeadUtilLangHide();

		}//end if
		
		if(!$(event.target).is('.page_share')){
			$('.page_share').removeClass('on');
			$('.shares').hide();
		}//end if
	
		// calendar
		if(!$(event.target).parent().is('#btnSearch')){
			if(!$(event.target).next().is('.ico_calenda')){

				if(!$(event.target).parents().is('.box_calendar')){
					if (!event) event = window.event;
					var target = (event.target) ? event.target : event.srcElement;

					//calrendar input
					if($inputThisIndex >= 0){
						$('input[type="text"].on + a').attr('id', 'calInputFocus'+$inputThisIndex)
						var inputOnNextId = $('input[type="text"].on + a').attr('id')

						if(target.type == undefined){
							setTimeout(function () {
								document.getElementById(inputOnNextId).focus();
							}, 100);
						}else{
							setTimeout(function () {
								document.getElementById(target.id).focus();
							}, 100);
						}
						
						$('input[type="text"].on').removeClass('on');
						
						$inputThisIndex = undefined;
					}//end if
					
					//calrendar button
					if(btnTarget2 != undefined){
						btnTarget2.focus();
						btnTarget2 = undefined;
					} //end if
					$('.layerCont2').not('.main .layerCont2').remove();
				}//end if
			}
		}
		
		// main calendar
		if($(event.target).parents().is('.main')){
			if(!$(event.target).next().next().is('.btn_layerCal')){
			
				if($inputThis != undefined){
					$('.main .layerCont2').remove();
					
					$inputThis.next().focus();
					$inputThis = undefined;
				}//end if
			}//end if
		} //end if
		
		
	}); //end click
	
	jQuery.HeadUtilLangHide = function(){
		var $utilTopLang = $('.util_top .lang>a:first-child');
		var $utilListLang = $utilTopLang.next('.list_lang');

		$('.util_top .lang').removeClass('on');
		$utilListLang.hide();
		$utilTopLang.attr('title', '언어선택 열기');
	} //end HeadUtilLangHide Plugin

	/*window open*/
	$('.ico_vitour').on('click', function(){
		var screenW = screen.availWidth;
		var screenH = screen.availHeight;
		
		var postionL = (screenW - 850)/2;
		var postionT = (screenH - 580)/2;
		
		window.open('/front/html/ko/chain/hotel/virtualTour/virtual_tour_view.asp', 'virtual_tour', 'width=850, height=590');
	}); //end click
	
	
	/*
		Part : alert plugin
	*/
	jQuery.alertPlug = function(){
		var href = '/front/html/ko/error_lpop.html' + ' #popWrap';
		var overlayerBg = '<div class="overlayerBg"></div><div class="layerCont"></div>';
		
		$('#wrap').append(overlayerBg);
		$('.overlayerBg').css({'width': $(window).width(), 'height': $(document).height(), 'opacity': 0.7});
		
		$('.layerCont').load(href,function() {
			var layerContW = $('.layerCont').width();
			var layerContH = $('.layerCont').height();
			var offsetL = ($(window).width()/2) - (layerContW/2);
			var marginT = $(window).scrollTop() + ($(window).height() - layerContH) / 2;

			$(this).offset({left: offsetL, top:marginT});
		}); //end load
	} //end alertPlug

		//$.alertPlug();
}); //end function
	




function TopAreaP(){
	document.write('<div id="header">');
	document.write('<div class="header_top">');
	document.write('<div class="inner" style="text-align:right; position:relative;">');
	document.write('<img src="/front/img/com/temp/temp_top1_1.gif" alt=" " style="position:absolute; right:0;" />');
	document.write('<a href="#" class="logo" style="top:0; left:0;"><img src="/front/img/com/chain/logo_seoul.png" alt="LOTTE HOTEL SEOUL" /></a>');
	if(document.getElementById('cityHotel')) document.write('<a href="#" class="logo" style="top:0; left:0;"><img src="/front/img/com/chain/logo_cityhotel.png" alt="LOTTE HOTEL SEOUL" /></a>');
	document.write('</div><!-- //inner -->');
	document.write('</div><!-- //header_top -->');
	document.write('<div class="header_body" style="padding-top:0; text-align:right;">');
	document.write('<div class="inner">');
	if(document.getElementById('hotel')) document.write('<img src="/front/img/com/temp/temp_top2_2.gif" alt=" " />');
	if(document.getElementById('cityHotel')) document.write('<img src="/front/img/com/temp/temp_top3_2.gif" alt=" " />');
	if(document.getElementById('global')) document.write('<img src="/front/img/com/temp/temp_top1_2.gif" alt=" " />');
	document.write('</div><!-- //inner -->');
	document.write('</div><!-- //gnb -->');
	document.write('</div><!-- //header_body -->');
}

function snbAreaP(){
	document.write('<div class="lnbTit">1DEPTH MENU</div>');
	document.write('<ul class="lbnMenu">');
	document.write('<li class="sub"><a href="#">2Depth Menu over</a>');
	document.write('<ul class="subMenu">');
	document.write('<li class="on"><a href="#">- 3Depth Menu over</a></li>');
	document.write('<li><a href="#">- 3Depth Menu 02</a></li>');
	document.write('<li><a href="#">- 3Depth Menu 03</a></li>');
	document.write('<li><a href="#">- 3Depth Menu 04</a></li>');
	document.write('<li><a href="#">- 3Depth Menu 05</a></li>');
	document.write('</ul>');
	document.write('</li>');
	document.write('<li class="on"><a href="#">2Depth Menu 02</a></li>');
	document.write('<li class=""><a href="#">2Depth Menu 03</a></li>');
	document.write('<li class="sub"><a href="#">2Depth Menu over</a>');
	document.write('<ul class="subMenu">');
	document.write('<li><a href="#">- 3Depth Menu over</a></li>');
	document.write('<li><a href="#">- 3Depth Menu 02</a></li>');
	document.write('<li><a href="#">- 3Depth Menu 03</a></li>');
	document.write('</ul>');
	document.write('</li>');
	document.write('</ul>');
}


function footerAreaP(){
	document.write('<div class="footer_logo"><span class="hide">lotte hotels &amp; resorts</span></div> <!-- //footer_head -->');
	document.write('<div class="footer_body">');
	document.write('<ul class="brand_site">');
	document.write('<li class="brand_site1"><a href="#"><span class="hide">signiel</span></a></li>');
	document.write('<li class="brand_site2"><a href="#"><span class="hide">lotte hotel</span></a></li>');
	document.write('<li class="brand_site3"><a href="#"><span class="hide">lotte city hotel</span></a></li>');
	document.write('<li class="brand_site4"><a href="#"><span class="hide">L7 lifestyle by lotte hotel</span></a></li>');
	document.write('</ul>');
	document.write('<div class="footer_info">');
	document.write('<div class="util">');
	document.write('<a href="#">ABOUT LOTTE HOTEL</a>');
	document.write('<a href="#">CUSTOMER CENTER</a>');
	document.write('<a href="#">SITEMAP</a>');
	document.write('</div><!-- //util -->');
	document.write('<ul class="office">');
	document.write('<li>');
	document.write('<strong>CONTACT US</strong>');
	document.write('<em>SEOUL</em>');
	document.write('<span class="tel">H.Q +82 2 771 1000 / </span>');
	document.write('<span class="address">30, EULJI-RO, JUNG-GU, SEOUL, KOREA, 100-721</span>');
	document.write('</li>');
	document.write('<li class="global_office">');
	document.write('<strong>GLOBAL OFFICE</strong>');
	document.write('<em>NEW YORK</em>');
	document.write('<span class="tel">+1 201 440 1292</span>');
	document.write('<em>LA</em>');
	document.write('<span class="tel">+1 310 540 7010</span>');
	document.write('<em>FRANKFRUT</em>');
	document.write('<span class="tel bg_none">+49 69 2729 0196</span>');
	document.write('</li>');
	document.write('</ul>');
	document.write('<div class="family_site">');
	document.write('<a href="#" class="family_site1"><span class="hide">LOTTE DUTY FREE</span></a>');
	document.write('<a href="#" class="family_site2"><span class="hide">PACIFIC ISLANDS CLUB</span></a>');
	document.write('<a href="#" class="family_site3"><span class="hide">PIERRE GAGNAIRE</span></a>');
	document.write('<a href="#" class="family_site4"><span class="hide">RIHGA ROYAL HOTELS</span></a>');
	document.write('</div>');
	document.write('</div><!-- //footer_info -->');
	document.write('</div> <!-- //footer_body -->');
	document.write('<div class="copyright">');
	document.write('<span class="left">© 2014 by LOTTE HOTELS &amp; RESORTS Co, Ltd.</span>');
	document.write('<span class="right">Privacy Policy · Terms &amp; Conditions</span>');
	document.write('</div><!-- //copyright -->');
}


function TopArea_wed(){
	document.write('<div id="header">');
	document.write('<div class="header_top">');
	document.write('<div class="inner" style="position:relative;">');
	document.write('<a href="#" class="global_menu"><img src="/front/img/com/chain/global_menu_on.png" alt="LOTTE HOTEL SEOUL" /></a>');
	document.write('<a href="#" class="logo"><img src="/front/img/com/chain/logo_wedding.png" alt="LOTTE HOTEL WEDDING Eternity" /></a>');
	document.write('<img src="/front/img/com/temp/temp_top_wed1_2.gif" alt="LOTTE HOTEL WEDDING Eternity" style="position:absolute; right:0;" />');
	document.write('</div><!-- //inner -->');
	document.write('</div><!-- //header_top -->');
	document.write('<div class="header_body">');
	document.write('<div class="inner">');
	document.write('<ul class="gnb">');
	document.write('<li><a href="#">WEDDING HALLS</a></li>');
	document.write('<li><a href="#">MENUS</a></li>');
	document.write('<li><a href="#">CONCEPT</a></li>');
	document.write('<li><a href="#">PROMOTION</a></li>');
	document.write('<li><a href="#">CUSTOMER COUNSELING</a></li>');
	document.write('</ul>');
	document.write('</div><!-- //inner -->');
	document.write('</div><!-- //header_body -->');
	document.write('</div><!-- //header -->');
}


function snbArea_wed(){
	document.write('<ul class="lbnPromotion">');
	document.write('<li class="on">');
	document.write('<a href="#">');
	document.write('<strong>Special Promotion<br>주중 예식 프로모션</strong>');
	document.write('<span>2013/06/01 ~ 2013/12/30</span>');
	document.write('</a>');
	document.write('</li>');
	document.write('<li>');
	document.write('<a href="#">');
	document.write('<strong>주중 웨딩 프로모션</strong>');
	document.write('<span>2013/06/01 ~ 2013/12/30</span>');
	document.write('</a>');
	document.write('</li>');
	document.write('<li>');
	document.write('<a href="#">');
	document.write('<strong>Bright 2014</strong>');
	document.write('<span>2013/06/01 ~ 2013/12/30</span>');
	document.write('</a>');
	document.write('</li>');
	document.write('<li>');
	document.write('<a href="#">');
	document.write('<strong>Remind Wedding with <br>Memories</strong>');
	document.write('<span>2013/06/01 ~ 2013/12/30</span>');
	document.write('</a>');
	document.write('</li>');
	document.write('<li>');
	document.write('<a href="#">');
	document.write('<strong>123456789/123456789/123<br>456789/123456789/123456</strong>');
	document.write('<span>2013/06/01 ~ 2013/12/30</span>');
	document.write('</a>');
	document.write('</li>');
	document.write('</ul>');
}

