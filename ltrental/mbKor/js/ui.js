$(function () {
    $('.skip_nav').on({
        focusin:function(){
            $('.skip_nav').css('width',0);
            $(this).css('width',200);
        },
        focusout:function(){
            $('.skip_nav').css('width',0);
        }
    });

    $('.sub_header').clone().attr('class','sub_header_clone').attr('aria-hidden','true').appendTo('body');
    var s = 1;
    $(window).on('scroll',function(){
        s++;
        if ($(window).scrollTop() >= $('header').height()){

            if (s != 1 ) {
                $('.sub_header_clone').css('top',0).removeClass('nb');
                //$('#container').css('padding-top',45);
            }
            
            s = 0;
        }
        else {
            $('.sub_header_clone').css('top',-45);
            //$('#container').css('padding-top',0);            
        }
    });

    $(window).trigger('scroll');

/*
    $('input[type=text], select, textarea').on({


        focusin:function() {
            $('.sub_header.fixed').removeClass('fixed').addClass('absolute');
            $('.sub_header.absolute').css('top',$(window).scrollTop());
        },

        blur:function(){
            //alert('blur');
        }  

    });
*/
    // Tab
    $('.wrap_tab .tab_content').hide();
    $('.wrap_tab').find('.tab_content:first').show();
    $('.layer .wrap_tab').find('.tab_content:first').show();
    //$('.tab_menu li:first').addClass('active');
    $('.tab_menu li a').click(function () {
        $(this).parent().siblings().removeClass('active');
        $(this).parent().addClass('active');
        var currentTab = $(this).attr('href');
        $(this).parents('.wrap_tab').find('.tab_content').hide();
        $(currentTab).show();
        return false;
    });

    $('.tab_menu').wrap('<div class="wrap_tab_menu"></div>');

    function mtab(){

        $('.tab_menu').each(function(i) {
            if (!$(this).parents().is('.main')){
                var $li = $(this).find('li'),            
                w = $(window).width(),
                d = w / $li.length,
                s = 0,
                over = [];

                $li.each(function(j){
                    if ($(this).width() > d) {
                        over.push(j);
                        w -= $(this).width();
                    } 
                    s += $(this).width();
                    
                });

                if (over.length > 0) {               
                    if(s > $(window).width()) {
                        $li.css({
                            'width':'auto',
                            'padding':'0 10px'
                        });    
                    }
                    else {
                        $li.each(function(k){
                            if ($(this).width() < (w - 20 * over.length) / ($li.length - over.length)) {
                                $li.width((w - 20 * over.length) / ($li.length - over.length));        
                            }
                        })
                        
                        for(var k = 0;k<=over.length;k++) {
                            $li.eq(over[k]).css({
                                'width':'inherit',
                                'padding':'0 10px'
                            });
                        }
                    }
                }
                else {       
                    $li.width(($(window).width() / $li.length) / $(window).width() * 100 + '%');
                }
            }
        });
    }

    $(window).load(function(){
        mtab();
    });
/*
    $(window).resize(function(){
        mtab();
    });    
*/
    // sTab
    $('.wrap_stab .stab_content').hide();
    $('.wrap_stab').find('.stab_content:first').show();
    $('.stab_menu').find('li:first').addClass('active');
    $('.stab_menu li a').click(function () {
        $(this).parent().siblings().removeClass('active');
        $(this).parent().addClass('active');
        var currentSTab = $(this).attr('href');
        $(this).parents('.wrap_stab').find('.stab_content').hide();
        $(currentSTab).show();
        return false;
    });

    $('.stab_menu').each(function(){
        var $li = $(this).find('li');
        $li.css('width',100 / $li.length + '%');
    })

     // Filter toggle
    $('.filter .btn_filter').on('click', function(e){
        $('.filter .grid').slideToggle(100);
        $('.filter .btn_filter span').toggleClass('on');
        e.preventDefault();
    })
    
     $('.qaList a').on('click', function(e) {
        e.preventDefault(); 
        function slideDown(target) {
            slideUp();
            $(target).addClass('on').next().slideDown(100);
        } 
        function slideUp() {
            $('.qaList a').removeClass('on').next().slideUp(100);
            } 
        $(this).hasClass('on') ? slideUp(100) : slideDown(this); 
    });

    /* select */
    $('.select').on({
        'focusin':function(){
            $(this).css({
                'border': '1px solid #d40e32'                
            });
        },

        'focusout':function(){
            $(this).css('border','1px solid #bbb');
        }
    });

    $('.select').prepend('<span class="selected"></span>');
    //$('.selected').html($(this).siblings('select').find('option:first').text())
    $('.selected').each(function(i){
        //$(this).html($(this).siblings('select').find('option:first').text())
    	 $(this).html($(this).siblings('select').find('option:selected').text())
    })

    $('select').change(function(){
        var select_name = $(this).children('option:selected').text();
        $(this).siblings(".selected").text(select_name);
    });


    var layer = null;
    var dimm = null;
    var scrollTop = null;
    $('.btn_layer').click(function(e){
        e.preventDefault();

        scrollTop = $(window).scrollTop();
        var thisClass = $(this).attr('class'),
            res = thisClass.split(" "),
            layerId = '#' + res[0];

        if ($(layerId).hasClass('layer_b')) {
            $('body').append('<div class="dimm_w"></div>');
            layer = function() {
                if ($(layerId).height() >= $(window).height()) {
                    $(layerId).find('.layer_con').height($(window).height() - 160);
                }

                $(layerId).find('.layer_con').height($(window).height() - 50);

                $(layerId).css({
                    'top':0
                });

                dimm = '.dimm_w';

                $(dimm).css({
                    'width': $('html, body').width(),
                    'height': $('html, body').height()
                }).show();                
            }

            $('#container').hide();
            $('html, body').css('overflow','hidden');
        }

        else {
            $('html, body').css('overflow','hidden');
            $('body').append('<div class="dimm_b"></div>');
            layer = function() {
                $(layerId).css({
                    'top': $(window).scrollTop() + $(window).height() / 2 - $(layerId).height() / 2                
                });

                dimm = '.dimm_b';

                $(dimm).css({
                    'top': $(window).scrollTop(),
                    'width': $(window).width(),
                    'height': $(window).height()
                }).show();                
            }

            $(document).on("mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll", function(e) {
                e.preventDefault();
                return;
            });
        }

        layer();       
        $(layerId).show().attr('tabindex',0).focus();

        $('h2.type2').css({
            'padding-top':($('.layer_tit').height() - $(layerId).find('h2.type2').height()) / 2
        });        
    });
/*
    $(window).resize(function(){
        layer();
    });         
*/

    $('.loading').css({
        left:($(window).width() - $('.loading').width()) / 2
    })

    $('a.btn_layer_close, .btn_cal_confirm, .btn_agree_cancel').click(function(e){
        e.preventDefault();
        $(document).off(".disableScroll");
        $('.dimm_w, .dimm_b').remove();
        $('html, body').css('overflow','visible');
        $(this).parents('.layer').hide();

        if ($(this).parents().is('.layer_b')){
            $('#container').show();    
        }

        $(window).scrollTop(scrollTop);

        var $layerBtn = $('.' + $(this).parents('.layer').attr('id'));
        
        if($layerBtn.length == 1){
        	$layerBtn.focus();
        }
    });

    $('.btn_cal_confirm').click(function(){
        var $layerBtn = $('.' + $(this).parents('.layer').attr('id'));

        if ($layerBtn.hasClass('btn_calendar')) {
            var $layerCon = $(this).parents('.layer_con'),
                year = $layerCon.find('.top_cal .txt').text().substring(0,4),
                month = $layerCon.find('.top_cal .txt').text().substring(6,8),
                dateNum = $layerCon.find('td.start a.dateNum').text();

            if (dateNum < 10) {
                dateNum = '0' + dateNum;
            }

            var date =  year + '/' + month + '/' + dateNum;


            if ($(this).parents('.layer_con').children().children().is('.calendar_sd')) {
                var $calDate = $(this).parents('.layer_con').find('.cal_date');
                $('.sd_date').val(date);
                $('.sd_hour').val($calDate.find('.sel_hour').val());
                $('.sd_minute').val($calDate.find('.sel_minute').val());

                $layerBtn.parents('td').find('.start_cal').val(date + ' ' + $calDate.find('.sel_hour').val() + ':' + $calDate.find('.sel_minute').val());
            }

            if ($(this).parents('.layer_con').children().children().is('.calendar_s')) {                
                $layerBtn.parents('td').find('.start_cal').val(date);
            }

            if ($(this).parents('.layer_con').children().children().is('.calendar_b')) {

                var rr = ['rent','return'];

                for (var i=0;i<=1;i++) {
                    $box = $layerBtn.parent().filter('.' + rr[i] +'Box');
                    $calDate = $('.cal_date.' + rr[i]);

                    $('.' + rr[i] + '_date').val($calDate.find('.date').text());
                    $('.' + rr[i] + '_hour').val($calDate.find('.sel_hour').val());
                    $('.' + rr[i] + '_minute').val($calDate.find('.sel_minute').val());

                    $('.' + rr[i] + '_cal').val($calDate.find('.date').text() + ' ' + $calDate.find('.sel_hour').val() + ':' + $calDate.find('.sel_minute').val());
                }                
            }
        }

        else {
            $layerBtn.removeClass('noData');

            var rr = ['rent','return'];

            for (var i=0;i<=1;i++) {
                $box = $layerBtn.parent().filter('.' + rr[i] +'Box');
                $calDate = $('.cal_date.' + rr[i]);

                $('.' + rr[i] + '_date').val($calDate.find('.date').text());
                $box.find('.date').html($calDate.find('.date').text());

                $('.' + rr[i] + '_hour').val($calDate.find('.sel_hour').val());
                $box.find('.hour').html($calDate.find('.sel_hour').val() + '시');

                $('.' + rr[i] + '_minute').val($calDate.find('.sel_minute').val());
                $box.find('.minute').html($calDate.find('.sel_minute').val() + '분');

                $box.addClass('on');
            }
        }
    });

    $('.sel_hour').change(function(){
        if ($(this).parents().is('.rent')) {
            $('.rent_hour').val($(this).val());
            $('.start_hour').val($(this).val());                
        }
        else {
            $('.return_hour').val($(this).val());
            $('.end_hour').val($(this).val());                   
        }
    });

    $('.sel_minute').change(function(){
        if ($(this).parents().is('.rent')) {
            $('.rent_minute').val($(this).val());
            $('.start_minute').val($(this).val());                
        }
        else {
            $('.return_minute').val($(this).val());
            $('.end_minute').val($(this).val());                   
        }
    });

    // 딜리버리 서비스(DS)
   var ds = 0;
   $('.deliveryWrap .ds_check').siblings('label').click(function(){
        ds++;
        if (ds%2 === 0) {
            $('.ds_radio').hide();
        }
        else {
            $('.ds_radio').show();  
        }   
   });
    
    $('.ds_check').on('change', function() { 
        if($(this).is(':checked'))  
            $('.layerSelBranch').removeClass('layerSelBranch btn_layer noData ').addClass('layerSelBranchDS btn_layer noData');
        else 
            $('.layerSelBranchDS').removeClass('layerSelBranchDS btn_layer noData').addClass('layerSelBranch btn_layer noData');
    });
    
    
    // Filter Check All 
    $('#selectAllCar').on('change', function() {
      $('.chk_car').prop('checked', this.checked);
    });
    $('.chk_car').on('change', function () {
      var allCheckedCar = $('.chk_car:checked').length === $('.chk_car').length;
      $('#selectAllCar').prop('checked', allCheckedCar);
    });  
 
    $('#selectAllFuel').on('change', function() {
        $('.chk_fuel').prop('checked', this.checked);
    });
    $('.chk_fuel').on('change', function () {
        var allCheckedFuel = $('.chk_fuel:checked').length === $('.chk_fuel').length;
        $('#selectAllFuel').prop('checked', allCheckedFuel);
    });

});

