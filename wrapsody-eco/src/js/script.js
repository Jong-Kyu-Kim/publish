$(function(){
  var $window = $(window);
  var $body = $('body');
  var $header = $('header');
  var $nav = $header.find('nav');
  var isMobile = $('#content > section').width() <= 757;

  $header.find('h1').after('<span class="menu" tabindex="0" ></span>');

  var $hbg = $header.find('h1').next('span');

  function closeMenu() {
    if ($window.scrollTop() === 1) {
      $window.scrollTop(0);
    }
    $body.removeAttr('style');
    $hbg.attr('class', 'menu');
    $nav.hide();
    $nav.next().hide();
  }

  $hbg.click(function(e){
    e.preventDefault();
    var $this = $(this);    

    if ($this.hasClass('menu')) {
      if ($window.scrollTop() === 0) {
        $window.scrollTop(1);
      }
      $hbg.attr('class', 'close');
      $body.css('overflow', 'hidden');      
      $nav.show();
      $nav.next().show();
    }
    else {
      closeMenu();
    }
  });

  $nav.find('a').click(function(e) {
    if (isMobile) {
      if (location.pathname === '/' || location.pathname.indexOf('index.html') >= 0 || location.pathname === '/en/' || location.pathname.indexOf('/en/index.html') >= 0) {
        if ($(this).parent().index() < 2) {
          closeMenu();
        }
      }
    }
  });

  $window.resize(function() {
    if (!isMobile) {
      $hbg.attr('class', 'menu');
      $body.removeAttr('style');
      $nav.removeAttr('style');
      $nav.next().removeAttr('style');
    }
  })

  $window.scroll(function(e) {    
    $window.scrollTop() ? $header.addClass('on') : $header.removeClass('on');

    var scrollLeft = $(this).scrollLeft();
  
    if (scrollLeft) {
      $header.css({
        width: $window.width() + scrollLeft,
        left: -scrollLeft
      });
    }
    else {
      $header.css({
        width: '100%',
        left: 0
      });
    }
  });

  function addLabel($this, i) {
    var label = $this.parents('table').find('thead th').eq(i).text();
    $this.children().eq(i).prepend('<span class="col">' + label +'</span>');
  }

  $('#price table tbody tr').each(function(i) {
    var $this = $(this);
    if ($this.parent().children().length - 1 !== i) {
      addLabel($this, 1);
      addLabel($this, 2);
      addLabel($this, 3);
      addLabel($this, 4);
    }
  });
});