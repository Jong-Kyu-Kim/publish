$(function() {

	var setupExtraMenu = function() {
		var $extraMenuContainer = $('#extra_menu');
		var $dropdownMenuBtn = $extraMenuContainer.find('.btn_dropdown_menu');
		// Deprecated
		// $dropdownMenuBtn.click(function(e) {
		// 	e.preventDefault();
		// 	$(this).toggleClass('expanded');
		// 	var $dropdownPath = $(this).next();
		// 	$dropdownPath.toggle();
		// });
		$dropdownMenuBtn.click(function() {
			$(this).toggleClass('expanded');
			$(this).next().toggle();
		});
	}
	setupExtraMenu();

	var setupBreadcrumb = function() {
		var $breadcrumbContainer = $('#breadcrumb');
		var $dropdownPathBtn = $breadcrumbContainer.find('.dropdown_path_btn');
		$dropdownPathBtn.click(function(e) {
			e.preventDefault();
			$dropdownPathBtn.not(this).removeClass('expanded').next().hide();
			$(this).toggleClass('expanded');
			var $dropdownPath = $(this).next();
			$dropdownPath.toggle();
		});
	}
	setupBreadcrumb();

	var setupFamilysite = function() {
		var $familysiteContainer = $('#familysite');
		var $familysiteDropdownMenu = $('.familysite_dropdown_menu');
		var $dropdownMenuBtn = $familysiteContainer.find('.btn_dropdown_menu');
		$dropdownMenuBtn.click(function(e) {
			e.preventDefault();
			$(this).toggleClass('expanded');
			$familysiteDropdownMenu.fadeToggle();
		});
	}
	setupFamilysite();

	function gnbWidth() {
		if ($(window).width() >= 1280) {
			var gnbWidth = $(window).width() - [($(window).width() - 1038) / 2]  - 325;	
		}
		else {
			var gnbWidth = 792;		
		}	
		$('.gnb').css('width',gnbWidth).show();
	}

	$(window).resize(function(){
		gnbWidth();
	});
	
	$(window).load(function(){
		gnbWidth();	
	});
	
	var setupGnb = function() {
		var $menusContainer = $('#gnb2').find('.menus'),
			$menu = $menusContainer.find('.menu'),
			$submenu = $menu.find('.submenu');
		
		$menu.each(function(index){
			$(this).on({
				'mouseenter focusin':function(){
					var bgIdx = index + 1,
						bgImg = 'bg_gnb' + bgIdx + '.png';
					$menusContainer.css('background-position','left ' + (-62 * bgIdx) + 'px');	// 마우스 호버시 gnb bg 이미지 
					$submenu.css({
						'height':0,
						'opacity':0						
					});

					$(this).find('.submenu').css({
						'height':'auto',
						'opacity':1
					});

					$menu.removeClass('hover');
					$(this).addClass('hover');

					var $thisSubmenu = $(this).find('.submenu');
					$thisSubmenu.css('height',$thisSubmenu.first().height());
					if ($(this).hasClass('idx2')) {
						$('header .gnb_open').show().css('height',$thisSubmenu.height() + 35);
						
					}
					else {
						$('header .gnb_open').hide();	
					}	
				}
			})
		});

		$menusContainer.on('focusout mouseleave',function(){
			$submenu.css({
				'height':0,
				'opacity':0						
			});
			$menu.removeClass('hover');
			$menusContainer.css('background-position','left 0');
			$('header .gnb_open').hide();
			//$('.breadcrumb').show();
		});
	}

	setupGnb();

	var setupSubmenu = function() {
		var $depth2 = $('.depth2');  
		var $dropdownMenuBtn = $depth2.find('.btn_dropdown_menu');

		$dropdownMenuBtn.click(function(e) {
			e.preventDefault();
			var $submenu = $(this).parents('.menu').find('.submenu');

			if ($(this).hasClass('expanded')) {
				$(this).removeClass('expanded');
				$(this).children('.dropdown_menu').slideUp();	

				$submenu.animate({
					'height': $submenu.first().height() - (25 * $(this).children('.dropdown_menu').children().size()) - 35
				});

				$('header .gnb_open').animate({
					'height': $('header .gnb_open').height() - 25 * ($(this).children('.dropdown_menu').children().size()) - 35
				});				
			}
			else {
				$(this).addClass('expanded');
				$(this).children('.dropdown_menu').slideDown();
				
				$submenu.animate({
					'height': $submenu.first().height() + (25 * $(this).children('.dropdown_menu').children().size()) + 35
				});

				$('header .gnb_open').animate({
					'height': $('header .gnb_open').height() + 25 * ($(this).children('.dropdown_menu').children().size()) + 35
				});
			}
		});
	}
	setupSubmenu();
});