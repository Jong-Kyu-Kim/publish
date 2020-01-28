$(function() {

})

$(window).scroll(function(e) {
  $(window).scrollTop() ? $('header').addClass('on') : $('header').removeClass('on');
  if ($(window).scrollTop() > $('#left').offset().top) {
    console.log('top')
  }
})