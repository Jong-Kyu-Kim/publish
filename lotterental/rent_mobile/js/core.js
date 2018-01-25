$(function() {

	var setupExtraMenu = function() {
		var $extraMenuContainer = $("#extra-menu");
		var $dropdownMenuBtn = $extraMenuContainer.find(".dropdown-menu-btn");
		// Deprecated
		// $dropdownMenuBtn.click(function(e) {
		// 	e.preventDefault();
		// 	$(this).toggleClass("expanded");
		// 	var $dropdownPath = $(this).next();
		// 	$dropdownPath.toggle();
		// });
		$dropdownMenuBtn.mouseenter(function() {
			$(this).addClass("expanded");
			$(this).next().show();
		});
		$extraMenuContainer.mouseleave(function() {
			console.debug("left");
			console.debug($dropdownMenuBtn);
			$dropdownMenuBtn.removeClass("expanded");
			$dropdownMenuBtn.next().hide();
		});
	}
	setupExtraMenu();

	var setupBreadcrumb = function() {
		var $breadcrumbContainer = $("#breadcrumb");
		var $dropdownPathBtn = $breadcrumbContainer.find(".dropdown-path-btn");
		$dropdownPathBtn.click(function(e) {
			e.preventDefault();
			$dropdownPathBtn.not(this).removeClass("expanded").next().hide();
			$(this).toggleClass("expanded");
			var $dropdownPath = $(this).next();
			$dropdownPath.toggle();
		});
	}
	setupBreadcrumb();

	var setupFamilysite = function() {
		var $familysiteContainer = $("#familysite");
		var $familysiteDropdownMenu = $(".familysite-dropdown-menu");
		var $dropdownMenuBtn = $familysiteContainer.find(".dropdown-menu-btn");
		$dropdownMenuBtn.click(function(e) {
			e.preventDefault();
			$(this).toggleClass("expanded");
			$familysiteDropdownMenu.fadeToggle();
		});
	}
	setupFamilysite();

	function gnbWidth() {
		if ($(window).width() >= 1280) {
			var gnbWidth = $(window).width() - [($(window).width() - 1200) / 2]  - 325;	
		}
		else {
			var gnbWidth = 915;		
		}	
		$('.gnb').css('width',gnbWidth);
	}

	$(window).resize(function(){
		gnbWidth();
	});
	
	gnbWidth();

	var setupGnb = function() {
		var $gnbContainer = $("#gnb");
		var $menusContainer = $gnbContainer.find(".menus");
		var $menu = $menusContainer.find(".menu, .submenu");

		$menu.on({
			'focusin':function() {
				$('.submenu').hide();
				$menu.removeClass("hover");
				$(this).addClass("hover");
				$(this).find('.submenu').show();
			},
			'mouseover':function() {
				$('.submenu').hide();			
				$menu.removeClass("hover");
				$(this).addClass("hover");
				$(this).find('.submenu').show();
				$('.breadcrumb').hide();
			}
		});
		$('header').mouseleave(function(){
			$(this).find('.submenu').hide();
			$('.breadcrumb').show();
		});

		$gnbContainer.mouseleave(function() {
			$menu.removeClass("hover");
		});
	}
	setupGnb();

	var setupSubmenu = function() {
		var $gnbContainer = $("#gnb");
		var $submenusContainer = $gnbContainer.find(".submenus");
		var $dropdownMenuBtn = $submenusContainer.find(".dropdown-menu-btn");
		$dropdownMenuBtn.click(function(e) {
			e.preventDefault();
			$(this).toggleClass("expanded");
			$(this).next().slideToggle();
		});
	}
	setupSubmenu();
});