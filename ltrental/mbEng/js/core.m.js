$(function() {
	var setupDrawer = function() {
		$drawer = $('#drawer');
		$drawer.sidebar({side: 'right'});
		$drawerBtn = $('#drawer_btn');
		$drawerBtn.click(function(e) {
			e.preventDefault();
			$('nav.drawer').show();
			$drawer.trigger('sidebar:open', [{ speed: 200 }]);			
			setTimeout(function(){
				//$('nav.drawer .drawer_header').css('position','fixed');
				$('header, #container, footer').hide();
			},200);
		});		
		$drawerCloseBtn = $('#drawer_close_btn');
		$drawerCloseBtn.click(function() {
			$drawer.trigger('sidebar:close', [{ speed: 200 }]);
			$('nav.drawer .drawer_header').css('position','absolute');
			$('header, #container, footer').show();
			setTimeout(function(){
				$('nav.drawer').hide();
			},200);
		});
	}
	setupDrawer();

	var setupDrawerMenu = function() {
		var $drawer = $('#drawer');
		var $menuContainer = $drawer.find('.menu_container');
		var $menu = $menuContainer.find('li');
		var $submenuContainer = $drawer.find('.submenu_container');
		var $menus = $submenuContainer.find('.menus');
		var $submenu = $submenuContainer.find('.menu');

		$menuContainer.height($(window).height() - 45);
		$submenuContainer.width($(window).width() - 90);
		$submenuContainer.height($(window).height() - 45);

		$(window).resize(function(){
			$menuContainer.height($(window).height() - 45);
			$submenuContainer.width($(window).width() - 90);
			$submenuContainer.height($(window).height() - 45);			
		})

		$menu.each(function(i){
			$(this).click(function() {
				$menu.removeClass('onfocus');
				$menu.removeClass('active');
				$(this).addClass('active');
				$submenu.find('ul').hide();
				$submenu.eq(i).find('ul:first').show();
				//$('.slide_menu_btn').removeClass('expanded');
				//$(this).find('.slide_menu_btn:first').addClass('expanded').next('.slide_menu').show();
			});
		});

		$submenu.each(function(i){
			$(this).children('a:first').on({
				focusin:function(){
					$menu.removeClass('onfocus');
					$menu.eq(i).addClass('onfocus');
				},
				focusout:function(){
					$menu.removeClass('onfocus');
				},
				click:function(){
					$menu.removeClass('onfocus');
					$menu.eq(i).trigger('click');
				}
			});
		});

		var $slideMenuBtn = $submenu.find('.slide_menu_btn');
		$slideMenuBtn.attr('aria-expanded','false');

		$slideMenuBtn.click(function(e) {
			e.preventDefault();
			$(this).toggleClass('expanded');
			if ($(this).attr('aria-expanded','false')) {
				$(this).attr('aria-expanded','true');
			}
			else  {
				$(this).attr('aria-expanded','false');
			}
			$(this).next().slideToggle();
		});

		$menu.eq(0).trigger('click');
/*
		var $activeMenu = $menu.filter('.active');
		var activeMenuIndex = $activeMenu.index() + 1;
		var $activeSubmenus = $submenu.filter('.idx_' + activeMenuIndex);
		$activeSubmenus.show();
		var $firstSubmenu = $activeSubmenus.find('.submenu').eq(0);
		var $firstSlideMenuBtn = $firstSubmenu.find('.slide_menu_btn');
		$activeSubmenus.find('.slide_menu_btn').removeClass('expanded').next('.slide_menu').hide();
		$firstSlideMenuBtn.addClass('expanded');
		$firstSlideMenuBtn.next('.slide_menu').slideDown();
*/


	}
	setupDrawerMenu();

	$('#container').on('scroll', function () {
		setupSubHeader($(this).scrollTop());
	});

	var setupSubHeader = function(currentPos) {
		var startPos = $('header').height();
		if (currentPos > startPos) $('.sub_header').addClass('fixed');
		else $('.sub_header').removeClass('fixed');
	}
	setupSubHeader(0);
});