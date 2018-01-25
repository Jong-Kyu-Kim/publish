(function ($){
    // 숫자 제외하고 모든 문자 삭제.
    $.fn.removeText = function(_v){
        //console.log("removeText: 숫자 제거 합니다.");
        if (typeof(_v)==="undefined")
        {
            $(this).each(function(){
                this.value = this.value.replace(/[^0-9]/g,'');
            });
        }
        else
        {
            return _v.replace(/[^0-9]/g,'');
        }
    };
     
    // php의 number_format과 같은 효과.
    $.fn.numberFormat = function(_v){
        this.proc = function(_v){
            var tmp = '',
                number = '',
                cutlen = 3,
                comma = ','
                i = 0,
                len = _v.length,
                mod = (len % cutlen),
                k = cutlen - mod;
                 
            for (i; i < len; i++)
            {
                number = number + _v.charAt(i);
                if (i < len - 1)
                {
                    k++;
                    if ((k % cutlen) == 0)
                    {
                        number = number + comma;
                        k = 0;
                    }
                }
            }
            return number;
        };
         
        var proc = this.proc;
        if (typeof(_v)==="undefined")
        {
            $(this).each(function(){
                this.value = proc($(this).removeText(this.value));
            });
        }
        else
        {
            return proc(_v);
        }
    };
     
    // 위 두개의 합성.
    // 콤마 불필요시 numberFormat 부분을 주석처리.
    $.fn.onlyNumber = function (p) {
        $(this).each(function(i) {
            $(this).attr({'style':'text-align:right;width:211px;'});
             
            this.value = $(this).removeText(this.value);
            this.value = $(this).numberFormat(this.value);
             
            $(this).bind('keypress keyup',function(e){
                this.value = $(this).removeText(this.value);
                this.value = $(this).numberFormat(this.value);
            });
        });
    };
     
    // 위 두개의 합성.
    // 콤마 불필요시 numberFormat 부분을 주석처리.
    $.fn.number = function (p) {
        $(this).each(function(i) {
            this.value = $(this).removeText(this.value);
             
            $(this).bind('keypress keyup',function(e){
                this.value = $(this).removeText(this.value);
            });
        });
    };
     
})(jQuery);
$(function(){
    $('.numberOnly').number();
    $('.numberFormat').onlyNumber();
    $(".bizNo").on("keyup", function(event){
    	event = event || window.event;
    	var _val = this.value.trim();
    	this.value = autoHypenBiz(_val) ;
    });
});

var fncLoginSubmit = function(){
	if($("#mbCellNo").val() == "" || $("#mbCellNo").val().replace(/(^\s+)|(\s+$)/g, "") == ""){
		alert("핸드폰번호를 입력하여 주시기 바랍니다");
		$("#mbCellNo").focus();
		return false;
	}else if($("#mbPwd").val() == "" || $("#mbPwd").val().replace(/(^\s+)|(\s+$)/g, "") == ""){
		alert("비밀번호를 입력하여 주시기 바랍니다.");
		$("#mbPwd").focus();
		return false;
	}else{
		$.post("/m/rebates/loginProcess.json", {"mbCellNo":$("#mbCellNo").val(), "mbPwd":$("#mbPwd").val()}, function (result) {
			if(typeof(result.resultCode) == "number" && result.resultCode == 1){
				if($("#returnUrl").val() != ""){
					location.href=decodeURIComponent($("#returnUrl").val().replace(/\+/g, " "));
				}else{
					location.href="/m/main.do";
				}
			}else if(typeof(result.resultCode) == "number" && result.resultCode == 2){
				location.href="/m/rebates/pwdModify.do";
			}else if(typeof(result.message) == "string" && result.message != ""){
				alert(result.message);
				return false;
			}else{
				alert("로그인 정보가 일치 하지 않습니다. 다시 확인하여 주시기 바립니다.");
				return false;
			}
		}, "json");
	}
};

var fncAuthSubmit = function(){
	if($("#agreeY").prop("checked") == false){
		alert("개인정보 처리방침에 동의하셔야 합니다.");
		$("#agreeY").focus();
		return false;
	}

	if($("#mbName").val() == "" || $("#mbName").val().replace(/(^\s+)|(\s+$)/g, "") == ""){
		alert("이름을 입력하여 주시기 바랍니다.");
		$("#mbName").focus();
		return false;
	}

	if($("#mbCellNo").val() == "" || $("#mbCellNo").val().replace(/(^\s+)|(\s+$)/g, "") == ""){
		alert("핸드폰번호를 입력하여 주시기 바랍니다.");
		$("#mbCellNo").focus();
		return false;
	}

	$.post("/m/rebates/joinDupl.json", {"mbCellNo":$("#mbCellNo").val(), "mbName": $("#mbName").val()}, function (result) {
		if(typeof(result.resultCode) == "number" && result.resultCode != 1){
			alert("이미 회원가입이 되어있는 휴대폰 번호입니다. 로그인 또는 비밀번호 찾기를 통해 접속해 주시기 바랍니다.");
		}else{
			$("#defaultFrame").attr("src", "/m/auth/front/checkPlus/checkPlusMain.do?type=join&customize=Mobile");
		}
	}, "json");

	return false;
};

var fncShowPwd = function(){
	$("#isAuth").val("Y");
	$("#btnSet1").hide();
	$(".hidden_info, #pwdInfo, #btnSet2").show();
	return;
};

var fncJoinSubmit = function(){
	if($("#isAuth").val() != "Y"){
		alert("휴대폰 본인인증을 해주시기 바랍니다.");
		return false;
	}
	
	if($("#mbPwd").val() == "" || $("#mbPwd").val().replace(/(^\s+)|(\s+$)/g, "") == ""){
		alert("비밀번호를 입력하여 주시기 바랍니다.");
		$("#mbPwd").focus();
		return false;
	}

	var pwd = $("#mbPwd").val();
	var ptrnCnt = 0;

	var chk_num			= pwd.search(/[0-9]/g); 
	var chk_lowerEng	= pwd.search(/[a-z]/g); 
	var chk_upperEng	= pwd.search(/[A-Z]/g); 
	var strSpecial		= pwd.search(/[~!@\#$%^&*()\-=+_\’?;:|'"]/gi);
	var impossibleChar	= pwd.search(/[,\.<>\/\\]/gi);
	var retVal			= fncCheckSpace(pwd);
	var retMsg			= "";

	if(impossibleChar > -1){
		alert("아래 특수문자는 허용되지 않습니다.\n[<, >, /, \, 마침표(.) 쉼표(,)]");
		return false;
	}

	if(chk_num > -1){ ++ptrnCnt; }
	if(chk_upperEng > -1){ ++ptrnCnt; }
	if(chk_lowerEng > -1){ ++ptrnCnt; }
	if(strSpecial > -1){ ++ptrnCnt; }
	
	if(retVal){
		retMsg = "비밀번호는 공백없이 [영문 + 숫자 + 특수문자] 조합 8자리 이상 20자 이내로 가능 합니다.";
	}else if(pwd.length < 8){
		retMsg = "비밀번호는 공백없이 [영문 + 숫자 + 특수문자] 조합 8자리 이상 20자 이내로 가능 합니다.";
	}else if(pwd.length > 20){
		retMsg = "비밀번호는 공백없이 [영문 + 숫자 + 특수문자] 조합 8자리 이상 20자 이내로 가능 합니다.";
	}else if(ptrnCnt < 3){
		retMsg = "비밀번호는 공백없이 [영문 + 숫자 + 특수문자] 조합 8자리 이상 20자 이내로 가능 합니다.";
	}

	if(retMsg != ""){
		alert(retMsg);
		$("#mbPwd").val("");
		$("#mbPwd").focus();
		return false;
	}

	if($("#reMbPwd").val() == "" || $("#reMbPwd").val().replace(/(^\s+)|(\s+$)/g, "") == ""){
		alert("비밀번호 확인을 입력하여 주시기 바랍니다.");
		$("#reMbPwd").focus();
		return false;
	}

	if($("#mbPwd").val() != $("#reMbPwd").val()){
		alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
		$("#mbPwd").focus();
		return false;
	}
	
	fncAuthCheckSubmit();
}

var fncAuthCheckSubmit = function(){
	$.post("/m/rebates/joinProcess.json", {"mbCellNo":$("#mbCellNo").val(), "mbName":$("#mbName").val(), "mbPwd":$("#mbPwd").val(), "reMbPwd":$("#reMbPwd").val()}, function (result) {
		if(typeof(result.resultCode) == "number" && result.resultCode == 1){
			alert("정상적으로 회원가입이 완료되었습니다.");
			location.href="/m/main.do";	
		}else if(typeof(result.message) == "string" && result.message != ""){
			alert(result.message);
			return false;
		}else{
			alert("회원가입에 실패하였습니다. 잠시후 시도하여 주시기 바랍니다.");
			return false;
		}
	}, "json");
};


var fncFindCheckSubmit = function(){
	if($("#mbCellNo").val() == "" || $("#mbCellNo").val().replace(/(^\s+)|(\s+$)/g, "") == ""){
		alert("핸드폰번호를 입력하여 주시기 바랍니다.");
		$("#mbCellNo").focus();
		return false;
	}

	if($("#mbName").val() == "" || $("#mbName").val().replace(/(^\s+)|(\s+$)/g, "") == ""){
		alert("이름을 입력하여 주시기 바랍니다.");
		$("#mbName").focus();
		return false;
	}
	
	$.post("/m/rebates/findPwdCheck.json", {"mbCellNo":$("#mbCellNo").val(), "mbName" : $("#mbName").val()}, function (result) {
		if(typeof(result.resultCode) == "number" && result.resultCode == 0){
			alert("입력하신 정보와 일치하는 회원 정보가 없습니다.");
		}else{
			$("#defaultFrame").attr("src", "/m/auth/front/checkPlus/checkPlusMain.do?type=findPwd&customize=Mobile");
		}
	}, "json");

	return false;
};

var fncFindActionSubmit = function(){
	$.post("/m/rebates/findPwdAction.json", {"mbCellNo":$("#mbCellNo").val(), "mbName" : $("#mbName").val()}, function (result) {
		if(typeof(result.resultCode) == "number" && result.resultCode == 0){
			alert("입력하신 정보와 일치하는 회원 정보가 없습니다.");
		}else{
			alert("고객님의 휴대폰으로 초기화된 비밀번호가 전송되었습니다. 로그인 화면에서 핸드폰 번호와 초기화된 비밀번호를 입력해서 로그인하신 후에 비밀번호를 변경하시기 바랍니다.");
			location.href="/m/rebates/login.do";
		}
	}, "json");
	return false;
};

var fncPwdModifySubmit = function(){

	if($("#orgMbPwd").val() == "" || $("#orgMbPwd").val().replace(/(^\s+)|(\s+$)/g, "") == ""){
		alert("비밀번호를 입력하여 주시기 바랍니다.");
		$("#orgMbPwd").focus();
		return false;
	}

	if($("#mbPwd").val() == "" || $("#mbPwd").val().replace(/(^\s+)|(\s+$)/g, "") == ""){
		alert("비밀번호를 입력하여 주시기 바랍니다.");
		$("#mbPwd").focus();
		return false;
	}

	var pwd = $("#mbPwd").val();
	var ptrnCnt = 0;

	var chk_num			= pwd.search(/[0-9]/g); 
	var chk_lowerEng	= pwd.search(/[a-z]/g); 
	var chk_upperEng	= pwd.search(/[A-Z]/g); 
	var strSpecial		= pwd.search(/[~!@\#$%^&*()\-=+_\’?;:|'"]/gi);
	var impossibleChar	= pwd.search(/[,\.<>\/\\]/gi);
	var retVal			= fncCheckSpace(pwd);
	var retMsg			= "";

	if(impossibleChar > -1){
		alert("아래 특수문자는 허용되지 않습니다.\n[<, >, /, \, 마침표(.) 쉼표(,)]");
		return false;
	}

	if(chk_num > -1){ ++ptrnCnt; }
	if(chk_upperEng > -1){ ++ptrnCnt; }
	if(chk_lowerEng > -1){ ++ptrnCnt; }
	if(strSpecial > -1){ ++ptrnCnt; }
	
	if(retVal){
		retMsg = "비밀번호는 공백없이 [영문 + 숫자 + 특수문자] 조합 8자리 이상 20자 이내로 가능 합니다.";
	}else if(pwd.length < 8){
		retMsg = "비밀번호는 공백없이 [영문 + 숫자 + 특수문자] 조합 8자리 이상 20자 이내로 가능 합니다.";
	}else if(pwd.length > 20){
		retMsg = "비밀번호는 공백없이 [영문 + 숫자 + 특수문자] 조합 8자리 이상 20자 이내로 가능 합니다.";
	}else if(ptrnCnt < 3){
		retMsg = "비밀번호는 공백없이 [영문 + 숫자 + 특수문자] 조합 8자리 이상 20자 이내로 가능 합니다.";
	}

	if(retMsg != ""){
		alert(retMsg);
		$("#mbPwd").val("");
		$("#mbPwd").focus();
		return false;
	}

	if($("#reMbPwd").val() == "" || $("#reMbPwd").val().replace(/(^\s+)|(\s+$)/g, "") == ""){
		alert("비밀번호 확인을 입력하여 주시기 바랍니다.");
		$("#reMbPwd").focus();
		return false;
	}

	if($("#mbPwd").val() != $("#reMbPwd").val()){
		alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
		$("#mbPwd").focus();
		return false;
	}

	if($("#mbPwd").val() == $("#orgMbPwd").val()){
		alert("기존 비밀번호와 변경하실 비밀번호가 일치합니다.");
		$("#mbPwd").focus();
		return false;
	}
	
	$.post("/m/rebates/modifyPwd.json", {"orgMbPwd":$("#orgMbPwd").val(), "mbPwd":$("#mbPwd").val(), "reMbPwd":$("#reMbPwd").val()}, function (result) {
		if(typeof(result.resultCode) == "number" && result.resultCode == 1){
			alert("패스워드가 정상적으로 변경되었습니다.");
			location.href="/m/main.do";
		}else{
			alert(result.message);
		}
	}, "json");

	return false;
};

var fncAccountModify = function(seqNo){
	$("#seqNo").val(seqNo);
	$("#defaultFrm").attr({"action": "/m/rebates/apply/accountModify.do", "method" : "post", "target" : "_self"}).submit();
};

var fncCancelSubmit = function(){
	if(confirm("환급신청을 취소하시겠습니까?\n취소 하시더라도 다시 환급이 신청 가능합니다.")){
		$("#defaultFrm").attr({"action": "/m/rebates/apply/cancelAction.do", "method" : "post", "target" : "_self"}).submit();	
	}
};

var replaceAll = function(str, oldChar, newChar){
	var returnVal = str.split(oldChar).join(newChar);
	return returnVal;
};

var fncTempSubmit = function(){

	var buyDivnCd = $("#buyDivnCd1").prop("checked") ? '1' : $("#buyDivnCd2").prop("checked") ? '2' : '3';

	if($("#isBranchInfo").val() != "Y"){
		alert("조회버튼을 통해 구매 매장 정보를 입력하셔야 합니다.");
		return false;
	}

	if($("#productCd").val() == "" || $("#productCd").val().replace(/(^\s+)|(\s+$)/g, "") == ""){
		alert("조회버튼을 통해 제품정보를 입력하셔야 합니다.");
		return false;
	}
		
	if(isNaN(uncomma($("#salePrice").val()))){
		alert("구매 금액은 숫자만 입력하셔야 합니다.");
		$("#intSalePrice").focus();
		return false;
	}
	if(Number($("#salePrice").val()) <= 0){
		alert("구매 금액을 입력하셔야 합니다.");
		$("#intSalePrice").focus();
		return false;
	}
	if(typeof($("#saleMinute").val()) != "undefined"){
		if($("#saleDay").val() == "" || $("#saleDay").val().replace(/(^\s+)|(\s+$)/g, "") == ""){
			alert("구매일자를 입력하셔야 합니다.");
			$("#saleDay").focus();
			return false;
		}
		if($("#saleHour").val() != "" && isNaN(uncomma($("#saleHour").val()))){
			alert("구매시간은 숫자만 입력하셔야 합니다.");
			$("#saleHour").focus();
			return false;
		}
		if($("#saleHour").val().length > 2){
			alert("구매시간은 2자리 이상 입력하실 수 없습니다.");
			$("#saleHour").focus();
			return false;
		}
		if($("#saleHour").val() != "" && Number($("#saleHour").val()) > 23){
			alert("구매시간은 24시 이내로만 입력하셔야 합니다.");
			$("#saleHour").focus();
			return false;
		}
		if($("#saleMinute").val() != "" && isNaN(uncomma($("#saleMinute").val()))){
			alert("구매시간은 숫자만 입력하셔야 합니다.");
			$("#saleMinute").focus();
			return false;
		}
		if($("#saleMinute").val().length > 2){
			alert("구매시간은 2자리 이상 입력하실 수 없습니다.");
			$("#saleMinute").focus();
			return false;
		}
		if($("#saleMinute").val() != "" && Number($("#saleMinute").val()) > 59){
			alert("구매시간은 59분 이내로만 입력하셔야 합니다.");
			$("#saleMinute").focus();
			return false;
		}
		
		if($("#saleHour").val() != "" && $("#saleMinute").val() == ""){
			alert("구매시간과 분 둘중 하나만 입력이 불가 합니다.");
			$("#saleHour").focus();
			return false;
		}
		
		if($("#saleHour").val() == "" && $("#saleMinute").val() != ""){
			alert("구매시간과 분 둘중 하나만 입력이 불가 합니다.");
			$("#saleHour").focus();
			return false;
		}
	}
	
	$("#salePrice").val(uncomma($("#salePrice").val()));

	if($("#isSubmit").val() == "true"){
		alert("처리 중입니다. 잠시만 기다려 주십시오.");
		return false;
	}else{
		if(confirm("해당 내용으로 임시저장을 하시겠습니까?")){
			$("#isSubmit").val("true");
			$("#defaultFrm").attr({"action" : "tempAction.do", "method" : "post", "target" : "_self"}).submit();
		}
	}
};

var fncApplySubmit = function(){
	var buyDivnCd = $("#buyDivnCd1").prop("checked") ? '1' : $("#buyDivnCd2").prop("checked") ? '2' : '3';

	if($("#isBranchInfo").val() != "Y"){
		alert("조회버튼을 통해 구매 매장 정보를 입력하셔야 합니다.");
		return false;
	}
	
	if($("#productCd").val() == "" || $("#productCd").val().replace(/(^\s+)|(\s+$)/g, "") == ""){
		alert("조회버튼을 통해 제품정보를 입력하셔야 합니다.");
		return false;
	}
	
	if($("#corpNo").val() == "" || $("#corpNo").val().replace(/(^\s+)|(\s+$)/g, "") == ""){
		alert("사업자번호를 입력하셔야 합니다.");
		return false;
	}
	
	if($("INPUT:RADIO[NAME=buyDivnCd]:CHECKED").val() == "ON" && $("#buyNm").val() != "ETC" && $.trim($("#orderNo").val()) == ""){
		alert("온라인 매장에서 구입한 제품의 경우 주문번호(거래번호)는 필수 입력 항목입니다.");
		$("#orderNo").focus();
		return false;
	}
	
	if(!checkBizID($("#corpNo").val())){
		alert("유효하지 않은 사업자 번호입니다. 다시 확인하여 입력하여 주시기 바랍니다.");
		$("#corpNo").focus();
		return false;
	}
	
	if(isNaN(uncomma($("#salePrice").val()))){
		alert("구매 금액은 숫자만 입력하셔야 합니다.");
		$("#intSalePrice").focus();
		return false;
	}
	if(Number($("#salePrice").val()) <= 0){
		alert("구매 금액을 입력하셔야 합니다.");
		$("#intSalePrice").focus();
		return false;
	}
	if(typeof($("#saleMinute").val()) != "undefined"){
		if($("#saleDay").val() == "" || $("#saleDay").val().replace(/(^\s+)|(\s+$)/g, "") == ""){
			alert("구매일자를 입력하셔야 합니다.");
			$("#saleDay").focus();
			return false;
		}
		if($("#saleHour").val() != "" && isNaN(uncomma($("#saleHour").val()))){
			alert("구매시간은 숫자만 입력하셔야 합니다.");
			$("#saleHour").focus();
			return false;
		}
		if($("#saleHour").val() != "" && Number($("#saleHour").val()) > 23){
			alert("구매시간은 24시 이내로만 입력하셔야 합니다.");
			$("#saleHour").focus();
			return false;
		}
		if($("#saleMinute").val() != "" && isNaN(uncomma($("#saleMinute").val()))){
			alert("구매시간은 숫자만 입력하셔야 합니다.");
			$("#saleMinute").focus();
			return false;
		}
		if($("#saleMinute").val() != "" && Number($("#saleMinute").val()) > 59){
			alert("구매시간은 59분 이내로만 입력하셔야 합니다.");
			$("#saleMinute").focus();
			return false;
		}
		
		if($("#saleHour").val() != "" && $("#saleMinute").val() == ""){
			alert("구매시간과 분 둘중 하나만 입력이 불가 합니다.");
			$("#saleHour").focus();
			return false;
		}
		
		if($("#saleHour").val() == "" && $("#saleMinute").val() != ""){
			alert("구매시간과 분 둘중 하나만 입력이 불가 합니다.");
			$("#saleHour").focus();
			return false;
		}
	}
	if($("#saleAtchFileId").val() == "" && saleAtchFileIdFrame.$("#fileForm").val() != ""){
		alert("거래명세서 파일을 파일 업로드 버튼을 클릭해서 등록 하셔야 합니다.");
		$("#saleAtchFileId").focus();
		return false;
	}
	if($("#saleAtchFileId").val() == ""){
		alert("거래명세서 파일을 첨부 하셔야 합니다.");
		$("#saleAtchFileId").focus();
		return false;
	}
	if($("#serialNo").val() == "" || $("#serialNo").val().replace(/(^\s+)|(\s+$)/g, "") == ""){
		alert("제품 시리얼 번호를 입력 하셔야 합니다.");
		$("#serialNo").focus();
		return false;
	}
	if($("#serialYn").val() != "Y"){
		alert("제품 시리얼 번호 중복 확인을 클릭하셔서 중복을 확인하여 주시기 바랍니다.");
		$("#btn_serial").focus();
		return false;
	}
	
	if($("#serialNo").val() != $("#orgSerialNo").val()){
		alert("제품 시리얼 번호가 변경되었습니다. 중복 확인을 클릭하셔서 중복을 확인하여 주시기 바랍니다.");
		$("#btn_serial").focus();
		return false;
	}

	if($("#placeAtchFileId").val() == "" && placeAtchFileIdFrame.$("#fileForm").val() != ""){
		alert("명판 파일을 파일 업로드 버튼을 클릭해서 등록 하셔야 합니다.");
		$("#placeAtchFileId").focus();
		return false;
	}
	
	if($("#placeAtchFileId").val() == ""){
		alert("명판 파일을 첨부 하셔야 합니다.");
		$("#placeAtchFileId").focus();
		return false;
	}

	if($("#receiptAtchFileId").val() == "" && receiptAtchFileIdFrame.$("#fileForm").val() != ""){
		alert("증빙자료 파일을 파일 업로드 버튼을 클릭해서 등록 하셔야 합니다.");
		$("#receiptAtchFileId").focus();
		return false;
	}
	if($("#receiptAtchFileId").val() == ""){
		alert("증빙자료 파일을 첨부 하셔야 합니다.");
		$("#receiptAtchFileId").focus();
		return false;
	}
	if($("#bankCd").val() == "" || $("#bankCd").val().replace(/(^\s+)|(\s+$)/g, "") == ""){
		alert("환급 계좌 은행을 선택 하셔야 합니다.");
		$("#bankCd").focus();
		return false;
	}
	if($("#accountNo").val() == "" || $("#accountNo").val().replace(/(^\s+)|(\s+$)/g, "") == ""){
		alert("환급 계좌번호를 입력 하셔야 합니다.");
		$("#accountNo").focus();
		return false;
	}
	if($("#accountNm").val() == "" || $("#accountNm").val().replace(/(^\s+)|(\s+$)/g, "") == ""){
		alert("환급 예금주 성명을 입력 하셔야 합니다.");
		$("#accountNm").focus();
		return false;
	}
/*
	$("#accountCheckYn").val("Y");
	$("#authBankCd").val($("#bankCd").val());
	$("#authAccountNo").val($("#accountNo").val());
	$("#authAccountNm").val($("#accountNm").val());*/
	
/*	
	if($("#accountCheckYn").val() != "Y"){
		alert("계좌인증을 하셔야 합니다");
		$("#btn_auth_account").focus();
		return false;
	}
	if($("#authBankCd").val() != $("#bankCd").val()){
		alert("계좌정보가 변경되어 재인증을 하셔야 합니다.");
		$("#btn_auth_account").focus();
		return false;
	}
	if($("#authAccountNo").val() != $("#accountNo").val()){
		alert("계좌정보가 변경되어 재인증을 하셔야 합니다.");
		$("#btn_auth_account").focus();
		return false;
	}
	if($("#authAccountNm").val() != $("#accountNm").val()){
		alert("계좌정보가 변경되어 재인증을 하셔야 합니다.");
		$("#btn_auth_account").focus();
		return false;
	}
*/	
	
	if($("#applyYn").val() != "Y"){
		alert("환급금액을 확인 하셔야 합니다");
		$("#btn_auth_account").focus();
		return false;
	}
	if(uncomma($("#authSalePrice").val()) != uncomma($("#salePrice").val())){
		alert("구매금액이 변경되어 환급금액을 재확인 하셔야 합니다");
		$("#applyYn").val("N");
		$("#btn_auth_account").focus();
		return false;
	}
	
	$("#salePrice").val(uncomma($("#salePrice").val()));
	$.post("/m/rebates/apply/getRefundPrice.json?seqNo="+$("#seqNo").val()+"&category="+$("#category").val()+"&productCd="+$("#productCd").val()+"&salePrice="+uncomma($("#salePrice").val()), function (result) {
		if(typeof(result.resultCode) == "number" && result.resultCode == "1"){
			if(result.refundPrice > 0){
				if($("#isSubmit").val() == "true"){
					alert("처리 중입니다. 잠시만 기다려 주십시오.");
					return false;
				}else{
					if(confirm("해당 내용으로 환급신청을 하시겠습니까?")){
						$("#isSubmit").val("true");
						$("#defaultFrm").attr({"action" : "applyAction.do", "method" : "post", "target" : "_self"}).submit();
					}
				}
			}else{
				alert("환급 신청 가능 금액이 0원입니다.");
				return false;
			}
		}else if(result.resultCode == "PROD_DUPL"){
			alert($("#categoryNm").val() + " 품목은 이미 신청하셨으며, 품목당 한 번만 신청 가능합니다. 재신청을 원하실 경우 기존 품목에 대한 신청 건은 신청 취소하여 주시기 바랍니다.");
			return false;
		}else if(result.resultCode == "NO_REFUND"){
			alert("선택하신 제품은 환급 대상 제품이 아닙니다. 한국에너지공단(031-260-4496)으로 문의바랍니다.");
			return false;
		}else{
			alert(result.message);
			return false;
		}
	}, "json");
};

var fncDeleteSubmit = function(){
	if($("#isSubmit").val() == "true"){
		alert("처리 중입니다. 잠시만 기다려 주십시오.");
		return false;
	}else{
		if(confirm("해당 내용을 삭제 하시겠습니까?\n삭제하시면 복구 하실수 없습니다. 진행하시겠습니까?")){
			$("#salePrice").val(0);
			$("#isSubmit").val("true");
			$("#defaultFrm").attr({"action" : "deleteAction.do", "method" : "post", "target" : "_self"}).submit();
		}
	}
}

var fncGetModelDupl = function(){
	$.post("/m/rebates/apply/getModelDupl.json", {"productCd":$("#productCd").val()}, function (result) {
		if(typeof(result.resultCode) == "number" && result.resultCode == "1"){
			return true;
		}else{
			alert(result.message);
			return false;
		}
	}, "json");
};

var fncRefundPrice = function(){
	
	if(isNaN(uncomma($("#salePrice").val()))){
		alert("구매 금액은 숫자만 입력하셔야 합니다.");
		$("#intSalePrice").focus();
		return false;
	}
	if(Number(uncomma($("#salePrice").val())) <= 0){
		alert("구매 금액을 입력하셔야 합니다.");
		$("#intSalePrice").focus();
		return false;
	}
	if(Number(uncomma($("#salePrice").val())) > 100000000){
		alert("구매 금액이 허용범위를 초과하였습니다.");
		$("#intSalePrice").focus();
		return false;
	}

	$.post("/m/rebates/apply/getRefundPrice.json", {"seqNo":$("#seqNo").val(), "salePrice":uncomma($("#salePrice").val())}, function (result) {

		if(typeof(result.resultCode) == "number" && result.resultCode == "1"){
			$("#refundPrice").html("&nbsp;&nbsp;"+comma(uncomma(result.refundPrice))+"원");
			$("#applyYn").val("Y");
			$("#authSalePrice").val(uncomma($("#salePrice").val()));
			return false;
		}else{
			alert(result.message);
			return false;
		}
	}, "json");
};

var fncSerialDupl = function(){
	
	if($("#serialNo").val() == "" || $("#serialNo").val().replace(/(^\s+)|(\s+$)/g, "") == ""){
		alert("제품 시리얼번호를 입력하셔야 합니다.");
		$("#serialNo").focus();
		return false;
	}
	
	if($("#productCd").val() == "" || $("#productCd").val().replace(/(^\s+)|(\s+$)/g, "") == ""){
		alert("제품 조회를 통해 모델을 선택하셔야 합니다.");
		$("#serialNo").focus();
		return false;
	}

	$.post("/m/rebates/apply/getSerialDupl.json", {"serialNo":$("#serialNo").val(), "category":$("#category").val(), "productCorpNm":$("#productCorpNm").val(), "seqNo":$("#seqNo").val()}, function (result) {

		if(typeof(result.resultCode) == "number" && result.resultCode == "1"){
			$("#serial_n").hide();
			$("#serial_y").show();
			$("#orgSerialNo").val($("#serialNo").val());
			$("#serialYn").val("Y");
			return false;
		}else{
			$("#serial_y").hide();
			$("#serial_n").show();
			$("#orgSerialNo").val($("#serialNo").val());
			$("#serialYn").val("N");
			return false;
		}
	}, "json");
};

var fncAccountAuth = function(){
	$.post("/m/rebates/apply/getAccountAuth.json", {"accountNm":$("#accountNm").val(), "bankCd":$("#bankCd").val(), "accountNo":$("#accountNo").val()}, function (result) {

		if(typeof(result.resultCode) == "number" && result.resultCode == "1"){
			$("#authAccountMsg").show();
			$("#authAccountMsgFail").hide();
			$("#authBankCd").val($("#bankCd").val());
			$("#authAccountNo").val($("#accountNo").val());
			$("#authAccountNm").val($("#accountNm").val());
			$("#accountCheckYn").val("Y");
			return false;
		}else{
			$("#authAccountMsgFail").show();
			$("#authAccountMsgFail").html("예금주와 구매자명이 일치하지 않습니다.");
			$("#authAccountMsg").hide();
			$("#accountCheckYn").val("N");
			return false;
		}
	}, "json");
};

var fncGoSearchPop = function(){
	window.open("/m/product-pop.do", "제품정보검색", "scrollbars=yes,width=940,height=800");
};

var fncGoBranchPop = function(buyDivnCd){
	window.open("/m/branch-pop.do?schEtc01="+buyDivnCd, "매장정보검색", "scrollbars=yes,width=820,height=800");
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function comma(str) {
    return str.toString().replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}
function uncomma(str) {
    return str.toString().replace(/[^\d]+/g, '');
}
function checkBizID(bizID)  //사업자등록번호 체크 
{ 
    // bizID는 숫자만 10자리로 해서 문자열로 넘긴다. 
    var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1); 
    var tmpBizID, i, chkSum=0, c2, remander; 
     bizID = bizID.replace(/-/gi,''); 

     for (i=0; i<=7; i++) chkSum += checkID[i] * bizID.charAt(i); 
     c2 = "0" + (checkID[8] * bizID.charAt(8)); 
     c2 = c2.substring(c2.length - 2, c2.length); 
     chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1)); 
     remander = (10 - (chkSum % 10)) % 10 ; 

    if (Math.floor(bizID.charAt(9)) == remander) return true ; // OK! 
    else return false; 
} 

function autoHypenBiz(str){
    str = str.replace(/[^0-9]/g, '');
    var tmp = '';
    if( str.length < 4){
        return str;
    }else if(str.length < 6){
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3);
        return tmp;
    }else{              
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 2);
        tmp += '-';
        tmp += str.substr(5);
        return tmp;
    }
    return str;
}