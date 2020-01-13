$(function(){
    var rvs = function (val) {
        return val.split('').reverse().join('');
    }
    
    if ($(window).width() > 767) {
        $(window).scroll(function() {
            var $content = $('#content'),
                $lnb = $('#lnb');
            if ($content.hasClass('main') || $content.hasClass('overview') || $content.hasClass('privacy') || $content.hasClass('terms')) {
                if ($(window).scrollTop() > $('#header .right').height()) {
                    $content.hasClass('main') ? $content.css('marginTop', 130) : $('#visual').css('marginTop', 130);
                    $content.siblings('#header').css({
                        position: 'fixed',
                        top: 0,
                        height: 84
                    }).find('.right').hide();
                }
                else {
                    $content.hasClass('main') ? $content.css('marginTop', 0) : $('#visual').css('marginTop', 0);
                    $content.css('marginTop', 0);
                    $content.siblings('#header').css({
                        position: 'relative',
                        height: 122
                    }).find('.right').show();
                }
            }
            else {
                if ($(window).scrollTop() > $('#header').height() + $('#visual').height()) {
                    $lnb.find('a').each(function() {
                        var href = $(this).attr('href');
                        if (rvs(href).substr(0,4) !== 'bnl#') {
                            $(this).attr('href', href + '#lnb'); 
                        }
                    });
    
                    $content.css('marginTop', $content.hasClass('product') ? 140 : 120)
                    $lnb.css({
                        position: 'fixed',
                        top: 0
                    });
                }
                else {
                    $lnb.find('a').each(function() {
                        var reverse = rvs($(this).attr('href'));
                        if (reverse.substr(0,4) === 'bnl#') {
                            $(this).attr('href', rvs(reverse.substr(4))); 
                        }
                    });
    
                    $content.css('marginTop', 0)
                    $lnb.css('position', 'relative');
                }
            }
        })
    
        $('#header .family > a').click(function(e) {
            e.preventDefault()
            var $ul = $(this).next('ul');
            $ul.hasClass('expanded') ? $ul.removeClass('expanded') :  $ul.addClass('expanded');
            return false;
        })
    
        $('#header, #visual, #lnb, #content, #footer').click(function() {
            var $ul = $('#header .family ul');
            $ul.hasClass('expanded') &&  $ul.removeClass('expanded');
        })
    
        $('#gnb .depth2').each(function(i){
            if (i > 0) {
                var $this = $(this);
                var left = ($this.parent().outerWidth() - $this.outerWidth()) / 1.8;    
                $this.css('left', left < 0 ? left : 0);
            }
        });
    
        var showMenu = {
            height: 'auto',
            overflow: 'visible',
            borderLeft: '1px solid #e2e2e3',
            borderRight: '1px solid #e2e2e3',
            borderBottom: '1px solid #e2e2e3'
        }
    
        var hideMenu = function() {
            $('#gnb .depth2').css({
                height: 0,
                overflow: 'hidden',
                border: 0
            });
            $('#gnb ._product .depth2').css('padding', 0);
            // _product
        }
    
        $('#gnb > li > a').on('focusin mouseenter', function(){
            var $this = $(this);
            hideMenu();        
            $this.parent().index() !== 0 ? $this.next().css(showMenu) : $this.next().css(showMenu).height(505);
            $this.parent().hasClass('_product') && $this.next('.depth2').css({
                height: 'auto',
                padding: '40px 50px'
            });
            // _product
        });
    
        $('#gnb .depth2 > li > a ').on({
            'focusin mouseenter': function() {
                var $this = $(this);
                hideMenu();
                $this.parents().hasClass('product') ? $this.parents('.depth2').css(showMenu).height(505) : $this.parents('.depth2').css(showMenu);
                $this.parents().hasClass('_product') && $this.parents('.depth2').css({
                    height: 'auto',
                    padding: '40px 50px'
                });
                // _product
            }
        });
    
        $('#gnb .depth3 > li a ').on({
            'focusin mouseenter': function() {
                var $this = $(this);            
                $this.parents('ul').css(showMenu).css('border', 0);
                $this.parents('.depth2').css(showMenu).height(505);
                $this.parents().hasClass('_product') && $this.parents('.depth2').css({
                    height: 'auto',
                    padding: '40px 50px'
                });
                // _product            
            }
        })
    
        $('#gnb').on('focusout mouseleave', function() {
            hideMenu();        
        });
    }

    else {
        var lnbWidth = 0;
        $('#lnb ul li').each(function(){
            lnbWidth += $(this).outerWidth();
        });

        $('#lnb ul').width(lnbWidth < $(window).width() ? $(window).width() : lnbWidth);

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

        var $section = $('.overview .section'),
            $brochure = $('.brochure .inner'),
            $h4 = $brochure.find('h4'),
            $listWrap =  $brochure.find('.list_wrap');        

        $section.eq(0).show();
        $h4.eq(0).show();
        $listWrap.eq(0).show();
        $('select').selectmenu({
            change: function() {
                var val = $(this).val();
                if (val) {
                    $section.find('h3').removeAttr('style');
                    $section.hide();
                    $section.eq(val).show();
                    $listWrap.hide();
                    $h4.eq(val).show();
                    $listWrap.eq(val).show();
                }

                else {
                    $section.find('h3').css('marginTop', 40);
                    $section.show();
                    $h4.show();
                    $listWrap.show();
                }
            }
        });        

        var $overview = $('.overview'),
            $list = $overview.find('ul li'),
            col = Math.floor($overview.find('ul').width() / $list.outerWidth()),
            margin = ($overview.find('ul').width() - $list.width() * col) / (col*2);
        $list.css('margin', '15px ' + margin + 'px');
    }

    var $window = $(window),
    $videoContainer = $('.video_container');

    function videoPosition() {
        $videoContainer.css({
            top: $window.scrollTop() + (window.outerHeight - $videoContainer.outerHeight()) / 2.7,
            left: ($window.width() - $('.video_container').width()) / 2
        })
    }

    $window.resize(function() {
        videoPosition()
    });

    var $li = $('.newsletter .list li');
    $li.children('a').click(function(e) {
        e.preventDefault();
        var $this = $(this),
            $parent = $this.parent();
        
        if ($parent.hasClass('expanded')) {
            $parent.removeClass('expanded');
            $this.next('.cont').hide();
        }

        else {
            $li.removeClass('expanded').find('.cont').hide();
            $parent.addClass('expanded');
            $this.next('.cont').show();
        }            
    });    

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
})