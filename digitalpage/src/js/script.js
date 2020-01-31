$(window).scroll(function(e) {
  $(window).scrollTop() ? $('header').addClass('on') : $('header').removeClass('on');

  $('#content.tips section').each(function(i) {
    if ($(window).scrollTop() >= Math.floor($(this).position().top - $('header').height())) {
      $('#left.tips li li a').removeClass('on').eq(i).addClass('on');
    }
  })

  $('#content.support div').each(function(i) {
    if ($(window).scrollTop() >= Math.floor($(this).position().top - $('header').height())) {
      $('#left.support li li a').removeClass('on').eq(i).addClass('on');
    }
  })
  
  if ($('#left').length) {
    if ($(window).scrollTop() >= $('#content').offset().top - $('header').height()) {
      if ($(window).scrollTop() + $(window).height() > $('#plans').offset().top) {
        if ($('#left').hasClass('fixed')) {
          $('#left').removeClass('fixed').addClass('absolute').css('top', $(window).scrollTop() + $('header').height());  
        }      
      }
  
      else {
        if (!$('#left').hasClass('fixed')) {
          $('#left').removeClass('absolute').addClass('fixed').css('top', 90);
        }
      }
    }
  
    else {
      $('#left').removeClass('fixed').removeAttr('style');
    }
  }
})

$(function() {
  $(window).load(function() {
    if ($('#content.tips').length && location.hash) {
      $(window).scrollTop($('#content section').eq(parseInt(location.hash.substring(1)) - 1).position().top - $('header').height())
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
    })
  });

  $('#left.support li li a').each(function(i) {
    $(this).click(function(e) {
      e.preventDefault();
      scroll('#content div', i);
    })
  });

  $('nav.legal a').click(function(e) {
    e.preventDefault();
    $('nav.legal a').removeClass('on');
    $(this).addClass('on');
    $('article section').hide().eq($(this).parent().index()).show();
  })
})