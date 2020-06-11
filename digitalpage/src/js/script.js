var $window = $(window);

$(function() {
  $('<a></a>').insertAfter('header h1');

  $('header h1 + a').click(function(e) {
    e.preventDefault();
    var $this = $(this);
    if ($this.hasClass('close')) {
      $this.removeClass('close');

      $('body').css('overflow', 'visible')
      $('header').removeClass('menu').find('nav').hide();
    }

    else {
      $this.addClass('close');
      $('body').css('overflow', 'hidden');
      $('header').addClass('menu').find('nav').show();
    }
  })

  $window.load(function() {
    if ($('#content.tips').length && location.hash) {
      $window.scrollTop($('#content section').eq(parseInt(location.hash.substring(1)) - 1).position().top - $('header').height())
    }
  });

  var scroll = function(o, i) {
    $('html, body').animate({
      scrollTop: $(o).eq(i).position().top - $('header').height()
    }, 1000);    
  }

  $('#left.tips li li > a, #left.support > ul > li > a').each(function(i) {
    $(this).click(function(e) {
      e.preventDefault();
      scroll('#content section', $(this).parent().index());
      if ($window.width() < 757) {
        $('#left').toggle();
      }
    })
  });

  $('#left.support li li a').each(function(i) {
    $(this).click(function(e) {
      e.preventDefault();
      scroll('#content div', i);
    })
  });

  var $inputFile = $('#content.support input[type=file]');
  var $aFile = $('#content.support .file');
  $aFile.click(function(e) {
    e.preventDefault();
    $inputFile.trigger('click');
  });

  $inputFile.change(function() {
    $(this).val() && $aFile.prev().html($(this).val().split('\\').reverse()[0])
  })

  $('nav.legal a').click(function(e) {
    e.preventDefault();
    $('nav.legal a').removeClass('on');
    $(this).addClass('on');
    $('article section').hide().eq($(this).parent().index()).show();
  });

  if ($window.width() < 757) {
    $('#content').click(function(e) {
      e.stopPropagation();
      $('#left').hide();
    })
  
    $('#content.tips h3').click(function(e) {
      e.stopPropagation();
      $('#left.tips').toggle();
    });
  }

  content();
  menu();
});

$window.resize(function() {
  leftStyle();
  content();  
});

$window.scroll(function(e) {
  $window.scrollTop() ? $('header').addClass('on') : $('header').removeClass('on');
  if ($window.width() >= 757) {   
    $('#content.tips section').each(function(i) {
      if ($window.scrollTop() >= Math.floor($(this).position().top - $('header').height())) {
        $('#left.tips li li a').removeClass('on').eq(i).addClass('on');
      }
    })
  
    $('#content.support div').each(function(i) {
      if ($window.scrollTop() >= Math.floor($(this).position().top - $('header').height())) {
        $('#left.support li li a').removeClass('on').eq(i).addClass('on');
      }
    })
  }

  leftStyle();
});

var menu = function() {  
  $('header nav > ul > li').each(function(i) {
    if (i < 2) {
      $(this).find('> a').click(function(e) {
        e.preventDefault();
        $(this).toggleClass('on').next().toggle();
      })
    }
  })
}

var leftStyle = function() {
  var $left = $('#left');

  if ($window.width() >= 757) {
    if ($left.length) {
      if ($window.scrollTop() >= $('#content').offset().top - $('header').height()) {
        if ($window.scrollTop() + $window.height() > $('#plans').offset().top) {
          if ($left.hasClass('fixed')) {
            $left.removeClass('fixed').addClass('absolute').css({
              top: $window.scrollTop() + $('header').height()
            });
          }      
        }
    
        else {
          if (!$left.hasClass('fixed')) {
            $left.removeClass('absolute').addClass('fixed').css('top', 80);
          }
        }
      }
    
      else {
        $left.removeClass('fixed').removeAttr('style');
      }
    }
  }

  else {
    $left.removeClass('absolute').addClass('fixed');
  }
}

var content = function() {
  if ($window.width() < 757) {

    if ($('header nav > div').length < 1) {
      $('header nav').append($('header .inner > div').clone())
      $('header .inner > div').remove();
    }

    $('#visual.main').outerHeight($window.height());

    var $aDownload = $('#visual.main > a');
    if (!$aDownload.length) {
      $('#visual.main').append('<a href="" target="_blank">Download</a>');
      
      if (navigator.userAgent.indexOf('iPhone') >= 0 || navigator.userAgent.indexOf('iPad') >= 0) {
        $('#visual.main > a').attr('href', 'https://itunes.apple.com/app/id1002237802?mt=8')
      }
      else {
        $('#visual.main > a').attr('href', 'https://play.google.com/store/apps/details?id=com.fasoo.digitalpage')
      }
    }

    var lnbWidth = 0;
    $('#visual + nav ul > li').each(function(i) {      
      lnbWidth += $(this).width() + 7;
    })

    $('#visual + nav ul').width(lnbWidth < $window.width() ? $window.width() : lnbWidth);

    var $active = $('#visual + nav').find('.on');
    var activeLeft = 0;

    for (var i = 0; i < $active.parent().index(); i++) {
      activeLeft += $('#visual + nav ul li').eq(i).outerWidth();      
    } 

    if (activeLeft > $window.width() / 2 ) {
      var activeWidth = $active.outerWidth(),
          scrollLeft = activeLeft - ($window.width() - activeWidth) / 2;
      $('#visual + nav').scrollLeft(scrollLeft);
    }

    $('#content.usecase ul li').each(function() {
      $(this).append($(this).find('img').parent().clone());
      $(this).find('img:first').parent().remove();
    });

    $('#content.news ul li a').each(function() {
      $(this).prepend($(this).find('.thumb').clone());
      $(this).find('.thumb:last').remove();
    });
  }

  else {
    $('body, header nav, #visual + nav ul').removeAttr('style');
    $('header nav').append($('header .inner > div').clone())
    if ($('header .inner > div').length < 1) {
      $('header .inner').append($('header nav > div').clone());      
    }
    $('header nav > div').remove();
  }
}