//require('./eventListener.polyfill')
//require('./defineProperty')
var $ = require('jquery')
require('./scss/style.scss')

$(document).ready(function(){
  // gnb
  var $gnb = $('#gnb')
  var $menu = $('#gnb > li')
  var $subMenu = $menu.find('ul > li')
  var $header = $('#header')

  $menu.on('mouseenter focusin', function(){
    var $this = $(this)
    $menu.removeClass('active').find('ul').hide()
    $this.addClass('active')
    $header.stop().animate({
      height: 145
    }, 300).find('hr').show()
    $this.find('ul').show()
  })

  $subMenu.find('a').on({
    'mouseenter focusin': function(){
      $(this).parent().addClass('active')
    },
    'mouseleave focusout': function(){
      $subMenu.removeClass('active')
    }
  })

  $gnb.on('mouseleave focusout', function(){
    $menu.removeClass('active')
    $header.stop().animate({
      height: 70
    }, 300, function(){
      $gnb.find('ul').hide()
      $(this).find('hr').hide()
    })
  })

  // tab
  $('.wrap_tab_contents').eq(0).show()
  var $tabMenu = $('.wrap_tab_menu > .tab_menu li')
  $tabMenu.find('a').click(function(e){
    e.preventDefault()
    var $this = $(this)
    $tabMenu.removeClass('active')
    $this.parent().addClass('active')
    $('.wrap_tab_contents').hide().eq($this.parent().index()).show();
  })

  // input file
  var $wrapFile = $('.wrap_file')
  var $inputFile = $wrapFile.find('.input_file')
  $wrapFile.find('button').click(function(){
    $(this).siblings('.input_file').trigger('click')
  })

  $inputFile.change(function(){
    var $this = $(this)
    var fileValue = $this.val().split('\\')
    var fileName = fileValue[fileValue.length-1]
    $this.siblings('.file_name').val(fileName)
  })

  // email account
  $('.email_account').change(function(){
    var $this = $(this)
    if ($this.val() === 'typing') {
      $this.siblings('input.typing').show()
    }
    else {
      $this.siblings('input.typing').hide()
    }
  })

  // guidebook
  $('.guidebook .box button').click(function(){
    var $parents = $(this).parents('.box')
    $parents.toggleClass('expanded')
      .attr('aria-expanded', $parents.hasClass('expanded'))
      .find('.explan, .btn_explan_show').toggle()
  })

  // faq
  $('.list_faq li button').click(function(){
    var $this = $(this)
    var $parents = $this.parents('li')
    $this.toggleClass('expanded')
    $parents.attr('aria-expanded', $this.hasClass('expanded'))
      .find('.answer').toggle()
  })

  // familysite
  $('.familysite > a').on('click', function (e) {
    e.preventDefault();
    $this = $(this)
    if (!$this.hasClass('open')) {
      $this.addClass('open');
      $this.closest('.familysite').find('ul').slideDown(300);
    } else {
      $this.removeClass('open');
      $this.closest('.familysite').find('ul').slideUp(300);
    }
  });

  $('.familysite > ul a').on('click', function (e) {
    $('.familysite > a').removeClass('open');
    $(this).closest('.familysite').find('ul').slideUp(300);
  });

  // main slider
  var $wrapSlider = $('.wrap_slider')
  var $wrapSlide = $('.wrap_slide')
  var $slide = $wrapSlide.find('.slide')
  var $window = $(window)
  var windowWidth = $window.width()
  if (windowWidth < 930) {
    windowWidth = 930
  }

  var sliderHeight = $window.height() - $('.header').height() - $('.footer').height()

  $wrapSlider.height(sliderHeight)
  $wrapSlide.css({
    'width': windowWidth * $slide.length,
    'height': sliderHeight
  })
  $slide.each(function(i){
    var $this = $(this)
    var left = $this.index() * windowWidth
    $this.css({
      left: left,
      width: windowWidth,
      height: sliderHeight
    })
    $this.attr('data-index-number', i)
  })

  var slider = setInterval(function(){
    var windowWidth = $window.width()
    if (windowWidth < 930) {
      windowWidth = 930
    }

    $wrapSlide.animate({
      left: -windowWidth
    }, 1000, function(){
      var windowWidth = $window.width()
      if (windowWidth < 930) {
        windowWidth = 930
      }

      $(this).css('left', 0)

      $slide.each(function(){
        var $this = $(this)
        var left = parseInt($this.css('left'))
        var nextLeft = 0
        var index = 0

        if (left === 0 ) {
          nextLeft = ($slide.length - 1) * windowWidth
          index = $slide.length - 1
        }

        else if (left !== windowWidth) {
          nextLeft = ((left / windowWidth) - 1) * windowWidth
          index = left / windowWidth - 1
        }

        $this.css('left', nextLeft).attr('data-index-number', index)
      })
    })
  }, 5000)

  $window.resize(function(){
    var windowWidth = $window.width()
    if (windowWidth < 930) {
      windowWidth = 930
    }

    $wrapSlide.css({
      width: windowWidth * $slide.length
    })

    $slide.each(function(){
      var $this = $(this)
      $this.css({
        left: $this.attr('data-index-number') * windowWidth,
        width: windowWidth
      })
    })
  })
})
