var borrow = {
	init: function (options) {
		// 3가지 구분의 4가지 선택 타입 추가, // 내륙: 0, 제주: 1, 해외: 2
		borrow.data.choice = [];
		$.each(borrow.data.type, function () {
			borrow.data.choice.push({period: false, branch: false, mystery: false, ex: false})
		});
		console.log(options);

		var type = (options && options.type ? options.type : 0);
		// 초기 선택값 적용 
		borrow.action.setType(type);
		
		// UI 초기화
		borrow.ui.period.init();
		borrow.ui.branch.init();
	}, data: {
		currentType: 0
		, type: [
			{key: "inner", name: "내륙", current: true}
			, {key: "jeju", name: "제주", current: false}
			, {key: "foreign", name: "해외", current: false}
			, {key: "ds", name: "딜리버리 서비스", current: false}
		]
		, choice: []
	}, ui: {
		period: {
			init: function () {
				var _this = this;
				$("input[name='rent_date']").each(function () {$(this).val(moment().add(1, 'days').format("YYYY/MM/DD"))});
				$("input[name='rent_hour']").each(function () {$(this).val("10")});
				$("input[name='rent_minute']").each(function () {$(this).val("00")});
				$("input[name='return_date']").each(function () {$(this).val(moment().add(2, 'days').format("YYYY/MM/DD"))});
				$("input[name='return_hour']").each(function () {$(this).val("10")});
				$("input[name='return_minute']").each(function () {$(this).val("00")});
				$("input[name='rentTime']").val("100000");
				$("input[name='returnTime']").val("100000");
				
				var btn = $(".reserveCal").off('click').click(function(e){
					e.preventDefault();

					periodCalendarReinit(borrow.action.getType());

					/*
			        if ($(this).parents().is('._inner')) {
			            $('#reserveCal').addClass('_inner');
			        }
			        
			        if ($(this).parents().is('._jeju')) {
			            $('#reserveCal').addClass('_jeju');
			        }
					*/

					var rtnCode = _this.validate.open();	// 0: 정상, 1: 지점초기화, -1: 취소
					if (rtnCode > -1) {
						if (rtnCode > 0) {
							$(this).parent().siblings('.rent_popWrap').find('.innerBox').removeClass('on');
							borrow.ui.branch.reset();
						}
						_this.show();
					}
				});
				
				$('.sel_hour').selectmenu({
					change: function(){
						var $layerBtn = $('.' + $(this).parents('.layer').attr('id') + ':visible');
						if ($(this).parents().is('.left_cal')) {    
    	
							$layerBtn.siblings('.rent_hour').val($(this).val());
							$layerBtn.siblings('.start_hour').val($(this).val());                
						}
						else {            	
							$layerBtn.siblings('.return_hour').val($(this).val());
							$layerBtn.siblings('.end_hour').val($(this).val());                   
						}
					}
				}).selectmenu('refresh', true);
				
				$('.sel_minute').selectmenu({
					change: function(){
						var $layerBtn = $('.' + $(this).parents('.layer').attr('id') + ':visible');
						if ($(this).parents().is('.left_cal')) {
							$layerBtn.siblings('.rent_minute').val($(this).val());
							$layerBtn.siblings('.start_minute').val($(this).val());                
						}
						else {
							$layerBtn.siblings('.return_minute').val($(this).val());
							$layerBtn.siblings('.end_minute').val($(this).val());                   
						}
					}
				}).selectmenu('refresh', true);

				// $("#sHour").selectmenu({
				// 	change: function (event, ui) {
				// 		if (borrow.action.getType() === 1) {	// 제주
				// 			console.log(ui.value);
				// 		}
						
				// 	}
				// });

				// $("#sMin").selectmenu({
				// 	change: function (event, ui) {
				// 		console.log(ui.value);
				// 	}
				// });

				
			}, setData: function () {
				var _this = this;
				var rtnCode = _this.validate.confirm();
				if (rtnCode) {
					var rentDt = moment($("input[name='rent_date']").eq(borrow.data.currentType).val() 
							+ $("input[name='rent_hour']").eq(borrow.data.currentType).val() 
							+ $("input[name='rent_minute']").eq(borrow.data.currentType).val()
							, "YYYY/MM/DDHHmm");
					var returnDt = moment($("input[name='return_date']").eq(borrow.data.currentType).val() 
							+ $("input[name='return_hour']").eq(borrow.data.currentType).val() 
							+ $("input[name='return_minute']").eq(borrow.data.currentType).val()
							, "YYYY/MM/DDHHmm");

					$("input[name='rentDate']").val(rentDt.format("YYYYMMDD"));
					$("input[name='returnDate']").val(returnDt.format("YYYYMMDD"));
					$("input[name='rentTime']").val(rentDt.format("HHmm00"));
					$("input[name='returnTime']").val(returnDt.format("HHmm00"));
					//$('.btn_cal_confirm').trigger('click');
					$('#reserveCal .btn_cal_confirm').trigger('click');
					borrow.data.choice[borrow.data.currentType].period = true;
					borrow.data.choice[borrow.data.currentType].period.date = true;

					if (borrow.action.getType() == 0) {
						borrow.ui.branch.getBranch($("#selRentArea"));
						//borrow.ui.branch.getBranch($("#selReturnArea"));
					} else {
						borrow.ui.branch.getBranch($("#selRentJejuArea"));
						//borrow.ui.branch.getBranch($("#selReturnJeJuArea"));
					}
				} else if (rtnCode === 1) {	// 대여지점 초기화
					borrow.ui.branch.reset();
				}
			}, validate: {
				open: function () {
					var type = borrow.action.getType();
					var choice = borrow.data.choice[type];
					if (choice.period && choice.branch && !choice.ex || choice.ex) {
						if(confirm("대여/반납일시를 변경하면 지점을 다시 선택하셔야 합니다. 변경하시겠습니까?")) {
							return 1;
						} else {
							return -1;
						}
					} else {
						return 0;
					}
				}, confirm: function () {
					var serverTime = borrow.action.getServerTime();
					var rentDt = moment($("input[name='rent_date']").eq(borrow.data.currentType).val() 
							+ $("input[name='rent_hour']").eq(borrow.data.currentType).val() 
							+ $("input[name='rent_minute']").eq(borrow.data.currentType).val()
							, "YYYY/MM/DDHHmm");
					var returnDt = moment($("input[name='return_date']").eq(borrow.data.currentType).val() 
							+ $("input[name='return_hour']").eq(borrow.data.currentType).val() 
							+ $("input[name='return_minute']").eq(borrow.data.currentType).val()
							, "YYYY/MM/DDHHmm");
					if (rentDt.diff(serverTime, 'hours') <= 3) {
						alert("현재 시간으로 부터 3시간 이후부터 예약이 가능합니다.");
						return false;
					}
					if(returnDt.diff(rentDt, 'm') < 0) {
						alert("죄송합니다.\n대여시간 이후의 반납시간으로 설정해주세요.");
						return false;
					} 
					if(returnDt.diff(rentDt, 'days') > 30){
						alert("반납일은 대여일로부터 30일 이내여야 합니다.");
						return false;
					} 
					if (borrow.data.currentType == 1) {	// 제주
						if (rentDt.diff(serverTime, 'hours') < 6) {
							alert("죄송합니다.\n현재 시간으로 부터\n6시간 이후부터 예약이 가능합니다.");
							return false;
						}
						if ("0800" > rentDt.format("HHmm") 
								|| "2200" < rentDt.format("HHmm")
								|| "0800" > returnDt.format("HHmm")
								|| "2200" < returnDt.format("HHmm")) {
							alert("해당 지점 업무 시간을 확인해 주세요.\n\n"
									+ "대여일 업무시간 : 08:00 ~ 22:00" 
									+ "n반납일 업무시간 : 08:00 ~ 22:00" 
									// + $("input[name='rdoJeJu']").attr("tfrom").substring(0,5) 
									// + "~" 
									// + $("input[name='rdoJeJu']").attr("tend").substring(0,5)
									// + "\n\n반납일 업무시간 : " 
									// + $("input[name='rdoReJeJu']").attr("tfrom").substring(0,5) 
									// + "~" 
									// + $("input[name='rdoReJeJu']").attr("tend").substring(0,5)
							);
							return false;
						}
						if (returnDt.diff(rentDt, 'hours') < 24) {
							alert("죄송합니다.\n대여 정책에 따라 제주 지점의 대여는 24시간 이상 선택하셔야 대여가 가능합니다.");
							return false;
						}
					} 
					return true;
				}
			}, show: function () {
				borrow.ui.layerPop('reserveCal');
			}, reset: function () {
			}
		}
		, branch: {
			init: function () {
				var _this = this;
				var cboRent = [$("#selRentArea"), $("#selRentJejuArea")];
				var cboReturn = [$("#selReturnArea"), $("#selReturnJeJuArea")];
				
				$.each(cboRent, function (index, item) {
					cboRent[index].selectmenu({
						change: function (event, ui) {
							if (borrow.ui.branch.validate.change(this)) {
								_this.getBranch($(this));
							} else {
								_this.getBranch($(this), true);
							}
						}
					});
					cboReturn[index].selectmenu({
						change: function (event, ui) {
							//borrow.ui.branch.validate.change(this) ? _this.getBranch($(this)) : _this.resetCombo();
							if (borrow.ui.branch.validate.change(this)) {
								_this.getBranch($(this));
							} else {
								_this.getBranch($(this), true);
							}
						}
					});
					cboRent[index].selectmenu("refresh");
					cboReturn[index].selectmenu("refresh");
				});			
				
				// 지점 선택 레이어
				var btn = $(".layerSelBranch").off('click').click(function(e){
					e.preventDefault();
					var rtnCode = _this.validate.open();
					if (rtnCode) {
						_this.toggleArea();
						if (_this.isDelivery()) {
							$("#layerSelBranch ._inner, #layerSelBranch ._jeju").hide();
							$("#layerSelBranch ._ds").show();
						}
						borrow.ui.layerPop('layerSelBranch');
						//layerSelBranchDS					
					}	
				});

				// 딜리버리 서비스
				$("input[name='hdsCheck']").change(function() {
					var rtnCode = _this.validate.checkDs($(this));
					var type = borrow.data.currentType;
					var choice = borrow.data.choice[type];
					if(rtnCode) {
						if (choice.period && choice.branch && !choice.ex || choice.ex && $("#nomal").prop("checked") || $("#mystery").prop("checked")) {
							if(confirm("딜리버리 서비스를 선택 또는 해지 하려면 지점을 다시 선택하셔야 합니다. 변경하시겠습니까?")){
								$(this).parent().siblings('.rent_popWrap').find('.innerBox').removeClass('on');
								
								_this.reset();
								_this.showDelivery();

								// $("#selBranch").text('');
								// $("#selReBranch").text('');
								// $("#rentBranch").val('');
								// $("#returnBranch").val('');

								// $("#selRentBranch").empty();
								// $("#selRentBranch").append("");

								// $("#selReturnBranch").empty();
								// $("#selReturnBranch").append("");

								$(".layerMyStore").css("display","none");
								// return false;
							}
							$("input[name='hdsCheck']").prop("checked",true);
							$('.layerSelBranchDS').removeClass('noData');
						} else {
							_this.showDelivery();
						}
					}else{
						
						$("#selRentHdsBranch").empty();	
						$("#selRentHdsBranch").append("");
						
						$("#selReturnHdsBranch").empty();	
						$("#selReturnHdsBranch").append("");
						

						$("#my_local").show();	//나의 지점
						$("input[name='rentArea']").val("");			
						hdsReset();
						//resetArea();
						//resetAreaZ();
						//resetAreaZLayerA();
						//resetAreaZLayerB();
						carReset();
						resetOptionChk();
						resetOption(); // 옵션
						resetPoint(); // 포인트
						resetGift(); // 무료이용권
						resetVal();

						$(".ds_service").css("display","none");
						$(".layerMyStore").css("display","inline-block");
					}
					$("#oneway_comment").css("display","none");		//편도요금 noti
					$("#reSearch").removeClass('disabled');
				});
				
				$("#selRentDiv, #selReturnDiv, #hds_rent_branch, #hds_return_branch").scroll(function(){
					if($("#areaCheck").prop("checked") == true){
						if(popScroll == "rent"){
							$("#selReturnDiv").scrollTop($("#selRentDiv").scrollTop());
						} else if(popScroll == "return") {
							$("#selRentDiv").scrollTop($("#selReturnDiv").scrollTop());
						}
					}
					if($("#areaHdsCheck").prop("checked") == true){
						if(popScroll == "rent"){
							$("#hds_return_branch").scrollTop($("#hds_rent_branch").scrollTop());
						} else if(popScroll == "return") {
							$("#hds_rent_branch").scrollTop($("#hds_return_branch").scrollTop());
						}
					}
				});
			}, validate: {
				open: function () {
					var type = borrow.data.currentType;
					if (!borrow.data.choice[type].period) {
						alert("차량 대여일시를 선택하세요.");
						return false;
					} 
					return true;
				}, change: function (_this) {
					var serverTime = borrow.action.getServerTime();
					var rentDt = moment($("input[name='rent_date']").eq(borrow.data.currentType).val() 
							+ $("input[name='rent_hour']").eq(borrow.data.currentType).val() 
							+ $("input[name='rent_minute']").eq(borrow.data.currentType).val()
							, "YYYY/MM/DDHHmm");
					var returnDt = moment($("input[name='return_date']").eq(borrow.data.currentType).val() 
							+ $("input[name='return_hour']").eq(borrow.data.currentType).val() 
							+ $("input[name='return_minute']").eq(borrow.data.currentType).val()
							, "YYYY/MM/DDHHmm");
					var branchCode = $("#" + _this.id).val();
					if (branchCode == "1") {
						if (rentDt.diff(serverTime, 'hours') < 4) {
							alert("서울권역은 현재시간부터 4시간,\n대전/충청/세종 및 광주/전라지역은 3시간,\n그외권역은 6시간 이후 예약이 가능합니다.");
							return false;
						} else {
							return true;
						}
					} else if (areaCode == "3"||areaCode == "4") {
						if (rentDt.diff(serverTime, 'hours') < 3) {
							alert("서울권역은 현재시간부터 4시간,\n대전/충청/세종 및 광주/전라지역은 3시간,\n그외권역은 6시간 이후 예약이 가능합니다.");
							return false;
						} else {
							return true;
						}
					} else if (areaCode == "6") {
						if (rentDt.diff(serverTime, 'hours') < 6) {
							alert("제주권역은 6시간 이후 예약이 가능합니다.");
							return false;
						} else {
							return true;
						}
					} else {
						if (rentDt.diff(serverTime, 'hours') < 6) {
							alert("서울권역은 현재시간부터 4시간,\n대전/충청/세종 및 광주/전라지역은 3시간,\n그외권역은 6시간 이후 예약이 가능합니다.");
							return false;
						} else {
							return true;
						}
					}
				}, check: function (aCode , bCode) {
					var _this = this;
					var rentDt = moment($("input[name='rent_date']").eq(borrow.data.currentType).val() 
							+ $("input[name='rent_hour']").eq(borrow.data.currentType).val() 
							+ $("input[name='rent_minute']").eq(borrow.data.currentType).val()
							, "YYYY/MM/DDHHmm");
					var returnDt = moment($("input[name='return_date']").eq(borrow.data.currentType).val() 
							+ $("input[name='return_hour']").eq(borrow.data.currentType).val() 
							+ $("input[name='return_minute']").eq(borrow.data.currentType).val()
							, "YYYY/MM/DDHHmm");
					var param = {
						gubun : "S",
						carCode : $("input[name='carCode']").val(),
						rentDate : rentDt.format("YYYYMMDD"),
						rentTime : rentDt.format("HHmm00"),
						returnDate : returnDt.format("YYYYMMDD"),
						returnTime : returnDt.format("HHmm00"),
						areaCode : aCode,
						dsGubun : borrow.ui.branch.isDelivery() ? $("input[name='hdsType']:checked").val() : "",
						jejuAuto : aCode == "6" ? "X" : ""
					}
					var resultCode = false;
					$.ajax({
						type: "POST", dataType: "json", async : false, url : "/fr/kor/reservation/branchList.do", data : param,
						success : function(data) {
							$.each(data.branchList, function(i, item){
								if(bCode == item.VKGRP){
									if(s.ENABLE2 == "X" ){
										resultCode = true;
									}
									return false;
								}
							});
						}
					});
					return resultCode;
				}, checkChungju: function () {	//청주 평일 체크
					var param = {
						startDate : $("input[name='rent_date']").val().replace("/", "").replace("/", ""),
						endDate : $("input[name='return_date']").val().replace("/", "").replace("/", "")
					};
					var dayErrFlag = true;
					$.ajax({
						type: "POST", dataType: "json", async : false, url : "/fr/kor/reservation/weekdayCheck.do", data : param,
						success : function(data) {
							gvIsWeekday_s = data.is_weekday_s;
							gvIsWeekday_e = data.is_weekday_e;

							//대여일이 평일이 아닐때
							if(gvIsWeekday_s == "N" && $("input[name='rentBranch']").val() == "711" && $("input[name='splace']").val() == "02"){
								dayErrFlag = false;
								$("input[name='splace']").val("01");
								$("#selRentBranch2").val($("input[name='splace']").val());
								selectboxSet($("#selRentBranch2"),$("option:selected", "#selRentBranch2").text());
							}
							//반납일이 평일이 아닐때
							if(gvIsWeekday_e == "N" && $("input[name='returnBranch']").val() == "711" && $("input[name='eplace']").val() == "02"){
								dayErrFlag = false;
								$("input[name='eplace']").val("01");
								$("#selReturnBranch2").val($("input[name='eplace']").val());
								selectboxSet($("#selReturnBranch2"),$("option:selected", "#selReturnBranch2").text());
							}
							
							if(!dayErrFlag) {
								alert(INFO_MSG_711_DS);
							}
						}
					});
					return dayErrFlag;
				
				}, checkDs: function ($this) {
					// 딜리버리 서비스
					var type = borrow.data.currentType;
					var choice = borrow.data.choice[type];
					if (borrow.ui.branch.isDelivery()) {
						var rentDt = moment($("input[name='rentDate']").val()+$("input[name='rentTime']").val(), 'YYYYMMDDHHmm');
						if(!$("input[name='userId']").val()){
							if(confirm("딜리버리 서비스를 예약하시려면 로그인이 필요합니다. 로그인하시겠습니까?")){
								location.href="/fr/kor/login/login.do";
								borrow.ui.branch.unuseDelivery();
								return false;
							}
							borrow.ui.branch.unuseDelivery();
							return false;
						}
						if ($("input[name='camping_yn']").val() == 'E') {
							alert("빠른(Express) 서비스 사용시 딜리버리 서비스 사용이 불가능합니다!.");
							borrow.ui.branch.unuseDelivery();
							return false;
						}
						if (borrow.data.choice[type].period) {
							if(rentDt.diff(moment(), 'hours') < 48){	// jm.lee
								alert("딜리버리서비스는 대여시작 일로 부터 48시간 전 예약 시 제공되는 서비스 입니다. " 
										+  "딜리버리서비스를 원하실 경우 지점으로 문의바랍니다.");
								
								borrow.ui.branch.unuseDelivery();
								return false;
							}
						} else if(!borrow.data.choice[type].period){
							alert("대여일시와 반납일시를 입력하여 주세요.");
							borrow.ui.branch.unuseDelivery();
							return false;
						}

						if(borrow.data.choice[type].branch){
							// TODO: 영향도 체크 필요
							if(confirm("딜리버리 서비스를 선택 또는 해제하시려면 지점을 다시 선택하셔야 합니다. 변경하시겠습니까?")){
								$("#rentBranch, #realBranch, #hdsBranch, #returnBranch, #konda_cdw, #konda, #vtweg").val("");
								$("#eplace, #splace, #rentArea, #areaCode, #ad_dlcr_fee, #ad_rtcr_fee").val("");

								$("INPUT:HIDDEN[NAME=rentZip], INPUT:HIDDEN[NAME=rentAddr1], INPUT:HIDDEN[NAME=rentAddr2]").val("");
								$("INPUT:HIDDEN[NAME=returnZip], INPUT:HIDDEN[NAME=returnAddr1], INPUT:HIDDEN[NAME=returnAddr2]").val("");
								
								borrow.ui.branch.reset();
								return true;
								//hdsSet();
							}else{
								borrow.ui.branch.unuseDelivery();
								return false;
							}
						}
						return true;
					}
				}, confirm: function () {
					var _this = this;
				
					var check = _this.check();
					var $aCode = $("input:radio[name=rdo-1]:checked:visible");
					
					var serverTime = borrow.action.getServerTime();
					var rentDt = moment($("input[name='rent_date']").eq(borrow.data.currentType).val() 
							+ $("input[name='rent_hour']").eq(borrow.data.currentType).val() 
							+ $("input[name='rent_minute']").eq(borrow.data.currentType).val()
							, "YYYY/MM/DDHHmm");
					var returnDt = moment($("input[name='return_date']").eq(borrow.data.currentType).val() 
							+ $("input[name='return_hour']").eq(borrow.data.currentType).val() 
							+ $("input[name='return_minute']").eq(borrow.data.currentType).val()
							, "YYYY/MM/DDHHmm");

					// 포항공항의 경우 alert 공지
					if ($("input[name='rentBranch']").val() == "621") {
						alert("포항공항의 영업시간은\n\n월-목, 토요일 08:30~18:00 / 금요일, 일요일 08:30~18:00 입니다.\n\n온라인에서는 18시 예약만 가능하오니 \n\n20시까지 이용을 원하시는 고객님께서는\n\n고객센터(1588-1230)로 문의하시기 바랍니다.");
					}
					
					if($aCode.attr("value") != "청주공항" 
							&& $aCode.attr("value") != "청주" 
							&& $aCode.attr("value") != "부산역영업소" 
							&& $aCode.attr("value") != "부산광장호텔") {	
						if($("#rentBranch").val() == "" && $("#returnBranch").val() == ""){
							alert("대여지점과 반납지점을 입력하여 주세요.");
						} else if(!borrow.ui.branch.isDelivery() && ($aCode.attr("tfrom").replace(":", "").replace(":", "") > $("#rentTime").val() 
							|| $aCode.attr("tend").replace(":", "").replace(":", "") < $("#rentTime").val())){
							alert($aCode.attr("value") + "지점 업무시간을 확인해 주세요.!");
						} else if(check){
							alert($aCode.attr("value").replace("수입차지점", "수입차") + " 업무종료 시간을 확인해 주세요.!");		
						} else if($("input[name='rentBranch']").val()!="" 
								&& $("input[name='returnBranch']").val()!="" 
								&& $("input[name='rentBranch']").val() != $("input[name='returnBranch']").val() 
								&& returnDt.diff(rentDt, 'hours') < 24){
							alert("죄송합니다.\n대여정책에 따라 대여시간이 24시간 이상인 경우에만 편도 반납이 가능합니다.\n대여시간을 다시 선택해주세요.");
						} else if(!borrow.ui.branch.isDelivery() && $aCode.attr("tend") != "24:00:00" && !validTimeChk($aCode.attr("tfrom"), $aCode.attr("tend")) ){
							
						} else if($("input[name='rentBranch']").val() == "503" && !timeChk()){
							alert("06:00시 이후 인천공항 지점(032-743-8000)으로 문의 부탁 드립니다. 감사합니다.");
						} else if(!$("input[name='rentBranch']").val() == "503" 
								&& rentDt.diff(moment(), 'days') >= 60){
							alert("대여일은 현재일로부터 60일 이내여야 합니다.")
						} else {
							return true;
						}
						return false;
					} else {
						return _this.checkChungju();
					}
				}, confirmJeju: function () { // TODO - 다듬기 필요
					var _this = this;
				
					var $aCode = $("input:radio[name=rdo-1]:checked:visible");
					
					var serverTime = borrow.action.getServerTime();
					var rentDt = moment($("input[name='rent_date']").eq(borrow.data.currentType).val() 
							+ $("input[name='rent_hour']").eq(borrow.data.currentType).val() 
							+ $("input[name='rent_minute']").eq(borrow.data.currentType).val()
							, "YYYY/MM/DDHHmm");
					var returnDt = moment($("input[name='return_date']").eq(borrow.data.currentType).val() 
							+ $("input[name='return_hour']").eq(borrow.data.currentType).val() 
							+ $("input[name='return_minute']").eq(borrow.data.currentType).val()
							, "YYYY/MM/DDHHmm");

					
					if($("#rentBranch").val() == "" && $("#returnBranch").val() == ""){
						alert("대여지점과 반납지점을 입력하여 주세요.");
						return false;
					} 
					if(($aCode.attr("value") == '롯데호텔' 
							|| $("input:radio[name=rdo-2]:checked:visible").attr("value") == '롯데호텔') 
							&& rentDt.diff(serverTime, 'hours') < 24){
						alert("롯데호텔은 현재시간에서 24시간 이후 부터 예약 가능합니다.");
						return false;
					} 
					if(($aCode.attr("value") == '롯데호텔' || $("input:radio[name=rdo-2]:checked:visible").attr("value") == '롯데호텔') 
						&& (rentDt.format("HHmm") < "0900" || rentDt.format("HHmm") > "1900")
							|| (rentDt.format("HHmm") < "0900" || rentDt.format("HHmm") > "1900")){
						alert("롯데호텔은 대여시간과 반납시간이 9:00~19:00 사이 일 경우에 예약 가능합니다.");
						return false;
					} 
					if(returnDt.diff(rentDt, 'hours') < 24){
						alert("죄송합니다.\n대여 정책에 따라 제주 지점의 대여는 24시간 이상 선택하셔야 대여가 가능합니다.");
						return false;
					} 
					if(("0800" > $("#rentTime").val().substring(0,4) || "2200" < $("#rentTime").val().substring(0,4)) ||
						(("0800" > $("#returnTime").val().substring(0,4) || "2200" < $("#returnTime").val().substring(0,4)))){
						alert("해당 지점 업무 시간을 확인해 주세요.\n\n대여일 업무시간 : "+$("input[name='rdoJeJu']").attr("tfrom").substring(0,5)+"~"+$("input[name='rdoJeJu']").attr("tend").substring(0,5)
							+"\n\n반납일 업무시간 : "+ $("input[name='rdoReJeJu']").attr("tfrom").substring(0,5)+"~"+$("input[name='rdoReJeJu']").attr("tend").substring(0,5));
						return false;
					}
					return true;
				}
			}, toggleArea: function () {
				var currentType = borrow.data.currentType;
				var layer = $("#layerSelBranch");
				switch (currentType) {
					case 0:
						layer.find('._jeju, ._ds').hide();
						layer.find('._' + borrow.data.type[currentType].key).show();
					case 1:
						layer.find('._inner, ._jeju').hide();
						layer.find('._' + borrow.data.type[currentType].key).show();
					case 2:
						layer.find('._inner, ._ds').hide();
						layer.find('._' + borrow.data.type[currentType].key).show();
				}
			}, getBranch: function(_this, isDisabled) {	// TODO: 확인 필요
				var type = borrow.action.getType();
				var id = _this.attr("id");
				if(id == "selRentArea"){
					if($("#reservFrm1 input[name='rentArea']").val()!=$("option:selected", "#"+id).val()){
						$("#reservFrm1 input[name='returnPlace'],#reservFrm1 input[name='rentPlace']").val("");
					}
				}
				if(id == "selReturnArea"){
					if($("#reservFrm1 input[name='returnArea']").val()!=$("option:selected", "#"+id).val()){
						// $("#reservFrm1 input[name='returnBranch']").val("");
						$("#reservFrm1 input[name='returnPlace']").val("");
					} 
				}

				// 제주일 때 >>>>> 2017-04-24 by cw.park 추가
				if(id == "selRentJejuArea"){
					if($("#selRentJejuArea").val() == "6"){
						borrow.ui.branch.getBranchListSub("622","rent", isDisabled);
					}
				} else if(id == "selReturnJejuArea"){
					if($("#selReturnJejuArea").val() == "6"){
						borrow.ui.branch.getBranchListSub("622","return", isDisabled);
					}
				} else {
					borrow.ui.branch.getBranchList(id, isDisabled);
				}
			}, getBranchList: function (gubun, isDisabled) {	// reservation.js
				var rentDt = moment($("input[name='rent_date']").eq(borrow.data.currentType).val() 
						+ $("input[name='rent_hour']").eq(borrow.data.currentType).val() 
						+ $("input[name='rent_minute']").eq(borrow.data.currentType).val()
						, "YYYY/MM/DDHHmm");
				var returnDt = moment($("input[name='return_date']").eq(borrow.data.currentType).val() 
						+ $("input[name='return_hour']").eq(borrow.data.currentType).val() 
						+ $("input[name='return_minute']").eq(borrow.data.currentType).val()
						, "YYYY/MM/DDHHmm");
					
				var td = new Date(srvTime());
				var td1 = new Date(Date.parse(td) + 1000 * 60 * 60 * 4);	//서울
				var td2 = new Date(Date.parse(td) + 1000 * 60 * 60 * 6);	//그외
				var td3 = new Date(Date.parse(td) + 1000 * 60 * 60 * 3);	//대전충청세종및광주전라
				
				var time = $("input[name='rent_date']").val().replace("/", "").replace("/", "") + $("input[name='rent_hour']").val() + $("input[name='rent_minute']").val();
				var time2 = td1.getFullYear() + "" + getDec(td1.getMonth() + 1) + "" + getDec(td1.getDate()) + "" + getDec(td1.getHours()) + getDec(td1.getMinutes());
				var time3 = td2.getFullYear() + "" + getDec(td2.getMonth() + 1) + "" + getDec(td2.getDate()) + "" + getDec(td2.getHours()) + getDec(td2.getMinutes());
				var time4 = td3.getFullYear() + "" + getDec(td3.getMonth() + 1) + "" + getDec(td3.getDate()) + "" + getDec(td3.getHours()) + getDec(td3.getMinutes());
				

				var areaCode = "";
				
				if(gubun == "selRentArea"){
					areaCode = $("option:selected", "#selRentArea").val();
				} else if(gubun == "selRentAreaHDS"){
					areaCode = $("option:selected", "#selRentAreaHDS").val();
				} else if(gubun == "selReturnAreaHDS"){
					areaCode = $("option:selected", "#selReturnAreaHDS").val();
				} else {
					areaCode = $("option:selected", "#selReturnArea").val();
				}

				var gubunVal = "";
				if(gubun == "selRentArea"){
					gubunVal = "S";
				} else {
					gubunVal = "E";
				}
				
				hdsCheck = $("input[name='hdsCheck']").prop('checked') ? $("input[name='hdsType']:checked").val() : ""
					
				
				var jejuAuto = "";
				if(areaCode=="6"){
					jejuAuto = "X";
				}
				
				var carCode = $("#reservFrm1 input[name='carCode']").val();
				if(gubun == "selReturnArea"){
					carCode = "";
				}
				
				if(areaCode == "") {
					areaCode = $("#areaCode").val();
				}
				// 대여지점 리스트
				$.ajax({
					type: "POST",
					dataType: "json",
					async : true,
					url : "/fr/kor/reservation/branchList.do",
					data : {
						gubun : gubunVal,
						carCode : carCode,
						rentDate : rentDt.format("YYYYMMDD"),
						rentTime : rentDt.format("HHmm00"),
						returnDate : returnDt.format("YYYYMMDD"),
						returnTime : returnDt.format("HHmm00"),
						areaCode : areaCode,
						dsGubun : hdsCheck,
						jejuAuto : jejuAuto
					},
					success : function(data) {
						var rentBranchSelected = "Y";
						var returnBranchSelected = "Y";
						var txt = "";
						if($("#hdsCheck").val() != "") {
							// 딜리버리 서비스 추가
							$("#selReturnAreaHDS").val(areaCode);
							selectboxSet($("#selReturnAreaHDS"),$("option:selected", "#selReturnAreaHDS").text());
							
							txt = settingBranchList(data.branchList,"selReturnHdsBranch");
							$("#selReturnBranchHDS").empty();
							$("#selReturnBranchHDS").append(txt);
							
							// 딜리버리 반납 선택시,
							if(gubun == "selRentAreaHDS") {
								txt = settingBranchList(data.branchList,"selRentHdsBranch");
								$("#selRentBranchHDS").empty();
								$("#selRentBranchHDS").append(txt);
							} else if(gubun == "selReturnAreaHDS"){
								txt = settingBranchList(data.branchList,"selRentReHdsBranch");
								$("#selReturnBranchHDS").empty();
								$("#selReturnBranchHDS").append(txt);
								$("#rdo4-"+$("#hdsBranch").val()+"").prop("checked", true);
							}
							$("#rdo3-"+$("#hdsBranch").val()+"").prop("checked", true);
						}
						
						// 대여지점 반납지점 확인하여 셋팅
						if(gubun == "selRentArea"){
							var txt = settingBranchList(data.branchList,"selRentArea");
							//if($("option:selected", "#selReturnArea").val()==""){   // 2017-04-16 by cw.park 주석처리 디폴트 값이 1(서울)
								// 2017-04-16 by cw.park 추가
								if($("#areaCheck").is(":checked")){
									$("#selReturnArea").val($("option:selected", "#selRentArea").val());
											selectboxSet($("#selReturnArea"),$("option:selected", "#selRentArea").text());
											/*if($("option:selected", "#selReturnArea").val() == "3"){
										branchSubList("711","return");
											}*/
									// 대여/반납지점 동일 체크 시,
								}
							//}
						$("option[value='']", "#selRentArea").remove();

						var areaChange = "N";
						if($("option:selected", "#selRentArea").val()!=$("#reservFrm1 input[name='rentArea']").val()){
							areaChange = "Y";
						}

						$("#reservMainFrm input[name='rentArea']").val($("option:selected", "#selRentArea").val());

						$("#selRentBranch").empty();	// selectbox 초기화
						$("#selRentBranch").append(txt);
						/*if($("option:selected", "#selRentArea").val() == "3"){
							branchSubList("711","rent");
						}*/
						selectboxSet($("#selRentBranch"),$("option:selected", "#selRentBranch").text());
						// selectboxColor("selRentBranch");

						var tempBranchName = "";
						var tempBranchTime = "";
						
						if(tmpRentBranch!=""){	//기존 지점이 있는경우
						$("#selRentBranch option").each(function(i, s) {
							if($(s).val()!="" && $(s).prop("disabled") && tmpRentBranch==$(s).val()){
								rentBranchSelected = "N";	//선택할 수 없는 지점인 경우
								tempBranchName = $(s).text();
								tempBranchTime = $(s).attr("tfrom").substring( 0, 5 )+"~"+$(s).attr("tend").substring( 0, 5 );
							}
						});
						}

						if(rentBranchSelected=="N"){
							//alert("대여지점 업무종료 시간을 확인해 주세요.");
							alert("죄송합니다.\n대여일 기준 "+tempBranchName+" 지점 대여 가능 시간은 "+tempBranchTime+"입니다.\n대여지점을 다시 선택해주세요.");
							rentBranchReset();
							returnBranchReset();
							return false;
						} else {
							if(areaChange == "Y"){
								tmpRentBranch = "";
							}
							$("#selRentBranch").val(tmpRentBranch);
							selectboxSet($("#selRentBranch"),$("option:selected", "#selRentBranch").text());
						}
						
						// 2017-04-16 by cw.park 추가
						if($("#areaCheck").is(":checked")){
							// if(editMode=="N"){
							// 지역이 다른경우
							if($("option:selected", "#selRentArea").val()!=$("option:selected", "#selReturnArea").val()){
								branchListReturn("selReturnArea");
							} else {
								$("#reservMainFrm input[name='returnArea']").val($("option:selected", "#selRentArea").val());
								
								txt = settingBranchList(data.branchList,"selReturnArea", isDisabled);
								//returntxt = txt;
								$("#selReturnBranch").empty();	// selectbox 초기화
								$("#selReturnBranch").append(txt);
								
								selectboxSet($("#selReturnBranch"),$("option:selected", "#selReturnBranch").text());
								$("option[value='']", "#selReturnArea").remove();
								// selectboxColor("selReturnBranch");
								
								var areaChange2 = "N";
								if($("option:selected", "#selRentArea").val()!=$("#reservFrm1 input[name='rentArea']").val()){
									areaChange2 = "Y";
								}
								
								if(tmpReturnBranch!=""){	//기존 지점이 있는경우
									$("#selReturnBranch option").each(function(i, s) {
										if($(s).val()!="" && $(s).prop("disabled") && tmpReturnBranch==$(s).val()){
											returnBranchSelected = "N";	//선택할 수 없는 지점인 경우
										}
									});
								}
								if(returnBranchSelected=="N"){
									alert("반납지점 업무종료 시간을 확인해 주세요..");
									returnBranchReset();
									return false;
								} else {
									if(areaChange == "Y"){
										tmpReturnBranch = "";
									}
									$("#selReturnBranch").val(tmpReturnBranch);
									selectboxSet($("#selReturnBranch"),$("option:selected", "#selReturnBranch").text());

									if($("option:selected", "#selReturnBranch").val()==""){
										//$("#reservFrm1 input[name='returnBranch']").val("");
									}
								}
								
							}
						}

						//제주오토하우스
						if($("#jejuSetting").val()=="X"){
							//resetAreaZ();

							$("option[value='']", "#selRentBranch").remove();
							$("#selRentBranch").val("622");
							selectboxSet($("#selRentBranch"),$("option:selected", "#selRentBranch").text());

							$("option[value='']", "#selReturnBranch").remove();
							$("#selReturnBranch").val("622");
							selectboxSet($("#selReturnBranch"),$("option:selected", "#selReturnBranch").text());
							
							$("input[name='splace']").val("");
							$("input[name='eplace']").val("");
							
							branchListSub($("option:selected", "#selRentBranch").val(),"rent");
							
						}
							
					} else{
						if($("#areaCheck").is(":checked")){
							$("#selRentArea").val($("option:selected", "#selReturnArea").val());
								selectboxSet($("#selRentArea"),$("option:selected", "#selRentArea").text());
								// 대여/반납지점 동일 체크 시,
								txt = settingBranchList(data.branchList,"selRentArea");
							//returntxt = txt;
							$("#selRentBranch").empty();	// selectbox 초기화
							$("#selRentBranch").append(txt);
							/*if($("option:selected", "#selRentArea").val() == "3"){
								branchSubList("711","rent");
							}*/
						}
						
						$("option[value='']", "#selReturnBranch").remove();
					
						$("#reservMainFrm input[name='returnArea']").val($("option:selected", "#selReturnArea").val());
						/*if($("option:selected", "#selReturnArea").val() == "3"){
							branchSubList("711","return");
						}*/
						var txt = settingBranchList(data.branchList,"selReturnArea", isDisabled);
						$("#selReturnBranch").empty();	// selectbox 초기화
						if(gubun == "selRentAreaHDS"){
							$("#selReturnBranch").append('');
						} else {
							$("#selReturnBranch").append(txt);
						}
						// selectboxColor("selReturnBranch");

						returnBranchSelected = "N";
						if(nowProcess=="A")	tmpReturnBranch = "";

						if(tmpReturnBranch!=""){
						$("#selReturnBranch option").each(function(i, s) {
							if(returnBranchSelected=="N" && $(s).val()==tmpReturnBranch){
								returnBranchSelected = "Y";
							}
						});
						if(returnBranchSelected=="N"){
							tmpReturnBranch = "";
						}
						}
						
							$("#selReturnBranch").val(tmpReturnBranch);
							// $("#reservFrm1 input[name='returnBranch']").val(tmpReturnBranch);
						if($("option:selected", "#selReturnBranch").val()==""){
							$("#selReturnBranch").val("");
							// $("#reservFrm1 input[name='returnBranch']").val("");
						}
						$("#reservFrm1 input[name='returnPlace']").val($("option:selected", "#selReturnBranch").text());
						selectboxSet($("#selReturnBranch"),$("option:selected", "#selReturnBranch").text());
						
						}
					},
					error:function(request,status,error){
						alert("[지점]오류가 일시 발생하였습니다. 잠시 후 다시 시도해보시거나, 오류가 계속될 경우 고객센터(1588-1230)로 문의바랍니다.");
					}
				});
			}, getBranchListSub: function (code,type, isDisabled) {
				$.ajax({
					type: "POST",
					dataType: "json",
					async : asyncCheck,
					url : "/fr/kor/reservation/branchPlacelist.do",
					data : {
						branchCode : code,
						startDate : $("input[name='rent_date']").val().replace("/", "").replace("/", ""),
						endDate : $("input[name='return_date']").val().replace("/", "").replace("/", ""),
					},
					success : function(data) {

						var tempReturnPlaceCode = $("option:selected", "#selReturnBranch2").val();
						var tempReturnPlaceReset = "N";

						var txt = "";
						$.each(data.bList, function(i, s) {
							var placeName = s.PLACE;
							if(s.SNUMM=="01" && s.VKGRP =="622")	placeName = "제주오토하우스";
							txt += "<li><input type='radio' " + (isDisabled ?  "disabled='disabled'" : "") + " id='rdo-"+s.SNUMM+"' name='rdo-1' value='"+placeName+"' code='" + s.SNUMM + "' realCode='" + s.VKGRP + "'kschn='" + s.KSCHN + "' kschn_tx='" + s.KSCHN_TX + "' kbetr='" + s.KBETR + "' + konwa='" + s.KONWA + "' + placename='" + s.PLACE + "' onClick='inpJeJuStop("+s.VKGRP+",\""+ s.SNUMM +"\",\""+placeName+"\");'><label for='rdo-"+s.SNUMM+"'><span class='icon'></span>"+placeName+"</label>";
							txt += "<a href='#layerJeJuBranchInfo' onclick=\"branchInfo('"+s.VKGRP+"', 'N', '','"+placeName+"');\" class='layerJeJuBranchInfo btn btn_white btn_layer'>지점안내</a></li>";
						});

						var txt2 = "";
						$.each(data.cList, function(i, s) {
							
							var placeName = s.PLACE;
							if(s.SNUMM=="01" && s.VKGRP =="622")	placeName = "제주오토하우스";

							if(s.SNUMM=="02" && s.VKGRP =="605"){
							} else {
								txt2 += "<li><input type='radio' " + (isDisabled ?  "disabled='disabled'" : "") + " id='rdo2-"+s.SNUMM+"' name='rdo-2' value='"+placeName+"' code='" + s.SNUMM + "' realCode='" + s.VKGRP + "'kschn='" + s.KSCHN + "' kschn_tx='" + s.KSCHN_TX + "' kbetr='" + s.KBETR + "' + konwa='" + s.KONWA + "' + placename='" + s.PLACE + "' onClick='reInpJeJuStop("+s.VKGRP+",\"" + s.SNUMM + "\",\""+placeName+"\");'><label for='rdo2-"+s.SNUMM+"'><span class='icon'></span>"+placeName+"</label>";
								txt2 += "<a href='#layerJeJuBranchInfo' onclick=\"branchInfo('"+s.VKGRP+"', 'N', '','"+placeName+"');\" class='layerJeJuBranchInfo btn btn_white btn_layer'>지점안내</a></li>";
							}
						});

						if(type=="rent"){
							setAreaZLayerA();
							setAreaZLayerB();
							$("#selRentJeJuBranch").empty();	// selectbox 초기화
							$("#selRentJeJuBranch").append(txt);
							if($("input[name='splace']").val()!=""){
								$("#selRentBranch2").val($("input[name='splace']").val());
							}
							// selectboxColor("selRentBranch2");

							$("#selReturnJeJuBranch").empty();	// selectbox 초기화
							$("#selReturnJeJuBranch").append(txt2);
							if($("input[name='eplace']").val()!=""){
								$("#selReturnBranch2").val($("input[name='eplace']").val());
							}
							// selectboxColor("selReturnBranch2");

							tmpJejuRentPlace = "<option value='' placename='대여지점'>대여지점</option>"+txt;
							tmpJejuReturnPlace = "<option value='' placename='반납지점'>반납지점</option>"+txt2;

							//수정모드
							if($("input[name='editChk']").val()=="1"){
								$("#selRentBranch2").val($("input[name='splace']").val());
								$("#selReturnBranch2").val($("input[name='eplace']").val());
							}
							selectboxSet($("#selRentBranch2"),$("option:selected", "#selRentBranch2").text());
							selectboxSet($("#selReturnBranch2"),$("option:selected", "#selReturnBranch2").text());

						} else {
							setAreaZLayerB();
						//	$("#selReturnBranch2").empty();	// selectbox 초기화
							//$("#selReturnBranch2").append(txt2);

							//수정모드
							/*if($("input[name='editChk']").val()=="1"){
								$("#selReturnBranch2").val($("input[name='eplace']").val());

								if($("input[name='eplace']").val()=="03"){
									window.open('/popup/20150113/pop_notice.html', 'jejuairport', "width=340,height=418" );
									jejuairportFee = 10000;
									$("#jejuairport_p").show();
									$("#jejuairport_w").html(comma(jejuairportFee * 1));
								} else {
									jejuairportFee = 0;
									$("#jejuairport_p").hide();
									$("#jejuairport_w").html(comma(jejuairportFee));
								}
								
							}*/
						}
						
						if($("input[name='editChk']").val()=="1"){
							dsCnt711 = 0;
							
							if($("#selRentBranch").val()=="711" && $("input[name='splace']").val()=="02") {
								dsCnt711++;
							}
							if($("#selReturnBranch").val()=="711" && $("input[name='eplace']").val()=="02") {
								dsCnt711++;	        					
							}
							if(dsCnt711 > 0) {
								//청주공항 대여/반납서비스 요금 노출
								dsFee_711 = DS_FEE_711 * dsCnt711;
								$("#ds711_p").show();
								$("#ds711_w").html(comma(dsFee_711));
							}
						}

						if(tempReturnPlaceReset == "Y"){
							alert("해당 반납 시간에 제주공항지점은 반납이 불가능합니다.");
						}
					}
				});			
			}, showDelivery: function () {
				$("#selBranch, #selReBranch").parent().addClass('noData');
				$("#selBranch, #selReBranch").parent().removeClass('pt20');
				$("#selBranch, #selReBranch").parent().parent().removeClass('on');
				$("#selBranch").text("");
				$("#selReBranch").text("");

				$("INPUT:RADIO[NAME=hdsType]").eq(0).trigger("click");

				$("#my_local").hide();	
				hdsSet();
				
				// 딜리버리 서비스 초기화 추가		
				$("#selReturnArea").empty();
				$("#selReturnArea").append(basicArea());
				$("#selReturnArea").val("");
				selectboxSet($("#selReturnArea"),"서울");
				
				$("#selReturnBranch").empty();	
				selectboxSet($("#selReturnBranch"),"");
				
				$("#selRentBranch").empty();	
				$("#selReturnBranch").empty();	
				
				
				// window.open('/kor/popup/pop_ds_guide.do', 'dsservice', "width=823,height=500" );
				$(".ds_service").css("display","block");
				$(".layerMyStore").css("display","none");
			}, setBranch: function () {
				var _this = this;
				var type = borrow.data.currentType;
				if (type === 0) {
					if (_this.validate.confirm()) {
						$('.layerSelBranch').removeClass('noData');
						//$('.layerSelBranch').parent().addClass('on');
						$("._selBranch").eq(0).text($("input:radio[name=rdo-1]:checked:visible").val());
						$("._selReBranch").eq(0).text($("input:radio[name=rdo-2]:checked:visible").val());	    
						borrow.data.choice[type].branch = true;
						$(".rentBox").eq(1).addClass("on");
						$(".returnBox").eq(1).addClass("on");
						$('#layerSelBranch .btn_cal_confirm').trigger('click');
					}
				} else {
					if (_this.validate.confirmJeju()) {
						$('.layerSelBranchJeJu').removeClass('noData');
						//$('.layerSelBranchJeJu').parent().addClass('on');
						$("._selBranch").eq(1).text($("input:radio[name=rdo-1]:checked:visible").val());
						$("._selReBranch").eq(1).text($("input:radio[name=rdo-2]:checked:visible").val());	    
						borrow.data.choice[type].branch = true;
						$(".rentBox").eq(3).addClass("on");
						$(".returnBox").eq(3).addClass("on");
						$('#layerSelBranch .btn_cal_confirm').trigger('click');
						return false;
					}
				}
			}, isDelivery: function () {
				return $("input[name='hdsCheck']").prop('checked');
			}, useDelivery: function () {
				$("input[name='hdsCheck']").prop('checked', true);
			}, unuseDelivery: function () {
				$("input[name='hdsCheck']").prop('checked', false);
				$("#hds_radio").hide();

				// 이미 지점 선택되어 있는 경우 처리
				/*
				if($("#selBranch").text() != "" || $("#selReBranch").text() != ""){
					$('.layerSelBranch').removeClass('noData');
					$('.carlayerSelBranch').removeClass('noData');
					$('.layerSelBranchDS').removeClass('noData');
					// $this.parent().siblings('.rent_popWrap').find('.innerBox').removeClass('on');
				}*/

			}, reset: function () {
				// TODO: 지점 초기화 내륙 제주 분리 마크업도 분리 아이디 처리 부분도 분리 필요
				var type = borrow.action.getType();
				$(".rentBox ").eq(type * 2 + 1).removeClass("on");
				$(".returnBox ").eq(type * 2 + 1).removeClass("on");
				$("._selBranch").eq(type).text('');		// 대여지점 노출 텍스트
				$("._selReBranch").eq(type).text('');	// 반납지점 노출 텍스트
				$("._realBranch").eq(type).val('');		// 관리부점 코드 (원대여지점코드)
				$("._rentPlace").eq(type).val('');		// 배치장소
				$("._rentBranch").eq(type).val('');		// 배치지점?
				$("._rentArea").eq(type).val('');		// 대여 지역 코드
				borrow.data.choice[type].branch = false;
			}, resetCombo: function () {
				$("input[name='returnBranch'],input[name='rentBranch'],input[name='realBranch']").val("");
				$("#selRentArea").empty();
				$("#selRentArea").append(basicArea());
				$("#selRentArea").val("");
				selectboxSet($("#selRentArea"),"서울");
				
				$("#selRentBranch").empty();	// selectbox 초기화
				$("#selRentBranch").append("");
				selectboxSet($("#selRentBranch"),"");

				$("#selRentBranch2").empty();	// selectbox 초기화
				$("#selRentBranch2").append("<option value=''>대여지점</option>");
				selectboxSet($("#selRentBranch2"),"");

				$("#selRentHdsBranch").val("");
				selectboxSet($("#selRentHdsBranch"),"");
				
				$("#selReturnArea").empty();
				$("#selReturnArea").append(basicArea());
				$("#selReturnArea").val("");
				selectboxSet($("#selReturnArea"),"서울");
				
				$("#selReturnBranch").empty();	// selectbox 초기화
				$("#selReturnBranch").append("");
				selectboxSet($("#selReturnBranch"),"");
				
				$("#selReturnBranch2").empty();	// selectbox 초기화
				$("#selReturnBranch2").append("<option value=''>반납지점</option>");
				selectboxSet($("#selReturnBranch2"),"");

				$("#selReturnHdsBranch").val("");
				selectboxSet($("#selReturnHdsBranch"),"");
				
				$("#oneway_comment").css("display", "none");
			}
		}, layerPop: function (id) {
			var _body = $('html, body').css('overflow','hidden');
			var _this = $('#' + id);

			var layer = function() {
				if (_this.height() >= $(window).height()) {
					_this.find('.layer_con').height($(window).height() - 160);
				} else {
					_this.find('.layer_con').css('height','inherit');
				}
				_this.css({
					'top': ($(window).height() / 2) + $(window).scrollTop() - (_this.height() / 2),
					'left': ($(window).width() - _this.width()) / 2,
				});
			}

			$('.dimm').css({'width': _body.width(),'height': _body.height()}).show();

			layer();       
			_this.show().attr('tabindex',0).focus();

			$(window).resize(function(){
				layer();
				$('.dimm').css({'width': _body.width(),'height': _body.height()});
			});
		}
	}, action: {
		setType: function (type) {
			borrow.data.currentType = type || 0;
			borrow.data.type[ type || 0].current = true;

			switch (borrow.data.currentType) {
				case 0:
					$('._jeju, ._ds').hide();
					$('._' + borrow.data.type[borrow.data.currentType].key).show();
				case 1:
					$('._inner, ._jeju').hide();
					$('._' + borrow.data.type[borrow.data.currentType].key).show();
				case 2:
					$('._inner, ._ds').hide();
					$('._' + borrow.data.type[borrow.data.currentType].key).show();
			}

		}, getType: function () {
			return borrow.data.currentType;
		}, getServerTime: function () {
			return moment();
		}
	} , resetArea: function () {					// 지역선택 초기화 : TODO - 확인 필요
		$("input[name='returnBranch'],input[name='rentBranch'],input[name='realBranch']").val("");
	
		$("#selRentArea").empty();
		$("#selRentArea").append(basicArea());
		$("#selRentArea").val("");
		selectboxSet($("#selRentArea"),"서울");
		
		$("#selRentBranch").empty();	// selectbox 초기화
		$("#selRentBranch").append("");
		selectboxSet($("#selRentBranch"),"");

		$("#selRentBranch2").empty();	// selectbox 초기화
		$("#selRentBranch2").append("<option value=''>대여지점</option>");
		selectboxSet($("#selRentBranch2"),"");

		$("#selRentHdsBranch").val("");
		selectboxSet($("#selRentHdsBranch"),"");
		
		$("#selReturnArea").empty();
		$("#selReturnArea").append(basicArea());
		$("#selReturnArea").val("");
		selectboxSet($("#selReturnArea"),"서울");
		
		$("#selReturnBranch").empty();	// selectbox 초기화
		$("#selReturnBranch").append("");
		selectboxSet($("#selReturnBranch"),"");
		
		$("#selReturnBranch2").empty();	// selectbox 초기화
		$("#selReturnBranch2").append("<option value=''>반납지점</option>");
		selectboxSet($("#selReturnBranch2"),"");

		$("#selReturnHdsBranch").val("");
		selectboxSet($("#selReturnHdsBranch"),"");
		
		$("#oneway_comment").css("display", "none");
	}
}



var editMode = "N";
var editFlag = "N";
var returntxt = "";

var LIMIT_TERM = 90;
var LIMIT_TERM_60 = 60;

var popScroll = "rent";

$(document).ready(function(){

		JeJuSetArea($("#selRentJeJuArea"));
		JeJuSetArea($("#selReturnJeJuArea"));
		
		$('#goHertz').click(function(){
			if($("#userId").val() == ""){
				if(confirm("로그인이 필요한 서비스입니다. 로그인하시겠습니까?")){
					location.href="/fr/kor/login/login.do";
				}
			} else {
				// ga('send', 'event', '해외예약안내', '예약하기', 'pc');
				window.open("http://www.happartners.com/wl/kr/lotte/en", "_blank");		    
			}
		});
		
		// /* PC 화면으로 접속한 경우 모바일 페이지로 이동 */
		// var m_url = "https://m.lotterentacar.net/mobile/short/mbShortHertzIntro.do";
		
		// if (getCookie("mobile") != "done") {
		// 	var mobileKeyWords = new Array('iPhone', 'iPod', 'BlackBerry',
		// 			'Android', 'Windows CE', 'LG', 'MOT', 'SAMSUNG', 'SonyEricsson');
		// 	for ( var word in mobileKeyWords) {
		// 		if (navigator.userAgent.match(mobileKeyWords[word]) != null) {
		// 			location.href = m_url;
		// 			break;
		// 		}
		// 	}
		// }
		
		// $("#hds_rent_set1,#hds_rent_set2,#hds_rent_set3").show();
		// $("#hds_return_set1,#hds_return_set2,#hds_return_set3").show();
		// $("#rent_set1_HDS,#rent_set2,#return_set1_HDS,#return_set2").hide();
		
		$('#keyword').keydown(function(e){
			if(e.keyCode == 13) {
				e.preventDefault();
				$('#currentPage').val('1');getAddr();
			}			
			})

			$('#keyReword').keydown(function(e){
			if(e.keyCode == 13) {
				e.preventDefault();
				$('#currentPage').val('1');getReAddr();
			}			
		});
		
		
			
		
		
		

	$("#selRentAreaHDS").selectmenu({
		change: function( event, ui ){ 
			setAreaEvent($(this));
		}
	});

	$("#selReturnAreaHDS").selectmenu({
		change: function( event, ui ){ 
			if ($("input[name='rentBranch']").val() == "") {
				alert("대여지점을 먼저 선택하여 주십시오");
				return false;
			} else {
				setAreaEvent($(this));
			}
		}
	});

	$(".layerMyStore").off('click');
	$(".layerMyStore").click(function(e){
		e.preventDefault();
		if($("#userId").val() ==""){
			if(confirm("로그인이 필요한 서비스입니다. 로그인하시겠습니까?")){
				location.href = "/fr/kor/login/login.do";
			} 
		} else {
			var url = "/fr/kor/reservation/short/pop_mybranch.do";
			var txt = "";
			var txtBtn = "";
			$.ajax({
				url : url,
				type : "POST",
				timeout : 60000,
				success : function(data) {
					console.log(data.result);
					if (data.result == "Y") {
						$("#myStoryShow").html("");
						$("#myStoryBtn").html("");
						$.each(data.mylist, function(i, s) {
							txt += "<tr><td><input type='radio' id='radio"+s.result2+"' name='u_check' onclick='storeSave(\""+s.result6+"\", \""+s.result3+"\", \""+s.result7+"\",\""+s.result5+"\");'><label for='radio"+s.result2+"'><span class='icon'></span></label></td><td>"+s.result7+"</td><td>"+s.result5+"</td></tr>";
						});
						txtBtn += "<a href='#' class='btn_layer_close btn_red btn_200' onclick='storeConfirm();'>선택지점 등록</a>"
						$("#myStoryShow").append(txt);
						$("#myStoryBtn").append(txtBtn);
					} else {
						$("#myStoryShow").html("");
						$("#myStoryBtn").html("");
						txt += "<tr><td colspan='3' class='noStore'>나의 지점이 없습니다. 등록해주세요.</td></tr>";
						$("#myStoryShow").append(txt);
						txtBtn += "<a href='/fr/kor/myPage/myBranch.do' class='btn_red btn_200'>나의 지점 등록</a>"
						$("#myStoryBtn").append(txtBtn);
					}
				},
				dataType : "json"
			});
			borrow.ui.layerPop('layerMyStore');
		}
	});

});

	function timeChk() {
		var td = new Date(srvTime());
		var dtChk = (td.getHours() <= 7 ? 0 : 1);
		var td1 = null;
		var td2 = null;

		if (dtChk == 1) {
			td1 = new Date(Date.parse(td) + 1000 * 60 * 60 * 24);
			td2 = td;
		} else {
			td1 = td;
			td2 = new Date(Date.parse(td) - 1000 * 60 * 60 * 24);
		}

		var hdsTd = td.getFullYear() + "" + getDec(td.getMonth() + 1) + ""
				+ getDec(td.getDate()) + "" + getDec(td.getHours())
				+ getDec(td.getMinutes()); // 현재시간
		var hdsNsdt = td2.getFullYear() + "" + getDec(td2.getMonth() + 1) + ""
				+ getDec(td2.getDate()) + "21" + "00"; // 예약불가 시작시간
		var hdsNedt = td1.getFullYear() + "" + getDec(td1.getMonth() + 1) + ""
				+ getDec(td1.getDate()) + "09" + "00"; // 예약불가 종료시간
		var hdsDt = $("input[name='rent_date']").val().replace("/", "").replace("/", "")
				+ $("option:selected", "#sHour").val() + $("option:selected", "#sMin").val(); // 대여일시
		var hdsNedt2 = td1.getFullYear() + "" + getDec(td1.getMonth() + 1) + ""
				+ getDec(td1.getDate()) + "09" + "00"; // 예약가능 최소시간

		//    불가시작 <= 현재     현재  <= 불가종료   대여일시 < 예약가능 최소시간
		if ((hdsNsdt <= hdsTd && hdsTd <= hdsNedt && hdsDt < hdsNedt2)) {
			return false;
		}
		return true;
	}

	function checkboxReset(obj){
		setTimeout(function(){$(obj).next().removeClass('checked');}, 100);
	}

	

	function dataSettingDS() {

	if($('input[name="hdsType"]:checked').val() == "3"){
		if (!$("input[name='rentZip']").val() || !$("input[name='rentAddr1']").val()) {

			alert("대여장소를 입력해주세요.");
			$("input[name='rentZip']").focus();
			return false;
		} 
			
		if (!$("input[name='rentAddr2']").val()) {
			alert("대여장소의 상세주소를 입력해주세요.");
			$("input[name='rentAddr2']").focus();
			return false;
		}

		if (!$("input[name='returnZip']").val() || !$("input[name='returnAddr1']").val()) {

			alert("반납장소를 입력해주세요.");
			$("input[name='returnZip']").focus();
			return false;
		} 
		if (!$("input[name='returnAddr2']").val()) {
			alert("반납장소의 상세주소를 입력해주세요.");
			$("input[name='returnAddr2']").focus();
			return false;
		} 
	} else if($('input[name="hdsType"]:checked').val() == "2"){
			if (!$("input[name='rentZip']").val()|| !$("input[name='rentAddr1']").val()) {

				alert("대여장소를 입력해주세요.");
				$("input[name='rentZip']").focus();
				return false;
			} 
			if (!$("input[name='rentAddr2']").val()) {
				
				alert("대여장소의 상세주소를 입력해주세요.");
				$("input[name='rentAddr2']").focus();
				return false;
			} 
	} else if($('input[name="hdsType"]:checked').val() == "1"){

		if (!$("input[name='returnZip']").val() || !$("input[name='returnAddr1']").val()) {

			alert("반납장소를 입력해주세요.");
			$("input[name='returnZip']").focus();

			return false;
		} 
		if (!$("input[name='returnAddr2']").val()) {
			alert("반납장소의 상세주소를 입력해주세요.");
			$("input[name='returnAddr2']").focus();
			return false;
		} 
	}   
		if (!$("input[name='rentBranch']").val()) {
			alert("대여지점을 선택해주세요.");
			return false;
		}
		
		if (!$("input[name='returnBranch']").val()) {
			alert("대여지점을 선택해주세요.");
			return false;
		}
		
		$("#layerSelBranchDS .btn_layer_close").trigger("click");
		//$('.dimm, #layerSelBranchDS').hide();
		$('.layerSelBranchDS').removeClass('noData');
		$('.layerSelBranchDS').parent().addClass('on');
		
		$("#selBranch").text($aCode.val());
		$("#selReBranch").text($("input:radio[name=rdo-2]:checked").val());
		
		if($('input[name="hdsType"]:checked').val() == "2"){ // 대여일때
			$("#selBranch").text($aCode.val());
			$("#selReBranch").text($("input:radio[name=rdo-4]:checked").val());	    
		} else if($('input[name="hdsType"]:checked').val() == "1"){ // 반납일때
			$("#selBranch").text($("input:radio[name=rdo-4]:checked").val());
			//$("#selReBranch").text($("input:radio[name=rdo-3]:checked").val());
		}
		
	}

	function validTimeChk(tfrom, tend) {
		var closeHour = Number(tend.substring(0,2)) - 1;
		closeHour = (closeHour < 0 ? 0 : closeHour);
		var closeMin = tend.substring(3,5);
		var openHour = Number(tfrom.substring(0,2)) + 1;
		var openMin = tfrom.substring(3,5);
		var closetime = closeMin == "00" ? closeHour+"시" : closeHour+"시" + closeMin+"분"; // 예약불가 시작시간
		var opentime = openMin == "00" ? openHour+"시" : openHour+"시" + openMin+"분"; // 예약불가 종료시간

		openHour = openHour < 10 ? "0"+openHour : openHour;
		closeHour = closeHour < 10 ? "0"+closeHour : closeHour;

		var td = new Date(srvTime());
		var dtChk = (td.getHours() <= 7 ? 0 : 1);
		var td1 = null;
		var td2 = null;

		if (dtChk == 1) {
			td1 = new Date(Date.parse(td) + 1000 * 60 * 60 * 24);
			td2 = td;
		} else {
			td1 = td;
			td2 = new Date(Date.parse(td) - 1000 * 60 * 60 * 24);
		}

		var hdsTd = td.getFullYear() + "" + getDec(td.getMonth() + 1) + ""
				+ getDec(td.getDate()) + "" + getDec(td.getHours())
				+ getDec(td.getMinutes()); // 현재시간
		var hdsNsdt = td2.getFullYear() + "" + getDec(td2.getMonth() + 1) + ""
				+ getDec(td2.getDate()) + "" + closeHour + "" + closeMin; // 예약불가 시작시간
		var hdsNedt = td1.getFullYear() + "" + getDec(td1.getMonth() + 1) + ""
				+ getDec(td1.getDate()) + "" + openHour + "" + openMin; // 예약불가 종료시간
		var hdsDt = $("input[name='rent_date']").val().replace("/", "").replace("/", "")
				+ $("#rent_hour").val() + $("#rent_minute").val(); // 대여일시

	//	console.log("tfrom:" +tfrom+ " tend:"+tend + " closetime:" +closetime+ " opentime:"+opentime);
	//	console.log("예약불가 시작시간:" +hdsNsdt+ " 예약불가 종료시간:"+hdsNedt);

		if ((hdsNsdt <= hdsTd && hdsTd <= hdsNedt && hdsDt < hdsNedt)) {
			var msg = "해당 지점은 "+closetime+" 이후 다음날의 예약을 진행하는 경우\n"
					+ "대여시간은 "+opentime+" 이후로 선택하셔야 예약이 가능합니다.\n"
					+"대여시간을 다시 선택해 주세요.";
			alert(msg);
			return false;
		}
		return true;
	}

	

	function getDec(val){
		if(val<10) return "0"+val;
		else return val;
	}

	//서버시간 체크
	function srvTime(){
		var xmlHttp;
		if (window.XMLHttpRequest) {//분기하지 않으면 IE에서만 작동된다.
		xmlHttp = new XMLHttpRequest(); // IE 7.0 이상, 크롬, 파이어폭스 등
		xmlHttp.open('HEAD',window.location.href.toString(),false);
		xmlHttp.setRequestHeader("Content-Type", "text/html");
		xmlHttp.send('');
		return xmlHttp.getResponseHeader("Date");
		}else if (window.ActiveXObject) {
		xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
		xmlHttp.open('HEAD',window.location.href.toString(),false);
		xmlHttp.setRequestHeader("Content-Type", "text/html");
		xmlHttp.send('');
		return xmlHttp.getResponseHeader("Date");
		}
	}

	

//지점  셋팅
function settingBranchList(list,gubun, isDisabled) {
	var depcdName = "";
	var txt = "";
	var subtxt = "";
	$.each(list, function(i, s) {
		if(s.VKGRP == "404"){    //수입차
			depcdName = s.VKGRP_TX + "지점";
		}else if(s.VKGRP == "405"){  // 논현
			depcdName = s.VKGRP_TX + "(학동역)";
		}else if(s.VKGRP == "501"){//인천
			depcdName = s.VKGRP_TX + "(연수구)";
		}else if(s.VKGRP == "502"){//남인천
			depcdName = s.VKGRP_TX + "(남구.남동구.부평구)";			
		}else if(s.VKGRP == "727"){//광주
			/*depcdName = s.VKGRP_TX + "(농성동)"; * 2015.12.24수정요청 */
			  depcdName = "광주"+s.VKGRP_TX+"(터미널)"; // (터미널) 추가  mw 2016-07-28
		}else if(s.VKGRP == "710"){//동광주
			depcdName = s.VKGRP_TX + "(광주역)";
		}else if(s.VKGRP == "605"){//부산
			depcdName = s.VKGRP_TX + "(광장호텔)";
		} else if(s.VKGRP == "413"){//마포
			depcdName = s.VKGRP_TX + "(홍대입구역)"; //2016.11.23 영업장 이전, 역사명칭 병기
		} else if(s.VKGRP == "415"){//송파
			depcdName = s.VKGRP_TX + "(문정역)"; //2016.12.02 역사명칭 병기
		} else if(s.VKGRP == "431"){//은평
			depcdName = s.VKGRP_TX + "(구파발역)"; //2016.12.02 역사명칭 병기
		} else {
			depcdName = s.VKGRP_TX;
		}
		if(s.VKGRP == "404"){    //수입차
			depcdName = depcdName.replace("영업소","");
		} else {
			depcdName = depcdName.replace("지점","").replace("영업소","");
		}
		if(gubun=="selRentArea"){
			if (s.ENABLE1 == "X") {
				var eventEm = "";
				if(s.EVENT_YN == "Y"){
					eventEm = "<em class='ico_discount'>할인 이벤트</em>";
				}
				if(s.VKGRP == "711"){
				    subtxt = branchSubList("711","rent",s.ENABLE1);
				    txt += subtxt;
				} else if(s.VKGRP == "605"){
				    subtxt = branchSubList("605","rent",s.ENABLE1);
				    txt += subtxt;
				} else {
					if($("#rentBranch").val() == s.VKGRP){
						txt += "<li><input type='radio' " + (isDisabled ?  "disabled='disabled'" : "") + "  id='rdo-"+s.VKGRP+"' name='rdo-1' value='"+depcdName+"' enablecnt='" + s.LS_ENABLE_CNT + "' areaCode='" + s.COUNC + "'areaNm='" + s.COUNC_TX + "' tfrom='" + s.TFROM_S + "' tend='" + s.TEND_S + "' onClick='inpStop("+s.VKGRP+","+s.KONDA_CDW+","+s.KONDA+","+s.VTWEG+");' checked><label for='rdo-"+s.VKGRP+"'><span class='icon'></span>"+depcdName+"</label>";
					} else {
						txt += "<li><input type='radio' " + (isDisabled ?  "disabled='disabled'" : "") + "  id='rdo-"+s.VKGRP+"' name='rdo-1' value='"+depcdName+"' enablecnt='" + s.LS_ENABLE_CNT + "' areaCode='" + s.COUNC + "'areaNm='" + s.COUNC_TX + "' tfrom='" + s.TFROM_S + "' tend='" + s.TEND_S + "' onClick='inpStop("+s.VKGRP+","+s.KONDA_CDW+","+s.KONDA+","+s.VTWEG+");'><label for='rdo-"+s.VKGRP+"'><span class='icon'></span>"+depcdName+"</label>";
					}
					txt += eventEm;
				    txt += "<a href='#layerBranchInfo' onclick=\"branchInfo('"+s.VKGRP+"', '"+s.EVENT_YN+"', '"+s.BRANCH_MESSAGE+"','"+s.ENABLE1+"','rent');\" class='layerBranchInfo btn btn_white btn_layer'>지점안내</a></li>";
				}
			} else {
			    	if(s.VKGRP == "711"){
				    subtxt = branchSubList("711","rent",s.ENABLE1);
				    txt += subtxt;
				} else if(s.VKGRP == "605"){
				    subtxt = branchSubList("605","rent",s.ENABLE1);
				    txt += subtxt;
				} else {
				    txt += "<li><input type='radio' id='rdo-"+s.VKGRP+"' name='rdo-1' value='"+depcdName+"' enablecnt='" + s.LS_ENABLE_CNT + "' areaCode='" + s.COUNC + "'areaNm='" + s.COUNC_TX + "' tfrom='" + s.TFROM_S + "' tend='" + s.TEND_S + "' onClick='inpStop("+s.VKGRP+","+s.KONDA_CDW+","+s.KONDA+","+s.VTWEG+");' disabled='disabled'><label for='rdo-"+s.VKGRP+"'><span class='icon'></span>"+depcdName+"</label>";
				    txt += "<a href='#layerBranchInfo' onclick=\"branchInfo('"+s.VKGRP+"', 'N', '');\" class='layerBranchInfo btn btn_white btn_layer'>지점안내</a></li>";
				}
				
			}
		} else if(gubun=="selReturnArea"){
			if (s.ENABLE2 == "X") {
			    if(s.VKGRP == "711"){
				    subtxt = branchSubList("711","return",s.ENABLE2);
				    txt += subtxt;
				} else if(s.VKGRP == "605"){
				    subtxt = branchSubList("605","return",s.ENABLE2);
				    txt += subtxt;
				} else {
					//txt += "<li><input type='radio' " + (isDisabled ?  "disabled='disabled'" : "") + " id='rdo2-"+s.VKGRP+"' name='rdo-2' value='"+depcdName+"'enablecnt='" + s.LS_ENABLE_CNT + "' areaCode='" + s.COUNC + "'areaNm='" + s.COUNC_TX + "' tfrom='" + s.TFROM_S + "' tend='" + s.TEND_S + "' onClick='reInpStop("+s.VKGRP+");' disabled='disabled'><label for='rdo2-"+s.VKGRP+"'><span class='icon'></span>"+depcdName+"</label>";
					//txt += "<a href='#layerBranchInfo' onclick=\"branchInfo('"+s.VKGRP+"', 'N', '');\" class='layerBranchInfo btn btn_white btn_layer'>지점안내</a></li>";
				
				    if($("#returnBranch").val() == s.VKGRP){
					txt += "<li><input type='radio' " + (isDisabled ?  "disabled='disabled'" : "") + " id='rdo2-"+s.VKGRP+"' name='rdo-2' value='"+depcdName+"'enablecnt='" + s.LS_ENABLE_CNT + "' areaCode='" + s.COUNC + "'areaNm='" + s.COUNC_TX + "' tfrom='" + s.TFROM_S + "' tend='" + s.TEND_S + "' onClick='reInpStop("+s.VKGRP+");' checked><label for='rdo2-"+s.VKGRP+"'><span class='icon'></span>"+depcdName+"</label>";
				    }else {
					txt += "<li><input type='radio'" + (isDisabled ?  "disabled='disabled'" : "") + " id='rdo2-"+s.VKGRP+"' name='rdo-2' value='"+depcdName+"'enablecnt='" + s.LS_ENABLE_CNT + "' areaCode='" + s.COUNC + "'areaNm='" + s.COUNC_TX + "' tfrom='" + s.TFROM_S + "' tend='" + s.TEND_S + "' onClick='reInpStop("+s.VKGRP+");'><label for='rdo2-"+s.VKGRP+"'><span class='icon'></span>"+depcdName+"</label>";
				    }
					txt += "<a href='#layerBranchInfo' onclick=\"branchInfo('"+s.VKGRP+"', 'N', '','"+s.ENABLE2+"','return');\" class='layerBranchInfo btn btn_white btn_layer'>지점안내</a></li>";
				}
			} else {
			    if(s.VKGRP == "711"){
				    subtxt = branchSubList("711","return",s.ENABLE2);
				    txt += subtxt;
				} else if(s.VKGRP == "605"){
				    subtxt = branchSubList("605","return",s.ENABLE2);
				    txt += subtxt;
				} else {
				    txt += "<li><input type='radio' id='rdo2-"+s.VKGRP+"' name='rdo-2' value='"+depcdName+"'enablecnt='" + s.LS_ENABLE_CNT + "' areaCode='" + s.COUNC + "'areaNm='" + s.COUNC_TX + "' tfrom='" + s.TFROM_S + "' tend='" + s.TEND_S + "' onClick='reInpStop("+s.VKGRP+");' disabled='disabled'><label for='rdo2-"+s.VKGRP+"'><span class='icon'></span>"+depcdName+"</label>";
				    txt += "<a href='#layerBranchInfo' onclick=\"branchInfo('"+s.VKGRP+"', 'N', '','"+s.ENABLE2+"','return');\" class='layerBranchInfo btn btn_white btn_layer'>지점안내</a></li>";
				}
			}
			} else if(gubun=="selReturnHdsBranch"){
			    if (s.ENABLE2 == "X") {
				txt += "<li><input type='radio' id='rdo3-"+s.VKGRP+"' name='rdo-3' value='"+depcdName+"'enablecnt='" + s.LS_ENABLE_CNT + "' areaCode='" + s.COUNC + "'areaNm='" + s.COUNC_TX + "' tfrom='" + s.TFROM_S + "' tend='" + s.TEND_S + "' onClick='reInpStop("+s.VKGRP+");' class='view'><label for='rdo3-"+s.VKGRP+"'><span class='icon'></span>"+depcdName+"</label>";
				txt += "<a href='#layerBranchInfo' onclick=\"branchInfo('"+s.VKGRP+"', 'N', '','"+s.ENABLE2+"');\" class='layerBranchInfo btn btn_white btn_layer'>지점안내</a></li>";
			    } else {
				txt += "<li><input type='radio' id='rdo3-"+s.VKGRP+"' name='rdo-3' value='"+depcdName+"'enablecnt='" + s.LS_ENABLE_CNT + "' areaCode='" + s.COUNC + "'areaNm='" + s.COUNC_TX + "' tfrom='" + s.TFROM_S + "' tend='" + s.TEND_S + "' onClick='reInpStop("+s.VKGRP+");' disabled='disabled' class='view'><label for='rdo3-"+s.VKGRP+"'><span class='icon'></span>"+depcdName+"</label>";
				txt += "<a href='#layerBranchInfo' onclick=\"branchInfo('"+s.VKGRP+"', 'N', '','"+s.ENABLE2+"');\" class='layerBranchInfo btn btn_white btn_layer'>지점안내</a></li>";
			
				}
			} else {
			    if (s.ENABLE1 == "X") {
				txt += "<li><input type='radio' id='rdo4-"+s.VKGRP+"' name='rdo-4' value='"+depcdName+"'enablecnt='" + s.LS_ENABLE_CNT + "' areaCode='" + s.COUNC + "'areaNm='" + s.COUNC_TX + "' tfrom='" + s.TFROM_S + "' tend='" + s.TEND_S + "' onClick='inpStop("+s.VKGRP+","+s.KONDA_CDW+","+s.KONDA+","+s.VTWEG+");'><label for='rdo4-"+s.VKGRP+"'><span class='icon'></span>"+depcdName+"</label>";
				txt += "<a href='#layerBranchInfo' onclick=\"branchInfo('"+s.VKGRP+"', 'N', '','"+s.ENABLE1+"');\" class='layerBranchInfo btn btn_white btn_layer'>지점안내</a></li>";
			    } else {
				txt += "<li><input type='radio' id='rdo4-"+s.VKGRP+"' name='rdo-4' value='"+depcdName+"'enablecnt='" + s.LS_ENABLE_CNT + "' areaCode='" + s.COUNC + "'areaNm='" + s.COUNC_TX + "' tfrom='" + s.TFROM_S + "' tend='" + s.TEND_S + "' onClick='inpStop("+s.VKGRP+","+s.KONDA_CDW+","+s.KONDA+","+s.VTWEG+");' disabled='disabled'><label for='rdo4-"+s.VKGRP+"'><span class='icon'></span>"+depcdName+"</label>";
				txt += "<a href='#layerBranchInfo' onclick=\"branchInfo('"+s.VKGRP+"', 'N', '','"+s.ENABLE1+"');\" class='layerBranchInfo btn btn_white btn_layer'>지점안내</a></li>";
			
			    }
			}
		
	});
	
	$("input[name='rentDate']").val($("input[name='rent_date']").val().replace("/", "").replace("/", ""))
	$("input[name='returnDate']").val($("input[name='return_date']").val().replace("/", "").replace("/", ""))
	$("input[name='rentTime']").val($("input[name='rent_hour']").val() + $("input[name='rent_minute']").val() + "00")
	$("input[name='returnTime']").val($("input[name='return_hour']").val() + $("input[name='return_minute']").val() + "00")
	
	return txt;
}

//대여지점 데이터 세팅
function inpStop(VKGRP,KONDA_CDW,KONDA,VTWEG) {
	
	$("#rentBranch").val(VKGRP);
	$("#realBranch").val(VKGRP);
	$("#konda_cdw").val(KONDA_CDW);
	$("#konda").val(KONDA);
	$("#vtweg").val(VTWEG);
	
	// 딜리버리 반납일 때
	if($('input[name="hdsType"]:checked').val() == "1"){
		if($("#areaHdsCheck").prop("checked")){
			$("#rdo2-"+$("#rentBranch").val()+":visible").prop("checked", true);
		    $("#returnBranch").val(VKGRP);
		} else {
		    
		}
	} else {
	    if($("#areaCheck").is(":checked")){
			if (!$("#rdo2-"+$("#rentBranch").val()+":visible").prop("disabled")) {
				$("input[id^='rdo2-']:checked").prop("checked", false);
				$("#rdo2-"+$("#rentBranch").val()+":visible").prop("checked", true);
		    	$("#returnBranch").val(VKGRP);
			}
		    
		}
	}
	// dateValidate(this);
}

//반납지점 데이터 세팅
function reInpStop(VKGRP,KONDA_CDW,KONDA,VTWEG) {
	
	if($("#rentBranch").val() == ""){
		$("#rdo2-"+VKGRP).prop("checked", false);
		alert("대여지점을 먼저 선택하세요.")
	} else {
	    if($("#areaCheck").is(":checked")){
		$("#rdo-"+VKGRP).prop("checked", true);
	    }
	}

$("#returnBranch").val(VKGRP);
	
	// dateValidate();
}

function inHdpStop(LEND_BRC,MSG_CODE,KONDA_CDW,KONDA,CRFEE,MSGKOR) {
	$("#konda_cdw").val(KONDA_CDW);
	$("#konda").val(KONDA);
	$("#areaCode").val(MSG_CODE);
	$("#hdsBranch").val(LEND_BRC);
	$("#ad_dlcr_fee").val(CRFEE);
	$("#rentBranch").val(LEND_BRC)

	// 딜리버리 대여 + 반납 일때
	if($('input[name="hdsType"]:checked').val() == "3"){
			$("#ad_rtcr_fee").val(CRFEE); // 도착
			if($("#areaHdsCheck").is(":checked")){
				$("#"+"rdo2-"+LEND_BRC).prop("checked", true);
				$("#returnBranch").val(LEND_BRC);
			} else {
				
			}
	} else if($('input[name="hdsType"]:checked').val() == "2"){
			if($("#areaHdsCheck").is(":checked")){
				$("#"+"rdo4-"+LEND_BRC).prop("checked", true);
				$("#returnBranch").val(LEND_BRC);
			}
	} else {
			if($("#areaHdsCheck").is(":checked")){
					$("#"+"rdo-"+LEND_BRC).prop("checked", true);
					$("#returnBranch").val(LEND_BRC);
			} else {
			
			}
	}
}

function inReHdpStop(LEND_BRC,MSG_CODE,KONDA_CDW,KONDA,CRFEE,MSGKOR){
	// alert("대여지점과 같은 지점으로 자동 등록 됩니다.");

	$("#returnBranch").val(LEND_BRC);
	$("#ad_rtcr_fee").val(CRFEE);

	if($('input[name="hdsType"]:checked').val() == "3"){
			$("#ad_dlcr_fee").val(CRFEE); // 도착
		}

	if($("#areaHdsCheck").is(":checked")){
		if($('input[name="hdsType"]:checked').val() == "1"){
		    $("#"+"rdo4-"+LEND_BRC).prop("checked", true);
			$("#rentBranch").val(LEND_BRC);
		} else {
		    $("#"+"rdo-"+LEND_BRC).prop("checked", true);
			$("#rentBranch").val(LEND_BRC);
		}
		// 대여지점 일때
		if($("#rentBranch").val() != $("#returnBranch").val()){
		    alert("대여지점과 같은 지점으로 자동 등록 됩니다.");
		    return false
		}
	}
}

//대여지점 데이터 세팅
function inpJeJuStop(VKGRP,SNUMM,placeName) {
    var snumm = String(SNUMM).length; // splace
	
	if(snumm == "1") {
		$("#splace").val("0"+SNUMM);
	} else {
		$("#splace").val(SNUMM);
	}
	
	if(placeName == "롯데호텔"){
	    if($("#exCheck").prop("checked")){
			alert("빠른(Express) 서비스는 제주오토하우스 지점에서만 이용가능합니다.");
		    $("#rdo-"+SNUMM).prop("checked",false);
		    $("#rentBranch").val('');
		    $("#rentPlace").val('');
		    return false;
	    } else {
	    	$("#rentBranch").val(VKGRP);
			$("#realBranch").val(VKGRP);
			$("#rentPlace").val(placeName);
	    }
	} else {
	    $("#rentBranch").val(VKGRP);
		$("#realBranch").val(VKGRP);
		$("#rentPlace").val(placeName);
	}
	
	if($("#areaCheck").prop("checked")){
	    $("#rdo2-"+SNUMM).prop("checked",true);
	    $("#rentBranch").val(VKGRP);
	    $("#returnBranch").val(VKGRP);
	    $("#rentPlace").val(placeName);
	    $("#returnPlace").val(placeName);
	}else {
	    $("#rentBranch").val(VKGRP);
	}
	
}

//반납지점 데이터 세팅
function reInpJeJuStop(VKGRP,SNUMM, placeName) {
    var snumm = String(SNUMM).length; // splace
	
	if(snumm == "1") {
		$("#eplace").val("0"+SNUMM);
	} else {
		$("#eplace").val(SNUMM);
	}
	
	if(placeName == "롯데호텔"){
	    if($("#exCheck").prop("checked")){
		    alert("빠른(Express) 서비스는 제주오토하우스 지점에서만 이용가능합니다.");
		    $("#rdo2-"+SNUMM).prop("checked",false);
		    $("#returnBranch").val('');
		    $("#returnPlace").val('');
		    return false;
	    }
	} else {
	    $("#returnBranch").val(VKGRP);
	    $("#returnPlace").val(placeName);
	}
	
	if($("#rentBranch").val() == ""){
		$("#rdo2-"+SNUMM).prop("checked", false);
		$("#returnBranch").val('');
		$("#returnPlace").val(placeName);
		alert("대여지점을 먼저 선택하세요.");
	} else {
		 if($("#areaCheck").is(":checked")){
			$("#rdo-"+SNUMM).prop("checked", true);
			$("#rentBranch").val(VKGRP);
			$("#returnBranch").val(VKGRP);
			$("#rentPlace").val(placeName);
			$("#returnPlace").val(placeName);
		 }
	}

}


//2017-04-12 추가 cw.park
function selectboxSetDefault(setId,setVal,setText){
	$("#"+setId).val(setVal);
	selectboxSet($("#"+setId),setText);
}
//2017-04-12 추가 cw.park
function selectboxSet(obj,txt){
	 $(obj).trigger('update');
	 setTimeout(function(){$(obj).next().children().html(txt);}, 800);
}

//제주일때 알뜰카를 선택했을 시, 값 X
function fnJeJuMysteryChk(){
    	var type = borrow.action.getType();
    	var choice = borrow.data.choice[type];
    
    	if(!$("input[name='userId']").val()){
		if(confirm("알뜰카를 예약하시려면 로그인이 필요합니다. 로그인하시겠습니까?")){
		    window.open('/kor/popup/login01.do', 'popup', "width=833,height=550" );
		    $("#nomalJeJu").prop("checked", true);
			$("#mysteryJeJu").prop("checked", false);
			$("#mysteryChk").val("");
			return false;
		}
	} 
	
	if($("input[name='rentPlace']").val() == "롯데호텔" && $("input[name='rentPlace']").val() == "롯데호텔") {
	    alert("알뜰카는 제주오토하우스 지점에서만 이용 가능합니다.");
	    $("#mysteryChk").val("");
	    $("#mysteryJeJu").prop("checked", false);
	    $("#nomalJeJu").prop("checked", true);
	    return false;
	}
	
	if(!borrow.data.choice[type].period){
		alert("차량 대여일시를 선택하세요.");
		$('#nomalJeJu').prop("checked", true);
		$('#mysteryJeJu').prop("checked", false);
		return false;
	}
	
	$("#mysteryJeJu").prop("checked", true);
	$("#mysteryChk").val("X");
	
}

function fnExCheck(event){
    if(!$("input[name='userId']").val()){
	if(confirm("빠른 서비스를 예약하시려면 로그인이 필요합니다. 로그인하시겠습니까?")){
		location.href="/fr/kor/login/login.do";
		// window.open('/fr/eng/login/login_login.do', 'popup', "width=833,height=550" );
	}
	     $("#exCheck").prop('checked',false);
	     checkboxReset($("#exCheck"));
	     return false;
	}
    
	if($("#exCheck").prop("checked")){
	    if($("#rentPlace").val() == "롯데호텔" && $("#returnPlace").val() == "롯데호텔"){
		alert("빠른(Express) 서비스는 제주오토하우스 지점에서만 이용가능합니다.");
		$("#exCheck").val("FALSE");
		$("#exCheck").prop("checked",false)
		return false;
	    }
	    // 롯데호텔이든 제주오토하우스이든 알림은 뜸.
	    alert("빠른(Express) 서비스는 제주오토하우스 지점에서만 이용가능합니다.");
	    
		if ($("#rentBranch").val() == "622" && $("#rentPlace").val() != "제주오토하우스" ) {			
			if (event) {
				event.preventDefault();
				$("#exCheck").prop('checked',false);
				$("#exCheck").val("FALSE");
			}
		} else {
			$("#exCheck").val("TRUE");
		}
	} else {
	    $("#exCheck").val("FALSE");
	}
}

//제주일때 일반예약 선택했을 시, 값 ""
function fnJeJuNomalChk() {
    if($("#showJeJuDate").text() == "" && $("#showJeJuHour").text() == "" && $("#showJeJuMinute").text() == ""){
	alert("차량 대여일시를 선택하세요.");
	return false;
    }
	$("#mysteryChk").val("");
}


//2017-04-12 추가 cw.park, 2017-06-04 ky.cho 통합
function carSearch() {
	var type = borrow.data.currentType;

	$("#rentPlace").val($("._selBranch").eq(type).text());
	$("#returnPlace").val($("._selReBranch").eq(type).text());

	$("#konda").val(borrow.action.getType() + 1);
    $("#konda_cdw").val(borrow.action.getType() + 1);

	if ($("input[name='hdsCheck']").prop('checked')) {
		$("input[name='hdsCheck']").val("Y");
	} else {
		$("input[name='hdsCheck']").val("N");
	}
	
	var type = borrow.data.currentType;
	if (!borrow.data.choice[type].period) {
		alert("대여일시와 반납일시를 입력하여 주세요.");
		return false;
	}
	
	if (!borrow.data.choice[type].branch) {
		alert("대여지점과 반납지점을 입력하여 주세요.");
		return false;
	}
	
	if(!$("#nomal").prop("checked") && !$("#mystery").prop("checked")){
		alert("차량 유형을 입력하여 주세요.");
		return false;
	}

	if (type === 1) {
		if($("#rentBranch").val() == '622' && $("#returnBranch").val() == '622'){
			$("#areaFlag").val('6');
			$("#jejuAuto").val('X');
		} else {
			$("#areaFlag").val('');
			$("#jejuAuto").val('');
		}
	}




//	$("#tempShowDate").val($(".rentBox").eq(type * 2).find(".date").text());
//	$("#tempShowHour").val($(".rentBox").eq(type * 2).find(".hour").text());
//	$("#tempShowMinute").val($(".rentBox").eq(type * 2).find(".minute").text());
//	$("#tempShowReDate").val($(".returnBox").eq(type * 2).find(".date").text());
//	$("#tempShowReHour").val($(".returnBox").eq(type * 2).find(".hour").text());
//	$("#tempShowReMinute").val($(".returnBox").eq(type * 2).find(".minute").text());

	var divAreaBox = $("div.rent_popWrap.areaBox");

	$("#tempShowDate").val($("div.rent_popWrap").not(divAreaBox).find(".rentBox").eq(0).find(".date").text());
	$("#tempShowHour").val($("div.rent_popWrap").not(divAreaBox).find(".rentBox").eq(0).find(".hour").text());
	$("#tempShowMinute").val($("div.rent_popWrap").not(divAreaBox).find(".rentBox").eq(0).find(".minute").text());

	$("#tempShowReDate").val($("div.rent_popWrap").not(divAreaBox).find(".returnBox").eq(0).find(".date").text());
	$("#tempShowReHour").val($("div.rent_popWrap").not(divAreaBox).find(".returnBox").eq(0).find(".hour").text());
	$("#tempShowReMinute").val($("div.rent_popWrap").not(divAreaBox).find(".returnBox").eq(0).find(".minute").text());

	$("#reservMainFrm").attr({"action" : "/fr/kor/reservation/carListStep1.do", "method" : "post", "target" : "_self"}).submit();
	loadingShow("loading1");
}

//알뜰카를 선택했을 시, 값 X
function fnMysteryChk(){
    var type = borrow.data.currentType;
    if(!$("input[name='userId']").val()){
	    	if(confirm("알뜰카를 예약하시려면 로그인이 필요합니다. 로그인하시겠습니까?")){
		    location.href="/fr/kor/login/login.do";
			return false;
		}
		$("#nomal").prop("checked", true);
		$("#mystery").prop("checked", false);
		$("#mysteryChk").val("");
		//2017.01.09.서광주(707), 광주공항(708) 알뜰카 서비스 미제공 처리
	} else if($("input[name='rentBranch']").val() == "707" || $("input[name='rentBranch']").val() == "708"
		|| $("input[name='returnBranch']").val() == "707" || $("input[name='returnBranch']").val() == "708"){
			alert("선택하신 지점은 알뜰카 서비스 이용이 불가합니다.\n다른 지점으로 변경하거나 일반예약으로 진행해주시기 바랍니다.");
			$('#nomal').click();
			return false;	  
	} else{
		$("#mysteryChk").val("X");
	}
	
	if(!borrow.data.choice[type].period){
		alert("차량 대여일시를 선택하세요.");
		$('#nomal').prop("checked", true);
		$('#mystery').prop("checked", false);
		return false;
	}
}
//일반예약 선택했을 시, 값 ""
function fnNomalChk() {
    var type = borrow.data.currentType;
    if(!borrow.data.choice[type].period){
        alert("차량 대여일시를 선택하세요.");
        return false;
    }
        $("#mysteryChk").val("");
}

function popMybranch() {

var url = "/fr/kor/reservation/short/pop_mybranch.do";
var txt = "";
var txtBtn = "";
	$.ajax({
		url : url,
		type : "POST",
		timeout : 60000,
		success : function(data) {
		    console.log(data.result);
			if (data.result == "Y") {
			    $("#myStoryShow").html("");
			    $("#myStoryBtn").html("");
			    $.each(data.mylist, function(i, s) {
					txt += "<tr><td><input type='radio' id='radio"+s.result2+"' name='u_check' onclick='storeSave(\""+s.result6+"\", \""+s.result3+"\", \""+s.result7+"\",\""+s.result5+"\");'><label for='radio"+s.result2+"'><span class='icon'></span></label></td><td>"+s.result7+"</td><td>"+s.result5+"</td></tr>";
			    });
			    txtBtn += "<a href='#' class='btn_layer_close btn_red btn_200' onclick='storeConfirm();'>선택지점 등록</a>"
			    $("#myStoryShow").append(txt);
			    $("#myStoryBtn").append(txtBtn);
			} else {
			    $("#myStoryShow").html("");
			    $("#myStoryBtn").html("");
				txt += "<tr><td colspan='3' class='noStore'>나의 지점이 없습니다. 등록해주세요.</td></tr>";
				$("#myStoryShow").append(txt);
				txtBtn += "<a href='/fr/kor/myPage/myBranch.do' class='btn_red btn_200'>나의 지점 등록</a>"
				$("#myStoryBtn").append(txtBtn);
			}
		},
		dataType : "json"
	});

}

function storeSave(result6,result3,result7,result5) {
$("#myStoreLcode").val(result6);
$("#myStoreBcode").val(result3);
$("#myStoreAname").val(result7);
$("#myStoreDetailName").val(result5);
}

//나의지점 선택 
function storeConfirm() {
 // var res = $("input[type='radio']:checked").val();	
 // var str = res.split(',');
	 var localCode = $("#myStoreLcode").val();
	 var branchCode = $("#myStoreBcode").val();
	 var areaName =  $("#myStoreAname").val();
	 var detailName = $("#myStoreDetailName").val();
	 
	 $("#rentBranch").val(branchCode);
	 $("#returnBranch").val(branchCode);
	 $("#rentPlace").val(detailName);
	 $("#returnPlace").val(detailName);
	 
	 $("#selBranch").text(detailName);
	 $("#selReBranch").text(detailName);
	 tmpRentBranch = branchCode;
	 tmpReturnBranch = branchCode;
	
	 $(document).find("input[name='rentArea']").val(localCode);
	 $(document).find("#selRentArea").val(localCode);
	 selectboxSet($(document).find("#selRentArea"),areaName);
	 
	 nowProcess = "A";
	 anyDataChange('2',$(document).find("#selRentArea"));
	 
	 $('.layerSelBranch').removeClass('noData');
	 $('.layerSelBranch').parent().addClass('on');
	 $("#rentBranch").val()
	 // execTrigger("#selRentBranch","change");
	 
	 /* setInterval(function(){
		 if(ajaxLoadingChk=="N"){
			 execTrigger("#selRentBranch","change");
	         self.close();
		 }
		},500); */
}



function branchInfo(branchCode, eventYn, branchMessage, enable, branchType) {
    $("#branchInfo").empty();
    $.ajax({
	      type: "POST",
	       dataType: "json",
			async : true,
			url : "/fr/kor/reservation/short/branchInfo.do",
			data : {
			    branchCode : branchCode
			},
			success : function(data) {
				var txt = "";
			    txt += "<h3 class='noBorder'>"+data.branchInfoVO.name_kor+" 지점안내";
			    if(eventYn == "Y" && branchMessage != null){
			    	var paramArr = branchMessage.split("||");	 //지점텍스트, contSeq, contDtlSeq
			    	var branchMsg = paramArr[0].split("|");
			    	var contSeq = paramArr[1].split("|");
			    	var contDtlSeq = paramArr[2].split("|");
			    	/* for(var i=0; i < branchMsg.length; i++){
				    	txt += "<a href='#' onclick=\"eventView('" + contSeq[i] + "', '" + contDtlSeq[i] + "');\">";
				    	txt += "<em class='ico_discount'>";
				    	txt += branchMsg[i];
				    	txt += "</em>";
				    	txt += "</a>";
			    	} */

			    	txt += "<em class='ico_discount'>";
			    	for(var i=0; i < branchMsg.length; i++){
				    	txt += "<a href='#' onclick=\"eventView('" + contSeq[i] + "', '" + contDtlSeq[i] + "');\">";
				    	txt += branchMsg[i];
				    	txt += "</a>";
				    	if(i != branchMsg.length - 1){
				    		txt += ", ";
				    	}
			    	}
			    	txt += "</em>";
			    }
			    txt += "</h3>";
			    txt += "<div class='grid mb20'>";
			    txt += "<table class='tb_row'>";
			    txt += "<caption></caption><colgroup><col style='width:105px'><col style='width:auto'></colgroup>";
			    txt += "<tbody>";
			    txt += "<tr><th scope='row' class='left'>주소</th><td class='left'><ul class='txt_list'><li class='bul f14'>도로명주소 : "+data.branchInfoVO.addr_kor2+"</li><li class='bul f14'>지번주소 : "+data.branchInfoVO.addr_kor+"</li></ul></td></tr>";
			    txt += "<tr><th scope='row' class='left'>전화 번호</th><td class='left'>"+data.branchInfoVO.tel+"</td></tr>";
			    txt += "<tr><th scope='row' class='left'>영업 시간</th><td class='left'> <ul class='txt_list'><li class='bul f14'>"+data.branchInfoVO.businesshour_kor+"</li></ul></td></tr>";
			    txt += "<tr><th scope='row' class='left'>교통 안내</th><td class='left'><ul class='txt_list'><li class='bul f14'>"+data.branchInfoVO.traffic_kor+"</li></ul></td></tr>";
			    txt += "</tbody></table></div>";
			    txt += "<div id='map' class='map'></div>";
			    txt += "<div class='btn_right'><a href='#' onclick='printOpen(\""+branchCode+"\");' class='btn btn_black'>프린트</a></div>";

			    if(enable != "X"){
					$("#branchShow").css("display","block");
			    } else {
					$("#branchShow").css("display","none");
			    }
			    
			    $("#branchInfo").html(txt);
			    $(function(){
				function layerPop (id) {
			        $('html, body').css('overflow','hidden');

			        var layer = function() {

			            if ($('#' + id).height() >= $(window).height()) {
			                $('#' + id).find('.layer_con').height($(window).height() - 160);
			            }

			            else {
			                $('#' + id).find('.layer_con').css('height','inherit');
			            }

			            $('#' + id).css({
			                'top': ($(window).height() / 2) + $(window).scrollTop() - ($('#' + id).height() / 2),
			                'left': ($(window).width() - $('#' + id).width()) / 2,
			            });
			        }

			        
			        $('.dimm').css({
			            'width': $('html, body').width(),
			            'height': $(document).height()
			        })
			        .show();

			        layer();       
			        $('#' + id).show().attr('tabindex',0).focus();

			        $(window).resize(function(){
			            layer();
			            $('.dimm').css({
			                'width': $('html, body').width(),
			                'height': $(document).height()
			            });
			        });
				}

					layerPop('layerBranchInfo');
					$('#layerBranchInfo .btn_layer_close').off('click');
					$('#layerBranchInfo .btn_layer_close').click(function(){

						$('#layerBranchInfo').hide();

				        $(this).parents('.layer').removeAttr('tabindex').hide();
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

						if (branchType == 'rent') {
							$('#layerSelBranch #selRentBranch').find('#rdo-' + branchCode).siblings('a').focus();
						}
						else {
							$('#layerSelBranch #selReturnBranch').find('#rdo2-' + branchCode).siblings('a').focus();
						}
					});
			    });
				getMap(data.geoCodeMap.xPoint, data.geoCodeMap.yPoint);
			},
			error:function(request,status,error){
			    console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
				/* alert("[자동차유형]오류가 일시 발생하였습니다. 잠시 후 다시 시도해보시거나, 오류가 계속될 경우 고객센터(1588-1230)로 문의바랍니다.");
				location.reload(); */
			}
		});

}

function getMap(xPoint,yPoint){
    var position = new naver.maps.LatLng(yPoint, xPoint);
	//var HOME_PATH = window.HOME_PATH || '.';
	var mapOptions = {
	    center: position,
	    zoom: 10,
	    zoomControl: true,
    zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT
    },
    mapTypeId: naver.maps.MapTypeId.NORMAL
	};
	var map = new naver.maps.Map('map', mapOptions);
	// marker
	var markerOptions = {
			position: position,
			map: map
			/* ,icon:{
				url: HOME_PATH +'/img/example/sally.png',
				size: new naver.maps.Size(33,44), //마커 size
				origin: new naver.maps.Point(0,0), //origin 기본값 (0,0)
				anchor:new naver.maps.Point(11,35) //anchor 속성은 이미지의 중앙 하단 포인터를 기본값으로 설정
				
			} */
	};
	var marker = new naver.maps.Marker(markerOptions);	
}

function eventView(contSeq, contDtlSeq){
	$("#contSeq").val(contSeq);
	$("#contDtlSeq").val(contDtlSeq);
	$("#defaultFrm").submit();
}


//추가 지점 호출
function branchSubList(code,type) {
    var txt = "";
    $.ajax({
	    type: "POST",
	    dataType: "json",
		async : false,
		url : "/fr/kor/reservation/branchPlacelist.do",
		data : {
			branchCode : code,
			startDate : $("input[name='rent_date']").val().replace("/", "").replace("/", ""),
			endDate : $("input[name='return_date']").val().replace("/", "").replace("/", ""),
		},
		success : function(data) {

			var tempReturnPlaceCode = $("option:selected", "#selReturnBranch2").val();
			var tempReturnPlaceReset = "N";

			if(type == "rent"){
				$.each(data.bList, function(i, s) {
					placeName = s.PLACE;
					depcdName = placeName.replace("지점","").replace("영업소","");
						txt += "<li><input type='radio' id='rdo-"+s.SNUMM+"' name='rdo-1' value='"+depcdName+"' code='" + s.SNUMM + "' realCode='" + s.VKGRP + "'kschn='" + s.KSCHN + "' kschn_tx='" + s.KSCHN_TX + "' kbetr='" + s.KBETR + "' + konwa='" + s.KONWA + "' + placename='" + s.PLACE + "' onClick='inpStopSub("+s.VKGRP+",\""+ s.SNUMM +"\");'><label for='rdo-"+s.SNUMM+"'><span class='icon'></span>"+depcdName+"</label>";
						txt += "<a href='#layerBranchInfo' onclick=\"branchInfo('"+s.VKGRP+"', 'N', '');\" class='layerBranchInfo btn btn_white btn_layer'>지점안내</a></li>";
				});
				//$("#selRentBranch").append(txt);
			}
			if(type == "return"){
				$.each(data.cList, function(i, s) {
				    placeName = s.PLACE;
				    depcdName = placeName.replace("지점","").replace("영업소","");
					
						txt += "<li><input type='radio' id='rdo2-"+s.SNUMM+"' name='rdo-2' value='"+depcdName+"' code='" + s.SNUMM + "' realCode='" + s.VKGRP + "'kschn='" + s.KSCHN + "' kschn_tx='" + s.KSCHN_TX + "' kbetr='" + s.KBETR + "' + konwa='" + s.KONWA + "' + placename='" + s.PLACE + "' onClick='reInpStopSub("+s.VKGRP+",\"" + s.SNUMM + "\");'><label for='rdo2-"+s.SNUMM+"'><span class='icon'></span>"+depcdName+"</label>";
						txt += "<a href='#layerBranchInfo' onclick=\"branchInfo('"+s.VKGRP+"', 'N', '');\" class='layerBranchInfo btn btn_white btn_layer'>지점안내</a></li>";
				});
			}
		}
	});
	return txt;
}

function inpStopSub(VKGRP,SNUMM){
    $("#rentBranch").val(VKGRP);
	$("#realBranch").val(VKGRP);
	
	$("#eplace").val(SNUMM);
	$("#splace").val(SNUMM);
	$("#konda").val("1"); // 내륙
	
    if($("#areaCheck").is(":checked")){
	    $("#rdo2-"+SNUMM).prop("checked", true);
	    $("#returnBranch").val(VKGRP);
	}

}

function reInpStopSub(VKGRP,SNUMM){
    $("#returnBranch").val(VKGRP);
	
	if($("#areaCheck").is(":checked")){
	    $("#rdo-"+SNUMM).prop("checked", true);
	    $("#returnBranch").val(VKGRP);
	}
}

function loadingShow (id) {
    $('html, body').css('overflow','hidden');

    var layer = function() {

        if ($('#' + id).height() >= $(window).height()) {
            $('#' + id).find('.layer_con').height($(window).height() - 160);
        }

        else {
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

function loadingHide (id) {
   $('html, body').css('overflow','visible');
   $('.dimm').hide();
   $('#' + id).hide();
}

function branchListJeJu(gubun){
    areaCode = $("option:selected", "#selRentJeJuArea").val();
    
    var rentTime = "";
	if($("#rent_hour").val()!="" && $("#rent_minute").val()!=""){
		rentTime = $("#rent_hour").val()+""+$("#rent_minute").val()+"00";
	} else {
		rentTime = "";
	}
	var returnTime = "";
	if($("#return_hour").val()!="" && $("#return_minute").val()!=""){
		returnTime = $("#return_hour").val()+""+$("#return_minute").val()+"00";
	} else {
		returnTime = "";
	}

	var gubunVal = "";
	if(gubun == "selRentJeJuArea"){
		gubunVal = "S";
	} else {
		gubunVal = "E";
	}
	
	var jejuAuto = "";
	if(areaCode=="6"){
		jejuAuto = "X";
	}
	$.ajax({
	    type: "POST",
	    dataType: "json",
		async : true,
		url : "/fr/kor/reservation/branchList.do",
		data : {
			gubun : gubunVal,
			rentDate : $("input[name='rent_date']").val().replace("/", "").replace("/", ""),
			rentTime : $("#sHour").val()+$("#sMin").val()+"00",
			returnDate : $("input[name='return_date']").val().replace("/", "").replace("/", ""),
			returnTime : $("#eHour").val()+$("#eMin").val()+"00",
			areaCode : areaCode,
			jejuAuto : jejuAuto
		},
		success : function(data) {
			var txt = "";
			var retxt = "";
			//$("#JeJuGubun").empty();
			// $("#JeJuReGubun").empty();
			if(gubun == "selRentJeJuArea"){
				txt = settingJeJuBranchList(data.branchList,"selRentJeJuArea");
				$("#JeJuGubun").append(txt);
			} else if(gubun == "selReturnJeJuArea"){
			    txt = settingJeJuBranchList(data.branchList,"selReturnJeJuArea");
			    $("#JeJuReGubun").append(txt);
			}
			    // 딜리버리 서비스 추가
			    //$("#selReturnAreaHDS").val(areaCode);
	    		//selectboxSet($("#selReturnAreaHDS"),$("option:selected", "#selReturnAreaHDS").text());
	    		
	    		//txt = settingBranchList(data.branchList,"selReturnHdsBranch");
	    		//$("#selReturnBranchHDS").empty();
	    		//$("#selReturnBranchHDS").append(txt);
		}
	});
	
    
}
function settingJeJuBranchList(list,gubun){
    var txt = "";
    $.each(list, function(i, s) {
	    if(gubun == "selRentJeJuArea"){
			txt += "<li><input type='hidden' id='rdo"+s.VKGRP+"' name='rdoJeJu' value='"+s.PLACE+"' enablecnt='" + s.LS_ENABLE_CNT + "' areaCode='" + s.COUNC + "'areaNm='" + s.COUNC_TX + "' tfrom='" + s.TFROM_S + "' tend='" + s.TEND_S + "'>";
	    }
	    if(gubun == "selReturnJeJuArea"){
			txt += "<li><input type='hidden' id='rdo"+s.VKGRP+"' name='rdoReJeJu' value='"+s.PLACE+"' enablecnt='" + s.LS_ENABLE_CNT + "' areaCode='" + s.COUNC + "'areaNm='" + s.COUNC_TX + "' tfrom='" + s.TFROM_S + "' tend='" + s.TEND_S + "'>";
	    }
	});
    
    return txt;
}

function JeJuSetArea(obj){
    if(obj.attr("id") == "selRentJeJuArea"){
		branchListJeJu(obj.attr("id"));
    } else if(obj.attr("id") == "selReturnJeJuArea"){
		branchListJeJu(obj.attr("id"));
    }
}

function printOpen(branchCode){
    var frm = document.reservMainFrm;
    var target = "_blank";
    frm.action = "/fr/kor/myPage/printMap.do?branchCode="+branchCode+"";
    frm.target = target;
    frm.submit();
}

function popScrollSet(type){
	popScroll = type;
}

$(window).load(function () {
	$("a[href='#']").attr("href", "javascript:$.noop();");
});