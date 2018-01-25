$(function () {

    $('.skip_nav').on({
        focusin:function(){
            $('.skip_nav').css('width',0);
            $(this).css({
                'width':200,
                'font-size':13
            });
        },
        focusout:function(){
            $('.skip_nav').css({
                'width':0,
                'font-size':0
            });
        }
    });

    var dpLeft = 0;
    $('header ul.breadcrumb > li').each(function(i){
        if (i-1 >=0) {
            dpLeft += $('header ul.breadcrumb > li').eq(i-1).outerWidth();
        }

        if (i-1 >=1) {
            dpLeft += 25
        }
        
        $(this).find('.dropdown_path').css({
            left: dpLeft
        });
    });

    // Tab
    $('.wrap_tab .tab_content').hide();
    $('.wrap_tab .tab_content:first').show();
    $('.layer .wrap_tab .tab_content:first').show();
    //$('.tab_menu li:first').addClass('active');
    $('.tab_menu li a').click(function () {
        $(this).parent().siblings().removeClass('active');
        $(this).parent().addClass('active');
        var currentTab = $(this).attr('href');
        $(this).parents('.wrap_tab').find('.tab_content').hide();
        $(currentTab).show();
        return false;
    });

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
    

    /** 퍼블리싱 페이지 확인용 스크립트 
    $('select').each(function(i){
        $(this).attr('id','sel'+i);
    });
     퍼블리싱 페이지 확인용 스크립트**/

    $('select').selectmenu({
        create:function(event, ui) {
            if (!$(this).parents().is('.layer')) {
              //  $(this).parents('.select').width($(this).outerWidth() + 20);
            }            
        }        
    });
    
    //$('input[type=radio],input[type=checkbox]').addClass('view');


    var layer = null;
    $('.btn_layer').click(function(e){
        e.preventDefault();
        $('html, body').css('overflow','hidden');

        var thisClass = $(this).attr('class'),
            res = thisClass.split(" "),
            layerId = '#' + res[0];



        layer = function() {

            if ($(layerId).height() >= $(window).height()) {
                $(layerId).find('.layer_con').css({
                    'height': $(window).height() - 160,
                    'overflow-y': 'auto'
                });
            }

            else {
                $(layerId).find('.layer_con').css('height','inherit');
            }

            $(layerId).css({
                'top': ($(window).height() / 2) + $(window).scrollTop() - ($(layerId).height() / 2),
                'left': ($(window).width() - $(layerId).width()) / 2,
            });
        }

        $('.dimm').css({
            'width': $('html, body').width(),
            'height': $(document).height()
        })
        .show();

        layer();       
        $(layerId).show().attr('tabindex',0).focus();

        $(layerId).find('iframe').css({
            'width':'100%',
            'height':$(layerId).find('.layer_con').height() - 7
        });

        $(window).resize(function(){
            layer();
            $('.dimm').css({
                'width': $('html, body').width(),
                'height': $(document).height()
            });
        });
    });      

    $('a.btn_layer_close, .btn_cal_confirm').click(function(e){
        e.preventDefault();
        $(this).parents('.layer').removeAttr('tabindex').hide();
        var dimm = 0
        $('.layer').each(function(i){
            if ($(this).attr('tabindex') == 0) {
                dimm += 1;
            }
        })

        if (dimm == 0) {
            $('.dimm').hide();
            $('html, body').css('overflow','visible');
        }

        $(this).parents('.layer').hide();

        var $layerBtn = $('.' + $(this).parents('.layer').attr('id'));
        $layerBtn.focus();
    });

    $('.btn_cal_confirm').click(function(){
        var $layerBtn = $('.' + $(this).parents('.layer').attr('id'));

        if ($layerBtn.hasClass('btn_calendar')) {
            var $layerCon = $(this).parents('.layer_con');
            if ($layerCon.children().children().children().is('.calendar_b')) {                

                var $startDate = $layerCon.find('.left_cal .cal_date');
                var startCal =  $startDate.find('.date').text();
                /*
                $('.start_date').val(startCal);
                $('.start_hour').val($startDate.find('.sel_hour').val());
                $('.start_minute').val($startDate.find('.sel_minute').val());
                */

                var $endDate = $layerCon.find('.right_cal .cal_date');
                var endCal =  $endDate.find('.date').text();  
                /*
                $('.end_date').val(endCal);
                $('.end_hour').val($endDate.find('.sel_hour').val());
                $('.end_minute').val($endDate.find('.sel_minute').val());
                */

                $layerBtn.siblings('.start_cal').val(startCal + ' ' + $startDate.find('.sel_hour').val() + ':' + $startDate.find('.sel_minute').val());
                $layerBtn.siblings('.end_cal').val(endCal + ' ' + $endDate.find('.sel_hour').val() + ':' + $endDate.find('.sel_minute').val());
            }

            if ($layerCon.children().children().is('.calendar_sd') || $layerCon.children().is('.calendar_s')) {
                 var startYear = $layerCon.find('.top_cal .txt').text().substring(0,4),
                    startMonth = $layerCon.find('.top_cal .txt').text().substring(6,8),
                    startDateNum = $layerCon.find('td.on a.dateNum').text();
                 
                 if (startDateNum < 10) {
                     startDateNum = '0' + startDateNum;
                 }
                                 
                 var startCal = startYear + '/' + startMonth + '/' + startDateNum;

                 if ($layerCon.children().children().is('.calendar_sd')) {
                 var $startDate = $(this).parents('.layer_con').find('.cal_date');
                 $('.sd_date').val(startCal);
                 $('.sd_hour').val($startDate.find('.sel_hour').val());
                 $('.sd_minute').val($startDate.find('.sel_minute').val());

                 $layerBtn.siblings('.start_cal').val(startCal + ' ' + $startDate.find('.sel_hour').val() + ':' + $startDate.find('.sel_minute').val());
                 }

                 if ($layerCon.children().is('.calendar_s')) {
                 $layerBtn.siblings('.start_cal').val(startCal);
                 }
             }
        }

        else {
            // 내륙/제주 여러건인 경우 예외 처리 (하나만 적용) 20170606
            console.log($layerBtn);
            if (typeof borrow == "object") {
                $layerBtn = borrow.action.getType() == 0 ?
                    $layerBtn.slice(0, 2) : $layerBtn.slice(2);
            }

            //$layerBtn = $layerBtn.eq(index * 2);
            $layerBtn.removeClass('noData');

            var rr = ['rent','return'],
                lr = ['left','right'];


            for (var i=0;i<=1;i++) {
                $box = $layerBtn.parent().filter('.' + rr[i] +'Box');
                $calDate = $(this).parents('.layer').find('.' + lr[i] + '_cal .cal_date');

                $box.find('.date').html($calDate.find('.date').text());
                //$('.' + rr[i] + '_date').val($calDate.find('.date').text());

                $box.find('.hour').html($calDate.find('.sel_hour').val() + '시');
                //$('.' + rr[i] + '_hour').val($calDate.find('.sel_hour').val());

                $box.find('.minute').html($calDate.find('.sel_minute').val() + '분');
                //$('.' + rr[i] + '_minute').val($calDate.find('.sel_minute').val());

                $box.addClass('on');
            }
        }
    });

/*
    $('.sel_hour').selectmenu({
        change: function(){
            var $layerBtn = $('.' + $(this).parents('.layer').attr('id'));
            if ($(this).parents().is('.left_cal')) {                
                $layerBtn.siblings('.rent_hour').val($(this).val());
                $layerBtn.siblings('.start_hour').val($(this).val());                
            }
            else {              
                $layerBtn.siblings('.return_hour').val($(this).val());
                $layerBtn.siblings('.end_hour').val($(this).val());                   
            }
        }
    });

    $('.sel_minute').selectmenu({
        change: function(){
            var $layerBtn = $('.' + $(this).parents('.layer').attr('id'));
            if ($(this).parents().is('.left_cal')) {
                $layerBtn.siblings('.rent_minute').val($(this).val());
                $layerBtn.siblings('.start_minute').val($(this).val());                
            }
            else {
                $layerBtn.siblings('.return_minute').val($(this).val());
                $layerBtn.siblings('.end_minute').val($(this).val());                   
            }
        }
    });
*/

    // 딜리버리 서비스(DS)
    /*
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
    */
    
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


    var $parent = $('.buy_search_view .search_view_left'),
        $carImg = $parent.find('.car_img'),
        $thumb = $parent.find('.thumb'),
        $thumbList = $thumb.find('li'),

        currentIndex = 0;

    var showCar = function(index){
        $carImg.find('img').attr('src',$thumbList.eq(index).find('img').attr('src'));
        $carImg.find('img').attr('alt',$thumbList.eq(index).find('img').attr('alt'));        
    }

    $carImg.find('.btn_next').click(function(e){
        e.preventDefault();
        currentIndex++;
        
        if (currentIndex + 1 >= $thumbList.find('img').length) {            
            $(this).hide();
        }
        else {
            $carImg.find('.btn_prev').show();
        }

        showCar(currentIndex);
    });

    $carImg.find('.btn_prev').click(function(e){
        e.preventDefault();
        currentIndex--;
        
        if (currentIndex <= 0) {            
            $(this).hide();
        }

        else {
            $carImg.find('.btn_next').show();
        }        
     
        showCar(currentIndex);
    });

    $thumbList.each(function(i){
        $(this).find('a').click(function(e){
            e.preventDefault();

            if (i + 1 >= $thumbList.find('img').length) {
                $carImg.find('.btn_next').hide();
                $carImg.find('.btn_prev').show();
            }

            else if (i == 0) {
                $carImg.find('.btn_next').show();
                $carImg.find('.btn_prev').hide();
            }

            else {
                $carImg.find('.btn_next').show();
                $carImg.find('.btn_prev').show();
            }

            showCar(i);
        })
    })

    showCar(0);
});

