$(function(){
    var rvs = function (val) {
        return val.split('').reverse().join('');
    }

    var gnb = function($next, $parent) {
        if (!$next.hasClass('depth4')) {
            if ($parent.hasClass('active')) {
                $parent.next().children('a').removeAttr('style');
                $parent.removeClass('active');
                $next.css({ height: 0, overflow: 'hidden' })
            }

            else {
                if ($parent.parent().attr('id')) {
                    $parent.next().children('a').css('borderTop', '1px solid #666')
                }
                
                $parent.addClass('active');
                $next.css({ height: 'auto', overflow: 'visible' })
            }
        }
    }    

    $('#header').find('button').click(function() {
        $('#header, #visual, #lnb, #content').hide();        
        //$('#gnb > li:first > a').trigger('click');
        $('body, #footer').css('backgroundColor', '#000');
        $('#footer .link').css('display', 'inline-block');
        $('#footer .left').hide();
        $('#gnb, button.close').show();
        $('#footer select').change(function() {
            location.href = $(this).val();
        });
    });

    $('button.close').click(function() {
        $('#header, #visual, #lnb, #content').show();
        $('body').css('backgroundColor', 'transparent');
        $('#footer').css('backgroundColor', '#222')
        $('#footer .link').hide();
        $('#footer .left').show();
        $('#gnb, button.close').hide();
    })
    
    $('#gnb a').click(function(e){
        e.preventDefault();
        var pathname = e.currentTarget.pathname,
            $this = $(this),
            $next = $this.next(),
            $parent = $this.parent(),
            touchCondition = e.offsetX < $(this).width() * 0.7;

            if (pathname === '/products/fasoo-solution-overview') {
                touchCondition ? location.href = '/html/1_product/1_01_overview.html' : gnb($next, $parent);
            }

            else if (pathname === '/products/fasoo-enterprise-drm') {
                touchCondition ? location.href = '/html/1_product/1_04_fasoo_enterprise_drm.html' : gnb($next, $parent);
            }

            else if (pathname === '/products/fasoo-total-privacy-solution') {                
                touchCondition ? location.href = '/html/1_product/1_18_fasoo_total_privacy_solution.html' : gnb($next, $parent);
            }

            else {
                gnb($next, $parent);
            }    
    })    
    
    var lnbWidth = 0;
    $('#lnb ul li').each(function(){
        lnbWidth += $(this).outerWidth();
    });

    $('.product .function .title').addClass('under_line');

    var $li = $('.product .function ul li');
    for (var i = 0; i < $li.length; i++) {
        if (i%2 !== 0) {
            var $divImg = $li.eq(i).find('.inner div').eq(1);
            var $clone = $divImg.clone();
            $divImg.parent().prepend($clone);
            $divImg.remove();
        }        
    }

    var $content = $('.overview, .customer'),
        $section = $content.find('.section');
    $section.eq(0).show();
    $content.find('select').selectmenu({
        change: function() {
            var val = $(this).val();
            if (val) {
                $section.find('h3').removeAttr('style');
                $section.hide();
                $section.eq(val).show();
            }

            else {
                $section.find('h3').css('marginTop', 40);
                $section.show();
            }
        }
    });        

    var $content = $('.overview, .customer'),
        $list = $content.find('ul li');

    var $window = $(window),
    $videoContainer = $('.video_container');

    var videoPosition = function() {
        $videoContainer.css({
            top: $window.scrollTop() + ($(window).height() - $videoContainer.outerHeight()) / 7
        })
    }

    $('.video .list a').click(function(e) {
        e.preventDefault();
        $('body').css('overflow', 'hidden');
        $('.video_container').show();
        $('body').append('<div id="dimmer"></div>');
        $("#player").attr("src", "https://www.youtube.com/embed/" + $(this).data().videoId + "?autoplay=1&mute=0");
        videoPosition();
    });

    $('.video_close').click(function() {
        $('body').removeAttr('style');
        $('#dimmer').remove();
        $('#player').attr('src', '')
        $('.video_container').hide();
    });

    var resizing = function() {
        $('#lnb ul').width(lnbWidth < $(window).width() ? $(window).width() : lnbWidth);
        if ($('#lnb')[0]) {
            if ($('#lnb .active').index() === $('#lnb ul li').length - 1) {
                var scrollLeft = lnbWidth
            }

            else {
                var scrollLeft = $('#lnb').find('.active').offset().left - $(window).width() / 2.5
            }
            
            $('#lnb .inner').animate({
                scrollLeft: scrollLeft
            })
        }

        var col = Math.floor($content.find('ul').width() / $list.outerWidth()),
            margin = ($content.find('ul').width() - $list.width() * col) / (col*2);
        $list.css('margin', '15px ' + margin + 'px');        
    }

    resizing();

    $window.resize(function() {
        videoPosition();
        resizing();
    });
})