$(function() {
  $('div.dialog').dialog({
    autoOpen: false,
    width: 480,
    height: 540,
    modal: true, 
    buttons: {
      '취소': function() {
        $(this).dialog('close');
      },  
      '확인': function() {
        dialogConfirm[$(this).attr('id')](this);
      },
    },
    open: function() {
      $(this).find('.scrollbar').animate({
        scrollTop: 0
      }, 1);
      if ($(this).hasClass('no-title')) {
        $(this).dialog('option', {
          width: 620,
          height: 585
        }).prev('.ui-dialog-titlebar').css('background-color', '#fff');
      }

      if ($(this).hasClass('text')) {
        $(this).dialog('option', {
          width: 430,
          height: 'auto'
        });
      }

      if (!$('.ui-widget-overlay').length) {
        $('.ui-dialog-titlebar').css('background-color', '#fff');
      }
    }
  });
});

var dialogConfirm = {
  company: function(dialog) {
    alert($(dialog).attr('id'));
    $(dialog).dialog('close');
  },
  employee: function(dialog) {
    alert($(dialog).attr('id'));
    $(dialog).dialog('close');
  },
  drop: function(dialog) {
    $('header .avatar + div .drop').show();
    $('input, select, button').attr('disabled', 'disabled');
    $('.table_form .table_form').show().find('input, select, button').removeAttr('disabled');
    $('.selectmenu select').levelselectmenu('disable');
    $(dialog).dialog('close');
  }
};
