$(function() {
	var setupDrawer = function() {
		$drawer = $('#drawer');
		$drawer.sidebar({side: 'right'});
		$drawerBtn = $('#drawer_btn');
		$drawerBtn.click(function(e) {
			e.preventDefault();
			$drawer.trigger('sidebar:open', [{ speed: 200 }]);
			$('nav.drawer').show();
			$('nav.drawer .drawer_header').css('position','fixed');
			$('header, #container, footer').hide();

		});		
		$drawerCloseBtn = $('#drawer_close_btn');
		$drawerCloseBtn.click(function() {
			$drawer.trigger('sidebar:close', [{ speed: 200 }]);
			$('nav.drawer .drawer_header').css('position','absolute');
			$('header, #container, footer').show();
		});
	}
	setupDrawer();

	var setupDrawerMenu = function() {
		var $drawer = $('#drawer');
		var $menuContainer = $drawer.find('.menu_container');
		var $menus = $menuContainer.find('.menus');
		var $menu = $menuContainer.find('.menu');
		var $submenu = $menuContainer.find('.submenu');

		$menus.height($(window).height() - 45);
		$submenu.width($(window).width() - 92);
		$submenu.height($(window).height() - 45);

		$(window).resize(function(){
			$menus.height($(window).height() - 45);
			$submenu.width($(window).width() - 92);
			$submenu.height($(window).height() - 45);			
		})
/*
		var menuHeight = 0;
		$('.menu').each(function(i){
			menuHeight += $(this).height();
		});

		var bStartEvent = false; //touchstart 이벤트 발생 여부 플래그  
		var nMoveType = -1; //현재 판단된 사용자 움직임의 방향  
		var htTouchInfo = { //touchstart 시점의 좌표와 시간을 저장하기  
		    nStartX : -1,
		    nStartY : -1,
		    nStartTime : 0
		};
		//수평 방향을 판단하는 기준 기울기
		var nHSlope = ((window.innerHeight / 2) / window.innerWidth).toFixed(2) * 1;

		function initTouchInfo() { //터치 정보들의 값을 초기화하는 함수  
		    htTouchInfo.nStartX = -1;
		    htTouchInfo.nStartY = -1;
		    htTouchInfo.nStartTime = 0;
		}

		//touchstart 좌표값과 비교하여 현재 사용자의 움직임을 판단하는 함수
		function getMoveType(x, y) {  
		    //0은 수평방향, 1은 수직방향
		    var nMoveType = -1;

		    var nX = Math.abs(htTouchInfo.nStartX - x);
		    var nY = htTouchInfo.nStartY - y;
		    var nDis = nX + nY;
		    //현재 움직인 거리가 기준 거리보다 작을 땐 방향을 판단하지 않는다.
		    if(nDis < 25) { return nMoveType }

		    var nSlope = parseFloat((nY / nX).toFixed(2), 10);

		    if(nSlope > nHSlope) {
		        nMoveType = 1;
		    } else {
		        nMoveType = 0;
		    }

		    return nMoveType;
		}

		$menus.find('li').on('touchstart',function (e) {  
		    initTouchInfo(); //터치 정보를 초기화한다.
		    nMoveType = -1; //이전 터치에 대해 분석한 움직임의 방향도 초기화한다.
		    //touchstart 이벤트 시점에 정보를 갱신한다.
		    //htTouchInfo.nStartX = e.$value().changedTouches[0].pageX;
		    htTouchInfo.nStartX = e.originalEvent.touches[0].pageX;
		    //htTouchInfo.nStartY = e.$value().changedTouches[0].pageY;
		    htTouchInfo.nStartY = e.originalEvent.touches[0].pageY;
		    htTouchInfo.nStartTime = e.originalEvent.timeStamp;
		    bStartEvent = true;
		})

		$menus.find('li').on('touchmove',function(e) {  
		    if(!bStartEvent) {
		        return
		    }
		    var nX = e.originalEvent.touches[0].pageX;
		    var nY = e.originalEvent.touches[0].pageY;

		    //현재 touchmMove에서 사용자 터치에 대한 움직임을 판단한다.
		    nMoveType = getMoveType(nX, nY);

		    if(menuHeight > $(window).height()) {
		    	$menus.css('border',0);
		    	$menu.css('border-right','2px solid #f04040');
			    if(nMoveType === 1) {
			    	$menus.stop().animate({
			    		'top':$(window).height() - menuHeight
			    	},200);
			    	$submenu.stop().animate({
			    		'top':Math.abs($(window).height() - menuHeight) + 45
			    	},200);			    	
			    }
			    else if(nMoveType === -1) {
			    	$menus.stop().animate({
			    		'top':45
			    	},200);
			    	$submenu.stop().animate({
			    		'top':0
			    	},200);				    	
			    }
		    }
		})

		$menus.find('li').on('touchend',function(e) {  
		    if(!bStartEvent) {
		        return
		    }

		    //touchmove에서 움직임을 판단하지 못했다면 touchend 이벤트에서 다시 판단한다.
		    /*
		    if(nMoveType < 0) {
		        var nX = e.originalEvent.touches[0].pageX;
		        var nY = e.originalEvent.touches[0].pageY;
		        nMoveType = getMoveType(nX, nY);
		    }
	
		    bStartEvent = false;
		    nMoveType = -1; //분석한 움직임의 방향도 초기화한다.
		    initTouchInfo(); //터치 정보를 초기화한다.

		    $(window).resize(function(){
		    	initTouchInfo();
		    });
		});

		$submenu.find('*').on('touchstart touchmove touchend',function(e){
			e.stopPropagation();
		})
*/
		$menu.click(function() {
			$menu.removeClass('active');
			$(this).addClass('active');

			$('.submenu').hide();
			$(this).find('.submenu').show();
			
			//$('.slide_menu_btn').removeClass('expanded');
			//$(this).find('.slide_menu_btn:first').addClass('expanded').next('.slide_menu').show();
		});

		var $slideMenuBtn = $submenu.find('.slide_menu_btn');
		$slideMenuBtn.click(function(e) {
			e.preventDefault();
			$(this).toggleClass('expanded');
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