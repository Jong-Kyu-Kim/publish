$(window).scroll(function(e) {
  $(window).scrollTop() ? $('header').addClass('on') : $('header').removeClass('on');
})
