var goPrint = function(){
	var curPage=document.location.href;
	curPage = curPage.slice(7); 
	arr = curPage.split("/");
	window.open("/"+arr[1]+"/"+arr[2]+"/util/layerPopup_print.asp", "page_print", "width=810,height=663");
};
var goMail = function(menuNm, menuLink){
	alert("메뉴명 : "+ menuNm +"\n\n"+ menuLink);
	return false;
}
// 숫자, '-' 혼용 체크
function checkNumBar(str) {
	var RegExp1 = /[0-9]/;
	var RegExp2 = /[\-]/;

	return (RegExp1.test(str) && RegExp2.test(str)) ? true : false;
}
// 숫자 체크
function checkNum(str) {
	var RegExp = /[0-9]/;

	return RegExp.test(str) ? true : false;
}
// 이메일 형식 체크
function checkEmail(email) {
	if (email.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) {
		return true;
	}
	else {
		return false;
	}
}

//엑셀 스타일의 소수점 이하 반올림 함수
var roundXL = function(n, digits){
	if(digits >= 0){
		return parseFloat(n.toFixed(digits));
	}

	digits = Math.pow(10, digits);
	var t = Math.round(n * digits) / digits;
	return parseFlot(t.toFixed(0));
};

//ReplaceAll
var replaceAll = function(str, oldChar, newChar){
	var tmp = str.split(oldChar).join(newChar);
	return tmp;
};

//ASP의 Left 함수와 동일
function left(str, n){
	if(n <= 0){
		return "";
	}else if(n > String(str).length){
		return str;
	}else{
		return String(str).substring(0,n);
	}
}

//ASP의 Right 함수와 동일
function right(str, n){
	if(n <= 0){
		return "";
	}else if(n > String(str).length){
		return str;
	}else{
		var iLen = String(str).length;
		return String(str).substring(iLen, iLen - n);
	}
}

//address Seting
function setAddress(){
	$("#addrNm1").attr("readOnly", "readOnly");
	$("#addrNm2").attr("readOnly", "readOnly");
	$("#addrNm3").attr("readOnly", "readOnly");
	$("#zipCd").attr("readOnly", "readOnly");
	$("#cityNm").attr("readOnly", "readOnly");
	$("#stateNm").attr("readOnly", "readOnly");
};

//숫자 세자리마다 콤마
function setComma(n){
	var reg = /(^[+-]?\d+)(\d{3})/;
	n += '';
	while (reg.test(n))
	 n = n.replace(reg, '$1' + ',' + '$2');

	return n;
}