//인증번호 이메일 전송
var chkCinfirmCode = "";
var mail_flag = "";
function sendLstaffMail() {
	if($("#recmndEmail1").val()=="" || $("#recmndEmail2").val()=="" ){
		alert("이메일 주소를 입력해주세요.");
	} else {
		$.ajax({
			url : "/fr/kor/recommendation/long/sendLStaffMail.do",
			type : "POST",
			data : {

				recmndName : $("#recmndName").val(),
				email1 : $("#recmndEmail1").val(),
				email2 : $("#recmndEmail2").val()						

			},
			success : function(data) {
				mail_flag = data.success;
				
				if (data.success == "Y") {
					chkCinfirmCode = data.code;					
					$("#staffDiv").css("display","block");
					
					alert("입력하신 롯데 임직원 메일로 인증번호를 발송하였습니다.\n메일에서 번호를 확인하여 아래에 입력한 후 인증해주세요.");
				} else {
					chkCinfirmCode = "";
					$("#staff_yn").val("N");
					$("#staffDiv").css("display","none");
					
					makeRecmndUrl();
				}
			},
			error: function (jqXHR, status, err) {
				alert("Status: " +status+ ", Error: " +err);
				
				mail_flag = "N";
				chkCinfirmCode = "";
				$("#staff_yn").val("N");
				$("#staffDiv").css("display","none");
				
				makeRecmndUrl();
			},
			dataType : "json"
		});
	}
}

//인증번호 확인
function chkMailCode() {
	if(mail_flag != "Y"){
		alert("인증번호를 받을 임직원 이메일을 입력해 주세요.");
		return;
	}
	if($("#confirmcd").val() == ""){
		alert("인증번호를 넣어 주십시오.");
		return;
	}
	if($("#confirmcd").val() != chkCinfirmCode){
		alert("인증번호가 일치하지 않습니다.");
		return ;
	}
	
	$("#staff_yn").val("Y");
	makeRecmndUrl();
}