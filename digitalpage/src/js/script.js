$(window).scroll(function(e) {
  $(window).scrollTop() ? $('header').addClass('on') : $('header').removeClass('on');

  if ($(window).scrollTop() > $('#content').offset().top - $('header').height()) {
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
})

$(function() {
  $('#left li li a').each(function(i) {
    $(this).click(function(e) {
      e.preventDefault();

      $('html, body').animate({
        scrollTop: $('#content section').eq(i).position().top - $('header').height()
      }, 1000);
    })
  })
})