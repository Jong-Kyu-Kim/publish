
$(document).ready(function(){
	$("#btn_go_search").click(function(){
		fncGoSearch();
		return false;
	});
	
	if($("#atchFileId").val() != "" && typeof($("#atchFileId").val()) != "undefined" && $("#atchFileId").val() != "undefined"){
		fncGetFileList($("#atchFileId").val());
	}
});

var fncGoSearch = function(){
	if($("#quickSearch").val() == "" || $("#quickSearch").val().length < 2){
		alert("검색어는 2자 이상 입력해주세요.");
		return false;
	}
	$("#searchFrm").submit();

};

function fncAuthCheckPlus( returnUrl ){
	/*$("#defaultFrame").attr("src","about:blank");
	$("#subFrm").attr({"action" : "", "target" : "defaultFrame"}).submit();*/
	//$("#defaultFrame").attr({"action" : "/auth/front/checkPlus/checkPlusMain.do", "target" : "defaultFrame"}).submit();
	$("#defaultFrame").attr("src" , "/auth/front/checkPlus/checkPlusMain.do?returnUrl="+ returnUrl );
};

function fncAuthIpin(  returnUrl ){
	// $("#subFrm").attr({"action" : "/auth/front/ipin/ipinMain.do", "target" : "defaultFrame"}).submit();
	$("#defaultFrame").attr("src" , "/auth/front/ipin/ipinMain.do?returnUrl="+  returnUrl );
};


var fncFileDownload = function(atchFileId, fileSn){
	$("#subFrmAtchFileId").val(atchFileId);
	$("#subFrmFileSn").val(fileSn);
	$("#subFrm").attr({"action" : "/atch/fileDown.do", "target" : "defaultFrame", "method" : "post" }).submit();
};

var fncGetFileList = function(atchFileId){
	$.getJSON("/atch/getFileList.json?atchFileId=" + atchFileId, function (result) {
		if(typeof(result.resultList) == "object"){
			setUploadData(result);
		}else{
			alert("조회된 첨부파일 정보가 없습니다.");
			return false;
		}
	});
};

var setUploadData = function(result){
	if(result.result){
		$("#fileList").empty();
	    var isFile = false;
		$.each(result.resultList, function (intIndex, strValue) {
			var thisData = result.resultList[intIndex];
			var innerHtml = "";

			//innerHtml += "<li>";
			innerHtml += "<a href=\"javascript:fncFileDownload('"+thisData.atchFileId+"', '"+thisData.fileSn+"');\" class=\"ico file\">"+thisData.orignFileNm+" ("+thisData.fileSize+")</a>";
			//innerHtml += "</li>";
		   
			
			$("#fileList").append(innerHtml);
	   		$("#atchFileId").val(thisData.atchFileId);
	   		isFile = true;
		});	
		if(!isFile){
	   		$("#atchFileId").val("");
		}
	}else{
        alert("파일업로드중 장애가 발생하였습니다. 운영담당자에게 문의하여 주시기 바랍니다.");
	}
};

var fncGetImgFileList = function(atchFileId, altTag){
	$.getJSON("/atch/getFileList.json?atchFileId=" + atchFileId, function (result) {
		if(typeof(result.resultList) == "object"){
			if(result.result){
				$("#photoList").empty();
				$.each(result.resultList, function (intIndex, strValue) {
					var thisData = result.resultList[intIndex];
					var innerHtml = "";

					innerHtml += "<div class=\"imgDetail\"><img src=\"/atch/getImage.do?atchFileId="+thisData.atchFileId+"&fileSn="+thisData.fileSn+" alt=\""+altTag+" 이미지\"/></div>";
				   
					$("#photoList").append(innerHtml);
			   		$("#atchFileId").val(thisData.atchFileId);
				});
				$(".imgDetail").find("img").each(function(){
					if($(this).width() > $("#photoList").width()){
						$(this).width($("#photoList").width());
					}
				});
			}
		}
	});
};

var win_zip = function(frm_name, frm_zip, frm_addr1, frm_addr2) {
    if(typeof daum === 'undefined'){
        alert("다음 우편번호 postcode.v2.js 파일이 로드되지 않았습니다.");
        return false;
    }

    var zip_case = 2;   //0이면 레이어, 1이면 페이지에 끼워 넣기, 2이면 새창

    var complete_fn = function(data){
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var fullAddr = ''; // 최종 주소 변수
        var extraAddr = ''; // 조합형 주소 변수

        // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            fullAddr = data.roadAddress;

        } else { // 사용자가 지번 주소를 선택했을 경우(J)
            fullAddr = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
        if(data.userSelectedType === 'R'){
            //법정동명이 있을 경우 추가한다.
            if(data.bname !== ''){
                extraAddr += data.bname;
            }
            // 건물명이 있을 경우 추가한다.
            if(data.buildingName !== ''){
                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
            extraAddr = (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
        }

        // 우편번호와 주소 정보를 해당 필드에 넣고, 커서를 상세주소 필드로 이동한다.
        var of = document[frm_name];

        of[frm_zip].value = data.zonecode;

        of[frm_addr1].value = fullAddr;

        of[frm_addr2].focus();
    };

    switch(zip_case) {
        case 1 :    //iframe을 이용하여 페이지에 끼워 넣기
            var daum_pape_id = 'daum_juso_page'+frm_zip,
                element_wrap = document.getElementById(daum_pape_id),
                currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
            if (element_wrap == null) {
                element_wrap = document.createElement("div");
                element_wrap.setAttribute("id", daum_pape_id);
                element_wrap.style.cssText = 'display:none;border:1px solid;left:0;width:100%;height:300px;margin:5px 0;position:relative;-webkit-overflow-scrolling:touch;';
                element_wrap.innerHTML = '<img src="//i1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" id="btnFoldWrap" style="cursor:pointer;position:absolute;right:0px;top:-21px;z-index:1" class="close_daum_juso" alt="접기 버튼">';
                jQuery('form[name="'+frm_name+'"]').find('input[name="'+frm_addr1+'"]').before(element_wrap);
                jQuery("#"+daum_pape_id).off("click", ".close_daum_juso").on("click", ".close_daum_juso", function(e){
                    e.preventDefault();
                    jQuery(this).parent().hide();
                });
            }

            new daum.Postcode({
                oncomplete: function(data) {
                    complete_fn(data);
                    // iframe을 넣은 element를 안보이게 한다.
                    element_wrap.style.display = 'none';
                    // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
                    document.body.scrollTop = currentScroll;
                },
                // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분.
                // iframe을 넣은 element의 높이값을 조정한다.
                onresize : function(size) {
                    element_wrap.style.height = size.height + "px";
                },
                width : '100%',
                height : '100%'
            }).embed(element_wrap);

            // iframe을 넣은 element를 보이게 한다.
            element_wrap.style.display = 'block';
            break;
        case 2 :    //새창으로 띄우기
            new daum.Postcode({
                oncomplete: function(data) {
                    complete_fn(data);
                }
            }).open();
            break;
        default :   //iframe을 이용하여 레이어 띄우기
            var rayer_id = 'daum_juso_rayer'+frm_zip,
                element_layer = document.getElementById(rayer_id);
            if (element_layer == null) {
                element_layer = document.createElement("div");
                element_layer.setAttribute("id", rayer_id);
                element_layer.style.cssText = 'display:none;border:5px solid;position:fixed;width:300px;height:460px;left:50%;margin-left:-155px;top:50%;margin-top:-235px;overflow:hidden;-webkit-overflow-scrolling:touch;z-index:10000';
                element_layer.innerHTML = '<img src="//i1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" class="close_daum_juso" alt="닫기 버튼">';
                document.body.appendChild(element_layer);
                jQuery("#"+rayer_id).off("click", ".close_daum_juso").on("click", ".close_daum_juso", function(e){
                    e.preventDefault();
                    jQuery(this).parent().hide();
                });
            }

            new daum.Postcode({
                oncomplete: function(data) {
                    complete_fn(data);
                    // iframe을 넣은 element를 안보이게 한다.
                    element_layer.style.display = 'none';
                },
                width : '100%',
                height : '100%'
            }).embed(element_layer);

            // iframe을 넣은 element를 보이게 한다.
            element_layer.style.display = 'block';
    }
}


var win_zip2 = function(frm_name, frm_zip, frm_addr1, frm_addr2) {
    if(typeof daum === 'undefined'){
        alert("다음 우편번호 postcode.v2.js 파일이 로드되지 않았습니다.");
        return false;
    }

    var zip_case = 0;   //0이면 레이어, 1이면 페이지에 끼워 넣기, 2이면 새창

    var complete_fn = function(data){
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var fullAddr = ''; // 최종 주소 변수
        var extraAddr = ''; // 조합형 주소 변수

        // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            fullAddr = data.roadAddress;

        } else { // 사용자가 지번 주소를 선택했을 경우(J)
            fullAddr = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
        if(data.userSelectedType === 'R'){
            //법정동명이 있을 경우 추가한다.
            if(data.bname !== ''){
                extraAddr += data.bname;
            }
            // 건물명이 있을 경우 추가한다.
            if(data.buildingName !== ''){
                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
            extraAddr = (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
        }

        // 우편번호와 주소 정보를 해당 필드에 넣고, 커서를 상세주소 필드로 이동한다.
        var of = document[frm_name];

        of[frm_zip].value = data.zonecode;

        of[frm_addr1].value = fullAddr;

        of[frm_addr2].focus();
    };

    switch(zip_case) {
        case 1 :    //iframe을 이용하여 페이지에 끼워 넣기
            var daum_pape_id = 'daum_juso_page'+frm_zip,
                element_wrap = document.getElementById(daum_pape_id),
                currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
            if (element_wrap == null) {
                element_wrap = document.createElement("div");
                element_wrap.setAttribute("id", daum_pape_id);
                element_wrap.style.cssText = 'display:none;border:1px solid;left:0;width:100%;height:300px;margin:5px 0;position:relative;-webkit-overflow-scrolling:touch;';
                element_wrap.innerHTML = '<img src="//i1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" id="btnFoldWrap" style="cursor:pointer;position:absolute;right:0px;top:-21px;z-index:1" class="close_daum_juso" alt="접기 버튼">';
                jQuery('form[name="'+frm_name+'"]').find('input[name="'+frm_addr1+'"]').before(element_wrap);
                jQuery("#"+daum_pape_id).off("click", ".close_daum_juso").on("click", ".close_daum_juso", function(e){
                    e.preventDefault();
                    jQuery(this).parent().hide();
                });
            }

            new daum.Postcode({
                oncomplete: function(data) {
                    complete_fn(data);
                    // iframe을 넣은 element를 안보이게 한다.
                    element_wrap.style.display = 'none';
                    // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
                    document.body.scrollTop = currentScroll;
                },
                // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분.
                // iframe을 넣은 element의 높이값을 조정한다.
                onresize : function(size) {
                    element_wrap.style.height = size.height + "px";
                },
                width : '100%',
                height : '100%'
            }).embed(element_wrap);

            // iframe을 넣은 element를 보이게 한다.
            element_wrap.style.display = 'block';
            break;
        case 2 :    //새창으로 띄우기
            new daum.Postcode({
                oncomplete: function(data) {
                    complete_fn(data);
                }
            }).open();
            break;
        default :   //iframe을 이용하여 레이어 띄우기
            var rayer_id = 'daum_juso_rayer'+frm_zip,
                element_layer = document.getElementById(rayer_id);
            if (element_layer == null) {
                element_layer = document.createElement("div");
                element_layer.setAttribute("id", rayer_id);
                element_layer.style.cssText = 'display:none;border:5px solid;position:fixed;width:300px;height:460px;left:50%;margin-left:-155px;top:50%;margin-top:-235px;overflow:hidden;-webkit-overflow-scrolling:touch;z-index:10000';
                element_layer.innerHTML = '<img src="//i1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" class="close_daum_juso" alt="닫기 버튼">';
                document.body.appendChild(element_layer);
                jQuery("#"+rayer_id).off("click", ".close_daum_juso").on("click", ".close_daum_juso", function(e){
                    e.preventDefault();
                    jQuery(this).parent().hide();
                });
            }

            new daum.Postcode({
                oncomplete: function(data) {
                    complete_fn(data);
                    // iframe을 넣은 element를 안보이게 한다.
                    element_layer.style.display = 'none';
                },
                width : '100%',
                height : '100%'
            }).embed(element_layer);

            // iframe을 넣은 element를 보이게 한다.
            element_layer.style.display = 'block';
    }
}

//로딩바 호출
function showload_aja(){
	$('.load_aja').css('display','block');
	$('body').append('<div class="dimm100"></div>')
}

//로딩바 호출
function delload_aja(){
	$('.load_aja').css('display','none');
	$('body .dimm100').css('display','none');
}

//ReplaceAll
var replaceAll = function(str, oldChar, newChar){
	var tmp = str.split(oldChar).join(newChar);
	return tmp;

//	return str.replace(new RegExp(oldChar, "gi"), newChar);
};

var fncChkOnlyNum = function(str){
	var RegExp = /[^0-9]/g;

	return RegExp.test(str) ? false : true;
};

//공백(Space) 유무 체크
var fncCheckSpace = function(str){
	if(str.search(/\s/) != -1){
		return true;
	}else{
		return false;
	}
}

//비밀번호 유효성 체크
var fncChkPwd = function(objId){
	var pwd = $("#"+objId).val();
	var ptrnCnt = 0;

	var chk_num			= pwd.search(/[0-9]/g); 
	var chk_lowerEng	= pwd.search(/[a-z]/g); 
	var chk_upperEng	= pwd.search(/[A-Z]/g); 
	var strSpecial		= pwd.search(/[`~!@#$%^&*|\'\";:?]/gi);
	var impossibleChar	= pwd.search(/[<>\/\\]/gi);
	var retVal			= fncCheckSpace(pwd);
	var retMsg			= "";

	if(impossibleChar > -1){
		alert("아래 특수문자는 허용되지 않습니다.\n[< , >, /, \\]");

		$("#"+objId).val("");
		$("#"+objId).focus();
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
		$("#"+objId).val("");
		$("#"+objId).focus();
		return false;
	}else{
		return true;
	}
};

$(document).ready(function(){
	$("#btn_logout").click(function(){
		location.href="/rebates/logout.do";
	});
});