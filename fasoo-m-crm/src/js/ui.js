function toast(status, text) {
  $('#toast').removeAttr('class').addClass(status).animate({
     opacity: 1,
  }, 500, function() {
    setTimeout(function() {
      $('#toast').animate({
        opacity: 0
     }, 500);
    }, 1500);
  }).find('p').html(text);
}

function closeInput(el) {
  $(el).parent().parent().hide().prev().show();
}

$(function() {
  var $tableSort = $('#content > .table_sort table');

  if ($tableSort.length) {    
    $(window).on({
      load: function() {
        $tableSort.eq(0).css({
          position: 'fixed',
          top: $('#content > .table_sort').offset().top,
          left: $tableSort.eq(1).offset().left,
          width: $('header').width() - 60
        });
      },  
      resize: function() {
        $tableSort.eq(0).css('width', $tableSort.eq(1).width());
      }
    });
  
    $('#container > .scrollbar').scroll(function(e) {    
      $tableSort.eq(0).css('left', $tableSort.eq(1).offset().left);
    });      
  }

  $(window).on({
    load: function() {
      $('.scrollbar').scrollbar();
    },
    resize: function() {
      $('#content.height').css({
        height: $(window).height() - $('header').outerHeight()
      });        
    },
    keydown: function(e) {
      e.keyCode === 27 && $('.dropdown .items').removeClass('expanded');
    },
    click: function(e) {      
      var $parents = $(e.target).parents();
      if (!$parents.hasClass('dropdown') && !$parents.hasClass('ui-datepicker-header') && !$parents.hasClass('ui-datepicker-buttonpane')) {
        $('.dropdown .items').removeClass('expanded');
      }
    }
  });

  $('#sidebar a').click(function(e) {
    if ($(this).next('ul').length) {
      e.preventDefault();
      $(this).toggleClass('expanded').next('ul').toggle();
    }
  })

  $('.autosize textarea').on({
    focusin: function() {
      $(this).parents('.textarea').addClass('on');
    },
    focusout: function() {
      $(this).parents('.textarea').removeClass('on');
    }    
  }).on('keyup keydown', function() {
    $(this).height(1).height($(this).prop('scrollHeight') - 18);    
  });

  $('.table_form table span').next('.btn.small:not(.dialog)').click(function() {
    $(this).parent().hide().next().css('display', 'flex');
  });

  $('.table_form table .btn.primary').next('.btn').click(function() {
    closeInput(this);
  });

  $('#content').css({
    marginTop: $('header').outerHeight()
  });

  $('#content.height').css({
    height: $(window).height() - $('header').outerHeight()
  });  

  $('#container > .scrollbar').scroll(function(e) {   
    var scrollLeft = $(this).scrollLeft();
    $('header').css('left', 240 - scrollLeft);    
  });

  $.widget('custom.levelselectmenu', $.ui.selectmenu, {
    _renderItem: function(ul, item) {
      var $li = $('<li>');
      var $wrapper = $('<div>');

      if (item.disabled) {
        $li.addClass('ui-state-disabled');
      }

      $wrapper.append($('<span>', {
        text: item.label,
        class: 'level ' + item.element.attr('data-class')
      }));

      return $li.append($wrapper).appendTo(ul);
    }
  });

  $('.selectmenu select').levelselectmenu({
    create: function() {
      var level = 'level ' + $(this[this.selectedIndex]).data().class;      
      $('.ui-selectmenu-text').addClass(level);
      $(this).after($('.ui-selectmenu-menu'));
    },
    select: function() {
      var level = 'level ' + $(this[this.selectedIndex]).data().class;
      $('.ui-selectmenu-text').addClass(level);
      if (level.indexOf('dialog') > 0) {
        $('#drop').dialog('open');
      }
    },
  });

  $('.table_expand tr').click(function(e) {
    //e.stopPropagation();
    if (!$(e.target).parents().hasClass('dropdown')) {
      $(this).find('.caret').toggleClass('expanded');
      $(this).next('.detail').toggle();
    }
  });

  $('button.caret').click(function() {
    $(this).toggleClass('expanded').parents('div').next('.table_expand').toggleClass('hidden');
    if ($(this).next('ul')) {
      $(this).next('ul').toggle()
    }
  });

  $('.tree button:not(.caret)').click(function() {
    var thisChecked = $(this).find('input').prop('checked');
    $(this).find('input').prop('checked', !thisChecked);
    $(this).parents('.tree').find('input').each(function() {
      var thisChecked = $(this).prop('checked');
      $(this).parents('button').attr('class', thisChecked ? 'checked' : '');
    })
  })

  $('.dropdown > button').click(function(e) {
    e.stopPropagation();
    var $thisItems = $(this).next();

    if (!$thisItems.hasClass('expanded')) {
      $('.dropdown .items').each(function() {
        $thisItems !== $(this) && $(this).removeClass('expanded');
      });
    }    
    
    if (!$(this).hasClass('dialog')) {     
      var isOverHeight = function() {
        return $thisItems.offset().top + $thisItems.height() > $(window).height();
      }

      $thisItems.toggleClass('expanded').addClass(isOverHeight() ? 'over' : '');
    }

    else {
      $('#checkEmployee').dialog('option', { modal: false }).dialog('open');
    }
  });

  $('.dropdown .uncheck').click(function() {
    $(this).parents('.items').find('input[type=checkbox]').each(function() {
      $(this).prop('checked', false);
    });
  });

  var dpYearButton = function(input) {
    setTimeout(function() {
      var widgetHeader = $(input).datepicker('widget').find('.ui-datepicker-header');
      var prevYrBtn = $('<a class="prev-year"><span>Prev Year<span></a>');
      var nextYrBtn = $('<a class="next-year"><span>Next year</span></a>');

      prevYrBtn.click(function(e) {
        e.stopPropagation();
        $.datepicker._adjustDate($(input), -1, 'Y');
      });
      
      nextYrBtn.click(function(e) {
        e.stopPropagation();
        $.datepicker._adjustDate($(input), +1, 'Y');  
      });

      prevYrBtn.appendTo(widgetHeader);
      nextYrBtn.appendTo(widgetHeader);   
    }, 1);
  }

  $('.datepicker input').datepicker({
    showAnim: '',
    currentText: '오늘 날짜 선택',
    dateFormat: 'yy-mm-dd',
    dayNamesMin: [ '일','월','화','수','목','금','토' ],
    monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
    selectOtherMonths: true,    
    showButtonPanel: true,
    showMonthAfterYear: true,    
    showOtherMonths: true,
    beforeShow: function(input, inst) {
      $(input).after(inst.dpDiv);

      var isOverHeight = $(input).offset().top + 313 > $(window).height();
      inst.dpDiv.css({
        marginTop: 36, 
      });
      
      if ($(input).parents().hasClass('dropdown')) {
        inst.dpDiv.css({
          marginTop: 10 - (isOverHeight ? 248 : 0),
          marginLeft: input.offsetWidth + 25
        });
      }

      dpYearButton(input);
    },
    onChangeMonthYear: function (yy, mm, inst) { 
      dpYearButton(inst.input);
    }
  });

  $.datepicker._gotoToday = function(id) { 
    $(id).datepicker('setDate', new Date()).datepicker('hide').blur(); 
  };
})