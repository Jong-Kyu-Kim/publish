
// 브라우저 알아오기 추가. jquery 1.9.0 이상에서 기존에 알아오던 방식 사라짐. 2013-10-10 오전 11:19 표정윤
$.browser = {};
$.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
$.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
$.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
$.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());

//alert(navigator.userAgent.toLowerCase());
//if($.browser.chrome){alert("크롬입니다.")};
// 브라우저 알아오기 추가. jquery 1.9.0 이상에서 기존에 알아오던 방식 사라짐. 2013-10-10 오전 11:19 표정윤


(function ($) {
    $.fn.alphanumeric = function (p) {
        var input = $(this),
            az = "abcdefghijklmnopqrstuvwxyz",
            options = $.extend({
//                ichars: '!@#$%^&*()+=[]\\\';,/{}|":<>?~`.- _',
                ichars: "!@#$%^&*()+=[]\\\';,/{}|\":<>?~`.-_ ",
                nchars: '',
                allow: ''
            }, p),
            s = options.allow.split(''),
            i = 0,
            ch,
            regex;

        for (i; i < s.length; i++) {
            if (options.ichars.indexOf(s[i]) != -1) {
                s[i] = '\\' + s[i];
            }
        }

        if (options.nocaps) {
            options.nchars += az.toUpperCase();
        }
        if (options.allcaps) {
            options.nchars += az;
        }

        options.allow = s.join('|');
        regex = new RegExp(options.allow, 'gi');
        ch = (options.ichars + options.nchars).replace(regex, '');

		
		
        input.keydown(function (e) {
            if ( !$.browser.msie ) {
                var key = (!e.charCode ? e.which : e.charCode);

                if ( $.browser.opera )
                {
                    if ( key == 197 )
                    {
                        alert("사용할 수 없는 문자입니다.");
                        e.preventDefault();
                        var value = input.val();
                        var length = value.length;
                        var str = "";
                        var chkUniCode = "";

                        // 마지막 자리가 한글인 경우만 마지막 글자 지우기
                        for ( var j=0; j<value.length; j++ )
                        {
                            chkUniCode = value.charCodeAt(j);
                            if ( 44032 <=chkUniCode && chkUniCode<= 55203 || 12593<=chkUniCode && chkUniCode<=12643 ) {
                            } else {
                                str += value.substr(j,1);
                            }
                        }
                        input.val(str);
                    }
                }
                else
                {
                    if ( key == 229 )
                    {
						alert("사용할 수 없는 문자입니다.");
                        e.preventDefault();
                        var value = input.val();
                        var length = value.length;
                        var str = "";
                        var chkUniCode = "";

                        // 마지막 자리가 한글인 경우만 마지막 글자 지우기
                        for ( var j=0; j<value.length; j++ )
                        {
                            chkUniCode = value.charCodeAt(j);
                            if ( 44032 <=chkUniCode && chkUniCode<= 55203 || 12593<=chkUniCode && chkUniCode<=12643 ) {
                            } else {
                                str += value.substr(j,1);
                            }
                        }
                        input.val(str);
                    }
                }
            }
        });
        input.keypress(function (e) {
            var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
            if (ch.indexOf(key) != -1 && !e.ctrlKey) {
                e.preventDefault();
                alert("사용할 수 없는 문자입니다.");
            }
        });

        input.blur(function () {
            if ( $.browser.msie ) {
                var value = input.val(),
                    j = 0;

                for (j; j < value.length; j++) {
                    if (ch.indexOf(value[j]) != -1) {
                        input.val('');
                        return false;
                    }
                }
                return false;
            } else {
                var value = input.val();
                var valUniCode = value.charCodeAt(0);
                for ( var j=0; j<value.length; j++ )
                {
                    if ( 44032 <=valUniCode && valUniCode<= 55203 || 12593<=valUniCode && valUniCode<=12643 )
                    {
                        input.val('');
                        return false;
                    }
                }
            }
        });

        return input;
    };


    $.fn.numeric = function (p) {
        var az = 'abcdefghijklmnopqrstuvwxyz',
            aZ = az.toUpperCase();

        return this.each(function () {
            $(this).css('ime-mode', 'disabled');
            $(this).alphanumeric($.extend({ nchars: az + aZ }, p));
        });
    };

    $.fn.alpha = function (p) {
        var nm = '1234567890';
        return this.each(function () {
            $(this).css('ime-mode', 'disabled');
            $(this).alphanumeric($.extend({ nchars: nm }, p));
        });
    };

	 $.fn.Check = function (p) {
	
        var input = $(this),
            az = 'abcdefghijklmnopqrstuvwxyz',
			num= '1234567890',
            options = $.extend({
//                ichars: '!@#$%^&*()+=[]\\\';,/{}|":<>?~`.- _',
				ichars: '!@#$%^&*()+=[]\\\';,/{}|":<>?~`.- _',
                nchars: '',
                allow: ''
            }, p),
            s = options.allow.split(''),
            i = 0,
            ch,
            regex;
	
        for (i; i < s.length; i++) {
            if (options.ichars.indexOf(s[i]) != -1) {
                s[i] = '\\' + s[i];
            }
        }
		 

        options.nchars += az.toUpperCase();
        options.nchars += az;
		options.nchars += num;

        options.allow = s.join('|');
        regex = new RegExp(options.allow, 'gi');
        ch = (options.ichars + options.nchars).replace(regex, '');


        input.keydown(function (e) {
			
            if ( !$.browser.msie ) {
                var key = (!e.charCode ? e.which : e.charCode);
				
                if ( $.browser.opera )
                {
                    if ( key == 197 )
                    {
                        //alert("사용할 수 없는 문자입니다.");
                        e.preventDefault();
                        var value = input.val();
                        var length = value.length;
                        var str = "";
                        var chkUniCode = "";

                        // 마지막 자리가 한글인 경우만 마지막 글자 지우기
                        for ( var j=0; j<value.length; j++ )
                        {
                            chkUniCode = value.charCodeAt(j);
                            if ( 44032 <=chkUniCode && chkUniCode<= 55203 || 12593<=chkUniCode && chkUniCode<=12643 ) {
                            } else {
                                str += value.substr(j,1);
                            }
                        }
                        input.val(str);
                    }
                }
                else
                {
                    if ( key == 229 )
                    { 
						//alert("사용할 수 없는 문자입니다.");
                        e.preventDefault();
                        var value = input.val();
                        var length = value.length;
                        var str = "";
                        var chkUniCode = "";

                        // 마지막 자리가 한글인 경우만 마지막 글자 지우기
						 
                        for ( var j=0; j<value.length; j++ )
                        {
                            chkUniCode = value.charCodeAt(j);
                            if ( 44032 <=chkUniCode && chkUniCode<= 55203 || 12593<=chkUniCode && chkUniCode<=12643 ) {
                            } else {
                                str += value.substr(j,1);
                            }
                        }
                        input.val(str);
                    }
                }
            }
        });
        input.keypress(function (e) {
            var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
            if (ch.indexOf(key) != -1 && !e.ctrlKey) {
                e.preventDefault();
                alert("사용할 수 없는 문자입니다.");
            }
        });

        input.blur(function () {
            if ( $.browser.msie ) {
                var value = input.val(),
                    j = 0;

                for (j; j < value.length; j++) {
                    if (ch.indexOf(value[j]) != -1) {
                        input.val('');
                        return false;
                    }
                }
                return false;
            } else {
                var value = input.val();
                var valUniCode = value.charCodeAt(0);
                for ( var j=0; j<value.length; j++ )
                {
                    if ( 44032 <=valUniCode && valUniCode<= 55203 || 12593<=valUniCode && valUniCode<=12643 )
                    {
                        input.val('');
                        return false;
                    }
                }
            }
        });

        return input;
    };
	
	


})(jQuery);


 

