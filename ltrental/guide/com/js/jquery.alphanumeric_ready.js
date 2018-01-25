document.write("<script type=\"text/javascript\" src=\"/front/com/js/jquery.alphanumeric.js\"></script>");

var t_alp = 'abcdefghijklmnopqrstuvwxyz';
var t_num = '1234567890';
var t_alp2 =t_alp.toUpperCase();
//$(this).Check($.extend({ allow: t_num+t_alp+'.' , nchars : '@' },"")); //영문과 숫자중 숫자만 받는다. (@ . 포함)

//allow 입력 할수 있는거
//nchars 입력 못하게 막는거



$(document).ready(function(){
 /*
	$('input[type=text]').each(function () {
	
		$("input[type=text]").attr("autocomplete","off"); // 이전에 입력했던거 안나오게 처리
	
		switch ($(this).attr('id'))
		{
		case "email"	 :
		case "userId"	 :
			$(this).Check($.extend({ allow: t_num+t_alp+'@.'},"")); //영문과 숫자중 숫자만 받는다. (@ . 포함)
		    $(this).css('ime-mode', 'disabled'); //한글 입력 못하게
		break;
		case  "password"  :
		case  "password_re"  :
		case "userPwPop" :
		break;
		case  "cardNo1"  :
		case  "phoneNo"  :
		case  "tel_type" :
		case  "mobile"   :
		case  "phone"    :
		    $(this).Check($.extend({ allow: t_num},"")); //숫자만
			$(this).css('ime-mode', 'disabled'); //한글 입력 못하게
		break;

	    case "zipCd" :
		case "city" :
			$(this).Check($.extend({ allow: t_num+'-'},"")); // 숫자 와 - 
			$(this).css('ime-mode', 'disabled'); //한글 입력 못하게
 		break;

		case "addrNm1" :
		case "addrNm2" :
		case "addrNm3" :
		case "inputAddr" :
			$(this).Check($.extend({ allow: t_alp+t_alp2+t_num+'- '},"")); // 영문 숫자 공백 포함
			$(this).css('ime-mode', 'disabled'); //한글 입력 못하게
		break;
		default :
			$(this).Check($.extend({ allow: t_alp+t_alp2+t_num},"")); //영문과 숫자중 숫자만 받는다.
	        $(this).css("ime-mode", "disabled"); //한글입력을 받지 않는다.

		}

	});


	$('input[type=password]').each(function () {
	switch ($(this).attr('id'))
		{
		case "cardNo2"	 :
		case "cardNo3"	 :
		case "cardNo4"	 :
			$(this).Check($.extend({ allow: t_num},"")); //숫자만 받는다.
	        $(this).css("ime-mode", "disabled"); //한글입력을 받지 않는다.
		break;		
		}

	});*/


});

//복사 붙여넣기 방지
/*
 $(function(){
  $("input:text").keydown(function(evt){
   if(evt.keyCode == 86 && evt.ctrlKey) {
    evt.keyCode = 0;
    evt.cancelBubble = true;
    //alert("복사금지입니다");
    window.event.returnValue = false;
   }else if(evt.keyCode == 67 && evt.ctrlKey){
    evt.keyCode = 0;
    evt.cancelBubble = true;
    //alert("복사금지입니다");
    window.event.returnValue = false;
   }
  });
 }); */
 
 
 //if(check_v("email","4")) alert("오류"); return;
 var check_v=function (p,type){
  
	var text = $("#"+p).val();
	var regexp;
	var regexp_all= /^[0-9a-zA-Z]*$/; // 숫자,영문
	//var regexp_number = /[0-9]/; // 숫자만
	var regexp_number = /^[0-9]*$/;; // 숫자만
	var regexp_number2 = /^[0-9-]*$/; // 숫자 - 
	var regexp_eng = /^[a-zA-Z]*$/; // 영문만
	var regexp_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;   //이메일

	switch (type)
	{	
		case "1" :
			regexp=regexp_number;
		break;
		case "2" :
			regexp=regexp_number2;
		break;
		case "3" :
			regexp=regexp_eng;
		break;
		case "4" :
			regexp=regexp_email;
		break;
		default:
			regexp=regexp_all;
			
	
	}
	 
	
	var chk=false;	
	if(!regexp.test(text)){
		 chk=true;
	}

	return chk;
   		
 };




