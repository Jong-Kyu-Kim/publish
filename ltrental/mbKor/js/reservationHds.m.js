var rdoName= "";

$(document).ready(function(){
	
	$("input[name='hdsCheck']").change(function() {
		var ischecked = $(this).prop('checked');

		if(ischecked) {
			if ($("input[name='camping_yn']").val() == 'E') {
				$(this).prop('checked',false);
				$(this).trigger("change");
				alert("빠른(Express) 서비스 사용시 딜리버리 서비스 사용이 불가능합니다!.");

				return false;
			}else if(!$("input[name='userId']").val()){
				if(confirm("딜리버리 서비스를 예약하시려면 로그인이 필요합니다. 로그인하시겠습니까?")){
					location.href="/fr/kor/login/login.do";
					$(this).prop('checked',false);
					$("#hds_radio").hide();
				}
				
				$(this).prop('checked',false);
				$("#hds_radio").hide();

				return false;
			}
			
			var sdate = $("input[name='rentDate']").val() + $("input[name='rentTime']").val();
			
			var td = new Date(); 
			var hour48 = new Date(Date.parse(td)+1000*60*60*48);
			var hourTime48 = ""+hour48.getFullYear()+getDec(hour48.getMonth()+1)+getDec(hour48.getDate())+getDec(hour48.getHours())+getDec(hour48.getMinutes())+"00";

			var selectedPeriod = $("#showDate").text() + $("#showHour").text() + $("#showMinute").text() + $("#showReDate").text() + $("#showReHour").text() + $("#showReMinute").text();

			if(selectedPeriod == "" || isNaN($("#rentDate").val()) || isNaN($("#returnDate").val())) {
				alert("차량의 대여기간을 먼저 선택해 주세요.");
				$(this).prop('checked',false);
				$("INPUT:RADIO[NAME=hdsType]").eq(0).trigger("click");
				$("#hds_radio").hide();

				return false;
			}else if(sdate < hourTime48){
				alert("딜리버리 서비스는 대여 시작일로부터 48시간 전 예약 시 제공되는 서비스입니다. 딜리버리 서비스를 원하실 경우 지점으로 문의바랍니다.");
				$(this).prop('checked',false);
				$("INPUT:RADIO[NAME=hdsType]").eq(0).trigger("click");
				$("#hds_radio").hide();

				return false; 
			}

			if($("#selBranch").text() != "" || $("#selReBranch").text() != ""){
				if(confirm("딜리버리 서비스를 선택 또는 해제하시려면 지점을 다시 선택하셔야 합니다. 변경하시겠습니까?")){
					$("#rentBranch, #realBranch, #hdsBranch, #returnBranch, #konda_cdw, #konda, #vtweg").val("");
					$("#eplace, #splace, #rentArea, #areaCode, #ad_dlcr_fee, #ad_rtcr_fee").val("");

					$("INPUT:HIDDEN[NAME=rentZip], INPUT:HIDDEN[NAME=rentAddr1], INPUT:HIDDEN[NAME=rentAddr2]").val("");
					$("INPUT:HIDDEN[NAME=returnZip], INPUT:HIDDEN[NAME=returnAddr1], INPUT:HIDDEN[NAME=returnAddr2]").val("");

					$("#selBranch, #selReBranch").parent().addClass('noData');
					$("#selBranch, #selReBranch").parent().removeClass('pt20');
					$("#selBranch, #selReBranch").parent().parent().removeClass('on');
					$("#selBranch").text("");
					$("#selReBranch").text("");

					$("INPUT:RADIO[NAME=hdsType]").eq(0).trigger("click");

					//hdsSet();
				}else{
					$(this).prop('checked',false);
					$("#hds_radio").hide();
					return false;
				}
			}

			$("INPUT:RADIO[NAME=hdsType]").eq(0).trigger("click");
			$("#hds_radio").show();
			$(".btn_myStore").hide();
			
			//hdsSet();
		}else{
			if($("#selBranch").text() != "" || $("#selReBranch").text() != ""){
				if(confirm("딜리버리 서비스를 선택 또는 해제하시려면 지점을 다시 선택하셔야 합니다. 변경하시겠습니까?")){
					$("#rentBranch, #realBranch, #returnBranch, #konda_cdw, #konda, #vtweg").val("");
					$("#eplace, #splace, #rentArea, #areaCode, #ad_dlcr_fee, #ad_rtcr_fee").val("");

					$("INPUT:HIDDEN[NAME=rentZip], INPUT:HIDDEN[NAME=rentAddr1], INPUT:HIDDEN[NAME=rentAddr2]").val("");
					$("INPUT:HIDDEN[NAME=returnZip], INPUT:HIDDEN[NAME=returnAddr1], INPUT:HIDDEN[NAME=returnAddr2]").val("");

					$("#selBranch, #selReBranch").parent().addClass('noData');
					$("#selBranch, #selReBranch").parent().removeClass('pt20');
					$("#selBranch, #selReBranch").parent().parent().removeClass('on');
					$("#selBranch").text("");
					$("#selReBranch").text("");

					$("INPUT:RADIO[NAME=hdsType]").eq(0).trigger("click");
					
					//hdsSet();
				}else{
					$(this).prop('checked',true);
					$("#hds_radio").show();
					$(".btn_myStore").hide();
					return false;
				}
			}

			$("INPUT:RADIO[NAME=hdsType]").eq(0).trigger("click");
			$("#hds_radio").hide();
			$(".btn_myStore").show();

			hdsReset();
			carReset();
			resetOptionChk();
			resetOption(); // 옵션
			resetPoint(); // 포인트
			resetGift(); // 무료이용권
			resetVal();
		}
	});


	$(".zipcode").click(function(){
		if(this.id=="hds_return" && !$("input[name='rentBranch']").val()){
			alert("차량의 대여/반납 지점을 먼저 선택해 주세요.");
			return;
		}
		$(this).parent().next().next().next().show();
		_zipCheck(this.id.split("_")[1]);
	});

	$(".pop_Readdress").off('click');

	$(".pop_Readdress").click(function(){
		if(this.id=="hds_return" && !$("input[name='rentBranch']").val()){
			alert("차량의 대여/반납 지점을 먼저 선택해 주세요.");
			return false;
		}else{
			$(function(){
				function layerPop (id) {
					$('html, body').css('overflow','hidden');

					var layer = function() {

						if ($('#' + id).height() >= $(window).height()) {
							$('#' + id).find('.layer_con').height($(window).height() - 160);
						}else {
							$('#' + id).find('.layer_con').css('height','inherit');
						}

						$('#' + id).css({
							'top': ($(window).height() / 2) + $(window).scrollTop() - ($('#' + id).height() / 2),
							'left': ($(window).width() - $('#' + id).width()) / 2,
						});
					}

					$('.dimm').css({
						'width': $('html, body').width(),
						'height': $('html, body').height()
					})
					.show();

					layer();
					$('#' + id).show().attr('tabindex',0).focus();

					$(window).resize(function(){
						layer();
						$('.dimm').css({
							'width': $('html, body').width(),
							'height': $('html, body').height()
						});
					});
				}

				layerPop('pop_Readdress');
		    });
		} 
		
		/*$(this).parent().next().next().next().show();
		_zipCheck(this.id.split("_")[1]);*/
	});
	

	// 딜리버리 서비스 라디오버튼 클릭 시 (대여+반납, 대여, 반납)
	$("input[name='hdsType']").on('change', function(){
		carReset();

		resetOptionChk();
		resetOption(); // 옵션
		resetPoint(); // 포인트
		resetGift(); // 무료이용권
		resetVal();

		setAreaName();
		
		var checkedVal = $("INPUT:RADIO[NAME=hdsType]:CHECKED").val();

		if(checkedVal == "A"){
			hdsCheck = "0";

			$("#selBranch, #selReBranch").parent().addClass('noData');
			$("#selBranch, #selReBranch").parent().removeClass('pt20');
			$("#selBranch, #selReBranch").parent().parent().removeClass('on');
			$("#selBranch, #selReBranch").text("");

			$("#rentBranch, #realBranch, #hdsBranch, #vtweg, #konda, #konda_cdw, #eplace, #splace, #rentArea, #areaCode, #ad_dlcr_fee").val("");
			$("#returnBranch, #ad_rtcr_fee").val("");
		}else if(checkedVal == "B"){
			hdsCheck = "1";

			$("#selReBranch").parent().addClass('noData');
			$("#selReBranch").parent().removeClass('pt20');
			$("#selReBranch").parent().parent().removeClass('on');
			$("#selReBranch").text("");

			$("#returnBranch, #ad_rtcr_fee").val("");
		}else if(checkedVal == "C"){
			hdsCheck = "2";

			$("#selBranch").parent().addClass('noData');
			$("#selBranch").parent().removeClass('pt20');
			$("#selBranch").parent().parent().removeClass('on');
			$("#selBranch").text("");

			$("#rentBranch, #realBranch, #hdsBranch, #vtweg, #konda, #konda_cdw, #eplace, #splace, #rentArea, #areaCode, #ad_dlcr_fee").val("");
		}
	});
});
// 주소 팝업
function addrPopup() {
	window.open("/kor/popup/popAdressDoro.do", "popAdress" , "width=650, height=885, scrollbars=no,toolbar=no,noresize");
}

// 주소 값 셋팅
function addrSet(zip, addr, po){

    var tmpZip = zip;
	
	$('#'+po+'Zip').val(tmpZip);
	$('#'+po+'Addr1').val(addr);
	

	changeZipcode(po);
}
function hdsSet(){
	
	hdsValueReset();
	$("#hdsCheck").prop("checked",true);
	if($('input[name="hdsType"]:checked').val() == "A"){
         
		$("#hds_radio,#hds_rent_set1,#hds_rent_set2,#hds_rent_set3").show();
		$("#hds_return_set1,#hds_return_set2,#hds_return_set3").show();
		$("#rent_set1_HDS,#rent_set2,#return_set1_HDS,#return_set2").hide();
	
		
	}else if($('input[name="hdsType"]:checked').val() == "B"){
		$("#hds_radio,#hds_rent_set1,#hds_rent_set2,#hds_rent_set3,#return_set1_HDS,#return_set2").show();
		$("#hds_return_set1,#hds_return_set2,#hds_return_set3,#hds_return_branch,#hds_rent_branch,#rent_set1_HDS,#rent_set2").hide();	
	}else if($('input[name="hdsType"]:checked').val() == "C"){	
		$("#hds_radio,#hds_return_set1,#hds_return_set2,#hds_return_set3,#rent_set1_HDS,#rent_set2").show();
		$("#hds_rent_set1,#hds_rent_set2,#hds_rent_set3,#hds_return_branch,#hds_rent_branch,#return_set1_HDS,#return_set2").hide();
	}
	$('.reserve_box td').css('height','640px'); 	
	$('.car_brand_Box').css('height','365px');
	//settingBranchHDS();
}

function isHDS(){
	if($("#hdsCheck").prop("checked")){ 		
		return true;
	}else return false;
}
function hdsReset(){	
	$("#hdsCheck").prop("checked",false);
	checkboxReset($("#hdsCheck"));
	$("#hds_radio,#hds_rent_set1,#hds_rent_set2,#hds_rent_set3,#hds_return_set1,#hds_return_set2,#hds_return_set3,#hds_rent_branch,#hds_return_branch").hide();
	$("#rent_set1,#rent_set2,#return_set1,#return_set2").show();
	if($("#selRentBranch2").css("display")!="none" || $("#selReturnBranch2").css("display")!="none"){
		//$('.reserve_box td').css('height','530px'); 	
		//$('.car_brand_Box').css('height','265px');
	} else {
		//$('.reserve_box td').css('height','470px'); 	
		//$('.car_brand_Box').css('height','200px');
	}
	$(".ds_service").css("display","none");
	hdsValueReset();
}
function hdsValueReset(){
	$("#hds_rent_branch,#hds_return_branch").hide();	
	hdsBranchValueReset();		
	hdsRentValueReset();	
	hdsReturnValueReset();
}
function hdsValueResetReturn(){
	$("#hds_return_branch").hide();			
	hdsReturnValueReset();			
}

function hdsBranchValueReset(){	

	$("#selRentHdsBranch").val("");
	selectboxSet($("#selRentHdsBranch"),"");
	
	$("#selReturnHdsBranch").val("");
	selectboxSet($("#selReturnHdsBranch"),"");
	
	/*
	$(".area1").html("지역선택<img src='/include/img/ico/ico_down.png' class='ico_select' />");
	$(".area2").html("지역선택<img src='/include/img/ico/ico_down.png' class='ico_select' />");
	$(".area1a").html("지점선택<img src='/include/img/ico/ico_down.png' class='ico_select' />");
	$(".area2a").html("지점선택<img src='/include/img/ico/ico_down.png' class='ico_select' />");
	$(".area1h").html("배차장소<img src='/include/img/ico/ico_down.png' class='ico_select' />");
	$(".area2h").html("반차장소<img src='/include/img/ico/ico_down.png' class='ico_select' />");
	*/
}
function hdsRentValueReset(){	
	
	
	$("input[name='ad_dlcr_fee']").val("");
	$("input[name='as_dlcr_yn']").val("N");	
	
	$("input[name='rentZip']").val("");
	
	//$("input[name='rentZip1']").val("");
	//$("input[name='rentZip2']").val("");
	$("input[name='rentAddr1']").val("");
	$("input[name='rentAddr2']").val("");
	
	//$("input[name='konda_cdw']").val(""); // CDW 가격구룹
	//$("input[name='konda']").val("");
}
function hdsReturnValueReset(){
	
	$("input[name='ad_rtcr_fee']").val("");
	$("input[name='as_rtcr_yn']").val("N");
	$("input[name='returnZip']").val("");
	
	//$("input[name='returnZip1']").val("");
	//$("input[name='returnZip2']").val("");
	$("input[name='returnAddr1']").val("");
	$("input[name='returnAddr2']").val("");
	
	//$("input[name='konda_cdw']").val(""); // CDW 가격구룹
	//$("input[name='konda']").val("");
}
function hdsReturnValueReset2(){
	$("input[name='ad_rtcr_fee']").val("");
	$("input[name='as_rtcr_yn']").val("N");
	
	$("input[name='returnZip']").val("");
	
	//$("input[name='returnZip1']").val("");
	//$("input[name='returnZip2']").val("");
	$("input[name='returnAddr1']").val("");
	$("input[name='returnAddr2']").val("");	
	$("input[name='returnBranch']").val("");
	
	//$("input[name='konda_cdw']").val(""); // CDW 가격구룹
	//$("input[name='konda']").val("");
}
function changeZipcode(val){
	
//	setHDSList($("input[name='"+val+"Zip1']").val()+""+$("input[name='"+val+"Zip2']").val(),val);
    setHDSList($("input[name='"+val+"Zip']").val(),val);

}
function setHDSList(code,val){
	if($("input[name='hdsType']:checked").val()=="A"){
		hdsCheck = "0";
	} else if($("input[name='hdsType']:checked").val()=="B"){
		hdsCheck = "1";
	} else if($("input[name='hdsType']:checked").val()=="C"){
		hdsCheck = "2";
	}

	$("#divBranchList").empty();

	$.ajaxSetup({cache:false});

	$.ajax({
	    type: "POST",
	    dataType: "json",
	    async : asyncCheck,
		url : "/fr/kor/reservation/hdslist.do",
		data : {
			postcode : code,
			sDate : $("#rentDate").val()+$("#rentTime").val(),
			eDate : $("#returnDate").val()+$("#returnTime").val(),
			type : hdsCheck
		},
		success : function(data){	
			if(data.success == "N"){
				alert(data.message);
				return false;
			}else if(!data.HDSList || data.HDSList.length < 1){
				alert("딜리버리 서비스 가능 지역이 아닙니다.");
				$("#inputZip, #inputAddr1, #inputAddr2").val("");
				hdsValueReset(); 
				return false;
			}

			var txt = "";
			txt = settingBranchList(data.HDSList, "Y");

			$("#divBranchList").empty();
			$("#divBranchList").append("<ul>"+txt+"</ul>");
			$("#divContentBranch").show();

			//afterArea();
			if (val=="car"){
				//carReset();
				//callCarList();
			}
			
		}
	});
}

function afterArea(){
	if($("input[name='editChk']").val()=="1"){
		
	}
}
function getHDSBranchPlusFee(code,branchcode){
	$.ajax({
	    type: "POST",
	    dataType: "json",
		url : "/fr/kor/reservation/hdsplusfee.do",
		data : {
			postcode : code,
			branchcode : branchcode,
			sDate : $("#rentDate").val()
		},
		success : function(data){
			//endRequest();
			if(data.success == "N"){
				alert(data.message);
				return false;
			}else if(!data.branchPlusFee || !data.branchPlusFee.CR_FEE || data.branchPlusFee.CR_FEE < 0){
				alert("딜리버리 서비스 가능지역이 아닙니다.");
				$("input[name='returnBranch']").val("");
				hdsValueResetReturn();
				return false;
			}else if(data.branchPlusFee.O_RESULT_CODE == "N"){
				alert("딜리버리 서비스 가능지역이 아닙니다.");
				$("input[name='returnBranch']").val("");
				hdsValueResetReturn();
				return false;
			}
			
			setHDSList($("#returnZip").val(),"return");
			if($("input[name='hdsType']:checked").val()=="A"){
				hdsCheck = "0";
			} else if($("input[name='hdsType']:checked").val()=="B"){
				hdsCheck = "1";
			} else if($("input[name='hdsType']:checked").val()=="C"){
				hdsCheck = "2";
				//$("input[name='returnBranch']").val($("input[name='rentBranch']").val());
			}
			
			if(hdsCheck!="1"){
				$("input[name='ad_rtcr_fee']").val(data.CR_FEE);
				$("input[name='as_rtcr_yn']").val("Y");
			}
			/*if($("input[name='rentBranch']").val() != "" && $("input[name='returnBranch']").val() != "") 
				callCarList();*/
		}
	});
}

var hdsBranchList = "";
var hdsBranchRList = "";
function setAreaHds(code,call){
	//resetCar();
	//if(!isRequest()){
		//resetArea();
	//	return;
	//}
	$.ajax({
	    type: "POST",
	    dataType: "json",
		url : "/kor/reservation/branchListOld.do",
		data : {
			areaCode : code,
			sDate : getResDate("sDate_"),
			eDate : getResDate("eDate_")
		},
		success : function(data){
			endRequest();
			if(data.success == "N"){
				alert(data.message);
				return false;
			}
			hdsBranchList = settingBranchList(data.branchList, "Y");
			hdsBranchRList = settingBranchList(data.branchRList, "Y");
			

			settingBranchHDS();
			
			if (call=="car"){
				//resetCar();
				callCarList();
			}
		}
	});
}

function settingBranchHDS(){
	$(".area1b ul").html("");
	$(".area1b ul").html(hdsBranchList);
	$(".area1b").hide();

	$(".area1b ul li span").click(function(){
		if(!isRequestArea(".area1")) return;
		resetCar();
		$(".area1a").html($(this).find("a").html()+"<img src='/include/img/ico/ico_down.png' class='ico_select' />");
		$(".area1a").prev().html($(this).attr("areaNm")+"<img src='/include/img/ico/ico_down.png' class='ico_select' />");
		$(".area1a").attr("branchCode",$(this).attr("branchcode"));
		$(".area1a").attr("areaCode",$(this).attr("areaCode"));
		$(".area1a").attr("active","off");
		
		settingClickHdsBranch(".area2", this);
		//수입차지점인 경우 중형으로 하드코딩
		if($(this).attr("branchcode")=="0000320") {
			$(".box04_tab li img").each(function(i,s){
				$(s).attr("src",$(s).attr("src").replace("on.png","off.png"));
			});
			$("#K0403").attr("src",$("#K0403").attr("src").replace("off.png","on.png"));
			
			$("input[name='carSize']").val("K0403");
		}
		$("input[name='rentBranch']").val($(this).attr("branchcode"));
		$("input[name='rentPlace']").val($(this).find("a").html());
		//if($("input[name='rentBranch']").val() && $("input[name='returnBranch']").val() && $("input[name='returnZip1']").val() && $("input[name='returnZip2']").val()){
		if($("input[name='rentBranch']").val() && $("input[name='returnBranch']").val() && $("input[name='returnZip']").val()){
		
			//if($("input[name='returnBranch']").val()) getHDSBranchPlusFee($("input[name='returnZip1']").val()+""+$("input[name='returnZip2']").val(),$("input[name='rentBranch']").val());
			if($("input[name='returnBranch']").val()) getHDSBranchPlusFee($("input[name='returnZip']").val(),$("input[name='rentBranch']").val());
			
			else getCarList($("input[name='carSize']").val());
		}
		if($(".hdsRadio.ico_radio_on").index() == 2){
			//$("input[name='returnBranch']").val($(this).attr("branchcode"));
			$("input[name='returnPlace']").val($(this).find("a").html());
		}
		$(".area1b").slideUp(100);
	});				
	
	$(".area2b ul").html("");	
	$(".area2b ul").html(hdsBranchRList);
	$(".area2b ul li span").click(function(){
		if(!isRequestArea(".area2")) return;
		resetCar();
		$(".area2a").html($(this).find("a").html()+"<img src='/include/img/ico/ico_down.png' class='ico_select' />");
		$(".area2a").attr("branchCode",$(this).attr("branchcode"));
		$(".area2a").attr("areaCode",$(this).attr("areaCode"));
		$(".area2a").attr("active","off");
		//$("input[name='returnBranch']").val($(this).attr("branchcode"));
		$("input[name='realBranch']").val($(this).attr("branchcode"));
		$("input[name='returnPlace']").val($(this).find("a").html());
		$(".area2b").slideUp(100);

		if($(".area2c").hasClass($(this).attr("branchcode")) && $(this).attr("branchcode") == "0000378"){
			$(".area2c").show();
		}
		if($("input[name='rentBranch']").val() && $("input[name='returnBranch']").val()) getCarList($("input[name='carSize']").val());
		else{
			alert("배차지점을 선택하세요.");
			resetArea();
			hdsValueReset();
			settingBranchHDS();
		}
		
	});
}
function settingClickHdsBranch(areaType, o){
	if(areaType=="selRentHdsBranch"){
		//$("#selReturnHdsBranch").empty();
		//$("#selReturnHdsBranch").append();
		//$("#selReturnHdsBranch").append("<option value='"+$("option:selected", "#selRentHdsBranch").val()+"' branchcode='"+$("option:selected", "#selRentHdsBranch").attr("branchcode")+"' areaCode='"+$("option:selected", "#selRentHdsBranch").attr("areaCode")+"' areaNm='"+$("option:selected", "#selRentHdsBranch").attr("areaNm")+"' hdsFee='"+$("option:selected", "#selRentHdsBranch").attr("hdsFee")+"' konda_cdw='"+$("option:selected", "#selRentHdsBranch").attr("konda_cdw")+"' konda='"+$("option:selected", "#selRentHdsBranch").attr("konda")+"'>"+$("option:selected", "#selRentHdsBranch").text()+"</option>");
		//$("#selReturnHdsBranch").val($("option:selected", "#selRentHdsBranch").val());
		selectboxSet($("#selReturnHdsBranch"),$("option:selected", "#selReturnHdsBranch").text());
	} else {
		$("#selRentHdsBranch").empty();
		$("#selRentHdsBranch").append("<option value='"+$("option:selected", "#selReturnHdsBranch").val()+"' branchcode='"+$("option:selected", "#selReturnHdsBranch").attr("branchcode")+"' areaCode='"+$("option:selected", "#selReturnHdsBranch").attr("areaCode")+"' areaNm='"+$("option:selected", "#selReturnHdsBranch").attr("areaNm")+"' hdsFee='"+$("option:selected", "#selReturnHdsBranch").attr("hdsFee")+"' konda_cdw='"+$("option:selected", "#selReturnHdsBranch").attr("konda_cdw")+"' konda='"+$("option:selected", "#selReturnHdsBranch").attr("konda")+"'>"+$("option:selected", "#selReturnHdsBranch").text()+"</option>");
		$("#selRentHdsBranch").val($("option:selected", "#selReturnHdsBranch").val());
		selectboxSet($("#selRentHdsBranch"),$("option:selected", "#selRentHdsBranch").text());
	}
}
function settingClickHdsBranchR(areaType){
	tmpReturnBranch = $("option:selected", "#selRentHdsBranch").attr("branchcode");
	var areaCode = $("input:radio[name=rdo-1]:checked").attr("areacode");
	if(areaType == "selReturnHdsBranch"){
		$("#selReturnAreaHDS").val(areaCode);
		selectboxSet($("#selReturnAreaHDS"),$("option:selected", "#selReturnAreaHDS").text());
		setAreaEventR($("#selReturnAreaHDS"));
	}
}

function settingClickHdsBranchR2(){	
	var code = $("input[name='rentBranch']").val();
	$.each($(".area2b ul li span"),function(i,s){		
		if($(s).attr("branchcode") == code){			
			$(".area2a").html($(s).html()+"<img src='/include/img/ico/ico_down.png' class='ico_select' />");
			//$("input[name='returnBranch']").val($(this).attr("branchcode"));							
			$("input[name='returnPlace'],input[name='rentPlace']").val($(this).find("a").html());
			getCarList($("input[name='carSize']").val());
		}		
	});
}


//@Override
function totalPrice(){
	hdsFee = $("input[name='ad_dlcr_fee']").val()*1 + $("input[name='ad_rtcr_fee']").val()*1;
	
	if (hdsFee > 0){
		$("#hds_p").show();
//		$("#hds_w").html(comma(hdsFee));
	}else{
		$("#hds_p").hide();
//		$("#hds_w").html("");
	}
}

/////////////////////////////// 대여 지점 //////////////////////////////

function makeListJson(jsonStr,page){
	var htmlStr = "";
	// jquery를 이용한 JSON 결과 데이터 파싱
	$(jsonStr.results.juso).each(function(i,e){
		htmlStr += "<tr>";
		htmlStr += "<td>"+(i+1)+"</td>";
//		htmlStr += "<td class=\"left\"><a href=\"#\" onclick=\"getJuso(\""+this.korAddr+"\",\""+this.zipNo+"\");\">"+this.korAddr+"</a></td>"; //영문일때는 이거로 //htmlStr += "<td class=\"left\"><a href=\"#\" onclick=\"getJuso("+this.korAddr+","+this.zipNo+")\">"+this.roadAddr+"</a></td>";
		htmlStr += "<td class='left'><a href=\"#\" onclick='getJuso(\""+this.roadAddrPart1+"\",\""+this.zipNo+"\");'>"+this.roadAddrPart1+"<br>(지번) "+this.jibunAddr+"</a></td>"; //영문일때는 이거로 //htmlStr += "<td class=\"left\"><a href=\"#\" onclick=\"getJuso("+this.korAddr+","+this.zipNo+")\">"+this.roadAddr+"</a></td>";
		htmlStr += "<td>"+this.zipNo+"</td>";
		htmlStr += "</tr>";
	});
	// 결과 HTML을 FORM의 결과 출력 DIV에 삽입
	$("#list").html(htmlStr);
	$("#addpaging").html(page);
}

function goPage(No) {
    var frm = document.form;
    frm.currentPage.value = No;
    getAddr();
}

function goRePage(No) {
    var frm = document.reformJuso;
    frm.currentPage.value = No;
    getReAddr();
}

function getJuso(addr,code) {
    
    	if($("#areaHdsCheck").prop("checked")){
            $("#rentZip").val(code);
            $("#rentAddr1").val(addr);
            $("#returnZip").val(code);
            $("#returnAddr1").val(addr);
    	} else {
    	    $("#rentZip").val(code);
    	    $("#rentAddr1").val(addr);
    	}
        $('#pop_address .btn_layer_close').trigger('click');
        $('#addressNum').focus();
        
        setHDSList($("#rentZip").val(),"rent");        
}

function getAddr(){
	// AJAX 주소 검색 요청
	$.ajax({
		url:"/fr/kor/reservation/short/getAddrApi.do"									// 고객사 API 호출할 Controller URL
		,type:"post"
		,data:$("#form").serialize() 								// 요청 변수 설정
		,dataType:"json"											// 데이터 결과 : JSON
		,success:function(jsonStr){									// jsonStr : 주소 검색 결과 JSON 데이터
			$("#list").html("");									// 결과 출력 영역 초기화
			var errCode = jsonStr.results.common.errorCode; 		// 응답코드
			var errDesc = jsonStr.results.common.errorMessage;		// 응답메시지
			if(errCode != "0"){ 									// 응답에러시 처리
				alert(errCode+"="+errDesc);
			}else{
				if(jsonStr.results.juso.length!=0){
					makeListJson(jsonStr,jsonStr.pageNavi);							// 결과 JSON 데이터 파싱 및 출력
				}else{
					var htmlStr = "<tr><td class=\"noData\" colspan=\"3\">검색 결과가 없습니다.</td></tr>";
					$("#list").html(htmlStr);
				}
			}
		}
		,error: function(xhr,status, error){
			alert("에러발생");										// AJAX 호출 에러
		}
	});
}

/////////////////////////////// 반납 지점 ///////////////////////////////

function makeListReJson(jsonStr,page){
	var htmlStr = "";
	// jquery를 이용한 JSON 결과 데이터 파싱
	$(jsonStr.results.juso).each(function(i,e){
		htmlStr += "<tr>";
		htmlStr += "<td>"+(i+1)+"</td>";
//		htmlStr += "<td class=\"left\"><a href=\"#\" onclick=\"getJuso(\""+this.korAddr+"\",\""+this.zipNo+"\");\">"+this.korAddr+"</a></td>"; //영문일때는 이거로 //htmlStr += "<td class=\"left\"><a href=\"#\" onclick=\"getJuso("+this.korAddr+","+this.zipNo+")\">"+this.roadAddr+"</a></td>";
		htmlStr += "<td class='left'><a href=\"#\" onclick='getReJuso(\""+this.roadAddrPart1+"\",\""+this.zipNo+"\");'>"+this.roadAddrPart1+"<br>(지번) "+this.jibunAddr+"</a></td>"; //영문일때는 이거로 //htmlStr += "<td class=\"left\"><a href=\"#\" onclick=\"getJuso("+this.korAddr+","+this.zipNo+")\">"+this.roadAddr+"</a></td>";
		htmlStr += "<td>"+this.zipNo+"</td>";
		htmlStr += "</tr>";
	});
	// 결과 HTML을 FORM의 결과 출력 DIV에 삽입
	$("#relist").html(htmlStr);
	$("#repaging").html(page);
}

function getReJuso(addr,code) {
    
    $("#returnZip").val(code);
    $("#returnAddr1").val(addr);

    $('#pop_Readdress').removeAttr('tabindex').hide();
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
    	
    $('#addressNum').focus();
    getHDSBranchPlusFee(code,$("input[name='rentBranch']").val());
}

function getReAddr(){
	// AJAX 주소 검색 요청
	$.ajax({
		url:"/fr/kor/reservation/short/getAddrApi.do"									// 고객사 API 호출할 Controller URL
		,type:"post"
		,data:$("#reformJuso").serialize() 								// 요청 변수 설정
		,dataType:"json"											// 데이터 결과 : JSON
		,success:function(jsonStr){									// jsonStr : 주소 검색 결과 JSON 데이터
			$("#list").html("");									// 결과 출력 영역 초기화
			var errCode = jsonStr.results.common.errorCode; 		// 응답코드
			var errDesc = jsonStr.results.common.errorMessage;		// 응답메시지
			if(errCode != "0"){ 									// 응답에러시 처리
				alert(errCode+"="+errDesc);
			}else{
				if(jsonStr.results.juso.length!=0){
					makeListReJson(jsonStr,jsonStr.pageNavi);							// 결과 JSON 데이터 파싱 및 출력
				}else{
					var htmlStr = "<tr><td class=\"noData\" colspan=\"3\">검색 결과가 없습니다.</td></tr>";
					$("#list").html(htmlStr);
				}
			}
		}
		,error: function(xhr,status, error){
			alert("에러발생");										// AJAX 호출 에러
		}
	});
}

function layerReClose(){
    $('.dimm, #pop_Readdress').hide();
    $('html, body').css('overflow','visible');
}

function layerClose(){
    $('.dimm, #pop_address').hide();
    $('html, body').css('overflow','visible');
}