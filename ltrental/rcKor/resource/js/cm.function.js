
/** Script logger */
var logger = {
	level: 2,	// 0: none, 1: info, 2: debug, 3: alert
	info: function (msg) {
		if(typeof console == "undefined") {return "";}
		if (logger.level > 0) {logger._print(msg);}
	}, debug: function (subject, msg) {
		if(typeof console == "undefined") {return "";}
		if (logger.level > 1) {
			logger._print("[DEBUG] " + subject);
			logger._print(msg);
		}
	}, error: function (msg) {
		if(typeof console == "undefined") {return "";}
		if (logger.level > 0) {logger._error(msg);}
	}, _print: function (msg) {
		if(typeof console == "undefined") {return "";}
		logger.level == 3 ? alert(msg) : console.log(msg);
	}, _error: function (msg) {
		if(typeof console == "undefined") {return "";}
		logger._print("[ERROR]");
		console.log(msg);
	}
};

var setUploadData = function(result){
	if(result.result){
		$("#fileList").empty();
	    $("#fileForm").val("");
	    var isFile = false;
		$.each(result.resultList, function (intIndex, strValue) {
			var thisData = result.resultList[intIndex];
			var innerHtml = "";

			innerHtml += "<div class=\"MultiFile-label\">";
			if(typeof($("#atchViewType").val()) == "undefined" || $("#atchViewType").val() == "insert"){
				innerHtml += "<a href=\"javascript:fncFileDelete('"+thisData.atchFileId+"', '"+thisData.fileSn+"');\" class=\"btnGray small\"><span>DEL</span></a>&nbsp;";
			}
			innerHtml += "<a href=\"javascript:fncFileDownload('"+thisData.atchFileId+"', '"+thisData.fileSn+"');\" class=\"btnGray small\"><span>"+thisData.orignFileNm+"</span></a>";
			innerHtml += "<span class=\"MultiFile-title\" style=\"color:#000;font-size:30px;\">";
			//innerHtml += "<a href=\"javascript:fncFileDownload('"+thisData.atchFileId+"', '"+thisData.fileSn+"');\" title=\""+thisData.orignFileNm+" 다운로드\" >"+thisData.orignFileNm+"</a>;";
			innerHtml += "</span>";
			innerHtml += "</div>";
		   
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

var setUploadData2 = function(result, id){
	if(result.result){
		$("#fileList"+id).empty();
	    $("#fileForm"+id).val("");
	    var isFile = false;
		$.each(result.resultList, function (intIndex, strValue) {
			var thisData = result.resultList[intIndex];
			var innerHtml = "";

			innerHtml += "<div class=\"MultiFile-label\">";
			if(typeof($("#atchViewType").val()) == "undefined" || $("#atchViewType").val() == "insert"){
				innerHtml += "<a href=\"javascript:fncFileDelete2('"+thisData.atchFileId+"', '"+thisData.fileSn+"', '"+id+"');\" class=\"btnGray small\"><span>DEL</span></a>&nbsp;";
			}
			innerHtml += "<a href=\"javascript:fncFileDownload('"+thisData.atchFileId+"', '"+thisData.fileSn+"');\" class=\"btnGray small\"><span>"+thisData.orignFileNm+"</span></a>";
			innerHtml += "<span class=\"MultiFile-title\" style=\"color:#000;font-size:30px;\">";
			//innerHtml += " &lt;a href=\"javascript:fncFileDownload('"+thisData.atchFileId+"', '"+thisData.fileSn+"');\" title=\""+thisData.orignFileNm+" 다운로드\" &gt;"+thisData.orignFileNm+"&lt;/a&gt;";
			innerHtml += "</span>";
			innerHtml += "</div>";
			$("#fileList"+id).append(innerHtml);
	   		$("#atchFileId"+id).val(thisData.atchFileId);
	   		isFile = true;
		});	
		if(!isFile){
	   		$("#atchFileId"+id).val("");
		}
	}else{
        alert("파일업로드중 장애가 발생하였습니다. 운영담당자에게 문의하여 주시기 바랍니다.");
	}
};

var fncFileDelete = function(atchFileId, fileSn){
	$.getJSON("/atch/fileDelete.json?atchFileId=" + atchFileId + "&fileSn="+fileSn, function (result) {
		if(typeof(result.resultList) == "object"){
			setUploadData(result);
		}
	});
};

var fncFileDelete2 = function(atchFileId, fileSn, id){
	$.getJSON("/atch/fileDelete.json?atchFileId=" + atchFileId + "&fileSn="+fileSn, function (result) {
		if(typeof(result.resultList) == "object"){
			setUploadData2(result, id);
		}
	});
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

var fncGetFileList2 = function(atchFileId, id){
	$.getJSON("/atch/getFileList.json?atchFileId=" + atchFileId, function (result) {
		if(typeof(result.resultList) == "object"){
			setUploadData2(result, id);
		}else{
			alert("조회된 첨부파일 정보가 없습니다.");
			return false;
		}
	});
};

var fncGetFile = function(atchFileId, fileSn){
	$.getJSON("/atch/getFile.json?atchFileId=" + atchFileId + "&fileSn=" + fileSn, function (result) {
		if(typeof(result.fileVO) == "object"){
			setUploadData(result);
		}else{
			alert("조회된 첨부파일 정보가 없습니다.");
			return false;
		}
	});
};

var popFileList = function(atchFileId){
	var filePop = window.open('', 'fileListPop', 'width=600px, height=450px, scrollbars=yes');
	$("#subFrmAtchFileId").val(atchFileId);
	$("#subFrm").attr({"action" : "/atch/getFileList.do", "target" : "fileListPop", "method" : "post" }).submit();
	
	filePop.focus();
};

var checkValidate = function(form){	//Checkbox 
	var checkVal = 0;
	$.each($(form), function (intIndex, strValue) {
		if($(this).prop("checked")){
			checkVal++;
		}
	});
	if(checkVal == 0) return false;
	else return true;
};

$(document).ready(function(){
	if($("#atchFileId").val() != "" && typeof($("#atchFileId").val()) != "undefined" && $("#atchFileId").val() != "undefined"){
		fncGetFileList($("#atchFileId").val());
	}
    
    $("#fileUploadBtn").bind("click", function(){
    	if($("input[name='fileForm']").val() != ""){
	    	$("#defaultFrm").attr({"action": "/atch/fileUpload.json", "enctype" : "multipart/form-data"});
		    $("#defaultFrm").ajaxSubmit({
		       cache: false,
		       dataType:"json",
		       beforeSubmit: function (data, frm, opt) {
		           return true;
		       },
		       success: function(result, statusText){
		           setUploadData(result); //받은 정보를 화면 출력하는 함수 호출
		       },
		       error: function(e){
		           alert("파일업로드중 장애가 발생하였습니다. 운영담당자에게 문의하여 주시기 바랍니다.");
		           logger.debug(e);
		       }
		    });
    	}else{
    		alert("선택된 파일이 없습니다. 파일을 선택하여 주세요.");
    		return false;
    	}
	 });
});

(function ($) {
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
