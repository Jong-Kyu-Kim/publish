var popupOpen = function() {
  $('.modal-backdrop, .popup_div').show()
}

var popupClose = function() {
  $('.modal-backdrop, .popup_div').hide()
}

$(function() {
  var checkLabel = function($input, $label) {
    if ($input.prop('checked')) {
      if ($label.text().indexOf(' 안함') > -1) {
        $label.html($label.text().replace(' 안함', '함'))
      }
    }

    else {
      if ($label.text().indexOf(' 안함') < 0) {
        $label.html($label.text().replace('함', ' 안함'))
      }
    }
  }

  $('#gnb > ul > li a').on({
    mouseenter: function() {
      $(this).parent().addClass('active')
    },

    mouseleave: function() {
      $(this).parent().removeClass('active')
    }
  });

  $('#gnb > ul > li > ul > li a').on({
    mouseenter: function() {
      $(this).parent().parent().parent().addClass('active')
    },

    mouseleave: function() {
      $(this).parent().parent().parent().removeClass('active')
    }        
  })

  $('#gnb > ul > li > ul > li > ul > li a').on({
    mouseenter: function() {
      $(this).parent().parent().parent().parent().parent().addClass('active')
    },

    mouseleave: function() {
      $(this).parent().parent().parent().parent().parent().removeClass('active')
    }        
  });

  $('.tab-menu ul li a').click(function() {
    var $li = $(this).parent();
    var $ul = $li.parent();

    $li.siblings().removeClass('active');
    $li.addClass('active');

    $ul.siblings('div').hide().eq($li.index()).show()    
  })

  $('.checkbox__box.switch-style label span').each(function() {
    var $this = $(this);
    checkLabel($this.siblings('input'), $this);

    $this.siblings('input').change(function() {
      checkLabel($(this), $(this).siblings('span'));
    })
  })

  $('.dropdown').click(function () {
    var $this = $(this);

    if (!$this.parents('.dropdown__wrapper').hasClass('disabled')) {
      if ($this.hasClass('open')) {
        $this.removeClass('open').children('button').attr('aria-expanded', false)
      } else {
        $this.addClass('open').children('button').attr('aria-expanded', true)
      }
    }
  });

  $('.dropdown-menu').each(function() {
    $(this).width($(this).parents('.dropdown__wrapper').width() - 3)
  })

  $(window).resize(function() {
    $('.dropdown-menu').each(function() {
      $(this).width($(this).parents('.dropdown__wrapper').width() - 3)
    })
  })

  $('.dropdown-item').click(function () {
    var $this = $(this);
    $this.parents('.dropdown').siblings('.dropdown__title').html($this.text());
  });

  $('.section-ruleset .ruleset-setting .dropdown button').click(function() {
    var $parent = $(this).parent();
    if (!$parent.hasClass('disabled')) {
      if ($parent.hasClass('open')) {
        $parent.removeClass('open').children('button').attr('aria-expanded', false)
      } else {
        $parent.addClass('open').children('button').attr('aria-expanded', true)
      }
    }          
  })
})