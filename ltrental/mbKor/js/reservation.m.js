asyncCheck = true;

var ajaxLoadingChk = "N";

var selectObj, sbbObj;
var editMode = "N";
var carRentFee = 0;
var pointFee = 0;
var carDiscountFee = 0;
var carDiscount = 0;
var optionFee = 0;
var insFee = 0;
var onewayFee = 0; // EDIT
var jejuairportFee = 0;
var giftFee = 0;	// EDIT
var hdsFee = 0;
var clkModel = null;
var selChk = 0;

var optionBabyseatFee = 0; // 베이비시트
var optionCarseatFee = 0; // 카시트 - 2016.07.20 추가
var optionCarriageFee = 0; // 유모차 - 2016.07.20 추가

// SAP 추가
var carSize = 0;
var couponFee = 0;
var couponRate = 0;
var eventFee = 0;
var eventRate = 0;
var carDiscountFeeCoupon = 0;
var carDiscountFeeEvent = 0;

var tempDiscountFee = 0; // 상품권으로 적용될 할인가격
var tempLastDiscountFee = 0;// 상품권으로 적용되는 마지막 상품권 할인 가격 (할인적용금액 원대여 금액보다 큰 경우에만 사용)
var tempDayDiscountFee = 0;// 상품권으로 적용되는 하루 할인 가격
var giftCardDiscountFee = 0;// 상품권이 적용된 차 할인가격
var giftCardCount = 0;
var realGiftCardCount = 0;
var konwa = "";
var maxCount = 0; // 상품권 적용 갯수 초과 시 1로 세팅

var editFlag = "N";
var returntxt = "";

var tmpRentBranch = "";
var tmpReturnBranch = "";
var tmpJejuRentPlace = "";
var tmpJejuReturnPlace = "";
var tmpUpCarModel = "";

var nowProcess = "";

//20160812. 인천공항(503)/제주(622)만 90일 뒤까지 예약, 타지점 60일 뒤까지 유지
var LIMIT_TERM = 90;
var LIMIT_TERM_60 = 60;

var mysteryChk =""; //알뜰카 구분

//20170123. 평일구분
var gvIsWeekday_s = "";
var gvIsWeekday_e = "";
var INFO_MSG_711_DS = "청주공항 대여/반납서비스 이용가능시간 : 평일 10:00~17:00\n문의 : 청주지점(043-213-8000)";
var DS_FEE_711 = 15000;
var dsCnt711 = 0;
var dsFee_711 = 0;
//청주공항 D/S 가능시간 - 평일 10:00~17:00\n(주말,공휴일,성수기 제외)

var console = window.console || { log: function() {} };
/*
$(document).ready(function() {
	$(document).ajaxStart( function(){
		ajaxLoadingChk = "Y";
		$.blockUI({message:"<img src='/img/bc/ajax-loader.gif' /> 로딩중..."});
		setTimeout( $.unblockUI , 300000);
	}   );
	$(document).ajaxStop( function(){
		$.unblockUI();
		ajaxLoadingChk = "N";
	} );
	$(document).on("keyup", "input:text[numberOnly]", function() {$(this).val( $(this).val().replace(/[^0-9]/gi,"") );});

	$('.allow_btn input').hover(function(){
		$('.allow').css('display','block');
	  });
	  $('.allow_btn input').mouseleave(function(){
		$('.allow').css('display','none');
	  });


	//20160812. 제주(622)/인천공항(503)은 90일 뒤까지 예약 가능, 그 외 60일
	//LIMIT_TERM은 reservation.js 상단에 선언
	$( "#reservDatepicker1" ).datepicker({
			minDate:new Date(srvTime()),
			//maxDate:'+60d',
			maxDate:'+'+LIMIT_TERM+'d',
			showButtonPanel: true,
			dateFormat: "yy.mm.dd" //날짜 출력 형식
		});

	$( "#reservDatepicker2" ).datepicker({
			minDate:new Date(srvTime()),
			//maxDate:'+60d',
			maxDate:'+'+LIMIT_TERM+'d',
			showButtonPanel: true,
			dateFormat: "yy.mm.dd" //날짜 출력 형식
		});

	dateSetting();
	formSetting(); // 전화번호 셋팅
	
	$("input[name='sDate_'],#sHour,#sMin,input[name='eDate_'],#eHour,#eMin").on('focus', function () {
			previous = this.value;
		}).change(function() {
			var rentDt = new Date($("input[name='sDate_']").val().split(".")[0],Number($("input[name='sDate_']").val().split(".")[1])-1,$("input[name='sDate_']").val().split(".")[2],$("#sHour").val(),$("#sMin").val(),"00");
			var returnDt = new Date($("input[name='eDate_']").val().split(".")[0],Number($("input[name='eDate_']").val().split(".")[1])-1,$("input[name='eDate_']").val().split(".")[2],$("#eHour").val(),$("#eMin").val(),"00");
			if($(this).attr("name")=="sDate_"){
				var nextDate = new Date(Date.parse(rentDt) + 1000 * 60 * 60 * 24);
				$("input[name='eDate_']").val(nextDate.getFullYear() + "."+ getDec(nextDate.getMonth() + 1) + "."+ getDec(nextDate.getDate()));
			}
			if($(this).attr("name")=="eDate_" || $(this).attr("name")=="eHour" || $(this).attr("name")=="eMin"){
				if(rentDt>returnDt){
					alert("죄송합니다.\n대여시간 이후의 반납시간으로 설정해주세요.");
					$(this).val(previous);
				}

				//대여일 30일 뒤 날짜와 반납일 비교
				var td30 = new Date(Date.parse(rentDt)+1000*60*60*24*30);

				if (td30 < returnDt) {
					alert("반납일은 대여일로부터 30일 이내여야 합니다.");
					$("input[name='eDate']").focus();
					$(this).val(previous);
				}
			}


			//TODO podl
			if($("option:selected", "#selRentBranch").val() != ""){
				if ($("option:selected", "#selRentBranch").attr("tend") != "24:00:00"
					&& !validTimeChk($("option:selected", "#selRentBranch").attr("tfrom"), $("option:selected", "#selRentBranch").attr("tend")) ) {
					//alert("죄송합니다.\n금일 오후 9시 이후에 익일 예약을 희망하시는 경우 익일 오전 10시 이후부터 대여 가능합니다.\n대여기간을 다시 선택해주세요.");
					resetArea();
				}
			}

			//20170117.청주지점(711) -> 청주공항 D/S added. bskwon
			if($(this).attr("name")=="eHour" || $(this).attr("name")=="eMin"){
				if($("input[name='rentBranch']").val()=="605"
					|| $("input[name='rentBranch']").val()=="711"
					|| $("input[name='rentBranch']").val()=="622"){
					branchListSub($("input[name='rentBranch']").val(),"rent");
				}
			}

			var toD = rentDt;
			var dayOne = new Date(Date.parse(toD) + 1000 * 60 * 60 * 24);
			var sdayOne = "" + dayOne.getFullYear() + getDec(dayOne.getMonth() + 1)
					+ getDec(dayOne.getDate()) + getDec(dayOne.getHours())
					+ getDec(dayOne.getMinutes()) + "00";

			dateSettingView();

			if ($("input[name='rentBranch']").val() == "503" && !timeChk()) {
				alert("06:00시 이후 인천공항 지점(032-743-8000)으로 문의 부탁 드립니다. 감사합니다.");
				resetArea();
				return false;
			}

			//050513 추가
			if( $("option:selected", "#selRentBranch").val() != null || $("option:selected", "#selRentBranch").val() !="" ){
				if ($("option:selected", "#selRentBranch").val() == "424"
					&& (($("input[name='sDate']").val() >= 20150601000000 ) || ($("input[name='eDate']").val() >= 20150601000000 ))) {
					alert("교대역 지점은 2015년 6월 1일 00시부터는 예약이 불가 하오니 [고속터미널 지점] 으로 예약 부탁드립니다.");
					resetArea();
					return false;
				}

				if ($("option:selected", "#selRentBranch").val() == "410"
					&& (($("input[name='sDate']").val() >= 20150601000000 ) || ($("input[name='eDate']").val() >= 20150601000000 ))) {
					alert("용산역 지점은 2015년 6월 1일 00시부터는 예약이 불가 하오니 [서울역 지점] 으로 예약 부탁드립니다.");
					resetArea();
					return false;
				}
			}

			if ($("option:selected", "#selRentBranch").val() == "425"
				&& (($("input[name='sDate']").val() >= 20151005210000 && $("input[name='sDate']").val() <= 20151006070000) || ($("input[name='eDate']").val() >= 20151005210000 && $("input[name='eDate']").val() <= 20151006070000))) {
				alert("고속터미널 지점은 10월 05일 21시부터 10월 06일 07시까지는 예약이 불가능 합니다.");
				resetArea();
				return false;
			}

			//20160511 추가 bskwon
			if ($("option:selected", "#selRentBranch").val() == "408"
				&& (($("input[name='sDate']").val() >= 20160528000000 ) || ($("input[name='eDate']").val() >= 20160528000000 ))) {
				alert("한남 지점은 2016년 5월 28일 00시부터는 예약이 불가 하오니 [동대문 지점] 으로 예약 부탁드립니다.");
				resetArea();
				return false;
			}
			//20161026 추가 bskwon
			if ($("option:selected", "#selRentBranch").val() == "526"
				&& (($("input[name='sDate']").val() >= 20161101000000 ) || ($("input[name='eDate']").val() >= 20161101000000 ))) {
				alert("※ 김포신도시지점 안내\n10월 31일 부로 단기렌터카 서비스 종료합니다. 11월 1일부터는 [일산지점]을 이용해주세요.");
				resetArea();
				return false;
			}

			// 24시간이내에는 편도반납 금지
			if ($("input[name='rentBranch']").val()!="" && $("input[name='returnBranch']").val()!="" && $("input[name='rentBranch']").val() != $("input[name='returnBranch']").val()) {
				if (sdayOne > $("input[name='eDate']").val()) {
					alert("죄송합니다.\n대여정책에 따라 대여시간이 24시간 이상인 경우에만 편도 반납이 가능합니다.\n대여시간을 다시 선택해주세요.");
					tmpRentBranch = "";
					resetArea();
					resetAreaZ();
					resetAreaZLayerA();
					resetAreaZLayerB();

					rentBranchReset();
					returnBranchReset();

					carReset();
					priceReset();

					resetOptionChk();
					resetOption(); // 옵션
					resetPoint(); // 포인트
					resetGift(); // 무료이용권
					resetVal();

					return false;
				}
			}
			if ($("input[name='rentBranch']").val() == "622" && ($("input[name='splace']").val()=="02" || $("input[name='eplace']").val()=="02")) {
				if (($("option:selected", "#sHour").val() + "" + $("option:selected", "#sMin").val() < "0900") || ($("option:selected", "#sHour").val() + "" + $("option:selected", "#sMin").val() > "1900") || ($("option:selected", "#eHour").val() + "" + $("option:selected", "#eMin").val() < "0900") || ($("option:selected", "#eHour").val() + "" + $("option:selected", "#eMin").val() > "1900")) {
					alert("롯데호텔은 대여시간과 반납시간이 9:00~19:00 사이 일 경우에 예약 가능합니다.");
					resetArea();
					resetAreaZLayerA();
					resetAreaZLayerB();
					if($("#jejuSetting").val()=="X"){
						setAreaZLayerA();
						setAreaZLayerB();
					}
					return false;
				}
			}

			if( $("input[name='returnBranch']").val() == "622" || $("input[name='rentBranch']").val() == "622" ){
				// 제주일 경우 24시간 이내 예약 불가능
				if (Number($("input[name='eDate']").val()) - Number($("input[name='sDate']").val()) < 1000000) {
					//alert("24시간이상 예약만 사용하실 수 있습니다.");
					alert("죄송합니다.\n대여 정책에 따라 제주 지점의 대여는 24시간 이상 선택하셔야 대여가 가능합니다.");
					resetArea();
					if($("#jejuSetting").val()!="X"){
						setAreaZLayerA();
						setAreaZLayerB();
					}
					return false;
				}

				if((("0800" > ($("option:selected", "#sHour").val() + "" + $("option:selected", "#sMin").val())) || ("2200" < ($("option:selected", "#sHour").val() + "" + $("option:selected", "#sMin").val()))) ||
						(("0800" > ($("option:selected", "#eHour").val() + "" + $("option:selected", "#eMin").val())) || ("2200" < ($("option:selected", "#eHour").val() + "" + $("option:selected", "#eMin").val()))) ){
					//alert("지점 업무 시간을 확인해 주세요.");
					alert("해당 지점 업무 시간을 확인해 주세요.\n\n대여일 업무시간 : "+$("option:selected", "#selRentBranch").attr("tfrom").substring( 0, 5 )+"~"+$("option:selected", "#selRentBranch").attr("tend").substring( 0, 5 )+"\n\n반납일 업무시간 : "+$("option:selected", "#selReturnBranch").attr("tfrom").substring( 0, 5 )+"~"+$("option:selected", "#selReturnBranch").attr("tend").substring( 0, 5 ));
					resetArea();
					if($("#jejuSetting").val()!="X"){
						setAreaZLayerA();
						setAreaZLayerB();
					}
					return false;
				}
			}

			//20160812. 제주(622)/인천공항(503)은 90일 뒤까지 예약 가능, 그 외 60일
			if($("input[name='rentBranch']").val() != "") {
				if ($("input[name='rentBranch']").val() == "503" || $("input[name='rentBranch']").val() == "622") {
					refreshDatepicker(90);
				} else {
					refreshDatepicker(60);
				}

				//20170117.청주지점(711) -> 청주공항 D/S added. bskwon
				if ($("input[name='rentBranch']").val() == "711") {
					weekdayCheck();
				}
			}

			nowProcess = "D";
			//****************
			anyDataChange('1',$(this));
			//****************

			if($(this).attr("name")=="sDate_"){
				$( "#reservDatepicker2" ).datepicker("destroy");
				$( "#reservDatepicker2" ).datepicker({
					minDate:rentDt,
					maxDate:new Date(Date.parse(rentDt) + 1000 * 60 * 60 * 24 * 30),
					showButtonPanel: true,
					dateFormat: "yy.mm.dd" //날짜 출력 형식
				});
				$( "#reservDatepicker2" ).datepicker("refresh");
			}

			$("option[value='']", this).remove();

			resetOption();

			previous = this.value;
	});

	// 지점조회
	$("#selRentArea,#selReturnArea").change(
			function() {
				nowProcess = "A";
				//****************
				anyDataChange('2',$(this));
				//****************

			// 제주 선결제 alert 공지
				if ($("option:selected", "#selRentArea").val() == "6" && $("input[name='userId']").val()!="") {
					window.open('/popup/pop_jejusun/pop_notice.html', 'popup_jeju', "width=343,height=370" );
					$("#jejuText").show();
					$(".pay_btn").text("결제 하기");
				} else {
						$("#jejuText").hide();
						$(".pay_btn").text("예약 완료");
				}

			});

	//반납지역 클릭
	$("#selReturnArea").bind("click",
		function() {
			if ($("input[name='rentBranch']").val() == "") {
				alert("대여지점을 먼저 선택하여 주십시오");
				$(this).val($("#selRentArea").val());
				return false;
			}
			if ($("input[name='rentArea']").val() == "6") {
				//alert("제주 지점 이외에는 반납 하실 수 없습니다.");
				alert("죄송합니다.\n제주 지역에서 대여하시는 경우 차량 반납은 제주 지역에서만 가능합니다.");
				$(this).val("6");
				return false;
			}
	});

	// 차량조회
	$("#brandCode,#carSize").change(
			function() {
				nowProcess = "C";
				if($(this).attr("id")=="brandCode"){
					nowProcess = "C1";
				} else if($(this).attr("id")=="carSize"){
					nowProcess = "C2";
				}
				//****************
				anyDataChange('4',$(this));
				//****************
				$("option[value='']", this).remove();
			});

	//포인트 입력 체크
	$("input[name='pointUseFee']").keyup(
			function() {
				if(editMode == "N"){
					var val = $(this).val().split(",").join("");
					var tv = $("input[name='totalPoint']").val();
					if (/[^0123456789]/g.test(val)) {
						alert("숫자가 아닙니다.\n\n0-9의 정수만 허용합니다.");
						$("#pointVal").html(comma(tv));
						$("#pointUseFee").html("");
						pointFee = 0;
						this.value = "";
						this.focus();
						totalPrice();
					} else {
						totalPrice();
						var tv = $("input[name='totalPoint']").val();
						var tvprice = 0;

						if (carDiscountFeeEvent > 0) {
							tvprice = carDiscountFeeEvent
									- couponFee - tempDiscountFee;
						} else if (carDiscountFeeCoupon > 0) {
							tvprice = carDiscountFeeCoupon
									- eventFee - tempDiscountFee;
						} else {
							tvprice = carDiscountFee - giftFee
									- couponFee - eventFee
									- tempDiscountFee;
						}

						if (tv - val < 0) {
							alert("잔여포인트는 " + comma(tv) + "포인트 입니다");
							$("#pointVal").html(comma(tv));
							pointFee = 0;
							this.value = "";
							this.focus();
							totalPrice();
						} else if (tvprice - val < 0) {
							alert("포인트는 대여요금만 결재 하실 수 있습니다.");
							$("#pointVal").html(comma(tv));
							pointFee = 0;
							this.value = "";
							this.focus();
							totalPrice();
						} else {
							this.value = comma(val);
							pointFee = val;
							$("#pointVal").html(comma(tv - val));
							totalPrice();
						}
					}
				}
			});


	$("#selRentBranch").change(function() {
		nowProcess = "B";
		if($("option:selected", this).val() != ""){
			//carReset();

			if ($("option:selected", this).attr("enablecnt")=="N") {
				alert("대여지점 업무종료 시간을 확인해 주세요.");
				$(this).val("");
				$(this).trigger("change");
				return false;
			}

			if($("option:selected", this).val() == "722" ) {
				alert('여수엑스포역으로 도착하시는 고객님들께 무료 픽업서비스를 시행하오니 원하시는 고객님은 차량 예약완료 후 지점으로 요청해 주시기 바랍니다.(롯데렌터카 여수지점 Tel 061-642-8000)\n※주말/공휴일에는 서비스 이용이 제한됩니다.');
			}

			//050513 추가
			if ($("option:selected", this).val() == "424"
				&& (($("input[name='sDate']").val() >= 20150601000000 ) || ($("input[name='eDate']").val() >= 20150601000000 ))) {
				alert("교대역 지점은 2015년 6월 1일 00시부터는 예약이 불가 하오니 [고속터미널 지점] 으로 예약 부탁드립니다.");
				resetArea();
				return false;
			}

			if ($("option:selected", this).val() == "410"
				&& (($("input[name='sDate']").val() >= 20150601000000 ) || ($("input[name='eDate']").val() >= 20150601000000 ))) {
				alert("용산역 지점은 2015년 6월 1일 00시부터는 예약이 불가 하오니 [서울역 지점] 으로 예약 부탁드립니다.");
				resetArea();
				return false;
			}
			//20160511 추가 bskwon
			if ($("option:selected", this).val() == "408"
				&& (($("input[name='sDate']").val() >= 20160528000000 ) || ($("input[name='eDate']").val() >= 20160528000000 ))) {
				alert("한남 지점은 2016년 5월 28일 00시부터는 예약이 불가 하오니 [동대문 지점] 으로 예약 부탁드립니다.");
				resetArea();
				return false;
			}
			//20161026 추가 bskwon
			if ($("option:selected", this).val() == "526"
				&& (($("input[name='sDate']").val() >= 20161101000000 ) || ($("input[name='eDate']").val() >= 20161101000000 ))) {
				alert("※ 김포신도시지점 안내\n10월 31일 부로 단기렌터카 서비스 종료합니다. 11월 1일부터는 [일산지점]을 이용해주세요.");
				resetArea();
				return false;
			}

			//2017.01.09.서광주(707), 광주공항(708) 알뜰카 서비스 미제공 처리
			if(mysteryChk == "X") {
				if ($("option:selected", "#selRentBranch").val() == "707" || $("option:selected", "#selRentBranch").val() == "708"){
					alert("서광주,광주공항 지점은 알뜰카 서비스 이용이 불가합니다.\n다른 지점으로 변경하거나 일반예약으로 진행해주시기 바랍니다.");
					resetArea();
					return false;
				}
			}

			if ($("option:selected", this).val() == "503" && !timeChk()) {
				alert("06:00시 이후 인천공항 지점(032-743-8000)으로 문의 부탁 드립니다. 감사합니다.");
				resetArea();
				return false;
			}

			if ($("option:selected", this).attr("tend") != "24:00:00"
				&& !validTimeChk($("option:selected", this).attr("tfrom"), $("option:selected", this).attr("tend")) ) {
				//alert("죄송합니다.\n금일 오후 9시 이후에 익일 예약을 희망하시는 경우 익일 오전 10시 이후부터 대여 가능합니다.\n대여기간을 다시 선택해주세요.");
				resetArea();
				return false;
			}

			//20170117.청주지점(711) -> 청주공항 D/S added. bskwon
			if ($("option:selected", this).val() == "622"
				|| $("option:selected", this).val() == "605"
				|| $("option:selected", this).val() == "711") { // 제주 - 부산(605), 청주(711)
				
				//청주지점 평일체크
				if ($("option:selected", this).val() == "711") {
					weekdayCheck();
				}
				
				$("input[name='splace']").val("");
				$("input[name='eplace']").val("");
				branchListSub($("option:selected", this).val(),"rent");
				resetAreaZ();

				setAreaZLayerA();
				setAreaZLayerB();
			} else {
				resetAreaZLayerA();
				resetAreaZLayerB();
			}

			$("input[name='rentBranch']").val($("option:selected", this).val());
			$("input[name='realBranch']").val($("option:selected", this).val());
			$("input[name='konda_cdw']").val($("option:selected", this).attr("konda_cdw")); // CDW 가격구룹
			$("input[name='konda']").val($("option:selected", this).attr("konda")); // 가격구룹
			// 화성 셋팅
			$("input[name='vtweg']").val($("option:selected", this).attr("vtweg"));
			$("input[name='liznr']").val($("option:selected", this).attr("liznr"));

			// 지점 업무 종료시간 체크
			if(($("option:selected", this).attr("tfrom").replace(":", "").replace(":", "") > ($("#sHour").val() + $("#sMin").val()+"00")) ||
					($("option:selected", this).attr("tend").replace(":", "").replace(":", "") < ($("#sHour").val() + $("#sMin").val()+"00")) ){
				alert("대여지점 업무시간을 확인해 주세요.!");
				resetArea();
				resetAreaZLayerA();
				resetAreaZLayerB();
				return false;
			}

			var check = setBranchReturnCheck($("option:selected", this).attr("areaCode"), $("option:selected", this).val());
			if(check == "N"){
				//alert("반납지점 업무종료 시간을 확인해 주세요..");
				alert($("option:selected", this).text()+"지점 업무종료 시간을 확인해 주세요.");
				resetArea();
				resetAreaZLayerA();
				resetAreaZLayerB();
				return false;
			}

			if($("#selRentArea").val()!=$("#selReturnArea").val()){
				$("#selReturnArea").val($("#selRentArea").val());
				selectboxSet($("#selReturnArea"),$("option:selected", "#selRentArea").text());
				$("input[name='returnBranch']").val("");
				$("input[name='returnPlace']").val("");

				$("#selReturnBranch").empty();	// selectbox 초기화
				$("#selReturnBranch").append(returntxt);
				$("#selReturnBranch").val($("option:selected", "#selRentBranch").val());
				selectboxSet($("#selReturnBranch"),$("option:selected", "#selReturnBranch").text());
				selectboxColor("selReturnBranch");
			}

			$("#selReturnBranch").val($("option:selected", this).val());
			selectboxSet($("#selReturnBranch"),$("option:selected", this).text());
			$("option[value='']", "#selReturnBranch").remove();

			$("input[name='returnBranch']").val($("option:selected", this).val());
			$("input[name='returnPlace'],input[name='rentPlace']").val($("option:selected", this).text());

			// 포항공항의 경우 alert 공지
			if ($("option:selected", this).val() == "621") {
				alert("포항공항의 영업시간은\n\n월-목, 토요일 08:30~18:00 / 금요일, 일요일 08:30~18:00 입니다.\n\n온라인에서는 18시 예약만 가능하오니 \n\n20시까지 이용을 원하시는 고객님께서는\n\n고객센터(1588-1230)로 문의하시기 바랍니다.");
			}

			//20160812. 제주(622)/인천공항(503)은 90일 뒤까지 예약 가능, 그 외 60일
			if($("input[name='rentBranch']").val() != "") {
				if ($("input[name='rentBranch']").val() == "503" || $("input[name='rentBranch']").val() == "622") {
					refreshDatepicker(90);
				} else {
					refreshDatepicker(60);
				}
			}

			if ($("input[name='hdsCheck']").prop('checked')) {
				if($("input[name='hdsType']:checked").val()=="1"){
					$("#selReturnHdsBranch").empty();
					$("#selReturnHdsBranch").append("<option value='"+$("option:selected", "#selRentBranch").val()+"' branchcode='"+$("option:selected", "#selRentBranch").attr("branchcode")+"' areaCode='"+$("option:selected", "#selRentArea").val()+"' areaNm='"+$("option:selected", "#selRentArea").text()+"' >"+$("option:selected", "#selRentBranch").text()+"</option>");
					$("#selReturnHdsBranch").val($("option:selected", "#selRentBranch").val());
					selectboxSet($("#selReturnHdsBranch"),$("option:selected", "#selReturnHdsBranch").text());

					if($("input[name='returnZip']").val()!=""){
						setHDSList($("input[name='returnZip']").val(),"return");
					}

				}
			}

			if(mysteryChk != "X"){
				callCarList();
			}else{
				mysteryMenu();
			}

			setAreaName();
			resetOption();



			$("option[value='']", this).remove();
			//$("#my_local").show();	//나의 지점
			//$("input[name='rentArea']").val("");
			//hdsReset();
		}
	});

	$("#selReturnBranch").change(function() {
		nowProcess = "B";

		if ($("option:selected", this).attr("enablecnt")=="N") {
			alert("반납지점 업무종료 시간을 확인해 주세요.");
			$(this).val("");
			return false;
		}

		//20170117.청주지점(711) -> 청주공항 D/S added. bskwon
		if ($("option:selected", this).val() == "622"
			|| $("option:selected", this).val() == "605"
			|| $("option:selected", this).val() == "711") { // 제주,부산,청주(711)
			
			//청주지점 평일체크
			if ($("option:selected", this).val() == "711") {
				weekdayCheck();
			}
			
			$("input[name='eplace']").val("");
			branchListSub($("option:selected", this).val(),"return");
			setAreaZLayerB();
		} else {
			resetAreaZLayerB();
		}


		//20161026 추가 bskwon
		if ($("option:selected", this).val() == "526"
			&& (($("input[name='sDate']").val() >= 20161101000000 || $("input[name='eDate']").val() >= 20161101000000 ))) {
			alert("※ 김포신도시지점 안내\n10월 31일 부로 단기렌터카 서비스 종료합니다. 11월 1일부터는 [일산지점]을 이용해주세요.");
			resetArea();
			return false;
		}

		//2017.01.09.서광주(707), 광주공항(708) 알뜰카 서비스 미제공 처리
		if(mysteryChk == "X") {
			if ($("option:selected", "#selReturnBranch").val() == "707" || $("option:selected", "#selReturnBranch").val() == "708"){
				alert("서광주,광주공항 지점은 알뜰카 서비스 이용이 불가합니다.\n다른 지점으로 변경하거나 일반예약으로 진행해주시기 바랍니다.");
				resetArea();
				return false;
			}
		}


		var rentDt = new Date($("input[name='sDate_']").val().split(".")[0],Number($("input[name='sDate_']").val().split(".")[1])-1,$("input[name='sDate_']").val().split(".")[2],$("#sHour").val(),$("#sMin").val(),"00");
		var toD = rentDt;
		var dayOne = new Date(Date.parse(toD) + 1000 * 60 * 60 * 24);
		var sdayOne = "" + dayOne.getFullYear() + getDec(dayOne.getMonth() + 1)
				+ getDec(dayOne.getDate()) + getDec(dayOne.getHours())
				+ getDec(dayOne.getMinutes()) + "00";

		// 24시간이내에는 편도반납 금지
		if ($("input[name='rentBranch']").val()!="" && $("option:selected", this).val()!="" && $("input[name='rentBranch']").val() != $("option:selected", this).val()) {
			if (sdayOne > $("input[name='eDate']").val()) {
				//alert("대여시간이 24시간 이내인 경우는 편도 반납이 안됩니다.\n대여 시간을 다시 선택해 주시기 바랍니다.");
				alert("죄송합니다.\n대여정책에 따라 대여시간이 24시간 이상인 경우에만 편도 반납이 가능합니다.\n대여시간을 다시 선택해주세요.");
				tmpRentBranch = "";
				resetArea();
				resetAreaZ();
				resetAreaZLayerA();
				resetAreaZLayerB();

				rentBranchReset();
				returnBranchReset();

				carReset();
				priceReset();

				resetOptionChk();
				resetOption(); // 옵션
				resetPoint(); // 포인트
				resetGift(); // 무료이용권
				resetVal();

				return false;
			}
		}

		// 포항공항의 경우 alert 공지
		if ($("option:selected", this).val() == "621") {
			alert("포항공항의 영업시간은\n\n월-목, 토요일 08:30~18:00 / 금요일, 일요일 08:30~18:00 입니다.\n\n온라인에서는 18시 예약만 가능하오니 \n\n20시까지 이용을 원하시는 고객님께서는\n\n고객센터(1588-1230)로 문의하시기 바랍니다.");
		}
		// 서창원 공지
		if ($("option:selected", this).val() == "619") {
			window.open("/event_kumhorent/pop_130226/pop.html",
						"popChangwon",
						"width=480,height=320, toolbars=no, scrollbars=no");
		}
		// 청주 팝업 공지
		if ($("option:selected", this).val() == "711") {
			window.open("/event_kumhorent/pop_121213/pop.html",
						"popCheongju",
						"width=480,height=380, toolbars=no, scrollbars=no");
		}
		$("input[name='returnBranch']").val($("option:selected", this).val());
		$("input[name='returnPlace']").val($("option:selected", this).text());


		if(mysteryChk != "X"){
			callCarList();
		}else{
			mysteryMenu();
		}
		setAreaName();
		resetOption();

		$("option[value='']", this).remove();
	});


	// 제주 - 롯데호텔셋팅 START
	$("#selRentBranch2").change(
			function() {

				if( $("option:selected", this).text() == '제주오토하우스') {
						$("#instaxMiniView").show();
						$(".ckEvent[id='1O110']").prop("checked", false);
						checkboxReset($(".ckEvent[id='1O110']"));

						$("#instaxWideView").show();
						$(".ckEvent[id='1O111']").prop("checked", false);
						checkboxReset($(".ckEvent[id='1O111']"));
				}else{
					$("#instaxMiniView").hide();
					$(".ckEvent[id='1O110']").prop("checked", false);
					checkboxReset($(".ckEvent[id='1O110']"));

					$("#instaxWideView").hide();
					$(".ckEvent[id='1O111']").prop("checked", false);
					checkboxReset($(".ckEvent[id='1O111']"));
				}

				nowProcess = "B";
				//carReset();
				checkResDate();
				if ($("option:selected", this).text() == "롯데호텔") {
					var td = new Date(srvTime());
					td = new Date(Date.parse(td) + 1000 * 60 * 60 * 24);
					td = td.getFullYear() + ""
							+ getDec(td.getMonth() + 1)
							+ "" + getDec(td.getDate())
							+ ""
							+ getDec(td.getHours())
							+ getDec(td.getMinutes()); // 현재시간
					var dt = $("input[name='sDate_']")
							.val().replace("/", "").replace("/", "")
							+ $("#sHour").val()
							+ $("#sMin").val(); // 대여일시
					if (td > dt) {
						alert("롯데호텔은 현재시간에서 24시간 이후 부터 예약 가능합니다.");
						sbbObj = undefined;
						resetArea();
						resetAreaZLayerA();
						resetAreaZLayerB();
						if($("#jejuSetting").val()=="X"){
							setAreaZLayerA();
							setAreaZLayerB();
						}
						return false;
					}

					if (($("option:selected", "#sHour").val() + "" + $("option:selected", "#sMin").val() < "0900") || ($("option:selected", "#sHour").val() + "" + $("option:selected", "#sMin").val() > "1900") || ($("option:selected", "#eHour").val() + "" + $("option:selected", "#eMin").val() < "0900") || ($("option:selected", "#eHour").val() + "" + $("option:selected", "#eMin").val() > "1900")) {
						alert("롯데호텔은 대여시간과 반납시간이 9:00~19:00 사이 일 경우에 예약 가능합니다.");
						sbbObj = undefined;
						resetArea();
						resetAreaZLayerA();
						resetAreaZLayerB();
						if($("#jejuSetting").val()=="X"){
							setAreaZLayerA();
							setAreaZLayerB();
						}
						return false;
					}
				}
				//20170117.청주지점(711) -> 청주공항 D/S added. bskwon
				else if ($("option:selected", this).text() == "청주공항") {//대여지점
					//대여일이 평일이 아닐때
					if(gvIsWeekday_s == "N" 
						|| ($("option:selected", "#sHour").val() + "" + $("option:selected", "#sMin").val() < "1000")
						|| ($("option:selected", "#sHour").val() + "" + $("option:selected", "#sMin").val() > "1700")){
						
						alert(INFO_MSG_711_DS);
						$("input[name='splace']").val("01");
						$("#selRentBranch2").val($("input[name='splace']").val());

						selectboxSet($("#selRentBranch2"),$("option:selected", "#selRentBranch2").text());
					}
				}

				$("input[name='rentBranch']").val($("option:selected", this).attr("realcode"));
				$("input[name='rentPlace']").val($("option:selected", this).text());
				$("input[name='splace']").val($("option:selected", this).val());

				if ($("option:selected", this).attr("realcode") == "605" || $("option:selected", this).attr("realcode") == "711") {	//부산역, 청주공항
					$("#selReturnBranch2").val("01");
					$("input[name='eplace']").val("01");
					$("input[name='returnBranch']").val($("option:selected", "#selReturnBranch2").attr("realcode"));
					$("input[name='returnPlace']").val($("option:selected", "#selReturnBranch2").text());
				} else {
					$("#selReturnBranch2").val($("option:selected", this).val());
					$("input[name='eplace']").val($("option:selected", this).val());
					$("input[name='returnBranch']").val($("option:selected", this).attr("realcode"));
					$("input[name='returnPlace']").val($("option:selected", this).text());
				}
				selectboxSet($("#selReturnBranch2"),$("option:selected", "#selReturnBranch2").text());

				if( $("input[name='returnBranch']").val() == "622" || $("input[name='rentBranch']").val() == "622" ){
					// 제주일 경우 24시간 이내 예약 불가능
					if (Number($("input[name='eDate']").val()) - Number($("input[name='sDate']").val()) < 1000000) {
						//alert("24시간이상 예약만 사용하실 수 있습니다.");
						alert("죄송합니다.\n대여 정책에 따라 제주 지점의 대여는 24시간 이상 선택하셔야 대여가 가능합니다.");
						resetArea();
						if($("#jejuSetting").val()!="X"){
							resetAreaZLayerA();
							resetAreaZLayerB();
						}
						return false;
					}

					if((("0800" > ($("option:selected", "#sHour").val() + "" + $("option:selected", "#sMin").val())) || ("2200" < ($("option:selected", "#sHour").val() + "" + $("option:selected", "#sMin").val()))) ||
							(("0800" > ($("option:selected", "#eHour").val() + "" + $("option:selected", "#eMin").val())) || ("2200" < ($("option:selected", "#eHour").val() + "" + $("option:selected", "#eMin").val()))) ){
						alert("지점 업무 시간을 확인해 주세요.");
						resetArea();
						if($("#jejuSetting").val()!="X"){
							resetAreaZLayerA();
							resetAreaZLayerB();
						}
						return false;
					}
				}

				if(mysteryChk != "X"){
					callCarList();
				}else{
					mysteryMenu();
				}
				setAreaName();
				resetOption();


				// 빠른(Express) 서비스 노출
				if($("input[name='rentBranch']").val() == "622" && $("input[name='returnBranch']").val() == "622" && $("input[name='splace']").val()=="01" && $("input[name='eplace']").val()=="01"){

				}else{
					if($("#exCheck").prop("checked")){
						alert("빠른(Express) 서비스는 제주지점에서만 이용가능합니다.");
						$("#exCheck").prop("checked",false);
						checkboxReset($("#exCheck"));
					}
				}


				$("option[value='']", this).remove();
			});

	$("#selReturnBranch2").change(
			function() {

				if( $("option:selected", this).text() == '제주오토하우스') {
				$("#instaxMiniView").show();
				$(".ckEvent[id='1O110']").prop("checked", false);
				checkboxReset($(".ckEvent[id='1O110']"));

				$("#instaxWideView").show();
				$(".ckEvent[id='1O111']").prop("checked", false);
				checkboxReset($(".ckEvent[id='1O111']"));
				}else{
					$("#instaxMiniView").hide();
					$(".ckEvent[id='1O110']").prop("checked", false);
					checkboxReset($(".ckEvent[id='1O110']"));

					$("#instaxWideView").hide();
					$(".ckEvent[id='1O111']").prop("checked", false);
					checkboxReset($(".ckEvent[id='1O111']"));
				}

				nowProcess = "B";
				//carReset();
				checkResDate();

				if ($("option:selected", this).text() == "롯데호텔") {
					if (($("option:selected", "#sHour").val() + "" + $("option:selected", "#sMin").val() < "0900") || ($("option:selected", "#sHour").val() + "" + $("option:selected", "#sMin").val() > "1900") || ($("option:selected", "#eHour").val() + "" + $("option:selected", "#eMin").val() < "0900") || ($("option:selected", "#eHour").val() + "" + $("option:selected", "#eMin").val() > "1900")) {
						alert("롯데호텔은 대여시간과 반납시간이 9:00~19:00 사이 일 경우에 예약 가능합니다.");
						sbbObj = undefined;
						resetArea();
						resetAreaZLayerA();
						resetAreaZLayerB();
						if($("#jejuSetting").val()=="X"){
							setAreaZLayerA();
							setAreaZLayerB();
						}
						return false;
					}
				}
				//20170117.청주지점(711) -> 청주공항 D/S added. bskwon
				else if ($("option:selected", this).text() == "청주공항") {//반납지점
					//반납일이 평일이 아닐때
					if(gvIsWeekday_e == "N"
						|| ($("option:selected", "#eHour").val() + "" + $("option:selected", "#eMin").val() < "1000")
						|| ($("option:selected", "#eHour").val() + "" + $("option:selected", "#eMin").val() > "1700")){
						
						alert(INFO_MSG_711_DS);
						$("input[name='eplace']").val("01");
						$("#selReturnBranch2").val($("input[name='eplace']").val());
						
						selectboxSet($("#selReturnBranch2"),$("option:selected", "#selReturnBranch2").text());
					}				
				}

				$("input[name='eplace']").val($("option:selected", this).val());
				$("input[name='returnBranch']").val($("option:selected", this).attr("realcode"));
				$("input[name='returnPlace']").val($("option:selected", this).text());

				if(mysteryChk != "X"){
					callCarList();
				}else{
					mysteryMenu();
				}
				setAreaName();
				resetOption();


				// 빠른(Express) 서비스 노출
				if($("input[name='rentBranch']").val() == "622" && $("input[name='returnBranch']").val() == "622" && $("input[name='splace']").val()=="01" && $("input[name='eplace']").val()=="01"){

				}else{
					if($("#exCheck").prop("checked")){
						alert("빠른(Express) 서비스는 제주지점에서만 이용가능합니다.");
						$("#exCheck").prop("checked",false);
						checkboxReset($("#exCheck"));
					}
				}

				if($("option:selected", this).val()=="03"){
					window.open('/popup/20150113/pop_notice.html', 'jejuairport', "width=340,height=418" );
					jejuairportFee = 10000;
					$("#jejuairport_p").show();
					$("#jejuairport_w").html(comma(jejuairportFee * 1));
				} else {
					jejuairportFee = 0;
					$("#jejuairport_p").hide();
					$("#jejuairport_w").html(comma(jejuairportFee));
				}
				if($("option:selected", this).val()!="")	$("option[value='']", this).remove();
			});
	// 제주 - 롯데호텔셋팅 END


	$("#exCheck").change(function() {
		var ischecked = $(this).prop('checked');
		if(ischecked) {
			if(!$("input[name='userId']").val()){
				$(this).prop('checked',false);
				checkboxReset($(this));
				//alert("롯데렌터카 회원 전용 서비스 입니다. ");
				alert("빠른 서비스를 예약하시려면\n로그인이 필요합니다.\n로그인하시겠습니까?");
				// alert("죄송합니다.\n빠른(Express) 서비스는 롯데렌터카 회원 전용 서비스 입니다.\n로그인해주세요.");
				window.open('/fr/kor/popup/login01.do', 'popup', "width=833,height=550" );
				return false;
			}
			if($("input[name='rentBranch']").val()!="" && $("input[name='returnBranch']").val() != ""){
				if($("input[name='rentBranch']").val() == "622" && $("input[name='returnBranch']").val() == "622" && $("input[name='splace']").val()=="01" && $("input[name='eplace']").val()=="01"){

				}else{
					if($("#exCheck").prop("checked")){
						alert("빠른(Express) 서비스는 제주지점에서만 이용가능합니다.");
						$("#exCheck").prop("checked",false);
						checkboxReset($("#exCheck"));
						return false;
					}
				}
			}
			$(".reserv_service").css("display","none");
			$(".ex_service").css("display","block");
			// window.open('/kor/popup/pop_EX_01.do', 'pop_express',"width=650,height=550");
			// $("#exCheckVal").val("true");
		} else {
			$(".reserv_service").css("display","block");
			$(".ex_service").css("display","none");
		}
	});


	// 빠른(Express) 인증 선택
	$("input[name='ipinPhoneChk']").change(
			function() {
				if($(this).val()=="2"){
					$("#searchTypeIPin").attr("style","display:inline-block");
					$("#searchTypeSMS").attr("style","display:none");
				}else{
					$("#searchTypeIPin").attr("style","display:none");
					$("#searchTypeSMS").attr("style","display:inline-block");
				}
			});

	//수정모드
	if($("input[name='editChk']").val()=="1"){
		$.blockUI({message:"<img src='/img/bc/ajax-loader.gif' /> 예약정보 로딩중..."});
		setTimeout(function(){settingDefault();},1000);
	} else {
		//callBrandList();
		//callCarSizeList();

		//제주 오토하우스 실행
		if($("#jejuSetting").val()=="X"){
			setTimeout(function(){setAreaEvent($("#selRentArea"));;},1000);
		}

		if($("input[name='dsChkTmp']").val()=="Y"){
			$("#hdsCheck").trigger("click");
			var ischecked = $("#hdsCheck").prop('checked');
			if(ischecked) {
				if ($("input[name='camping_yn']").val() == 'E') {
					$("#hdsCheck").prop('checked',false);
					$("#hdsCheck").trigger("change");
					alert("빠른(Express) 서비스 사용시 딜리버리 서비스 사용이 불가능합니다.");
					return false;
				}
				if(!$("input[name='userId']").val()){
					$("#hdsCheck").prop('checked',false);
					checkboxReset($("#hdsCheck"));
					//alert("롯데렌터카 회원 전용 서비스 입니다. ");
					alert("죄송합니다.\n딜리버리 서비스는 롯데렌터카 회원 전용 서비스 입니다.\n로그인해주세요.");
					window.open('/kor/popup/login01.do', 'popup', "width=833,height=550" );
					return false;
				}
				//대여날짜 2틀 뒤로 셋팅
				var td = new Date();
				var hour48 = new Date(Date.parse(td)+1000*60*60*48);
				var hourTime48 = ""+hour48.getFullYear()+getDec(hour48.getMonth()+1)+getDec(hour48.getDate())+getDec(hour48.getHours())+getDec(hour48.getMinutes())+"00";
				var hour72 = new Date(Date.parse(td)+1000*60*60*72);
				var hourTime72 = ""+hour72.getFullYear()+getDec(hour72.getMonth()+1)+getDec(hour72.getDate())+getDec(hour72.getHours())+getDec(hour72.getMinutes())+"00";
				$("input[name='sDate']").val(hourTime48);
				$("input[name='sDate_']").val(hour48.getFullYear()+"."+getDec(hour48.getMonth()+1)+"."+getDec(hour48.getDate()));
				$("input[name='eDate']").val(hourTime72);
				$("input[name='eDate_']").val(hour72.getFullYear()+"."+getDec(hour72.getMonth()+1)+"."+getDec(hour72.getDate()));

				$("#my_local").hide();
				resetArea();
				hdsSet();
				window.open('/kor/popup/pop_ds_guide.do', 'dsservice', "width=823,height=500" );
				$(".ds_service").css("display","block");
			}else{
				$("#my_local").show();	//나의 지점
				$("input[name='rentArea']").val("");
				hdsReset();

				resetArea();
				resetAreaZ();
				resetAreaZLayerA();
				resetAreaZLayerB();

				carReset();

				resetOptionChk();
				resetOption(); // 옵션
				resetPoint(); // 포인트
				resetGift(); // 무료이용권
				resetVal();

				$(".ds_service").css("display","none");
			}
		}
		if($("input[name='exChkTmp']").val()=="Y"){
			$("#exCheck").trigger("click");
			var ischecked = $("#exCheck").prop('checked');
			if(ischecked) {
				if(!$("input[name='userId']").val()){
					$(this).prop('checked',false);
					checkboxReset($("#exCheck"));
					alert("죄송합니다.\n빠른(Express) 서비스는 롯데렌터카 회원 전용 서비스입니다. 로그인해주세요.");
					window.open('/kor/popup/login01.do', 'popup', "width=833,height=550" );
					return false;
				}
				if($("input[name='rentBranch']").val()!="" && $("input[name='returnBranch']").val() != ""){
					if($("input[name='rentBranch']").val() == "622" && $("input[name='returnBranch']").val() == "622" && $("input[name='splace']").val()=="01" && $("input[name='eplace']").val()=="01"){

					}else{
						if($("#exCheck").prop("checked")){
							alert("빠른(Express) 서비스는 제주지점에서만 이용가능합니다.");
							$("#exCheck").prop("checked",false);
							checkboxReset($("#exCheck"));
							return false;
						}
					}
				}
				$(".reserv_service").css("display","none");
				$(".ex_service").css("display","block");
				window.open('/kor/popup/pop_EX_01.do', 'pop_express',"width=650,height=550");
			} else {
				$(".reserv_service").css("display","block");
				$(".ex_service").css("display","none");
			}
		}
	}

});*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function execTrigger(id,action){
	$(id).trigger(action);
}

// 변화된 내용 적용
// 1 : 날짜 변경
// 2 : 지역 변경
// 3 : 지점 변경
// 4 : 유형/브랜드 변경
// 5 : 차량 변경
function anyDataChange(gubun,obj){

	if(nowProcess != "A"){
		tmpRentBranch = $("input[name='rentBranch']").val();
		tmpReturnBranch = $("input[name='returnBranch']").val();
	}

	if(gubun=="1"){	// 날짜 변경
		dateSettingView();
		if ($("input[name='hdsCheck']").prop('checked')) {
			hdsReset();

			resetArea();
			resetAreaZ();
			resetAreaZLayerA();
			resetAreaZLayerB();

			carReset();

			resetOptionChk();
			resetOption(); // 옵션
			resetPoint(); // 포인트
			resetGift(); // 무료이용권
			resetVal();

			setAreaName();
		} else {
			if(rentAreaValid()){
				anyDataChange("2",$("#selRentArea"));
			}
		}
	} else if(gubun=="2"){	//지역 변경
		if(obj.attr("id")=="selRentArea"){	//대여지역

			setAreaEvent(obj);
		} else if(obj.attr("id")=="selReturnArea"){	//반납지역

			if ($("input[name='rentBranch']").val() == "") {
				alert("대여지점을 먼저 선택하여 주십시오");
				obj.val($("option:selected", "#selRentArea").val());
				return false;
			}
			if ($("input[name='rentArea']").val() == "6" && $("option:selected", "#selReturnArea").val() != "6") {
				alert("죄송합니다.\n제주 지역에서 대여하시는 경우 차량 반납은 제주 지역에서만 가능합니다.");
				obj.val("6");
				return false;
			}
			if ($("input[name='rentArea']").val() != "6" && $("option:selected", "#selReturnArea").val() == "6") {
				alert("죄송합니다.\n내륙 지역에서 대여하시는 경우 차량 반납은 내륙 지역에서만 가능합니다.");
				$("input[name='returnBranch']").val("");

				$("#selReturnArea").empty();
				$("#selReturnArea").append(basicArea());
				$("#selReturnArea").val("");
				selectboxSet($("#selReturnArea"),"지역선택");

				$("#selReturnBranch").empty();	// selectbox 초기화
				$("#selReturnBranch").append("");
				selectboxSet($("#selReturnBranch"),"");
				$("#selReturnBranch2").empty();	// selectbox 초기화
				$("#selReturnBranch2").append("");
				selectboxSet($("#selReturnBranch2"),"");

				resetArea();
				resetAreaZLayerB();
				resetAreaZ();

				carReset();

				resetOptionChk();
				resetOption(); // 옵션
				resetPoint(); // 포인트
				resetGift(); // 무료이용권
				resetVal();

				setAreaName();
				return false;
			}
			if ($("input[name='rentBranch']").val() != $("input[name='returnBranch']").val()) {
				$("#oneway_comment").css("display","");
			} else {
				$("#oneway_comment").css("display","none");
			}
			$("input[name='returnArea']").val($("option:selected", "#selReturnArea").val());

			if ($("input[name='sDate']").val() && $("input[name='eDate']").val()) {
				if ($("input[name='rentBranch']").val() != "605" && $("input[name='returnBranch']").val() != "605"
					&& $("input[name='rentBranch']").val() != "711" && $("input[name='returnBranch']").val() != "711") {
					resetAreaZLayerA();
					resetAreaZLayerB();
				} else {
					resetAreaZLayerB();
				}
				setAreaEvent(obj);
			}
			resetAreaZLayerB();
			setAreaName();
		}
	} else if(gubun=="3"){	//지점 변경

	} else if(gubun=="4"){	//유형/브랜드 변경
		if($("#brandCode").val()=="" && $("#carSize").val()!=""){
			//callBrandList();
		} else if($("#brandCode").val()!="" && $("#carSize").val()==""){
			//callCarSizeList();
		} else {
			callCarList();
		}
	} else if(gubun=="5"){	//차량 변경
		//if(rentAreaValid())
		//	branchList("selRentArea");
		callCarPrice(obj);
	}
}

// 모든 값 validation
function allValueCheck(){
	if(rentBranchValid() && returnBranchValid() && carValid()){
		var tmpCarSelect = $("input[name='carSelect']").val();
		callCarPrice($("#"+tmpCarSelect));
	} else {
		resetLdw();
		resetOptionChk();
		resetOption(); // 옵션
		resetPoint(); // 포인트
		resetGift(); // 무료이용권
		resetCp(); //쿠폰
		resetEvent();
		resetVal();
	}
}

//대여일, 반납일자 이벤트 등록
function dateSetting() {
	if($("input[name='editChk']").val()=="0"){
		var td = new Date(srvTime());
		if (td.getMinutes() > 49)
			td = new Date(Date.parse(td) + 1000 * 60 * 10);

		// 제주는 기본 6시간으로 셋팅
		if ($("input[name='jejuSetting']").val() == 'X') {
			td.setHours(td.getHours() + 6);
		} else {
			td.setHours(td.getHours() + 4);
		}
		var dMin = Math.floor(td.getMinutes() / 10) * 10 + 10;

		$("input[name='sDate_']").val(
				td.getFullYear() + "." + getDec(td.getMonth() + 1) + "." + getDec(td.getDate()));
		$("input[name='sDate']").val(
				td.getFullYear() + "" + getDec(td.getMonth() + 1) + "" + getDec(td.getDate())+ "" + getDec(td.getHours())+ "" + getDec(dMin) + "00");

		$("#sHour").val(getDec(td.getHours()));
		$("#sMin").val(getDec(dMin));
		$("#eHour").val("18");
		$("#eMin").val("00");

		var td1 = new Date(Date.parse(td) + 1000 * 60 * 60 * 24);
		$("input[name='eDate_']").val(
				td1.getFullYear() + "." + getDec(td1.getMonth() + 1) + "." + getDec(td1.getDate()));
		$("input[name='eDate']").val(
				td1.getFullYear() + "" + getDec(td1.getMonth() + 1) + "" + getDec(td1.getDate())+ "180000");

		var td6 = new Date(Date.parse(td) + 1000 * 60 * 60 * 24 * 60);
		var today = "" + td.getFullYear() + getDec(td.getMonth() + 1)
				+ getDec(td.getDate()) + getDec(td.getHours())
				+ getDec(td.getMinutes()) + "00";
		var today6 = "" + td6.getFullYear() + getDec(td6.getMonth() + 1)
				+ getDec(td6.getDate()) + getDec(td6.getHours())
				+ getDec(td6.getMinutes()) + "00";

		var td6_2 = new Date(Date.parse(td) + 1000 * 60 * 60 * 24 * 30);
		var today6_2 = "" + td6_2.getFullYear() + getDec(td6_2.getMonth() + 1)
				+ getDec(td6_2.getDate()) + getDec(td6_2.getHours())
				+ getDec(td6_2.getMinutes()) + "00";

		hdsValueReset();
		dateSettingView();
	}
}

/*function setAreaEvent(obj) {
	if(obj.attr("id") == "selRentArea"){
		if($("input[name='rentArea']").val()=="6" && $("option:selected", "#"+obj.attr("id")).val()!="6"){
			resetAreaZLayerA();
			resetAreaZLayerB();
		}
		if($("input[name='rentArea']").val()!=$("option:selected", "#"+obj.attr("id")).val()){
			$("input[name='returnBranch'],input[name='rentBranch'],input[name='realBranch']").val("");
			$("input[name='returnPlace'],input[name='rentPlace']").val("");
		}
	}
	if(obj.attr("id") == "selReturnArea"){
		if($("input[name='returnArea']").val()!=$("option:selected", "#"+obj.attr("id")).val()){
			$("input[name='returnBranch']").val("");
			$("input[name='returnPlace']").val("");
		}
	}
	//수정모드 아닌경우
	if($("input[name='editChk']").val()!="1"){
		resetOptionChk();
		resetOption(); // 옵션
		resetPoint(); // 포인트
		resetGift(); // 무료이용권
		resetVal();
	}
	branchList(obj.attr("id"));
}*/
function setAreaEventR(obj) {
	//$("input[name='returnBranch']").val("");
	//$("input[name='returnPlace']").val("");
	branchList(obj.attr("id"));
}

function resetArea() {
	if($("#jejuSetting").val()==""){
		$("input[name='rentArea'],input[name='returnArea']").val("");
		$("input[name='returnBranch'],input[name='rentBranch'],input[name='realBranch']").val("");

		$("#selRentArea").empty();
		$("#selRentArea").append(basicArea());
		$("#selRentArea").val("");
		selectboxSet($("#selRentArea"),"서울");

		$("#selRentBranch").empty();	// selectbox 초기화
		$("#selRentBranch").append("");
		selectboxSet($("#selRentBranch"),"");

		$("#selRentBranch2").empty();	// selectbox 초기화
		$("#selRentBranch2").append("");
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
		$("#selReturnBranch2").append("");
		selectboxSet($("#selReturnBranch2"),"");

		$("#selReturnHdsBranch").val("");
		selectboxSet($("#selReturnHdsBranch"),"");

		$("#oneway_comment").css("display", "none");

		$("#instaxMiniView").hide();
		$(".ckEvent[id='1O110']").prop("checked", false);
		checkboxReset($(".ckEvent[id='1O110']"));

		$("#instaxWideView").hide();
		$(".ckEvent[id='1O111']").prop("checked", false);
		checkboxReset($(".ckEvent[id='1O111']"));

		resetAreaZ();
		carReset();
		setAreaName();
		
	} else {
		$("input[name='realBranch']").val("");

		$("#selRentBranch2").empty();
		$("#selRentBranch2").append(tmpJejuRentPlace);
		$("#selRentBranch2").val("");	// selectbox 초기화
		selectboxSet($("#selRentBranch2"),$("option:selected", "#selRentBranch2").text());

		$("#selReturnBranch2").empty();
		$("#selReturnBranch2").append(tmpJejuReturnPlace);
		$("#selReturnBranch2").val("");	// selectbox 초기화
		selectboxSet($("#selReturnBranch2"),$("option:selected", "#selReturnBranch2").text());

		//dateSetting();
		carReset();
		setAreaName();
	}
}

function basicArea(){
	return "<option value='1' selected='selected'>서울</option><option value='2'>인천/경기/강원</option><option value='3'>대전/충청/세종</option><option value='4'>광주/전라</option><option value='5'>대구/부산/울산/경상</option><option value='B'>공항지점</option><option value='C'>역사지점</option><option value='D'>24시간지점</option>";
}

function resetAreaZ() {
	$("#selRentBranch2").val("");
	$("#selReturnBranch2").val("");
	$("input[name='rentPlace'],input[name='returnPlace']").val("");

	$("#selRentBranch2").css("display","none");
	$("#selReturnBranch2").css("display","none");
}
function setAreaZLayerA() {
	$("#selRentBranch2").css("display","");
	$("#selRentBranch2").removeClass("customSelect0");
	$("#selRentBranch2").next().removeClass("customSelect0");

	if($("#jejuSetting").val()=="X"){
		$("#selRentBranch2").empty();
		$("#selRentBranch2").append(tmpJejuRentPlace);
		$("#selRentBranch2").val("");
		selectboxSet($("#selRentBranch2"),$("option:selected", "#selRentBranch2").text());

		$("input[name='splace']").val("");
	}
}

function resetAreaZLayerA() {
	//$("#selRentBranch").css("width","218px");
	//selectboxStyleSet($("#selRentBranch"),"width","218px");
	if($("#hdsCheck").prop('checked')){
		$('.reserve_box td').css('height','640px');
		$('.car_brand_Box').css('height','365px');
	} else {
//		$('.reserve_box td').css('height','470px');
//		$('.car_brand_Box').css('height','200px');
	}
	$("#selRentBranch2").css("display","none");
	$("#selRentBranch2").val("");
	selectboxSet($("#selRentBranch2"),"");
	$("input[name='splace']").val("");

	$("#selRentBranch2").addClass("customSelect0");
	$("#selRentBranch2").next().addClass("customSelect0");
}
function setAreaZLayerB() {

//	$('.reserve_box td').css('height','530px');
//	$('.car_brand_Box').css('height','265px');

	if (!$("input[name='hdsCheck']").prop('checked')) {
		$("#selReturnBranch2").css("display","");
		$("#selReturnBranch2").removeClass("customSelect0");
		$("#selReturnBranch2").next().removeClass("customSelect0");
	}

	if($("#jejuSetting").val()=="X"){
		$("#selReturnBranch2").empty();
		$("#selReturnBranch2").append(tmpJejuRentPlace);
		$("#selReturnBranch2").val("");
		selectboxSet($("#selReturnBranch2"),$("option:selected", "#selReturnBranch2").text());

		$("input[name='eplace']").val("");
	}
}
function resetAreaZLayerB() {
	//$("#selReturnBranch").css("width","218px");
	//selectboxStyleSet($("#selReturnBranch"),"width","218px");

	$("#selReturnBranch2").css("display","none");
	$("#selReturnBranch2").val("");
	selectboxSet($("#selReturnBranch2"),"");
	$("input[name='eplace']").val("");

	$("#selReturnBranch2").addClass("customSelect0");
	$("#selReturnBranch2").next().addClass("customSelect0");
}
//지점 조회
/*function branchList(gubun) {
	var areaCode = "";
	if(gubun == "selRentArea"){
		areaCode = $("option:selected", "#selRentArea").val();
		var td = new Date(srvTime());
		var td1 = new Date(Date.parse(td) + 1000 * 60 * 60 * 4);
		var td2 = new Date(Date.parse(td) + 1000 * 60 * 60 * 6);
		var td3 = new Date(Date.parse(td) + 1000 * 60 * 60 * 3);
		console.log("sDate_ >>" + $("input[name='sDate_']").val())
		var time = $("input[name='sDate_']").val().replace("/", "").replace("/", "") + $("#sHour").val() + $("#sMin").val();
		var time2 = td1.getFullYear() + "" + getDec(td1.getMonth() + 1) + "" + getDec(td1.getDate()) + "" + getDec(td1.getHours()) + getDec(td1.getMinutes());
		var time3 = td2.getFullYear() + "" + getDec(td2.getMonth() + 1) + "" + getDec(td2.getDate()) + "" + getDec(td2.getHours()) + getDec(td2.getMinutes());
		var time4 = td3.getFullYear() + "" + getDec(td3.getMonth() + 1) + "" + getDec(td3.getDate()) + "" + getDec(td3.getHours()) + getDec(td3.getMinutes());
		console.log("time >>" + time)
		console.log("time2 >>" + time2)
		console.log("time3 >>" + time3)
		console.log("time4 >>" + time4)
		
		if (areaCode == "1") {
			if (time < time2) {
				alert("서울권역은 현재시간부터 4시간,\n대전/충청/세종 및 광주/전라지역은 3시간,\n그외권역은 6시간 이후 예약이 가능합니다.");
				resetArea();
				return;
			}
		} else if (areaCode == "6") {
			if (time < time3) {
				alert("제주권역은 6시간 이후 예약이 가능합니다.");
				resetArea();
				return;
			}
		} else if (areaCode == "3"||areaCode == "4") {
			if (time < time4) {
				alert("서울권역은 현재시간부터 4시간,\n대전/충청/세종 및 광주/전라지역은 3시간,\n그외권역은 6시간 이후 예약이 가능합니다.");
				resetArea();
				return;
			}
		} else {
			if (time < time3) {
				alert("서울권역은 현재시간부터 4시간,\n대전/충청/세종 및 광주/전라지역은 3시간,\n그외권역은 6시간 이후 예약이 가능합니다.");
				resetArea();
				return;
			}
		}
		//배차 지점 초기화
		//$("input[name='splace']").val("");

		if (areaCode == "6") {
			$("#exLayer,.ex_none").css("display","");
			$("#dsLayer,.ds_none").css("display","none");
			hdsReset();
		} else {
			$("#exLayer,.ex_none").css("display","none");
			$("#dsLayer,.ds_none").css("display","");
			expressReset();
			if (!$("input[name='hdsCheck']").prop('checked')) {
				hdsReset();
			}
		}
	} else {
		areaCode = $("option:selected", "#selReturnArea").val();

		//반차 지점 초기화
		//$("input[name='eplace']").val("");
	}

	var rentTime = "";
	if($("#sHour").val()!="" && $("#sMin").val()!=""){
		rentTime = $("#sHour").val()+""+$("#sMin").val()+"00";
	} else {
		rentTime = "";
	}
	var returnTime = "";
	if($("#eHour").val()!="" && $("#eMin").val()!=""){
		returnTime = $("#eHour").val()+""+$("#eMin").val()+"00";
	} else {
		returnTime = "";
	}

	var gubunVal = "";
	if(gubun == "selRentArea"){
		gubunVal = "S";
	} else {
		gubunVal = "E";
	}

	var hdsCheck = "";
	if ($("input[name='hdsCheck']").prop('checked')) {
		if($("input[name='hdsType']:checked").val()=="3"){
			hdsCheck = "A";
		} else if($("input[name='hdsType']:checked").val()=="2"){
			hdsCheck = "B";
		} else if($("input[name='hdsType']:checked").val()=="1"){
			hdsCheck = "C";
		}
	} else {
		hdsCheck = "";
	}

	var jejuAuto = "";
	if(areaCode=="6"){
		jejuAuto = "X";
	}

	var carCode = $("input[name='carCode']").val();
	//날짜변경시
	if(gubun == "selReturnArea" || $("#editChk").val()=="1" || nowProcess=="D"){
		carCode = "";
	}
	$.ajax({
		type: "POST",
		dataType: "json",
		async : asyncCheck,
		url : "/fr/kor/reservation/branchList.do",
		data : {
			gubun : gubunVal,
			carCode : carCode,
			rentDate : $("input[name='sDate_']").val().replace("/", "").replace("/", ""),
			rentTime : rentTime,
			returnDate : $("input[name='eDate_']").val().replace("/", "").replace("/", ""),
			returnTime : returnTime,
			areaCode : areaCode,
			dsGubun : hdsCheck,
			jejuAuto : jejuAuto,
			mysteryChk : mysteryChk,
			mysteryCode : $("#rentForm [name='mysteryCode']").val()
		},
		success : function(data) {
			var rentBranchSelected = "Y";
			var returnBranchSelected = "Y";
			var enableFlag1 = "Y",
				enableFlag2 = "Y";

			// 대여지점 반납지점 확인하여 셋팅
			if(gubun == "selRentArea"){

				var txt = settingBranchList(data.branchList,"selRentArea");
				if($("option:selected", "#selReturnArea").val()==""){
				if($("#areaCheck").val() == "TRUE"){
					$("#selReturnArea").val($("option:selected", "#selRentArea").val());
					selectboxSet($("#selReturnArea"),$("option:selected", "#selRentArea").text());
				}
				}
				$("option[value='']", "#selRentArea").remove();

				var areaChange = "N";
				if($("option:selected", "#selRentArea").val()!=$("input[name='rentArea']").val()){
					areaChange = "Y";
				}

				$("input[name='rentArea']").val($("option:selected", "#selRentArea").val());

				$("#selRentBranch").empty();	// selectbox 초기화
				$("#selRentBranch").append(txt);
				selectboxSet($("#selRentBranch"),$("option:selected", "#selRentBranch").text());
				//selectboxColor("selRentBranch");

				var tempBranchName = "";
				var tempBranchTime = "";

				if(tmpRentBranch!=""){	//기존 지점이 있는경우
					$("#selRentBranch option").each(function(i, s) {
						if($(s).val()!="" && $(s).prop("disabled") && tmpRentBranch==$(s).val()){
							rentBranchSelected = "N";	//기존 선택된 지점이 대여일시 등 옵션 변경 후 선택할 수 없는 경우라면
							tempBranchName = $(s).text();
							tempBranchTime = $(s).attr("tfrom").substring( 0, 5 )+"~"+$(s).attr("tend").substring( 0, 5 );

							//TODO
							if($(s).attr("enable") == "") {
								enableFlag1 = "N"; //선택 차량이 없는 지점
							}
						}
					});
				}

				if(rentBranchSelected=="N"){
					if(enableFlag1 == "Y") {
						alert("죄송합니다.\n대여일 기준 "+tempBranchName+" 지점 대여 가능 시간은 "+tempBranchTime+"입니다.\n대여지점을 다시 선택해주세요.");
					} else {
						alert("현재 사용량이 많아 서비스 이용에 일시적으로 불편을 드려 죄송합니다.\n페이지 새로고침 또는 초기화 버튼을 누르신 후 다시 예약 진행해주시기 바랍니다.");
					}
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

				if(editMode=="N"){
					// 지역이 다른경우
					if(nowProcess=="D" && $("option:selected", "#selRentArea").val()!=$("option:selected", "#selReturnArea").val()){
						branchListReturn("selReturnArea");
					} else {
						$("input[name='returnArea']").val($("option:selected", "#selRentArea").val());

						txt = settingBranchList(data.branchList,"selReturnArea");
						returntxt = txt;
						$("#selReturnBranch").empty();	// selectbox 초기화
						$("#selReturnBranch").append(txt);
						selectboxSet($("#selReturnBranch"),$("option:selected", "#selReturnBranch").text());
						$("option[value='']", "#selReturnArea").remove();
						//selectboxColor("selReturnBranch");

						var areaChange2 = "N";
						if($("option:selected", "#selRentArea").val()!=$("input[name='rentArea']").val()){
							areaChange2 = "Y";
						}

						var timeLimit = "";
						var branchNameTmp = "";
						if(tmpReturnBranch!=""){	//기존 지점이 있는경우
							$("#selReturnBranch option").each(function(i, s) {
								if($(s).val()!="" && $(s).prop("disabled") && tmpReturnBranch==$(s).val()){
									returnBranchSelected = "N";	//선택할 수 없는 지점인 경우
									timeLimit = $(s).attr("tfrom").substring( 0, 5 )+"~"+$(s).attr("tend").substring( 0, 5 );
									branchNameTmp = $(s).text();
								}

								//TODO
								if($(s).attr("enable") == "") {
									enableFlag2 = "N"; //선택 차량이 없는 지점
								}
							});
						}
						if(returnBranchSelected=="N"){
							if(enableFlag2 == "Y") {
								alert(branchNameTmp+"지점 업무종료 시간을 확인해 주세요.\n\n반납일 업무시간 : " + timeLimit);
							} else {
								alert("현재 사용량이 많아 서비스 이용에 일시적으로 불편을 드려 죄송합니다.\n페이지 새로고침 또는 초기화 버튼을 누르신 후 다시 예약 진행해주시기 바랍니다.");
							}
							returnBranchReset();
							return false;
						} else {
							if(areaChange == "Y"){
								tmpReturnBranch = "";
							}
							$("#selReturnBranch").val(tmpReturnBranch);
							selectboxSet($("#selReturnBranch"),$("option:selected", "#selReturnBranch").text());

							if($("option:selected", "#selReturnBranch").val()==""){
								// $("input[name='returnBranch']").val("");
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

					//$("input[name='splace']").val("");
					//$("input[name='eplace']").val("");

					branchListSub($("option:selected", "#selRentBranch").val(),"rent");

				}

			}else{
				$("option[value='']", "#selReturnBranch").remove();

				$("input[name='returnArea']").val($("option:selected", "#selReturnArea").val());

				var txt = settingBranchList(data.branchList,"selReturnArea");
				$("#selReturnBranch").empty();	// selectbox 초기화
				$("#selReturnBranch").append(txt);
				//selectboxColor("selReturnBranch");

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
				$("input[name='returnBranch']").val(tmpReturnBranch);
				if($("option:selected", "#selReturnBranch").val()==""){
					$("#selReturnBranch").val("");
					// $("input[name='returnBranch']").val("");
				}
				$("input[name='returnPlace']").val($("option:selected", "#selReturnBranch").text());
				selectboxSet($("#selReturnBranch"),$("option:selected", "#selReturnBranch").text());
			}
			if(nowProcess == "D"){
				if(mysteryChk != "X"){
					callCarList();
				}else{
					mysteryMenu();
				}
			}
			setAreaName();

		},
		error:function(request,status,error){
			alert("[지점]오류가 일시 발생하였습니다. 잠시 후 다시 시도해보시거나, 오류가 계속될 경우 고객센터(1588-1230)로 문의바랍니다.");
			location.reload();
		}
	});
}*/

function branchListReturn(gubun) {
	var areaCode = "";
	areaCode = $("option:selected", "#selReturnArea").val();

	//반차 지점 초기화
	$("input[name='eplace']").val("");

	var rentTime = "";
	if($("#sHour").val()!="" && $("#sMin").val()!=""){
		rentTime = $("#sHour").val()+""+$("#sMin").val()+"00";
	} else {
		rentTime = "";
	}
	var returnTime = "";
	if($("#eHour").val()!="" && $("#eMin").val()!=""){
		returnTime = $("#eHour").val()+""+$("#eMin").val()+"00";
	} else {
		returnTime = "";
	}

	gubunVal = "E";

	var hdsCheck = "";
	if ($("input[name='hdsCheck']").prop('checked')) {
		if($("input[name='hdsType']:checked").val()=="3"){
			hdsCheck = "A";
		} else if($("input[name='hdsType']:checked").val()=="2"){
			hdsCheck = "B";
		} else if($("input[name='hdsType']:checked").val()=="1"){
			hdsCheck = "C";
		}
	} else {
		hdsCheck = "";
	}

	var jejuAuto = "";
	if(areaCode=="6"){
		jejuAuto = "X";
	}
	$.ajax({
		type: "POST",
		dataType: "json",
		async : asyncCheck,
		url : "/fr/kor/reservation/branchList.do",
		data : {
			gubun : gubunVal,
			carCode : $("input[name='carCode']").val(),
			rentDate : $("input[name='rentDate']").val().replace("/", "").replace("/", ""),
			rentTime : rentTime,
			returnDate : $("input[name='returnDate']").val().replace("/", "").replace("/", ""),
			returnTime : returnTime,
			areaCode : areaCode,
			dsGubun : hdsCheck,
			jejuAuto : jejuAuto
		},
		success : function(data) {
			var returnBranchSelected = "Y";
			$("option[value='']", "#selReturnBranch").remove();

			$("input[name='returnArea']").val($("option:selected", "#selReturnArea").val());

			var txt = settingBranchList(data.branchList,"selReturnArea");
			$("#selReturnBranch").empty();	// selectbox 초기화
			$("#selReturnBranch").append(txt);
			selectboxSet($("#selReturnBranch"),$("option:selected", "#selReturnBranch").text());
			//selectboxColor("selReturnBranch");

			var timeLimit = "";
			var branchNameTmp = "";
			if(tmpReturnBranch!=""){	//기존 지점이 있는경우
				$("#selReturnBranch option").each(function(i, s) {
					if($(s).val()!="" && $(s).prop("disabled") && tmpReturnBranch==$(s).val()){
						returnBranchSelected = "N";	//선택할 수 없는 지점인 경우
						timeLimit = $(s).attr("tfrom").substring( 0, 5 )+"~"+$(s).attr("tend").substring( 0, 5 );
						branchNameTmp = $(s).text();
					}
				});
			}

			if(returnBranchSelected=="N"){
				//alert("반납지점 업무종료 시간을 확인해 주세요...");
				alert(branchNameTmp+"지점 업무종료 시간을 확인해 주세요.\n\n반납일 업무시간 : " + timeLimit);
				returnBranchReset();
				return false;
			} else {
				$("#selReturnBranch").val(tmpReturnBranch);
				selectboxSet($("#selReturnBranch"),$("option:selected", "#selReturnBranch").text());
			}

			setAreaName();

		},
		error:function(request,status,error){
			alert("[지점]오류가 일시 발생하였습니다. 잠시 후 다시 시도해보시거나, 오류가 계속될 경우 고객센터(1588-1230)로 문의바랍니다.");
			location.reload();
		}
	});
}

//추가 지점 호출
function branchListSub(code,type) {
	
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
						txt += "<li><input type='radio' id='rdo-"+s.SNUMM+"' name='rdo-1' value='"+placeName+"' code='" + s.SNUMM + "' realCode='" + s.VKGRP + "'kschn='" + s.KSCHN + "' kschn_tx='" + s.KSCHN_TX + "' kbetr='" + s.KBETR + "' + konwa='" + s.KONWA + "' + placename='" + s.PLACE + "' onClick='inpJeJuStop("+s.VKGRP+",\""+ s.SNUMM +"\",\""+placeName+"\");'><label for='rdo-"+s.SNUMM+"'><span class='icon'></span>"+placeName+"</label>";
						txt += "<a href='#layerJeJuBranchInfo' onclick=\"branchInfo('"+s.VKGRP+"', 'N', '','"+placeName+"');\" class='layerJeJuBranchInfo btn btn_white btn_layer'>지점안내</a></li>";
					});

					var txt2 = "";
					$.each(data.cList, function(i, s) {
						
						var placeName = s.PLACE;
						if(s.SNUMM=="01" && s.VKGRP =="622")	placeName = "제주오토하우스";

						if(s.SNUMM=="02" && s.VKGRP =="605"){
						} else {
							txt2 += "<li><input type='radio' id='rdo2-"+s.SNUMM+"' name='rdo-2' value='"+placeName+"' code='" + s.SNUMM + "' realCode='" + s.VKGRP + "'kschn='" + s.KSCHN + "' kschn_tx='" + s.KSCHN_TX + "' kbetr='" + s.KBETR + "' + konwa='" + s.KONWA + "' + placename='" + s.PLACE + "' onClick='reInpJeJuStop("+s.VKGRP+",\"" + s.SNUMM + "\",\""+placeName+"\");'><label for='rdo2-"+s.SNUMM+"'><span class='icon'></span>"+placeName+"</label>";
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
}

//지점 option 셋팅
//지점  셋팅
/*function settingBranchList(list,gubun) {
	var depcdName = "";
	var txt = "";
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
			depcdName = s.VKGRP_TX + "(농성동)"; * 2015.12.24수정요청 
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
				// txt += "<option value='"+s.VKGRP + "' branchcode='" + s.VKGRP + "' areaCode='" + s.COUNC + "' areaNm='" + s.COUNC_TX + "' vtweg='" + s.VTWEG + "' liznr='" + s.LIZNR + "' konda_cdw='" + s.KONDA_CDW + "' tfrom='" + s.TFROM_S + "' tend='" + s.TEND_S + "' konda='" + s.KONDA + "'>"+depcdName+"</option>";
				 txt += "<li><input type='radio' id='rdo-"+s.VKGRP+"' name='rdo-1' value='"+depcdName+"' onClick=""><label for='rdo-"+s.VKGRP+"'><span class='icon'></span>"+depcdName+"</label>";
				txt += "<a href='#layerBranchInfo' class='layerBranchInfo btn btn_white btn_layer'>지점안내</a></li>"; 
				txt += "<li><input type='radio' id='rdo-"+s.VKGRP+"' name='rdo-1' value='"+depcdName+"' onClick='inpStop("+s.VKGRP+","+s.KONDA_CDW+","+s.KONDA+","+s.VTWEG+");'><label for='rdo-"+s.VKGRP+"'><span class='icon'></span>"+depcdName+"</label>";
				txt += "<a href='#layerBranchInfo' class='layerBranchInfo btn btn_white btn_layer'>지점안내</a></li>";
			} else {
				// txt += "<option value='"+s.VKGRP + "' branchcode='" + s.VKGRP + "' areaCode='" + s.COUNC + "' areaNm='" + s.COUNC_TX + "' vtweg='" + s.VTWEG + "' liznr='" + s.LIZNR + "' konda_cdw='" + s.KONDA_CDW + "' tfrom='" + s.TFROM_S + "' tend='" + s.TEND_S + "' konda='" + s.KONDA + "' disabled='disabled'>"+depcdName+"</option>";
				txt += "<li><input type='radio' id='rdo-"+s.VKGRP+"' name='rdo-1' value='"+depcdName+"' onClick='inpStop("+s.VKGRP+","+s.KONDA_CDW+","+s.KONDA+","+s.VTWEG+");'><label for='rdo-"+s.VKGRP+"'><span class='icon'></span>"+depcdName+"</label>";
				txt += "<a href='#layerBranchInfo' class='layerBranchInfo btn btn_white btn_layer'>지점안내</a></li>";
				
			}
		} else if(gubun=="selReturnArea"){
			if (s.ENABLE2 == "X") {
				txt += "<li><input type='radio' id='rdo2-"+s.VKGRP+"' name='rdo-2' value='"+depcdName+"' onClick='reInpStop("+s.VKGRP+");'><label for='rdo2-"+s.VKGRP+"'><span class='icon'></span>"+depcdName+"</label>";
				txt += "<a href='#layerBranchInfo' class='layerBranchInfo btn btn_white btn_layer'>지점안내</a></li>";
			} else {
				//txt += "<option value='"+s.VKGRP + "' branchcode='" + s.VKGRP + "' areaCode='" + s.COUNC + "' areaNm='" + s.COUNC_TX + "' vtweg='" + s.VTWEG + "' liznr='" + s.LIZNR + "' konda_cdw='" + s.KONDA_CDW + "' tfrom='" + s.TFROM_E + "' tend='" + s.TEND_E + "' konda='" + s.KONDA + "' disabled='disabled'>"+depcdName+"</option>";
				txt += "<li><input type='radio' id='rdo2-"+s.VKGRP+"' name='rdo-2' value='"+depcdName+"' onClick='reInpStop("+s.VKGRP+");'><label for='rdo2-"+s.VKGRP+"'><span class='icon'></span>"+depcdName+"</label>";
				txt += "<a href='#layerBranchInfo' class='layerBranchInfo btn btn_white btn_layer'>지점안내</a></li>";
				
			}
		}
		
	});
	
	$("input[name='rentDate']").val($("input[name='sDate_']").val().replace("/", "").replace("/", ""))
	$("input[name='returnDate']").val($("input[name='eDate_']").val().replace("/", "").replace("/", ""))
	$("input[name='rentTime']").val($("input[name='rent_hour']").val() + $("input[name='rent_minute']").val() + "00")
	$("input[name='returnTime']").val($("input[name='return_hour']").val() + $("input[name='return_minute']").val() + "00")
	
	return txt;
}*/

//자동차 유형 조회
/*function callCarSizeList() {
	var brand = $("#brandCode").val();
	if(brand=="ALL")	brand = "";

	$.ajax({
	  type: "POST",
	  dataType: "json",
		async : asyncCheck,
		url : "/kor/reservation/carSizeList.do",
		data : {
			brandCode : brand
		},
		success : function(data) {
			$("#carSize").empty();
			$("#carSize").append("<option value=''>자동차 유형을 선택하세요</option>");
			var selectedCode = "";

			//TODO bskwon
			//2016.10.06. 제주인 경우 71 전기차를 맨위로
			if(IS_JEJU == "Y") {
				$("#carSize").append("<option value='71'>전기차(충전비 완전무료!)</option>");
			}
			$.each(data.carSizeList, function(i, s) {
				if(s.MVGR2=="52")
					$("#carSize").append("<option value='"+s.MVGR2+"' "+selectedCode+">인기수입차</option>");
				else if(IS_JEJU == "Y" && s.MVGR2=="71")
					;
				else
					$("#carSize").append("<option value='"+s.MVGR2+"' "+selectedCode+">"+s.BEZEI+"</option>");
			});
			//수정모드일때
			if($("input[name='editChk']").val()=="1"){
				$("#carSize").val($("input[name='carSizeCode']").val());
			}

			selectboxSet($("#carSize"),$("option:selected", "#carSize").text());
		},
		error:function(request,status,error){
			alert("[자동차유형]오류가 일시 발생하였습니다. 잠시 후 다시 시도해보시거나, 오류가 계속될 경우 고객센터(1588-1230)로 문의바랍니다.");
			location.reload();
		}
	});
}*/

//브랜드 조회
function callBrandList() {
	$.ajax({
	  type: "POST",
	  dataType: "json",
		async : asyncCheck,
		url : "/kor/reservation/brandList.do",
		data : {
			carSize : $("#carSize").val()
		},
		success : function(data) {
			$("#brandCode").empty();
			$("#brandCode").append("<option value=''>자동차 브랜드를 선택하세요</option>");
			$("#brandCode").append("<option value='ALL'>전체</option>");
			$.each(data.brandList, function(i, s) {
				$("#brandCode").append("<option value='"+s.PRODH+"'>"+s.VTEXT+"</option>");
			});


			selectboxSet($("#brandCode"),$("option:selected", "#brandCode").text());
		},
		error:function(request,status,error){
			alert("[브랜드/차종]오류가 일시 발생하였습니다. 잠시 후 다시 시도해보시거나, 오류가 계속될 경우 고객센터(1588-1230)로 문의바랍니다.");
			location.reload();
		}
	});
}

//자동차 차종 조회
function callCarList() {
	if(carValid()){	//유형/브랜드 있을때
		var callType = "C";
		if(rentBranchValid() && dateValid()){	// 지점 & 날짜
			callType = "DBC";
		} else if(rentBranchValid() && !dateValid()){	// 지점
			callType = "BC";
		} else if(!rentBranchValid() && dateValid()){	// 날짜
			callType = "DC";
		}

		var hdsCheck = "";
		if ($("input[name='hdsCheck']").prop('checked')) {
			hdsCheck = "Y";
		} else {
			hdsCheck = "N";
		}

		var jejuAuto = "";
		if($("input[name='rentArea']").val()=="6"){
			jejuAuto = "X";
		}

		$.ajax({
			type: "POST",
			dataType: "json",
			async : asyncCheck,
			url : "/fr/kor/reservation/carList.do",
			data : {
				reservNo : $("#rentForm input[name='reservNo']").val(),
				reservCarCode : $("#rentForm input[name='carCode']").val(),
				rentBranch : $("#rentForm input[name='rentBranch']").val(),
				returnBranch : $("#rentForm input[name='returnBranch']").val(),
				rentDate : $("#rentForm input[name='sDate_']").val().replace("/", "").replace("/", ""),
				rentTime : $("#sHour").val()+""+$("#sMin").val()+"00",
				returnDate : $("#rentForm input[name='eDate_']").val().replace("/", "").replace("/", ""),
				returnTime : $("#eHour").val()+""+$("#eMin").val()+"00",
				carSize : $("#carSize").val(),
				brandCode : $("#brandCode").val(),
				hdsCheck : hdsCheck,
				as_dlcr_yn : $("#rentForm input[name='as_dlcr_yn']").val(),
				as_rtcr_yn : $("#rentForm input[name='as_rtcr_yn']").val(),
				splace : $("#rentForm input[name='splace']").val(),
				eplace : $("#rentForm input[name='eplace']").val(),
				vtweg : $("#rentForm input[name='vtweg']").val(),
				liznr : $("#rentForm input[name='liznr']").val(),
				konda : $("#rentForm input[name='konda']").val(),
				jejuAuto : jejuAuto,
				callType : callType
			},
			success : function(data) {$
				if(data.result=="N"){
					alert(data.checkMsg);
				} else {
					var tmpCarCode = $("input[name='carCode']").val();	//기존 차량코드
					var tmpCarClass = "";
					var tmpCarExist = "N";
					$("#listcar").html("");
					var txt = "";
					if(data.carList.length>0){

						$.each(data.carList, function(i, s) {
								var carPirce = JSON.parse(s.CAR_PRICE);
							var mysteryCarPrice = carPirce.price.LD_CAR_RENTAL_FEE;
							var carLdwPrice = carPirce.ldwList.LD_LDW_CHARGE;
							if(tmpCarCode!="" && tmpCarCode==s.MATNR){	//같은 차량이면
								tmpCarClass = "red_txt";
								tmpCarExist = "car"+s.MATNR;
							} else if(tmpCarCode!="" && tmpCarCode!=s.MATNR){
								tmpCarClass = "";
							}
							txt += "<li><dl><dt><a href='#'><strong class='tit'>"+s.MAKTX+"</strong></a></dt>";
							txt += "<dd><div class='img'><a href='#'><img src='/publish/images/upfiles/carImg/"+s.MATNR+".jpg' alt=''><span class='tag_promo'><em>프로모션</em></span></a></div>";
							txt += "<div class='tag'><span class='tag_compact'>"+s.MVGR2_TX+"</span><span class='tag_gas'>"+s.FUELT_TX+"</span></div>";
							txt += "<p class='txt'>"+s.FUELT_TX+" | "+s.GPLCNT+" 인승| 대형가방 "+s.INFO_BIGBAG_CNT+"개 | 소형가방 "+s.INFO_SMALLBAG_CNT+"개</p>";
							/*txt += "<ul class='option'><li calss='none'>[보험 불포함]</li>"
							$.each(carPirce.ldwList, function(i, s) {
								txt += "<li>"+s.LD_LDW_CHARGE+"</li>"
							});
							txt += "</ul>";*/
							/*txt += "<ul class='option'><li calss='none'>[보험 불포함]</li><li>"+carLdwPrice+"</li><li>30만원</li></ul>";*/
							txt += "<strong class='price'>"+comma((Math.round(mysteryCarPrice)))+"<em>원</em></strong><del class='price2'>25,000<em>원</em></del>";
							txt += "<button type='button' class='btn_book btn_black' onclick=\"dataSetting('"+s.MATNR+"','"+s.MAKTX+"','"+s.MVGR2+"','"+s.FUELT_TX+"')\">예약</button></dd></dl></li>";
							
						});
						$("#listcar").html(txt);

						if(tmpCarCode!="" && tmpCarExist=="N"){	//선택한 차량이 없을 때
							alert("자동차 유형이 변경되었습니다.\n다시 차량을 선택해주세요.");
							//alert("죄송합니다.\n선택하신 차량은 해당 브랜드나 유형에서는 선택하실 수 없습니다.\n\n다시 차량을 선택해주세요.");
							carReset();
							resetOptionChk();
							resetOption(); // 옵션
							resetPoint(); // 포인트
							resetGift(); // 무료이용권
							resetVal();
						}

						carClickBind();

						if(tmpCarExist!="N"){
							$(".carName").html($("#"+tmpCarExist).attr("carName")+"<br>"+$("#"+tmpCarExist).attr("fuelTx"));

							var imageUrl = "/upfiles/carImg/" + $("#"+tmpCarExist).attr("carCode") + ".jpg";

							if(imageUrlCHeck(imageUrl)){
								$(".carImg").html("<img src=\""+imageUrl+"\" width=\"121\" height=\"95\" />");
							} else{
								$(".carImg").html("<img src=\"/upfiles/carImg/default.jpg\" width=\"121\" height=\"95\" />");
							}

							$("#showroom_person_view,#showroom_person").html($("#"+tmpCarExist).attr("gplCnt"));
							$("#showroom_person_desc").html($("#"+tmpCarExist).attr("gplCnt")+" 인승");

							$("#showroom_fuel").html($("#"+tmpCarExist).attr("fuelt"));
							var fuel_name = "";
							if($("#"+tmpCarExist).attr("fuelt")=="D")	fuel_name = "Diesel";
							else if($("#"+tmpCarExist).attr("fuelt")=="E")	fuel_name = "Electric";
							else if($("#"+tmpCarExist).attr("fuelt")=="G")	fuel_name = "Gasoline";
							else if($("#"+tmpCarExist).attr("fuelt")=="H")	fuel_name = "Gasoline/LPG";
							else if($("#"+tmpCarExist).attr("fuelt")=="I")	fuel_name = "LPI Hybrid";
							else if($("#"+tmpCarExist).attr("fuelt")=="K")	fuel_name = "Gasoline Hybrid";
							else if($("#"+tmpCarExist).attr("fuelt")=="L")	fuel_name = "LPG";
							else if($("#"+tmpCarExist).attr("fuelt")=="P")	fuel_name = "Diesel/LPG";
							$("#showroom_fuel_desc").html(fuel_name);

							$("#showroom_fuel").html($("#"+tmpCarExist).attr("fuelt"));
							var fuel_name = "<img src='/img/short/icon_showr_01.png' />";
							if($("#"+tmpCarExist).attr("fuelt")=="D")	fuel_name = "<img src='/img/short/fuel_d.png' />";
							else if($("#"+tmpCarExist).attr("fuelt")=="E")	fuel_name = "<img src='/img/short/fuel_e.png' />";
							else if($("#"+tmpCarExist).attr("fuelt")=="G")	fuel_name = "<img src='/img/short/fuel_g.png' />";
							else if($("#"+tmpCarExist).attr("fuelt")=="H")	fuel_name = "<img src='/img/short/fuel_h.png' />";
							else if($("#"+tmpCarExist).attr("fuelt")=="I")	fuel_name = "<img src='/img/short/fuel_i.png' />";
							else if($("#"+tmpCarExist).attr("fuelt")=="K")	fuel_name = "<img src='/img/short/fuel_k.png' />";
							else if($("#"+tmpCarExist).attr("fuelt")=="L")	fuel_name = "<img src='/img/short/fuel_l.png' />";
							else if($("#"+tmpCarExist).attr("fuelt")=="P")	fuel_name = "<img src='/img/short/fuel_p.png' />";
							$("#showroom_fuel").html(fuel_name);

							// 차량 픽토그램 정보 호출
							$.ajax({
								type: "POST",
								dataType: "json",
								async : asyncCheck,
								url : "/kor/reservation/carInfo.do",
								data : {
									carcode : $("#"+tmpCarExist).attr("carCode")
								},
								success : function(data) {
									if(data.carcode!=""){	//차량 정보가 있는 경우
										$("#showroom_bigbag").html("<img src='/img/short/icon_showr_03.png' alt='' /><span>"+data.bigbagcnt+"</span>");
										$("#showroom_bigbag_desc").html(data.bigbagcnt+" 개");

										$("#showroom_bigbag_view").html(data.bigbagcnt);
										$("#showroom_smallbag").html("<img src='/img/short/icon_showr_04.png' alt='' /><span>"+data.smallbagcnt+"</span>");
										$("#showroom_smallbag_desc").html(data.smallbagcnt+" 개");
									} else {
										$("#showroom_bigbag").html("<strong>-</strong>");
										$("#showroom_bigbag_desc").html("");

										$("#showroom_smallbag_view").html("-");
										$("#showroom_smallbag").html("<strong>-</strong>");
										$("#showroom_smallbag_desc").html("");
									}
								},
								error:function(request,status,error){
									$("#showroom_bigbag").html("<strong>-</strong>");
									$("#showroom_bigbag_desc").html("");

									$("#showroom_smallbag_view").html("-");
									$("#showroom_smallbag").html("<strong>-</strong>");
									$("#showroom_smallbag_desc").html("");
								}
							});

							callCarPrice($("#"+tmpCarExist));
						}

					} else {
						alert("예약 가능한 차량이 없습니다. 다른 유형이나 브랜드 또는 지점을 선택해주세요.");
						if(nowProcess=="C1"){
							$("#brandCode").val("");
							//callBrandList();
						} else if(nowProcess=="C2"){
							$("#carSize").val("");
							//callCarSizeList();
						} else {
							$("#brandCode").val("");
							//callBrandList();
							$("#carSize").val("");
							//callCarSizeList();
						}
						carReset();
						priceReset();
					}
				}
				document.getElementById("researvationStep0").style.display = 'none';
				document.getElementById("researvationStep1").style.display = '';
			},error:
				function(request,status,error){

				alert("[자동차차종]오류가 일시 발생하였습니다. 잠시 후 다시 시도해보시거나, 오류가 계속될 경우 고객센터(1588-1230)로 문의바랍니다.");
				// location.reload();
				document.getElementById("researvationStep0").style.display = '';
				document.getElementById("researvationStep1").style.display = 'none';
			}
		});
	}
}

// 차량 클릭 이벤트
function carClickBind(){
	// 차량 클릭
	$(".liCarModel").unbind("click");
	$(".liCarModel").bind("click",
			function() {
				nowProcess="P";

				var carCodeList = " 1CAMP01 , 1XNDL12 , 1CVE700 , 1CEV600 , 1SFD600 , 1CVE612 , 1CEV600 , 1CVE611 , 1SFC600 , 1SLC600 , 1CVE601 , 1SFT600 , 1CVE610 ";
				if ($("input[name='hdsCheck']").prop('checked') && carCodeList.indexOf($(this).attr("carCode")) > 0) {
					alert("딜리버리 서비스 이용 시 해당 차량은 예약이 불가 합니다.");
					return false;
				}

				var carCodeList2 = " 1CVE700 , 1CEV600 , 1CEV600 , 1CVE800 , 1CEV610 , 1CEV610 ";
				if ($("input[name='rentBranch']").val() != $(this).attr("realBranch") && carCodeList2.indexOf($(this).attr("carCode")) > 0) {
					if ($("input[name='rentBranch']").val() == "402") {
						alert("선택하신 차량은 강남 지점 에서만 예약 가능 합니다.");
						return false;
					}
				}

				if ("1DVO103".indexOf($(this).attr("carCode")) > -1 && $("input[name='rentBranch']").val() == "622") {
					alert("※볼트 출시 기념 1+1 프로모션(4월 30일까지)\n"
							+"볼트(Volt) 1+1 프로모션을 적용하여 예약하고자 하시면 제주 오토하우스(064-751-8000)로 문의하시기 바랍니다.\n"
							+"*참고) 볼트의 실제 탑승 가능 인원은 4명입니다.");
				}
				
				//20170327.쉐비밴 - 인승정보가 실제 가능인원과 차이가 있어 이슈
				if("1CVE611".indexOf($(this).attr("carCode")) > -1 && $("input[name='rentBranch']").val() == "622") {
					alert("지금 선택하신 차량의 실제 탑승 가능 인원은 7명이오니 예약 및 이용에 참고하시기 바랍니다.");
				}

				var str = $(this).attr("carname");
				var num = str.indexOf("장애우");
				if(num >= 0) {
					alert('해당 차량은 장애우 전용 차량으로 장애우 회원분들만 대여가 가능합니다.만약 비장애우인 경우에는 현장에서 대여가 불가능 할 수 있습니다.');
				}

				var tmpCarCode = $("#rentForm input[name='carCode']").val();

				carReset(); //차량 리셋 후 진행

				$("#rentForm input[name='carSelect']").val($(this).attr("id"));

				$("#rentForm input[name='carCode']").val($(this).attr("carCode"));
				$("#rentForm input[name='carName']").val($(this).attr("carName"));
				$("#rentForm input[name='realBranch']").val($(this).attr("realbranch"));

				$(this).addClass("red_txt");	//클릭된 차량 선택

				$(".carName").html($(this).attr("carName")+"<br>"+$(this).attr("fuelTx"));

				var imageUrl = "/upfiles/carImg/" + $(this).attr("carCode") + ".jpg";
				$('.carName').css("display", "");
				$('.carImg').css("display", "");
				$('.carinfo').css("display", "");
				$('.mcar_result').css("display", "none");
				if(imageUrlCHeck(imageUrl)){
					//20161228.bskwon. 차량이미지 에러시 디폴트, 정상이면 carcode로 출력
//					if($(this).attr("carCode")=="1KSU001" || $(this).attr("carCode")=="1KSU021" || $(this).attr("carCode")=="1HTG202" || $(this).attr("carCode")=="1HTG212" || $(this).attr("carCode")=="1KSR522" || $(this).attr("carCode")=="1KSR610" || $(this).attr("carCode")=="1KSR611" || $(this).attr("carCode")=="1SSA001" || $(this).attr("carCode")=="1HGE301" || $(this).attr("carCode")=="1HSF520" || $(this).attr("carCode")=="1KCN444" || $(this).attr("carCode")=="1KCN421")
//						$(".carImg").html("<img src=\"/upfiles/carImg/default.jpg\" width=\"121\" height=\"95\" />");
//					else
					$(".carImg").html("<img src=\""+imageUrl+"\" width=\"121\" height=\"95\" />");
				} else
					$(".carImg").html("<img src=\"/upfiles/carImg/default.jpg\" width=\"121\" height=\"95\" />");


				$("#showroom_person_view,#showroom_person").html($(this).attr("gplCnt"));
				$("#showroom_person_desc").html($(this).attr("gplCnt")+" 인승");

				$("#showroom_fuel").html($(this).attr("fuelt"));
				var fuel_name = "";
				if($(this).attr("fuelt")=="D")	fuel_name = "Diesel";
				else if($(this).attr("fuelt")=="E")	fuel_name = "Electric";
				else if($(this).attr("fuelt")=="G")	fuel_name = "Gasoline";
				else if($(this).attr("fuelt")=="H")	fuel_name = "Gasoline/LPG";
				else if($(this).attr("fuelt")=="I")	fuel_name = "LPI Hybrid";
				else if($(this).attr("fuelt")=="K")	fuel_name = "Gasoline Hybrid";
				else if($(this).attr("fuelt")=="L")	fuel_name = "LPG";
				else if($(this).attr("fuelt")=="P")	fuel_name = "Diesel/LPG";
				$("#showroom_fuel_desc").html(fuel_name);

				$("#showroom_fuel").html($(this).attr("fuelt"));
				var fuel_name = "<img src='/img/short/icon_showr_01.png' />";
				if($(this).attr("fuelt")=="D")	fuel_name = "<img src='/img/short/fuel_d.png' />";
				else if($(this).attr("fuelt")=="E")	fuel_name = "<img src='/img/short/fuel_e.png' />";
				else if($(this).attr("fuelt")=="G")	fuel_name = "<img src='/img/short/fuel_g.png' />";
				else if($(this).attr("fuelt")=="H")	fuel_name = "<img src='/img/short/fuel_h.png' />";
				else if($(this).attr("fuelt")=="I")	fuel_name = "<img src='/img/short/fuel_i.png' />";
				else if($(this).attr("fuelt")=="K")	fuel_name = "<img src='/img/short/fuel_k.png' />";
				else if($(this).attr("fuelt")=="L")	fuel_name = "<img src='/img/short/fuel_l.png' />";
				else if($(this).attr("fuelt")=="P")	fuel_name = "<img src='/img/short/fuel_p.png' />";
				$("#showroom_fuel").html(fuel_name);

				// 차량 픽토그램 정보 호출
				$.ajax({
					type: "POST",
					dataType: "json",
					async : asyncCheck,
					url : "/fr/kor/reservation/carInfo.do",
					data : {
						carcode : $(this).attr("carCode")
					},
					success : function(data) {
						if(data.carcode!=""){	//차량 정보가 있는 경우
							$("#showroom_bigbag").html("<img src='/img/short/icon_showr_03.png' alt='' /><span>"+data.bigbagcnt+"</span>");
							$("#showroom_bigbag_desc").html(data.bigbagcnt+" 개");

							$("#showroom_bigbag_view").html(data.bigbagcnt);
							$("#showroom_smallbag").html("<img src='/img/short/icon_showr_04.png' alt='' /><span>"+data.smallbagcnt+"</span>");
							$("#showroom_smallbag_desc").html(data.smallbagcnt+" 개");
						} else {
							$("#showroom_bigbag").html("<strong>-</strong>");
							$("#showroom_bigbag_desc").html("");

							$("#showroom_smallbag_view").html("-");
							$("#showroom_smallbag").html("<strong>-</strong>");
							$("#showroom_smallbag_desc").html("");
						}
					},
					error:function(request,status,error){
						$("#showroom_bigbag").html("<strong>-</strong>");
						$("#showroom_bigbag_desc").html("");

						$("#showroom_smallbag_view").html("-");
						$("#showroom_smallbag").html("<strong>-</strong>");
						$("#showroom_smallbag_desc").html("");
					}
				});

				resetOption();

				if(tmpCarCode!=$(this).attr("carCode")){	//다른 차량을 선택하면
					//****************
					anyDataChange('5',$(this));
					//****************
				}

			});
}

// 가격 조회 이벤트
function callCarPrice(obj){
	if($("input[name='rentBranch']").val()!="" && $("input[name='returnBranch']").val()!=""){
		var hdsCheck = "";
		if ($("input[name='hdsCheck']").prop('checked')) {
			hdsCheck = "Y";
		} else {
			hdsCheck = "N";
		}

		var jejuAuto = "";
		if($("input[name='rentArea']").val()=="6"){
			jejuAuto = "X";
		}

		$.ajax({
			type: "POST",
			dataType: "json",
			async : asyncCheck,
			url : "/fr/kor/reservation/carPrice.do",
			data : {
				carCode : $("#rentForm input[name='carCode']").val(),
				rentBranch : $("#rentForm input[name='rentBranch']").val(),
				returnBranch : $("#rentForm input[name='returnBranch']").val(),

				rentDate : $("#rentForm input[name='sDate_']").val().replace("/", "").replace("/", ""),
				rentTime : $("#sHour").val()+""+$("#sMin").val()+"00",
				returnDate : $("#rentForm input[name='eDate_']").val().replace("/", "").replace("/", ""),
				returnTime : $("#eHour").val()+""+$("#eMin").val()+"00",

				carSize : $("option:selected", "#rentForm #carSize").val(),
				splace : $("#rentForm input[name='splace']").val(),
				eplace : $("#rentForm input[name='eplace']").val(),
				hdsCheck : hdsCheck,
				konda : $("#rentForm input[name='konda']").val(),
				jejuAuto : jejuAuto,
				upChk : $("#rentForm input[name='upChk']").val()
			},
			success : function(data) {
				if(data.result=="N"){
					alert("[차량가격1]오류가 일시 발생하였습니다. 잠시 후 다시 시도해보시거나, 오류가 계속될 경우 고객센터(1588-1230)로 문의바랍니다.");
					carReset();
				} else {
						$("input[name='dutimea']").val(data.dutimea);
						$("input[name='dutimea2']").val(data.dutimea2);
						$("input[name='dutimea3']").val(data.dutimea3);
						$("input[name='DUDAY']").val(data.DUDAY);
						$("input[name='DUTIME']").val(data.DUTIME);
						$("input[name='DUDAY2']").val(data.DUDAY2);
						$("input[name='DUTIME2']").val(data.DUTIME2);
						$("input[name='DUDAY3']").val(data.DUDAY3);
						$("input[name='DUTIME3']").val(data.DUTIME3);
						$("input[name='DISCOUNT']").val(data.DISCOUNT);

						// 회원할인일 경우에만 세팅 - 이벤트, 쿠폰일 경우에는 각각 이벤트 발생 시 세팅
						if ($("input[name='memberGrade']").val() != "비회원" || $("input[name='rentBranch']").val() == "622" ) {
							$("input[name='DISCOUNT_GUBUN']").val(data.discount_gubun);
							$("input[name='KSCHN']").val(data.kschl);
							$("input[name='KRECH']").val(data.krech);
							$("input[name='KRATE']").val(data.kbewr);
							$("input[name='KSCHN_TX']").val(data.kschl_tx);
							$("input[name='NAME1']").val(data.name1);
							$("input[name='WAERK']").val(data.waers);
							$("input[name='incdw']").val(data.incdw);
							$("input[name='BNAME']").val(data.maktx);

						}

						// 원대여지점 코드 추가
						$("input[name='MATNR']").val($("input[name='carCode']").val());
						$("input[name='KBSTD']").val(data.price.KBSTD);
						$("input[name='KBETR2']").val(Math.round(data.price.KBETR2));

						if(nowProcess != ""){
							resetOptionChk();
							resetOption(); // 옵션
							resetPoint(); // 포인트
							resetGift(); // 무료이용권
						}

						if (!carOptionSetting($(obj).attr("carCode"), $(obj).attr("realBranch"))){
							return;
						}

						carRentFee = data.price.LD_CAR_RENTAL_FEE * 1;
						carDiscountFee = data.price.LD_DISCOUNT_CHARGE * 1;
						carDiscount = data.price.LD_DISCOUNT_RATE;
						onewayFee = data.price.LD_ONEWAY_AMT * 1; // EDIT

						if (data.price.LD_ONEWAY_AMT > 0) {
							$("#oneway_comment,#oneway_p").show();
							$("#oneway_w").html(comma(data.price.LD_ONEWAY_AMT * 1));
						} else {
							$("#oneway_comment,#oneway_p").hide(); //배반차 노출
							$("#oneway_w").html("");
						}
						
						//////////////////////////////////////////////
						//20170117.청주지점(711) -> 청주공항 D/S added. bskwon
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
						//////////////////////////////////////////////
						
						if ($("input[name='returnBranch']").val() == "0000387") {
							$("#jeju_p").show();
						} else {
							$("#jeju_p").hide();
						}

						$("input[name='carName']").val($(obj).attr("carName"));
						$("input[name='carCode']").val($(obj).attr("carCode"));
						$("input[name='carGrpCode']").val($(obj).attr("carCode"));
						$("input[name='onewayFee']").val(data.price.LD_ONEWAY_AMT * 1);
						$("input[name='realBranch']").val($(obj).attr("realBranch"));

						totalPrice();
						afterCarList();
						settingPonitAfter();
						pointEvent();

						$("#rentForm input[name='upCarCode']").val("");
						$("#rentForm input[name='upCarName']").val("");
						$("#rentForm input[name='upCarSize']").val("");
						$("#rentForm input[name='upCarRealBranch']").val("");

						if($("option:selected", "#rentForm #carSize").val()=="11" || $("option:selected", "#rentForm #carSize").val()=="12"){
							//car upgrade
							if(data.upCarList.length>0){
								$("#upCarMsgArea").css("display","none");
								$("#upCarArea").html("");
								var upCarList = "";
								$.each(data.upCarList, function(i, s) {
									upCarList = upCarList + "<li><div class='list'><input type='radio' name='upCarModel' class='myClass upCarModel' id='upcar"+s.MATNR+"' realbranch=\""+s.VKGRP+"\" carCode=\""+s.MATNR+"\" value=\""+s.MATNR+"\" carName=\""+s.MAKTX+"\" fuelt=\""+s.FUELT+"\" fuelTx=\""+s.FUELT_TX+"\" gplCnt=\""+s.GPLCNT+"\" carSize=\""+s.CARSIZE+"\" />";
									var imageUrl = "/upfiles/carImg/" + s.MATNR + ".jpg";
									if(imageUrlCHeck(imageUrl)){
										//20161228.bskwon. 차량이미지 에러시 디폴트, 정상이면 carcode로 출력
//										if(s.MATNR=="1KSU001" || s.MATNR=="1KSU021" || s.MATNR=="1HTG202" || s.MATNR=="1HTG212" || s.MATNR=="1KSR522" || s.MATNR=="1KSR610" || s.MATNR=="1KSR611" || s.MATNR=="1SSA001" || s.MATNR=="1HSF520" || s.MATNR=="1KCN444" || s.MATNR=="1KCN421")
//											upCarList = upCarList + "<img src='/upfiles/carImg/default.jpg' style='width:124px;height:98px' />";
//										else
										upCarList = upCarList + "<img src='"+imageUrl+"' style='width:124px;height:98px' />";
									} else
										upCarList = upCarList + "<img src='/upfiles/carImg/default.jpg' style='width:124px;height:98px' />";

									upCarList = upCarList + "<p class='tit'>"+s.MAKTX+"</p><p class='info'>"+s.FUELT_TX+"</p></div></li>";
								});
								$("#upCarArea").html("<ul class='bxslider_up'>"+ upCarList +"</ul>");
								$("#upCarArea").css("display","block");

								upCarClickBind();

								$('.bxslider_up .myClass').prettyCheckable();
								$('.bxslider_up').bxSlider({
									infiniteLoop: false,
									minSlides: 1,
									maxSlides: 4,
									slideWidth: 164,
									slideMargin: 0,
									moveSlides: 0,
									pager: false
								});

								if(tmpUpCarModel!=""){
									alert("무료 업그레이드 차량을 다시 선택해주세요.");
									tmpUpCarModel = "";
								}
							} else {
								$("#upCarMsg").html("해당 지점에는 무료 업그레이드 가능 차량이 없습니다.");
								$("#upCarMsgArea").css("display","block");
								$("#upCarArea").css("display","none");
							}
						} else {
							if ($("input[name='memberGrade']").val() != "비회원"){
								$("#upCarMsg").html("해당 유형은 무료 업그레이드 서비스를 받으실 수 없습니다.<br>가능 유형 : 소형, 중형");
								$("#upCarMsgArea").css("display","block");
								$("#upCarArea").css("display","none");
							}
						}
				}
			},
			error:function(request,status,error){
				alert("[차량가격2]오류가 일시 발생하였습니다. 잠시 후 다시 시도해보시거나, 오류가 계속될 경우 고객센터(1588-1230)로 문의바랍니다.");
				carReset();
				if(status == 0)
					  return;  // it's not really an error
			}
		});


		return false;
	}
	return false;
}

//업그레이드 차량 클릭 이벤트
function upCarClickBind(){
	// 차량 클릭
	$(".upCarModel").unbind("change");
	$(".upCarModel").bind("change",
			function() {

				$("#rentForm input[name='upCarCode']").val($(this).attr("carCode"));
				$("#rentForm input[name='upCarName']").val($(this).attr("carName"));
				$("#rentForm input[name='upCarSize']").val($(this).attr("carSize"));
				$("#rentForm input[name='upCarRealBranch']").val($(this).attr("realbranch"));

				tmpUpCarModel = $(this).attr("carCode");

				$(".carName").html($(this).attr("carName")+"<br>"+$(this).attr("fuelTx"));

				var imageUrl = "/upfiles/carImg/" + $(this).attr("carCode") + ".jpg";
				if(imageUrlCHeck(imageUrl)){
					//20161228.bskwon. 차량이미지 에러시 디폴트, 정상이면 carcode로 출력
//					if($(this).attr("carCode")=="1KSU001" || $(this).attr("carCode")=="1KSU021" || $(this).attr("carCode")=="1HTG202" || $(this).attr("carCode")=="1HTG212" || $(this).attr("carCode")=="1KSR522" || $(this).attr("carCode")=="1KSR610" || $(this).attr("carCode")=="1KSR611" || $(this).attr("carCode")=="1SSA001" || $(this).attr("carCode")=="1HSF520" || $(this).attr("carCode")=="1KCN444" || $(this).attr("carCode")=="1KCN421")
//						$(".carImg").html("<img src=\"/upfiles/carImg/default.jpg\" width=\"121\" height=\"95\" />");
//					else
						$(".carImg").html("<img src=\""+imageUrl+"\" width=\"121\" height=\"95\" />");
				} else
					$(".carImg").html("<img src=\"/upfiles/carImg/default.jpg\" width=\"121\" height=\"95\" />");


				$("#showroom_person_view,#showroom_person").html($(this).attr("gplCnt"));
				$("#showroom_person_desc").html($(this).attr("gplCnt")+" 인승");

				$("#showroom_fuel").html($(this).attr("fuelt"));
				var fuel_name = "";
				if($(this).attr("fuelt")=="D")	fuel_name = "Diesel";
				else if($(this).attr("fuelt")=="E")	fuel_name = "Electric";
				else if($(this).attr("fuelt")=="G")	fuel_name = "Gasoline";
				else if($(this).attr("fuelt")=="H")	fuel_name = "Gasoline/LPG";
				else if($(this).attr("fuelt")=="I")	fuel_name = "LPI Hybrid";
				else if($(this).attr("fuelt")=="K")	fuel_name = "Gasoline Hybrid";
				else if($(this).attr("fuelt")=="L")	fuel_name = "LPG";
				else if($(this).attr("fuelt")=="P")	fuel_name = "Diesel/LPG";
				$("#showroom_fuel_desc").html(fuel_name);

				$("#showroom_fuel").html($(this).attr("fuelt"));
				var fuel_name = "<img src='/img/short/icon_showr_01.png' />";
				if($(this).attr("fuelt")=="D")	fuel_name = "<img src='/img/short/fuel_d.png' />";
				else if($(this).attr("fuelt")=="E")	fuel_name = "<img src='/img/short/fuel_e.png' />";
				else if($(this).attr("fuelt")=="G")	fuel_name = "<img src='/img/short/fuel_g.png' />";
				else if($(this).attr("fuelt")=="H")	fuel_name = "<img src='/img/short/fuel_h.png' />";
				else if($(this).attr("fuelt")=="I")	fuel_name = "<img src='/img/short/fuel_i.png' />";
				else if($(this).attr("fuelt")=="K")	fuel_name = "<img src='/img/short/fuel_k.png' />";
				else if($(this).attr("fuelt")=="L")	fuel_name = "<img src='/img/short/fuel_l.png' />";
				else if($(this).attr("fuelt")=="P")	fuel_name = "<img src='/img/short/fuel_p.png' />";
				$("#showroom_fuel").html(fuel_name);

				// 차량 픽토그램 정보 호출
				$.ajax({
					type: "POST",
					dataType: "json",
					async : asyncCheck,
					url : "/fr/kor/reservation/carInfo.do",
					data : {
						carcode : $(this).attr("carCode")
					},
					success : function(data) {
						if(data.carcode!=""){	//차량 정보가 있는 경우
							$("#showroom_bigbag").html("<img src='/img/short/icon_showr_03.png' alt='' /><span>"+data.bigbagcnt+"</span>");
							$("#showroom_bigbag_desc").html(data.bigbagcnt+" 개");

							$("#showroom_bigbag_view").html(data.bigbagcnt);
							$("#showroom_smallbag").html("<img src='/img/short/icon_showr_04.png' alt='' /><span>"+data.smallbagcnt+"</span>");
							$("#showroom_smallbag_desc").html(data.smallbagcnt+" 개");
						} else {
							$("#showroom_bigbag").html("<strong>-</strong>");
							$("#showroom_bigbag_desc").html("");

							$("#showroom_smallbag_view").html("-");
							$("#showroom_smallbag").html("<strong>-</strong>");
							$("#showroom_smallbag_desc").html("");
						}
					},
					error:function(request,status,error){
						$("#showroom_bigbag").html("<strong>-</strong>");
						$("#showroom_bigbag_desc").html("");

						$("#showroom_smallbag_view").html("-");
						$("#showroom_smallbag").html("<strong>-</strong>");
						$("#showroom_smallbag_desc").html("");
					}
				});

			});
}


//차량 옵션 셋팅
function carOptionSetting(carCode, realBranch) {
	$.ajaxSetup({
		cache : false
	});

	var incdw = $("input[name='incdw']").val();

	if(nowProcess=="" && $("input[name='editChk']").val()=="1"){
		if ($("input[name='CouponWaerk']").val() == "%" || $("input[name='EventWaerk']").val() == "%") {
			if ($("input[name='EventIncdw']").val() == "" || $("input[name='CouponIncdw']").val() == "") {
				incdw = "";
			} else {
				incdw = $("input[name='incdw']").val();
			}
		} else {
			incdw = $("input[name='incdw']").val();
		}
	}

	carSize = $("option:selected", "#carSize").val();
	var chk = true;
	$.ajax({
				type: "POST",
				dataType: "json",
				async : asyncCheck,
				url : "/fr/kor/reservation/carOption.do",
				data : {
					rentArea : $("input[name='rentArea']").val(),
					rentBranch : $("input[name='rentBranch']").val(),
					rentPlace : $("input[name='rentPlace']").val(),
					returnBranch : $("input[name='returnBranch']").val(),
					returnPlace : $("input[name='returnPlace']").val(),
					reservNo : $("input[name='reservNo']").val(),
					sDate : getResDate("sDate_"),
					eDate : getResDate("eDate_"),
					carCode : carCode,
					realBranch : realBranch,
					carSize : $("option:selected", "#carSize").val(),
					carMemberCnt : $("input[name='carMemberCnt']").val(),
					DUDAY : $("input[name='DUDAY']").val(),
					DUTIME : $("input[name='DUTIME']").val(),
					vtweg : $("input[name='vtweg']").val(),
					liznr : $("input[name='liznr']").val(),
					konda_cdw : $("input[name='konda_cdw']").val(),
					konda : $("input[name='konda']").val(),
					incdw : incdw,
					mysteryChk : mysteryChk,
					mysteryCode : $("#rentForm [name='mysteryCode']").val()
				},
				success : function(data) {
					if (data.success == "N") {
						alert(data.message);
					} else {
						if ($("option:selected", "#carSize").val() == "21") {
							alert("국토해양부의 정책에 의하여 11인승 이상 승합 차량은 고속 도로에서 110km이하로 속도가 제한 됩니다.");
						}

						if (data.ldwList) {
							resetLdw();


							/*
							 * 옵션선택
							 */
							if (data.option) {
								optionFee = 0;
								$(".ckEvent").unbind("change");
								$(".ckEvent").attr("disabled","disabled");
								resetOption();
								optionStr = data.LS_MULTI_OPTION;
								var options = data.LS_MULTI_OPTION.split("||");
								var objPrice = "";
								var objCnt = "";
								while (options.length > 0) {
									var objId = options.shift();
									objCnt = options.shift();
									var objPrice = options.shift();
									$(".ckEvent[id='" + objId + "']").attr("ctavl", objCnt);

									if (objId != "1O101" && Math.round(objCnt) < 1) {
										$(".ckEvent[id='" + objId + "']").change(function() {
											alert("해당 옵션은 선택 차량 또는 지점에서 서비스 제공되지 않는 항목입니다.");
											//alert($(this).attr("id") +" vs " +objId);//podl
											$(this).prop("checked", false);
											checkboxReset($(this));
											optionSettingClick1($(this));
										});
									} else {

										if(objId == "1O101") {
											$("#1O101").attr("price", 0);
											$("#1O101").removeAttr("disabled");
											$("#1O101").prop("checked", true);
											checkboxSet($("#1O101"));
											$("#1O101").change(function() {optionSettingClick1($(this));});
										} else {

											$(".ckEvent[id='" + objId + "']").attr("price", objPrice * 1);
											$(".ckEvent[id='" + objId + "']").prop("checked", false);
											checkboxReset($(".ckEvent[id='" + objId + "']"));
											$(".ckEvent[id='" + objId + "']").removeAttr("disabled");
											$(".ckEvent[id='" + objId + "']").change(function() {optionSettingClick1($(this));});
										}
									}
								}

								// 제주일 경우 국문 네비 추가
								if($("input[name='returnBranch']").val() == "622"){
									$(".ckEvent[id='1O101']").attr("price", 0 * 1);
									$(".ckEvent[id='1O101']").prop("checked", true);
									checkboxSet($(".ckEvent[id='1O101']"));
									$(".ckEvent[id='1O101']").removeAttr("disabled");
									$(".ckEvent[id='1O101']").change(function() {optionSettingClick1($(this));});
								}

								 /*2016.01.04 롯데호텔시 처리X             */

				if(($("#selRentBranch2 option:selected").text() == '제주오토하우스') &&($("#selReturnBranch2 option:selected").text() == '제주오토하우스')){
										$("#instaxMiniView").show();
										$(".ckEvent[id='1O110']").prop("checked", false);
										checkboxReset($(".ckEvent[id='1O110']"));
										$("#instaxWideView").show();
										$(".ckEvent[id='1O111']").prop("checked", false);
										checkboxReset($(".ckEvent[id='1O111']"));

								}else{
									$("#instaxMiniView").hide();
									$(".ckEvent[id='1O110']").prop("checked", false);
									checkboxReset($(".ckEvent[id='1O110']"));
									$("#instaxWideView").hide();
									$(".ckEvent[id='1O111']").prop("checked", false);
									checkboxReset($(".ckEvent[id='1O111']"));

								}
							}



						var selectedLdw = "";
							var firstOptionVal = "";
							$("#selLdwCode").html("");
							$("#selLdwCode").append("<option value=\"\" charge=\"0\">보험 적용 사항을 선택하세요</option>");
							$.each(data.ldwList,function(i, s) {
								if(i==0)	firstOptionVal = s.LS_CHR_DC;
								selectedLdw = "";
								//수정모드
								if(nowProcess=="" && $("input[name='editChk']").val()=="1"){
									if($("input[name='old_ldwCode']").val()==s.LS_CHR_DC){
										selectedLdw = "selected";
									}
								} else {
									$("input[name='old_ldwCode']").val("");
								}
								$("#selLdwCode").append("<option value='"+ s.LS_CHR_DC+ "' code='"+ s.LS_CHR_DC+ "' charge='"+ s.LD_LDW_CHARGE+ "' "+selectedLdw+">"+ s.LS_CHR_REMARK+ "("+ comma(Math.round(s.LD_LDW_CHARGE))+ " 원)</option>");
							});
							//외국인인 경우
							if( $("#userCountry").val() == "2" ) {
								$("#selLdwCode").val(firstOptionVal);
								selectboxSet($("#selLdwCode"),$("option:selected", "#selLdwCode").text());

								$("input[name='ldwCode']").val($("option:selected", "#selLdwCode").attr("code"));
								$("input[name='LDWCHARGE']").val($("option:selected", "#selLdwCode").attr("charge") * 1);
								insFee = $("option:selected", "#selLdwCode").attr("charge") * 1;
								totalPrice();
							};

							$("#selLdwCode").unbind("change");
							$("#selLdwCode").change(function() {
								//20170215.bskwon
								$("#selLdwCode").val($("option:selected", this).val());
								selectboxSet($("#selLdwCode"),$("option:selected", this).text());
								//20170215
								
								$("input[name='ldwCode']").val($("option:selected", this).attr("code"));
								$("input[name='LDWCHARGE']").val($("option:selected", this).attr("charge") * 1);
								
								insFee = $("option:selected", this).attr("charge") * 1;
								totalPrice();
							});

							carOptionSettingAfter();
						}


						if (data.eventList != null && mysteryChk != "X") {
							if ($("input[name='eventCode']").val() == "") {
								//20170215. 이벤트 개수 표시
								var eventCnt = data.eventList.length;
								
								$("#selEvent").empty();
								$("#selEvent").append("<option value=\"\" code='' discount='' carTp_cd='null'>이벤트를 선택하세요. ("+eventCnt+"개)</option>");
								$.each(data.eventList,function(i, s) {
									if (s.KONWA == 'KRW') {
										$("#selEvent").append(
														"<option value='"+s.KSCHL+"' KBETR='"+ Math.round(s.KBETR)
																+ "' discount='" + Math.round(s.KBEWR)
																+ "' code='" + s.KSCHL
																+ "' carTp_cd='" + s.KSCHL_TX
																+ "' WAERK='" + s.KONWA
																+ "' KRECH='" + s.KRECH
																+ "' KRECH_TX='" + s.KSCHL_TX
																+ "' NAME1='" + s.NAME1
																+ "' BNAME='" + s.MATNR
																+ "' INCDW='" + s.INCDW
																+ "'>"
																+ s.NAME1 + "(" + comma(Math.round(s.KBETR)) + "원 할인)</option>");
									} else {
										$("#selEvent").append(
													"<option value='"+s.KSCHL+"' KBETR='" + Math.round(s.KBETR)
																+ "' discount='" + Math.round(s.KBEWR)
																+ "' code='" + s.KSCHL
																+ "' carTp_cd='" + s.KSCHL_TX
																+ "' WAERK='" + s.KONWA
																+ "'  KRECH='" + s.KRECH
																+ "'  KRECH_TX='" + s.KSCHL_TX
																+ "'  NAME1='" + s.NAME1
																+ "' BNAME='" + s.MATNR
																+ "' INCDW='" + s.INCDW
																+ "' >"
																+ s.NAME1 + "(" + Math.round(s.KBEWR) + "% 할인)</option>");
									}

								});
								selectboxSet($("#selEvent"),$("option:selected", "#selEvent").text());
							}

							var code = $("input[name='EventBname']").val();

							$.each(
								$("#selEvent option"),
								function(i, s) {

									if ($(s).attr("BNAME") == code) {

										if ($(s).attr("WAERK") == "%") {eventRate = $(s).attr("discount");
										} else {
											eventFee = Math.round($(s).attr("KBETR"));
										}
									}
								});




							$("#selEvent").unbind("change");
							$("#selEvent").change(function() {
										if (Number($("input[name='eDate']").val()) - Number($("input[name='sDate']").val()) < 1000000) {
											//alert("24시간이상 예약만 사용하실 수 있습니다.");
											alert("죄송합니다.\이벤트 정책에 따라 24시간 이상 예약만 선택이 가능합니다.");
											$("#selEvent").val("");
											selectboxSet($("#selEvent"),$("option:selected", "#selEvent").text());
											return false;
										}
										if ($("#selEvent option").size() <= 1) {
											alert("진행중인 이벤트가 없습니다.");
											$("#selEvent").val("");
											selectboxSet($("#selEvent"),$("option:selected", "#selEvent").text());
											return false;
										}
										if ($("input[name='cp_code']").val() != "") {
											alert("이벤트 할인과 할인쿠폰은 중복 사용이 불가합니다.");
											$("#selEvent").val("");
											selectboxSet($("#selEvent"),$("option:selected", "#selEvent").text());
											return false;
										}



										if ($("option:selected", this).attr("WAERK") == "%" && couponRate != 0) {
											alert("쿠폰 할인과 중복할인할 수 없습니다.");
											$("#selEvent").val("");
											selectboxSet($("#selEvent"),$("option:selected", "#selEvent").text());
											return false;
										}

										if ($("option:selected", this).attr("WAERK") == "KRW") {

											if (getRentFee() < Math.round($("option:selected", this).attr("kbetr"))) {
												alert("총 예상 금액이 이벤트 할인보다 작아 적용할 수 없습니다.");
												$("#selEvent").val("");
												selectboxSet($("#selEvent"),$("option:selected", "#selEvent").text());
												return false;
											}
										}

										// 이벤트 금액할인이면 WAERK 2016.03.08
										if ($("option:selected", this).attr("waerk") == "KRW") {

											eventRate = 0;
											eventFee = Math.round($("option:selected", this).attr("kbetr"));
											carDiscountFeeEvent = 0;

											$("input[name='EventKrate']").val("");
											$("input[name='EventKbetr']").val($("option:selected", this).attr("kbetr"));
											$("input[name='EventKschn']").val($("option:selected", this).attr("code"));
											$("input[name='EventWaerk']").val($("option:selected", this).attr("WAERK"));
											$("input[name='EventKrech']").val($("option:selected", this).attr("KRECH"));
											$("input[name='EventKschn_tx']").val($("option:selected", this).attr("carTp_cd"));
											$("input[name='EventName1']").val($("option:selected", this).attr("NAME1"));
											$("input[name='EventBname']").val($("option:selected", this).attr("BNAME"));
											$("input[name='EventIncdw']").val($("option:selected", this).attr("INCDW"));

										} else if ($("option:selected", this).attr("WAERK") == "%") {

											eventRate = Math.round($("option:selected", this).attr("discount"));
											eventFee = 0;
											carDiscountFeeEvent = 0;

											$("input[name='EventKrate']").val($("option:selected", this).attr("discount"));
											$("input[name='EventKbetr']").val("");
											$("input[name='EventKschn']").val($("option:selected", this).attr("code"));
											$("input[name='EventWaerk']").val($("option:selected", this).attr("WAERK"));
											$("input[name='EventKrech']").val($("option:selected", this).attr("KRECH"));
											$("input[name='EventKschn_tx']").val($("option:selected", this).attr("carTp_cd"));
											$("input[name='EventName1']").val($("option:selected", this).attr("NAME1"));
											$("input[name='EventBname']").val($("option:selected", this).attr("BNAME"));
											$("input[name='EventIncdw']").val($("option:selected", this).attr("INCDW"));

										} else {

											eventRate = 0;
											eventFee = 0;
											carDiscountFeeEvent = 0;

											$("input[name='EventKrate']").val("");
											$("input[name='EventKbetr']").val("");
											$("input[name='EventKschn']").val("");
											$("input[name='EventWaerk']").val("");
											$("input[name='EventKrech']").val("");
											$("input[name='EventKschn_tx']").val("");
											$("input[name='EventName1']").val("");
											$("input[name='EventBname']").val("");
											$("input[name='EventIncdw']").val("");
										}
										
										/////////20170215.bskwon
										$("#selEvent").val($("option:selected", this).val());
										selectboxSet($("#selEvent"),$("option:selected", this).text());
										/////////20170215
										

										// 할인쿠폰 초기화
										$("#selCoupon").val("");
										selectboxSet($("#selCoupon"),$("option:selected", "#selCoupon").text());

										couponRate = 0;
										couponFee = 0;
										carDiscountFeeCoupon = 0;

										// 무료 이용권 초기화
										resetGift();

										// 면책제도 초기화
										$("#selLdwCode").val("");
										selectboxSet($("#selLdwCode"),"보험 적용 사항을 선택하세요");
										insFee = 0;

										// 옵션선택 초기화
										//resetOptionChk();

										// 포인트 초기화
										resetPoint();

										totalPrice();
										// INCDW 이벤트 할인
										cdwList();

									});

						} else {
							//20170214.bskwon.적용 이벤트 없는 경우 추가
							$("#selEvent").empty();
							$("#selEvent").append("<option value=\"\" code='' discount='' carTp_cd='null'>해당할인 이벤트가 없습니다.</option>");
							resetEvent();
						}

						//쿠폰 리스트
						if (data.couponList != null && mysteryChk != "X") {
							var couponCnt = data.couponList.length;
							
							$("#selCoupon").empty();
							$("#selCoupon").append("<option value=\"\" DC_R='' DC_AMT='' COUPON_NO=''>쿠폰을 선택하세요. ("+couponCnt+"장)</option>");
							$.each(data.couponList, function(i, s) {
								if (s.WAERK == "KRW") {
									$("#selCoupon").append(
											"<option value='"+parseInt(s.DC_R)+"' DC_R='"+ parseInt(s.DC_R)
													+ "' discount='"+ parseInt(s.DC_R)
													+ "' DC_AMT='"+ Math.round(s.DC_AMT)
													+ "' COUPON_NO='"+ s.COUPON_NO
													+ "' KRECH='"+ s.KRECH
													+ "' KSCHL='"+ s.KSCHL
													+ "' KSCHN_TX='"+ s.KSCHN_TX
													+ "' WAERK='"+ s.WAERK
													+ "' BNAME='"+ s.BNAME
													+ "' NAME1='"+ s.NAME1
													+ "' MAKTX='"+ s.MAKTX
													+ "' INCDW='"+ s.INCDW
													+ "' >"
													+ s.COUPON_NM
													+ "("+ comma(Math.round(s.DC_AMT))+ "원 할인)</option>");
								} else {
									$("#selCoupon").append(
											"<option value='"+parseInt(s.DC_R)+"' DC_R='" + parseInt(s.DC_R)
													+ "' discount='"+ parseInt(s.DC_R)
													+ "' DC_AMT='"+ Math.round(s.DC_AMT)
													+ "' COUPON_NO='"+ s.COUPON_NO
													+ "' KRECH='"+ s.KRECH
													+ "' KSCHL='"+ s.KSCHL
													+ "' KSCHN_TX='" + s.KSCHN_TX
													+ "' WAERK='" + s.WAERK
													+ "' BNAME='" + s.BNAME
													+ "' NAME1='" + s.NAME1
													+ "' MAKTX='" + s.MAKTX
													+ "' INCDW='"+ s.INCDW + "' >"
													+ s.COUPON_NM
													+ "(" + comma(Math.round(s.DC_R)) + "% 할인)</option>");
								}
							});

							if ($("input[name='CouponName1']").val() != "") {
								if ($("input[name='CouponWaerk']").val() == "KRW") {
									$("#selCoupon").append(
													"<option value='"+parseInt($("input[name='CouponKbetr']").val())+"' DC_R='" + parseInt($("input[name='CouponKbetr']").val())
													+ "' discount='" + parseInt($("input[name='CouponKbetr']").val())
													+ "' DC_AMT='" + Math.round($("input[name='CouponKbetr']").val())
													+ "' COUPON_NO='"+ $("input[name='CouponName1']").val()
													+ "' KRECH='" + $("input[name='CouponKrech']").val()
													+ "' KSCHL='" + $("input[name='CouponKschn']").val()
													+ "' KSCHN_TX='" + $("input[name='CouponKschn_tx']").val()
													+ "' WAERK='" + $("input[name='CouponWaerk']").val()
													+ "' BNAME='" + $("input[name='CouponName1']").val()
													+ "' NAME1='" + $("input[name='CouponName1']").val()
													+ "'  MAKTX='" + $("input[name='CouponKschn_tx']").val()
													+ "' >"
													+ $("input[name='CouponKschn_tx']").val()
													+ "("+ Math.round($("input[name='CouponKbetr']").val())+ "원 할인)</option>");
								} else {
									$("#selCoupon").append(
													"<option value='"+parseInt($("input[name='CouponKrate']").val())+"' DC_R='" + parseInt($("input[name='CouponKrate']").val())
													+ "' discount='" + parseInt($("input[name='CouponKrate']").val())
													+ "' DC_AMT='" + Math.round($("input[name='CouponKrate']").val())
													+ "' COUPON_NO='" + $("input[name='CouponName1']").val()
													+ "' KRECH='" + $("input[name='CouponKrech']").val()
													+ "' KSCHL='" + $("input[name='CouponKschn']").val()
													+ "' KSCHN_TX='"+ $("input[name='CouponKschn_tx']").val()
													+ "' WAERK='" + $("input[name='CouponWaerk']").val()
													+ "' BNAME='" + $("input[name='CouponName1']").val()
													+ "' NAME1='" + $("input[name='CouponName1']").val()
													+ "'  MAKTX='" + $("input[name='CouponKschn_tx']").val()
													+ "' >"
													+ $("input[name='CouponKschn_tx']").val()
													+ "("+ Math.round($("input[name='CouponKrate']").val())+ "% 할인)</option>");
								}
							}
							var code = $("input[name='CouponName1']").val();



							$.each($("#selCoupon option"),function(i, s) {
									if ($(s).attr("NAME1") == code) {
										if ($(s).attr("WAERK") == "%") {
											couponRate = $(s).attr("discount");
										} else {
											couponFee = Math.round($(s).attr("DC_AMT"));
										}
									}
								});

						} else {
							if ($("input[name='CouponName1']").val() != "") {
								$("#selCoupon").empty();
								$("#selCoupon").append("<option value=\"\" DC_R='' DC_AMT='' COUPON_NO=''>쿠폰을 선택하세요</option>");
								if ($("input[name='CouponWaerk']").val() == "KRW") {
									$("#selCoupon").append(
										"<option value='"+parseInt($("input[name='CouponKbetr']").val())+"' DC_R='"+ parseInt($("input[name='CouponKbetr']").val())
										+ "' discount='"+ parseInt($("input[name='CouponKbetr']").val())
										+ "' DC_AMT='"+ Math.round($("input[name='CouponKbetr']").val())
										+ "' COUPON_NO='"+ $("input[name='CouponName1']").val()
										+ "' KRECH='"+ $("input[name='CouponKrech']").val()
										+ "' KSCHL='"+ $("input[name='CouponKschn']").val()
										+ "' KSCHN_TX='"+ $("input[name='CouponKschn_tx']").val()
										+ "' WAERK='"+ $("input[name='CouponWaerk']").val()
										+ "' BNAME='"+ $("input[name='CouponName1']").val()
										+ "' NAME1='"+ $("input[name='CouponName1']").val()
										+ "' MAKTX='"+ $("input[name='CouponKschn_tx']").val()+ "' >"
										+ $("input[name='CouponKschn_tx']").val()
										+ "("+ Math.round($("input[name='CouponKbetr']").val())+ "원 할인)</option>");
								} else {
									$("#selCoupon").append(
										"<option value='"+parseInt($("input[name='CouponKbetr']").val())+"' DC_R='" + parseInt($("input[name='CouponKrate']").val())
										+ "' discount='" + parseInt($("input[name='CouponKrate']").val())
										+ "' DC_AMT='" + Math.round($("input[name='CouponKrate']").val())
										+ "' COUPON_NO='"+ $("input[name='CouponName1']").val()
										+ "' KRECH='" + $("input[name='CouponKrech']").val()
										+ "' KSCHL='" + $("input[name='CouponKschn']").val()
										+ "' KSCHN_TX='"+ $("input[name='CouponKschn_tx']").val()
										+ "' WAERK='" + $("input[name='CouponWaerk']").val()
										+ "' BNAME='" + $("input[name='CouponName1']").val()
										+ "' NAME1='" + $("input[name='CouponName1']").val()
										+ "' MAKTX='" + $("input[name='CouponKschn_tx']").val()+ "' >"
										+ $("input[name='CouponKschn_tx']").val()
										+ "("+ Math.round($("input[name='CouponKrate']").val())+ "% 할인)</option>");
								}
								if(nowProcess=="" && $("input[name='editChk']").val()=="1"){
									$("#selCoupon").val(parseInt($("input[name='CouponKbetr']").val()));
									selectboxSet($("#selCoupon"),$("option:selected", "#selCoupon").text());
								}
							} else {
								$("#selCoupon").empty();
								
								if (Number($("input[name='eDate']").val()) - Number($("input[name='sDate']").val()) >= 1000000) {
									
									if ($("input[name='OldCouponName1']").val() != "") {
										
										$("#selCoupon").append("<option value=\"\" DC_R='' DC_AMT='' COUPON_NO=''>쿠폰을 선택하세요</option>");
										selectboxSet($("#selCoupon"),$("option:selected", "#selCoupon").text());
										
										if ($("input[name='OldCouponWaerk']").val() == "KRW") {
											$("#selCoupon").append(
												"<option value='"+parseInt($("input[name='OldCouponKbetr']").val())+"' DC_R='"+ parseInt($("input[name='OldCouponKbetr']").val())
												+ "' discount='"+ parseInt($("input[name='OldCouponKbetr']").val())
												+ "' DC_AMT='"+ Math.round($("input[name='OldCouponKbetr']").val())
												+ "' COUPON_NO='"+ $("input[name='OldCouponName1']").val()
												+ "' KRECH='"+ $("input[name='OldCouponKrech']").val()
												+ "' KSCHL='"+ $("input[name='OldCouponKschn']").val()
												+ "' KSCHN_TX='"+ $("input[name='OldCouponKschn_tx']").val()
												+ "' WAERK='"+ $("input[name='OldCouponWaerk']").val()
												+ "' BNAME='"+ $("input[name='OldCouponName1']").val()
												+ "' NAME1='"+ $("input[name='OldCouponName1']").val()
												+ "' MAKTX='"+ $("input[name='OldCouponKschn_tx']").val()+ "' >"
												+ $("input[name='OldCouponKschn_tx']").val()
												+ "("+ Math.round($("input[name='OldCouponKbetr']").val())+ "원 할인)</option>");
										} else if ($("input[name='OldCouponWaerk']").val() == "%") {
											$("#selCoupon").append(
												"<option value='"+parseInt($("input[name='OldCouponKbetr']").val())+"' DC_R='" + parseInt($("input[name='OldCouponKrate']").val())
												+ "' discount='" + parseInt($("input[name='OldCouponKrate']").val())
												+ "' DC_AMT='" + Math.round($("input[name='OldCouponKrate']").val())
												+ "' COUPON_NO='"+ $("input[name='OldCouponName1']").val()
												+ "' KRECH='" + $("input[name='OldCouponKrech']").val()
												+ "' KSCHL='" + $("input[name='OldCouponKschn']").val()
												+ "' KSCHN_TX='"+ $("input[name='OldCouponKschn_tx']").val()
												+ "' WAERK='" + $("input[name='OldCouponWaerk']").val()
												+ "' BNAME='" + $("input[name='OldCouponName1']").val()
												+ "' NAME1='" + $("input[name='OldCouponName1']").val()
												+ "' MAKTX='" + $("input[name='OldCouponKschn_tx']").val()+ "' >"
												+ $("input[name='OldCouponKschn_tx']").val()
												+ "("+ Math.round($("input[name='OldCouponKrate']").val())+ "% 할인)</option>");
										}
									} else {
										//20170214.bskwon.쿠폰 없는 경우 추가
										$("#selCoupon").append("<option value=\"\" DC_R='' DC_AMT='' COUPON_NO=''>보유하신 쿠폰이 없습니다.</option>");
										selectboxSet($("#selCoupon"),$("option:selected", "#selCoupon").text());
									}
									
								} else {
									//20170214.bskwon.쿠폰 없는 경우 추가
									$("#selCoupon").append("<option value=\"\" DC_R='' DC_AMT='' COUPON_NO=''>보유하신 쿠폰이 없습니다.</option>");
									selectboxSet($("#selCoupon"),$("option:selected", "#selCoupon").text());
								}
							}

							var code = $("input[name='CouponName1']").val();



							$.each($("#selCoupon option"),function(i, s) {
								if ($(s).attr("NAME1") == code) {
									if ($(s).attr("WAERK") == "%") {
										couponRate = $(s).attr("discount");
									} else {
										couponFee = Math.round($(s).attr("DC_AMT"));
									}

								}
							});
						}

						$("#selCoupon").unbind("change");
						$("#selCoupon").change(function() {

							if ($("option:selected", this).attr("WAERK") == "%"
									&& eventRate != 0) {
								alert("이벤트 할인과 중복할인할 수 없습니다.");
								$("#selCoupon").val("");
								selectboxSet($("#selCoupon"),$("option:selected", "#selCoupon").text());
								return false;
							}

							if ($("option:selected", this).attr("WAERK") == "KRW") {

								if (getRentFee() < Math
										.round($("option:selected", this)
												.attr(
														"DC_AMT"))) {
									alert("총 예상 금액이 쿠폰 할인보다 작아 적용할 수 없습니다.");
									$("#selCoupon").val("");
									selectboxSet($("#selCoupon"),$("option:selected", "#selCoupon").text());
									return false;
								}
							}

							if ($("option:selected", this).attr("WAERK") == "KRW") {

								couponRate = 0;
								couponFee = Math.round($("option:selected", this).attr("DC_AMT"));
								carDiscountFeeCoupon = 0;

								$("input[name='CouponWaerk']").val($("option:selected", this).attr("WAERK")); // 통화키- % / KRW
								$("input[name='CouponBname']").val($("option:selected", this).attr("BNAME")); // 쿠폰번호
								$("input[name='CouponName1']").val($("option:selected", this).attr("NAME1")); // 할인명

								$("input[name='CouponKschn']").val($("option:selected", this).attr("KSCHL")); // 할인코드
								$("input[name='CouponKschn_tx']").val($("option:selected", this).attr("MAKTX")); // 할인코드명
								$("input[name='CouponKrech']").val($("option:selected", this).attr("KRECH")); // 할인율이면 A 금액이면 B

								$("input[name='CouponKrate']").val(""); // 할인율
								$("input[name='CouponKbetr']").val($("option:selected", this).attr("DC_R")); // 할인금액

								$("input[name='CouponIncdw']").val($("option:selected", this).attr("INCDW")); // CDW

							} else if ($("option:selected", this).attr("WAERK") == "%") {

								couponFee = 0;
								couponRate = parseInt($("option:selected", this).attr("DC_R"));
								carDiscountFeeCoupon = 0;

								$("input[name='CouponWaerk']").val($("option:selected", this).attr("WAERK")); // 통화키- % / KRW
								$("input[name='CouponBname']").val($("option:selected", this).attr("BNAME")); // 쿠폰번호
								$("input[name='CouponName1']").val($("option:selected", this).attr("NAME1")); // 할인명

								$("input[name='CouponKschn']").val($("option:selected", this).attr("KSCHL")); // 할인코드
								$("input[name='CouponKschn_tx']").val($("option:selected", this).attr("MAKTX")); // 할인코드명
								$("input[name='CouponKrech']").val($("option:selected", this).attr("KRECH")); // 할인율이면 A 금액이면 B

								$("input[name='CouponKrate']").val($("option:selected", this).attr("DC_R")); // 할인율
								$("input[name='CouponKbetr']").val(""); // 할인금액

								$("input[name='CouponIncdw']").val($("option:selected", this).attr("INCDW")); // CDW

							} else {
								couponFee = 0;
								couponRate = 0;
								carDiscountFeeCoupon = 0;

								$("input[name='CouponWaerk']").val(""); // 통화키- % / KRW
								$("input[name='CouponBname']").val(""); // 쿠폰번호
								$("input[name='CouponName1']").val(""); // 할인명
								$("input[name='CouponKschn']").val(""); // 할인코드
								$("input[name='CouponKschn_tx']").val(""); // 할인코드명
								$("input[name='CouponKrech']").val(""); // 할인율이면 A 금액이면 B
								$("input[name='CouponKrate']").val(""); // 할인율
								$("input[name='CouponKbetr']").val(""); // 할인금액

								$("input[name='CouponIncdw']").val(""); // CDW
							}
							
							/////////20170215.bskwon
							$("#selCoupon").val($("option:selected", this).val());
							selectboxSet($("#selCoupon"),$("option:selected", this).text());
							/////////20170215

							// 무료 이용권 초기화
							resetGift();

							// 면책제도 초기화
							$("#selLdwCode").val("");
							selectboxSet($("#selLdwCode"),"보험 적용 사항을 선택하세요");
							insFee = 0;

							// 옵션선택 초기화
							//resetOptionChk();

							// 포인트 초기화
							resetPoint();

							totalPrice();
							// INCDW 이벤트 할인
							cdwList();
						});

					}
				}

			});
	return chk;
}

//이벤트, 쿠폰 변경시 CDW 할인율 적용 (11.19)
function cdwList() {
	var incdw = $("input[name='incdw']").val();

	if ($("input[name='CouponWaerk']").val() == "%" || $("input[name='EventWaerk']").val() == "%") {
		if ($("input[name='EventIncdw']").val() == "" || $("input[name='CouponIncdw']").val() == "") {
			incdw = "";
		} else {
			incdw = $("input[name='incdw']").val();
		}
	}

	$.ajaxSetup({
		cache : false
	});

	$.ajax({
		type: "POST",
		dataType: "json",
		async : asyncCheck,
		url : "/fr/kor/reservation/cdwList.do",
		data : {
			rentBranch : $("input[name='rentBranch']").val(),
			returnBranch : $("input[name='returnBranch']").val(),
			sDate : getResDate("sDate_"),
			eDate : getResDate("eDate_"),
			duday : $("input[name='DUDAY']").val(),
			dutime : $("input[name='DUTIME']").val(),
			carCode : $("input[name='carCode']").val(),
			konda_cdw : $("input[name='konda_cdw']").val(),
			incdw : incdw,
			mysteryChk: mysteryChk,
			mysteryCode : $("#rentForm [name='mysteryCode']").val()
		},
		success : function(data) {

			if (data.ldwList) {
				resetLdw();

				$("#selLdwCode").empty();
				$("#selLdwCode").append("<option value=\"\" charge=\"0\">보험 적용 사항을 선택하세요</option>");

				var firstOptionVal = "";
				var selectedLdw = "";
				$.each(data.ldwList,function(i, s) {
					if(i==0)	firstOptionVal = s.LS_CHR_DC;
					selectedLdw = "";
					//수정모드
					if(nowProcess=="" && $("input[name='editChk']").val()=="1"){
						if($("input[name='old_ldwCode']").val()==s.LS_CHR_DC){
							selectedLdw = "selected";
						}
					} else {
						$("input[name='old_ldwCode']").val("");
					}
					$("#selLdwCode").append("<option value='"+ s.LS_CHR_DC+ "' code='"+ s.LS_CHR_DC+ "' charge='"+ s.LD_LDW_CHARGE+ "' "+selectedLdw+">"+ s.LS_CHR_REMARK+ "("+ comma(Math.round(s.LD_LDW_CHARGE))+ " 원)</option>");
				});
				selectboxSet($("#selLdwCode"),$("option:selected", "#selLdwCode").text());

				//외국인인 경우
				if( $("#userCountry").val() == "2" ) {
					$("#selLdwCode").val(firstOptionVal);
					selectboxSet($("#selLdwCode"),$("option:selected", "#selLdwCode").text());

					$("input[name='ldwCode']").val($("option:selected", "#selLdwCode").attr("code"));
					$("input[name='LDWCHARGE']").val($("option:selected", "#selLdwCode").attr("charge") * 1);
					insFee = $("option:selected", "#selLdwCode").attr("charge") * 1;
					totalPrice();
				};

				$("#selLdwCode").unbind("change");
				$("#selLdwCode").change(function() {
					//20170215.bskwon
					$("#selLdwCode").val($("option:selected", this).val());
					selectboxSet($("#selLdwCode"),$("option:selected", this).text());
					//20170215
					
					$("input[name='ldwCode']").val($("option:selected", this).attr("code"));
					$("input[name='LDWCHARGE']").val($("option:selected", this).attr("charge") * 1);
					insFee = $("option:selected", this).attr("charge") * 1;
					totalPrice();
				});

				carOptionSettingAfter();
			}
		}
	});

}


// 포인트 조회
function pointEvent() {
	if ($("input[name='memberGrade']").val() == "비회원")
		return;

	$("input[name='pointUseYn']").val("N");
	$("#pointCheck").unbind("change");
	$("#pointCheck").change(
					function() {
						if ($(this).prop("checked")) {
							$.ajax({
								type: "POST",
								dataType: "json",
								url : "/fr/kor/reservation/pointCheck.do",
								async : asyncCheck,
								data : {},
								success : function(data) {

									if (Number(data.sumpop) < 50000) {
										alert("누적 5만포인트 이상인 경우에만 포인트 사용이 가능합니다.");
										$("#pointCheck").prop('checked',false);
										checkboxReset($("#pointCheck"));
									} else if (Number(data.sumpop) >= 50000 && Number(data.mPoint) >= 1) {
										$("#pointVal").html(comma(Math.round(data.mPoint)));
										$("input[name='totalPoint']").val(Math.round(data.mPoint));

										$("#pointText").css("display", "");
										$("input[name='pointUseFee']").removeAttr("disabled");
										$("input[name='pointUseYn']").val("Y");
									}
								}
							});
						} else {
							$("input[name='pointUseYn']").val("N");
							pointFee = 0;
							$("#pointText").css("display", "none");
							$("#pointVal").html("0");
							$("input[name='totalPoint']").val("0");
							$("input[name='pointUseFee']").val("");
							$("input[name='pointUseFee']").attr("disabled","disabled");
							totalPrice();
						}
					});
}




function calcFee() {
		var ldwFee = 0;
		var ldwValue = $("#selLdwCode option:selected").val();
		if ( ldwValue != null && ldwValue != "" ) {
			var arrLdw = new Array();
			arrLdw = ldwValue.split("|");
			if ( arrLdw.length >= 2 ) {
				ldwFee = Number(arrLdw[1]);
				$("#result_ldw").html( comma(ldwFee));
			}
			else {
				$("#result_ldw").html( "0");
			}
		}
		else {
			$("#result_ldw").html( "0");
		}

		var naviFee = 0;
		var naviValue = $("#1O101").val();
		if ( $("#1O101").attr("checked") && !isNaN(naviValue) ) {
			naviFee = Number(naviValue);
			$("#result_opt1").html( comma(naviFee));
		}
		else {
			$("#result_opt1").html( "0");
		}

		var naviEngFee = 0;
		var naviEngValue = $("#1O107").val();
		if ( $("#1O107").attr("checked") && !isNaN(naviEngValue) ) {
			naviEngFee = Number(naviEngValue);
			$("#result_opt2").html( comma(naviEngFee));
		}
		else {
			$("#result_opt2").html( "0");
		}

		var babyseatFee = 0;
		var babyseatValue = $("#1O102").val();
		if ( $("#1O102").attr("checked") && !isNaN(babyseatValue) ) {
			babyseatFee = Number(babyseatValue);
			$("#result_opt3").html( comma(babyseatFee));
		}
		else {
			$("#result_opt3").html( "0");
		}

		var rentFee = Number($("#rentFee").val());
		var onewayFee = Number($("#onewayFee").val());
		var totalFee = rentFee + ldwFee + naviFee + naviEngFee + babyseatFee + onewayFee + jejuairportFee + dsFee_711;

		$("#rentAmount").val( Number(totalFee) );
		$("#result_totalFee").html( comma( Number(totalFee) ) );// 총 대여요금

		$("input[name='KBETR3']").val(Math.round($("input[name='dutimea2']").val()/$("input[name='dutimea']").val()*rentFee)); //주중요금
		$("input[name='KBETR4']").val(Math.round($("input[name='dutimea3']").val()/$("input[name='dutimea']").val()*rentFee)); //주말요금

}






// 전화번호 셋팅
function formSetting() {
	var phoneNumber = ($("input[name='phone']").val() == null ? "" : $("input[name='phone']").val()).replace(/-/g, "");
	if (phoneNumber != "") {
		if (phoneNumber.length == 11) {
			$("input[name='phone1']").val(phoneNumber.substring(0, 3));
			$("input[name='phone2']").val(phoneNumber.substring(3, 7));
			$("input[name='phone3']").val(phoneNumber.substring(7, 11));
		} else if (phoneNumber.length == 10) {
			if (phoneNumber.substring(0, 2) == "01") {
				$("input[name='phone1']").val(phoneNumber.substring(0, 3));
				$("input[name='phone2']").val(phoneNumber.substring(3, 6));
				$("input[name='phone3']").val(phoneNumber.substring(6, 10));
			} else {
				$("input[name='phone1']").val(phoneNumber.substring(0, 2));
				$("input[name='phone2']").val(phoneNumber.substring(2, 6));
				$("input[name='phone3']").val(phoneNumber.substring(6, 10));
			}
		} else if (phoneNumber.length == 9) {
			$("input[name='phone1']").val(phoneNumber.substring(0, 2));
			$("input[name='phone2']").val(phoneNumber.substring(2, 5));
			$("input[name='phone3']").val(phoneNumber.substring(5, 9));
		}
	}
}

//날짜 조합
function dateSettingView(){
	if(dateValid()){
		$("#rentDateView").html($("input[name='rent_date']").val() + " " + $("#rent_hour").val() + ":" + $("#rent_minute").val());
		$("#returnDateView").html($("input[name='return_date']").val() + " " + $("#return_hour").val() + ":" + $("#return_minute").val());

		var rentDate = getResDate("rent_date");
		var returnDate = getResDate("return_date");
		//$("input[name='rentDate']").val(rentDate);
		//$("input[name='returnDate']").val(returnDate);
	}
}
/*function dateSettingView(){
	if(dateValid()){
		$("#rentDateView").html($("input[name='sDate_']").val() + " " + $("#sHour").val() + ":" + $("#sMin").val());
		$("#returnDateView").html($("input[name='eDate_']").val() + " " + $("#eHour").val() + ":" + $("#eMin").val());

		var sDate = getResDate("sDate_");
		var eDate = getResDate("eDate_");
		$("input[name='sDate']").val(sDate);
		$("input[name='eDate']").val(eDate);
	}
}*/
//날짜 리셋
function dateReset(){
	$("#rentDateView").html();
	$("input[name='sDate']").val("");
	$("#returnDateView").html();
	$("input[name='eDate']").val("");
}
//날짜 유효
function dateValid(){
	if($("input[name='rent_date']").val()=="" || $("#rent_hour").val()=="" || $("#rent_minute").val()=="" || $("input[name='return_date']").val()=="" || $("#return_hour").val()=="" || $("#return_minute").val()=="")
		return false;
	else
		return true;
}

/*function dateValid(){
	if($("input[name='sDate_']").val()=="" || $("#sHour").val()=="" || $("#sMin").val()=="" || $("input[name='eDate_']").val()=="" || $("#eHour").val()=="" || $("#eMin").val()=="")
		return false;
	else
		return true;
}
*/
//지점 셋팅
function setAreaName(){
	if($("input[name='rentPlace']").val()!="")
		$("#rentAreaName").html( $("input[name='rentPlace']").val() + "<a href=\"javascript:viewBranchInfo('"+$("#rentForm input[name='rentBranch']").val()+"');\"><img src=\"/img/short/ico_place.gif\" alt=\"\" /></a>" );	// 대여지점
	else
		$("#rentAreaName").html("");	// 대여지점

	if($("input[name='returnPlace']").val()!="")
		$("#returnAreaName").html( $("input[name='returnPlace']").val() + "<a href=\"javascript:viewBranchInfo('"+$("#rentForm input[name='returnBranch']").val()+"');\"><img src=\"/img/short/ico_place.gif\" alt=\"\" /></a>" );	// 반납지점
	else
		$("#returnAreaName").html("");	// 반납지점
}



//빠른(Express) 리셋
function expressReset(){
	$("#exCheck").prop("checked",false);
	checkboxReset($("#exCheck"));
	$(".reserv_service").css("display","block");
	$(".ex_service").css("display","none");
}

//차량 리셋
function carReset(){
	$("input[name='carCode']").val("");
	$("input[name='carGrpCode']").val("");
	$("input[name='carName']").val("");
	$("input[name='realBranch']").val("");
	$(".liCarModel").each(function(i, s) {
		if($(s).hasClass("red_txt")){
			$(s).removeClass("red_txt");
		}
	});

	$(".carName").html("");
	$(".carImg").html("<img src=\"/upfiles/carImg/default.jpg\" width=\"121\" height=\"95\" />");

	$("#showroom_person_view,#showroom_person,#showroom_person_desc,#showroom_fuel_desc").html("-");
	$("#showroom_fuel").html("<img src='/img/short/icon_showr_02.png' alt='' /><span></span>");
	$("#showroom_bigbag").html("<strong>-</strong>");
	$("#showroom_bigbag_desc").html("");

	$("#showroom_smallbag_view").html("-");
	$("#showroom_smallbag").html("<strong>-</strong>");
	$("#showroom_smallbag_desc").html("");

	if($("#upChk").val()=="X")
		$("#upCarMsgArea").css("display","block");
	else
		$("#upCarMsgArea").css("display","none");

	$("#upCarMsg").html("대여하실 지점과 차량을 선택해주세요.");
	$("#upCarArea").css("display","none");

	$("#rentForm input[name='upCarCode']").val("");
	$("#rentForm input[name='upCarName']").val("");
	$("#rentForm input[name='upCarSize']").val("");
	$("#rentForm input[name='upCarRealBranch']").val("");
}
//브랜드,유형 유효
function carValid(){
	if($("option:selected", "#brandCode").val()=="" || $("option:selected", "#carSize").val()=="")
		return false;
	else
		return true;
}

//대여 지점 리셋
function rentBranchReset(){
	$("input[name='rentPlace']").val("");
	$("input[name='rentBranch']").val("");
	$("#selRentBranch").val("");
	selectboxSet($("#selRentBranch"),"");
	resetAreaZLayerA();
}
//대여 지점 유효
function rentBranchValid(){
	if($("input[name='rentBranch']").val()=="")
		return false;
	else{
		if ($("input[name='rentArea']").val() == "6") {
			if($("input[name='splace']").val()!=""){
				return true;
			} else
				return false;
		} else
			return true;
	}
}
//대여 지역 유효
function rentAreaValid(){
	if($("input[name='rentArea']").val()=="")
		return false;
	else
		return true;
}

//반납 지점 리셋
function returnBranchReset(){
	$("input[name='returnPlace']").val("");
	$("input[name='returnBranch']").val("");
	$("#selReturnBranch").val("");
	selectboxSet($("#selReturnBranch"),"");
	resetAreaZLayerB();
}
//반납 지점 유효
function returnBranchValid(){
	if($("input[name='returnBranch']").val()=="")
		return false;
	else {
		if ($("input[name='rentArea']").val() == "6") {
			if($("input[name='eplace']").val()!=""){
				return true;
			} else
				return false;
		} else
			return true;
	}
}


//쿠폰 초기화
function resetCp() {
	if(nowProcess!=""){
		$("#selCoupon").val("");
		selectboxSet($("#selCoupon"),$("option:selected", "#selCoupon").text());
		$("input[name='cp_code']").val("");
		$("input[name='cp_dcrt']").val("");
		$("input[name='cp_amt']").val("");

		$("input[name='CouponWaerk']").val(""); // 통화키- % / KRW
		$("input[name='CouponBname']").val(""); // 쿠폰번호
		$("input[name='CouponName1']").val(""); // 할인명

		$("input[name='CouponKschn']").val(""); // 할인코드
		$("input[name='CouponKschn_tx']").val(""); // 할인코드명
		$("input[name='CouponKrech']").val(""); // 할인율이면 A 금액이면 B

		$("input[name='CouponKrate']").val(""); // 할인율
		$("input[name='CouponKbetr']").val(""); // 할인금액

		$("input[name='CouponIncdw']").val(""); //

	}
}

function resetEvent(){
	if(nowProcess!=""){
		$("#selEvent").val("");
		selectboxSet($("#selEvent"),$("option:selected", "#selEvent").text());

		eventRate = 0;
		eventFee = 0;
		carDiscountFeeEvent = 0;

		$("input[name='EventKrate']").val("");
		$("input[name='EventKbetr']").val("");
		$("input[name='EventKschn']").val("");
		$("input[name='EventWaerk']").val("");
		$("input[name='EventKrech']").val("");
		$("input[name='EventKschn_tx']").val("");
		$("input[name='EventName1']").val("");
		$("input[name='EventBname']").val("");
		$("input[name='EventIncdw']").val("");
	}
}

//상품권 초기화
function resetGift() {

	if (nowProcess != "") {
		$("#gift_comment").css("display", "none");
		$("input[name='giftCode']").val("");
		$("input[name='wrkcp_ocmp_dc']").val("");
		$("input[name='gifcer_nm']").val("");
		$("input[name='car_siz_cd']").val("");
		$("input[name='gifcer_rn']").val("");
		$("input[name='gifcer_div_cd']").val("");
		$("input[name='gifcer_amt']").val("");

		$("#giftCardContents").html("");
		$("input[name='giftCardDiscountFee']").val("");

		$("#giftCardFee").val("");

		tempDiscountFee = 0;
		giftCardDiscountFee = 0;
		giftCardCount = 0;
		realGiftCardCount = 0;
		maxCount = 0;
		tempLastDiscountFee = 0;
		tempDayDiscountFee = 0;

		giftFee = 0;

		resetLdw(); // LDW 초기화
		totalPrice();
	}

}

//포인트 초기화
function resetPoint() {
	if(nowProcess!=""){
		$("#pointCheck").prop("checked", false);
		checkboxReset($("#pointCheck"));
		$("input[name='pointUseYn']").val("N");
		pointFee = 0;
		$("#pointText").css("display", "none");
		$("#pointVal").html("0");
		$("input[name='pointUseFee']").val("");
		$("input[name='pointUseFee']").attr("disabled", "disabled");
		totalPrice();
	}
}

//CDW 초기화
function resetLdw() {
	if(nowProcess!=""){
		$("#selLdwCode").empty();
		$("#selLdwCode").append("<option value=\"\" charge=\"0\">보험 적용 사항을 선택하세요</option>");
		selectboxSet($("#selLdwCode"),"보험 적용 사항을 선택하세요");
		$("input[name='ldwCode']").val("");
		$("input[name='LDWCHARGE']").val("");
	}
}


//옵션 선택 초기화
function resetOptionChk() {
	if(nowProcess!=""){
		if ($("#1O102").prop("clicked")) {
			if (optionBabyseatFee != 0) {
				optionBabyseatFee = 0;
			}
		}

		//20160920. bskwon. 한글내비 기본제공
//		$("#1O101").prop("checked", false);
//		checkboxReset($("#1O101"));

		$("#1O107").prop("checked", false);
		checkboxReset($("#1O107"));

		$("#1O102").prop("checked", false);
		checkboxReset($("#1O102"));

		$("#1O110").prop("checked", false);
		checkboxReset($("#1O110"));

		$("#1O111").prop("checked", false);
		checkboxReset($("#1O111"));

		$("#eggView").css("display", "none");

		$("#instaxMiniView").hide();
		$("#instaxWideView").css("display", "none");

		//20161104. carOprion 세팅시엔 비활성 풀고.. podl
		if(nowProcess == "P") {
			$(".ckEvent").removeAttr("disabled");
			$(".ckEvent").attr("ctavl", 0);
		} else {
			$(".ckEvent").prop("disabled", "disabled");

		}

		totalPrice();
	}
}

//옵션 초기화
function resetOption() {
	if(nowProcess!=""){
		$(".ckEvent").unbind("change");

		resetLdw();
		$("#selLdwCode").val("");

		$("#1O101").attr("checked", false);
		checkboxReset($("#1O101"));
		$("#1O107").attr("checked", false);
		checkboxReset($("#1O107"));
		$("#1O102").attr("checked", false);
		checkboxReset($("#1O102"));

		$("#1O110").attr("checked", false);
		checkboxReset($("#1O110"));

		$("#1O111").attr("checked", false);
		checkboxReset($("#1O111"));

		$("#eggView").css("display", "none");
	//	$("#instaxMiniView").css("display", "none");
	//	$("#instaxWideView").css("display", "none");


		if (editFlag == "N") {
			// 수정 시 쿠폰 초기화
			$("input[name='CouponName1']").val("");
			$("input[name='EventBname']").val("");

			$("input[name='EventKrate']").val("");
			$("input[name='EventKbetr']").val("");
			$("input[name='EventKschn']").val("");
			$("input[name='EventWaerk']").val("");
			$("input[name='EventKrech']").val("");
			$("input[name='EventKschn_tx']").val("");
			$("input[name='EventName1']").val("");
			$("input[name='EventBname']").val("");
			$("input[name='EventIncdw']").val("");

			$("input[name='CouponWaerk']").val(""); // 통화키- % / KRW
			$("input[name='CouponBname']").val(""); // 쿠폰번호
			$("input[name='CouponName1']").val(""); // 할인명

			$("input[name='CouponKschn']").val(""); // 할인코드
			$("input[name='CouponKschn_tx']").val(""); // 할인코드명
			$("input[name='CouponKrech']").val(""); // 할인율이면 A 금액이면 B

			$("input[name='CouponKrate']").val(""); // 할인율
			$("input[name='CouponKbetr']").val(""); // 할인금액

			$("input[name='CouponIncdw']").val(""); //

			// 옵션선택 초기화
			$("input[name='optionStr']").val("");
			$("input[name='optionPrice']").val("");

			//옵션 - 그린카 초기화
			$("input[name='LD_GREEN_AMT']").val("");
		}

		resetCp();
		resetEvent();

		$("#selEvent").val("");

		$("input[name='eventDiscount']").val("");
		$("input[name='eventCode']").val("");


		selectboxSet($("#selCoupon"),$("option:selected", "#selCoupon").text());
		selectboxSet($("#selEvent"),$("option:selected", "#selEvent").text());

		eventRate = 0;
		eventFee = 0;
		carDiscountFeeEvent = 0;

		couponRate = 0;
		couponFee = 0;
		carDiscountFeeCoupon = 0;


		pointFee = 0;
		optionFee = 0;
		optionBabyseatFee = 0;
		insFee = 0;
		giftFee = 0;
		$("input[name='pointUseFee']").val("");

		//pointEvent();
	}
}

//가격 리셋
function priceReset(){
	$("#carRentalFeeView, #totalCarRentalFeeView, #totalDiscountFeeView, #totalOptionFeeView").html("0");
	// $("#totalRentalFeeView").html("<img src=\"/img/short/ico_won.png\" alt=\"\" />0");

	$(".m_sale,.e_sale,.c_sale").css("display","none");

	$("#oneway_comment,#oneway_p").hide();
	$("#oneway_w").html("");

	$("#hds_p").hide();
	$("#hds_w").html("");

	$("#jeju_p").hide();
}

//금액 리셋
function resetVal(){
	carRentFee = 0;
	pointFee = 0;
	carDiscountFee = 0;
	carDiscount = 0;
	optionFee = 0;
	optionBabyseatFee = 0;
	insFee = 0;
	onewayFee = 0;
	jejuairportFee = 0;
	giftFee = 0;
	$("input[name='pointUseFee']").val("");
	if($("input[name='eplace']").val()=="03"){
		jejuairportFee = 10000;
	} else {
		jejuairportFee = 0;
	}
	priceReset();
}

//옵션 클릭 이벤트
function optionSettingClick1(obj) {

	var fee = 0;
	if ($(obj).attr("id") == "1O101") { // 내비게이션
		//20161103. 국문내비 기본 제공
		if ($(".ckEvent[id='1O101']").prop("checked")) {
			fee = fee + $(".ckEvent[id='1O101']").attr("price") * 1;
		} else {
			alert("국문 내비게이션은 무료로 기본제공됩니다.\n더 편리하고 안전한 운전되시기 바랍니다.");
			fee = fee - $(".ckEvent[id='1O101']").attr("price") * 1;
		}
		$(obj).prop("checked", true);
		checkboxSet($(obj));

		if ($(".ckEvent[id='1O107']").prop("checked")) {
			$(".ckEvent[id='1O107']").prop("checked", false);
			checkboxReset($(".ckEvent[id='1O107']"));
		}

	} else if ($(obj).attr("id") == "1O107") { // 내비게이션 영문
		//20161103. 국문내비 기본 제공
//		if ($(".ckEvent[id='1O101']").prop("checked")) {
//			$(".ckEvent[id='1O101']").prop("checked", false);
//			checkboxReset($(".ckEvent[id='1O101']"));
//		}

		if ($(".ckEvent[id='1O107']").prop("checked")) {
			fee = fee + $(".ckEvent[id='1O107']").attr("price") * 1;
		} else if ($(".ckEvent[id='1O107']").prop("checked") == false) {
			fee = fee - $(".ckEvent[id='1O107']").attr("price") * 1;
		}
	} else if ($(obj).attr("id") == "1O102") { // 베이비시트일 경우
		if ($(".ckEvent[id='1O102']").prop("checked")) {
			optionBabyseatFee = $(".ckEvent[id='1O102']").attr("price") * 1;
		} else if ($(".ckEvent[id='1O102']").prop("checked") == false) {
			optionBabyseatFee = 0;
		}
	} else if ($(obj).attr("id") == "1O110") { // 인스탁스 미니
		alert("인스탁스 필름은 현장에서 별도로 구매하여 사용해야 합니다.");
		if($("input[name='sDate']").val() < 20151102080000){
			alert("인스탁스 미니 옵션은 2015년 11월 02일 부터 사용가능합니다.");
			$(obj).prop("checked", false);
			checkboxReset($(obj));
		} else {
			if ($(".ckEvent[id='1O111']").prop("checked")) {
				$(".ckEvent[id='1O111']").prop("checked", false);
				checkboxReset($(".ckEvent[id='1O111']"));
			}

			if ($(".ckEvent[id='1O110']").prop("checked")) {
				fee = fee + $(".ckEvent[id='1O110']").attr("price") * 1;
			} else if ($(".ckEvent[id='1O110']").prop("checked") == false) {
				fee = fee - $(".ckEvent[id='1O110']").attr("price") * 1;
			}
		}
	} else if ($(obj).attr("id") == "1O111") { // 인스탁스 와이드
		alert("인스탁스 필름은 현장에서 별도로 구매하여 사용해야 합니다.");
		if($("input[name='sDate']").val() < 20151102080000){
			alert("인스탁스 와이드 옵션은 2015년 11월 02일 부터 사용가능합니다.");
			$(obj).prop("checked", false);
			checkboxReset($(obj));
		} else {
			if ($(".ckEvent[id='1O110']").prop("checked")) {
				$(".ckEvent[id='1O110']").prop("checked", false);
				checkboxReset($(".ckEvent[id='1O110']"));
			}

			if ($(".ckEvent[id='1O111']").prop("checked")) {
				fee = fee + $(".ckEvent[id='1O111']").attr("price") * 1;
			} else if ($(".ckEvent[id='1O111']").prop("checked") == false) {
				fee = fee - $(".ckEvent[id='1O111']").attr("price") * 1;
			}
		}
	}
	//TODO
	//2016.07.20.카시트,유모차 추가 bskwon
	else if($(obj).attr("name").indexOf("carseat") == 0 ) { //카시트 1종만 선택
		var objName = $(obj).attr("name");

		$(".ckEvent[name^='carseat']").each(function() {

			if($(this).attr("name") != objName && $(this).prop("checked")) {
				$(this).prop("checked", false);
				checkboxReset($(this));
				optionCarseatFee = $(obj).attr("price") * 1;

			} else if($(this).attr("name") == objName){
				if($(this).prop("checked")){
					optionCarseatFee = $(this).attr("price") * 1;
				} else {
					optionCarseatFee = 0;
				}
			}
		});

	}
	else if($(obj).attr("name").indexOf("carriage") == 0 ) { //유모차 1종만 선택
		var objName = $(obj).attr("name");

		$(".ckEvent[name^='carriage']").each(function() {

			if($(this).attr("name") != objName && $(this).prop("checked")) {
				$(this).prop("checked", false);
				checkboxReset($(this));
				optionCarriageFee = $(obj).attr("price") * 1;

			} else if($(this).attr("name") == objName){
				if($(this).prop("checked")){
					optionCarriageFee = $(this).attr("price") * 1;
				} else {
					optionCarriageFee = 0;
				}
			}
		});

	}

	optionFee = optionFee + fee;
	totalPrice();
}

//총 금액 계산
function getRentFee() {

	var displayPrice = "";
	var price = "";
	var discPrice = "";

	if (couponRate != 0) {
		carDiscountFeeCoupon = carRentFee
				- Math.round(carRentFee * (couponRate * 0.01));
	}

	if (eventRate != 0) {
		carDiscountFeeEvent = carRentFee
				- Math.round(carRentFee * (eventRate * 0.01));
	}

	if ($("input[name='memberGrade']").val() == "비회원") {
		$("input[name='price_tmp']").val(
				(carDiscountFee - giftFee < 0 ? 0 : carDiscountFee - giftFee)
						+ optionFee + insFee + onewayFee + dsFee_711 +  jejuairportFee + hdsFee);

		$("input[name='gifcer_amt']").val(giftFee);
		displayPrice = (carDiscountFee + onewayFee + dsFee_711 + jejuairportFee - giftFee + hdsFee) + (optionFee);
		price 		 = (carDiscountFee + onewayFee + dsFee_711 + jejuairportFee - giftFee + hdsFee) + (optionFee);

		// 대여금액 + (베이비 시트 + 면책요금)
		displayPrice = displayPrice + ((optionBabyseatFee + optionCarseatFee + optionCarriageFee) + (insFee));
		price 		 = price + ((optionBabyseatFee + optionCarseatFee + optionCarriageFee) + (insFee));

		$("#price").val(displayPrice);
		$("#totalDiscountFeeView").html(comma(Number(carRentFee) - Number(carDiscountFee)));
		return price;
	} else {
		$("input[name='price_tmp']").val(
				(carDiscountFee - giftFee < 0 ? 0 : carDiscountFee - giftFee)
						+ optionFee + insFee + onewayFee + dsFee_711 + jejuairportFee + hdsFee - pointFee);

		if (carDiscountFeeCoupon > 0) {// 쿠폰률을 적용시킨가격
			displayPrice = (carDiscountFeeCoupon + onewayFee + dsFee_711 + jejuairportFee - pointFee
					- giftFee + hdsFee - couponFee - eventFee - tempDiscountFee)
					+ (optionFee);
			price = (carDiscountFeeCoupon + onewayFee + jejuairportFee + dsFee_711 - pointFee - giftFee
					+ hdsFee - couponFee - eventFee - tempDiscountFee)
					+ (optionFee);

			discPrice = carDiscountFeeCoupon;

			$(".c_sale").css("display","block");
			$("#c_sale_price").html(comma(Number(carDiscountFeeCoupon)));

			$(".m_sale,.e_sale").css("display","none");

		} else if (carDiscountFeeEvent > 0) {// 이벤트률을 적용시킨가격
			displayPrice = (carDiscountFeeEvent + onewayFee + dsFee_711 + jejuairportFee - pointFee
					- giftFee + hdsFee - couponFee - eventFee - tempDiscountFee)
					+ (optionFee);
			price = (carDiscountFeeEvent + onewayFee + dsFee_711+ + jejuairportFee - pointFee - giftFee
					+ hdsFee - couponFee - eventFee - tempDiscountFee)
					+ (optionFee);

			discPrice = Number(carRentFee) - Number(carDiscountFeeEvent);

			$(".e_sale").css("display","block");
			$("#e_sale_price").html(comma(Number(discPrice)));

			$(".m_sale,.c_sale").css("display","none");

		} else {// 회원율 적용 및 비회원 가격
			displayPrice = (carDiscountFee + onewayFee + dsFee_711 + jejuairportFee - pointFee - giftFee
					+ hdsFee - couponFee - eventFee - tempDiscountFee)
					+ (optionFee);
			price = (carDiscountFee + onewayFee + dsFee_711 + jejuairportFee - pointFee - giftFee + hdsFee
					- couponFee - eventFee - tempDiscountFee)
					+ (optionFee);

			discPrice = (Number(carRentFee) - Number(carDiscountFee));

			if((Number(carRentFee) - Number(carDiscountFee))>0){
				$(".m_sale,.m_sale_dis").css("display","block");
				$("#m_sale_price").html(comma(Number(carRentFee) - Number(carDiscountFee)));

				if($("input[name='rentBranch']").val() != "622"){
					if(eventRate > 0){
						$("#m_sale_percent").html("("+eventRate+"%)");
					} else if(couponRate > 0){
						$("#m_sale_percent").html("("+couponRate+"%)");
					}else{
						$("#m_sale_percent").html("("+getDiscount()+"%)");
					}
				} else {
					$("#m_sale_percent").html("");
				}

				$(".e_sale,.c_sale").css("display","none");
			} else {
				$(".m_sale,.m_sale_dis").css("display","none");
				$("#m_sale_price").html("0");
				$("#m_sale_percent").html("");

				$(".e_sale,.c_sale").css("display","none");
			}
		}

		// 총 금액이 '-' 일 경우 0원으로 셋팅
		if (price < 0) {
			price = 0;
			displayPrice = 0;
			discPrice = 0;
		}

		// 대여금액 + (베이비 시트 + 면책요금)
		price = price + ((optionBabyseatFee + optionCarseatFee + optionCarriageFee) + (insFee));
		displayPrice = displayPrice + ((optionBabyseatFee + optionCarseatFee + optionCarriageFee) + (insFee));

		$("#price").val(displayPrice);
		$("#totalDiscountFeeView").html(comma(Number(discPrice) + Number(pointFee)));
		return price;
	}
}

function getDiscount() {
	return carDiscount;
}
function getDiscountFee() {
	return carDiscountFee;
}





//*************************************************************
// 인증/예약/수정
//*************************************************************


//비회원 모바일 인증
var chkPhoneCode = "";
function sendCode() {
	if($("input[name='phone1']").val()=="" || $("input[name='phone2']").val()=="" || $("input[name='phone3']").val()=="" ){
		alert("휴대전화 번호를 입력해주세요.");
	} else {
		$.ajax({
			url : "/fr/kor/reservation/sms_send.do",
			type : "POST",
			data : {

				cellnum : $("input[name='phone1']").val()
						+ $("input[name='phone2']").val()
						+ $("input[name='phone3']").val()

			},
			success : function(data) {
				if (data.success == "Y") {
					chkPhoneCode = data.code;
					$("#checkCode").val("Y");
					$("#sendCodeArea").css("display","");
				} else {
					chkPhoneCode = "";
					$("#checkCode").val("N");
				}
				alert(data.message);
			},
			dataType : "json"
		});
	}
}

function agreeCheck(){
	var result = "Y";
	if ($("input[name='memberGrade']").val() == "비회원") {
		if(!$("#agreeNM1").prop("checked")){
			alert("비회원 예약완료 안내 동의 후 예약할 수 있습니다.");
			$("#agreeNM1").focus();
			result = "N";
		} else if(!$("#agreeNM2").prop("checked")){
			alert("차량 대여를 위한 개인정보 수집/이용동의 후 예약할 수 있습니다.");
			$("#agreeNM2").focus();
			result = "N";
		} else if(!$("#agreeNM3").prop("checked")){
			alert("개인정보 제 3자 제공에 대한 동의 후 예약할 수 있습니다.");
			$("#agreeNM3").focus();
			result = "N";
		} else if(!$("#agreeNM4").prop("checked")){
			alert("개인정보 취급위탁에 대한 동의 후 예약할 수 있습니다.");
			$("#agreeNM4").focus();
			result = "N";
		}
	} else {
		if($("#exCheck").prop('checked')){
			if(!$("#agreeEx").prop("checked")){
				alert("예약완료 안내 동의 후 예약할 수 있습니다.");
				$("#agreeEx").focus();
				result = "N";
			}
		} else if($("#hdsCheck").prop('checked')){
			if(!$("#agreeM1").prop("checked")){
				alert("예약완료 안내 동의 후 예약할 수 있습니다.");
				$("#agreeM1").focus();
				result = "N";
			} else if(!$("#agreeDs").prop("checked")){
				alert("DS(딜리버리 서비스)이용 동의 후 예약할 수 있습니다.");
				$("#agreeDs").focus();
				result = "N";
			}
		} else {
			if(!$("#agreeM1").prop("checked")){
				alert("예약완료 안내 동의 후 예약할 수 있습니다.");
				$("#agreeM1").focus();
				result = "N";
			}
		}
	}

	return result;
}

//비회원 예약 저장
function saveReservationNoMember() {
	if (reservationValidation()) {
		 if($("#checkCode").val() == "N"){
			 alert("핸드폰 인증번호 받아 주십시오.");
			 return;
		 }
		 if($("input[name='code']").val() == ""){
			 alert("인증번호를 넣어 주십시오.");
			 return;
		 }
		 if($("input[name='code']").val() != chkPhoneCode){
			 alert("인증번호가 일치하지 않습니다.");
			 return ;
		 }

		if (agreeCheck()=="Y") {
			var data = {
				usrName : $("input[name='userName']").val(),
				usrPhoneNo : $("input[name='phone1']").val() + "-"
						+ $("input[name='phone2']").val() + "-"
						+ $("input[name='phone3']").val(),
				usrEmail : $("input[name='userEmail']").val(),
				memberGrade : $("input[name='memberGrade']").val(),
				phoneCode : $("input[name='code']").val()
			};
			submitReservation(data);
		} else {
			alert("예약완료 안내에 동의하셔야 예약을 완료할 수 있습니다.");
		}
	}
}


var reservSubmitChk = false;
//예약 저장 !!!
function submitReservation(d) {

	// 예약가능시간 다시 체크
	if(!serverDateCheck()){
		return;
	}

	if(reservSubmitChk){
		alert("예약이 진행중입니다. 잠시 기다려 주십시오");
		return;
	}

	reservSubmitChk = true;

	d.rentDate = $("#rentForm input[name='sDate']").val();
	d.returnDate = $("#rentForm input[name='eDate']").val();
	d.rentArea = $("#rentForm input[name='rentArea']").val();
	d.rentBranch = $("#rentForm input[name='rentBranch']").val();
	d.returnBranch = $("#rentForm input[name='returnBranch']").val();
	d.realBranch = $("#rentForm input[name='realBranch']").val();
	d.rentPlace = $("#rentForm input[name='rentPlace']").val();
	d.returnPlace = $("#rentForm input[name='returnPlace']").val();
	d.carCode = $("#rentForm input[name='carCode']").val();
	d.carName = $("#rentForm input[name='carName']").val();
	d.ldwCode = $("#rentForm input[name='ldwCode']").val();
	d.ldwFee = insFee;
	d.carRentFee = carRentFee;
	d.discountRate = carDiscount;
	d.optionStr = makeOptionStr();
	d.onewayFee = $("#rentForm input[name='onewayFee']").val();
	d.totalRentFee = (carDiscountFee + optionFee + insFee + onewayFee + jejuairportFee);
	d.pointUseYn = $("#rentForm input[name='pointUseYn']").val();
	d.pointUseFee = $("#rentForm input[name='pointUseFee']").val();
	d.reservNo = $("#rentForm input[name='reservNo']").val();
	d.as_dlcr_yn = $("#rentForm input[name='as_dlcr_yn']").val();
	d.ad_dlcr_fee = $("#rentForm input[name='ad_dlcr_fee']").val();
	d.as_rtcr_yn = $("#rentForm input[name='as_rtcr_yn']").val();
	d.ad_rtcr_fee = $("#rentForm input[name='ad_rtcr_fee']").val();

	//수정시 딜리버리값 확인을 위한 값
	d.old_as_dlcr_yn = $("#rentForm input[name='old_as_dlcr_yn']").val();
	d.old_ad_dlcr_fee = $("#rentForm input[name='old_ad_dlcr_fee']").val();
	d.old_as_rtcr_yn = $("#rentForm input[name='old_as_rtcr_yn']").val();
	d.old_ad_rtcr_fee = $("#rentForm input[name='old_ad_rtcr_fee']").val();

	d.rentZip = $("#rentForm input[name='rentZip']").val();

	/*d.rentZip1 = $("#rentForm input[name='rentZip1']").val();
	d.rentZip2 = $("#rentForm input[name='rentZip2']").val();
*/
	d.rentAddr1 = $("#rentForm input[name='rentAddr1']").val();
	d.rentAddr2 = $("#rentForm input[name='rentAddr2']").val();

	d.returnZip = $("#rentForm input[name='returnZip']").val();

	/*d.returnZip1 = $("#rentForm input[name='returnZip1']").val();
	d.returnZip2 = $("#rentForm input[name='returnZip2']").val();
*/
	d.returnAddr1 = $("#rentForm input[name='returnAddr1']").val();
	d.returnAddr2 = $("#rentForm input[name='returnAddr2']").val();

	d.eventCode = $("#rentForm input[name='eventCode']").val();
	d.eventDiscount = $("#rentForm input[name='eventDiscount']").val();

	d.cp_code = $("#rentForm input[name='cp_code']").val();
	d.cp_dcrt = $("#rentForm input[name='cp_dcrt']").val();
	d.cp_amt = $("#rentForm input[name='cp_amt']").val();

	d.userName = $("#rentForm input[name='userName']").val();
	d.userPhoneNo = $("#rentForm input[name='phone1']").val() + "-"
			+ $("#rentForm input[name='phone2']").val() + "-"
			+ $("#rentForm input[name='phone3']").val();
	d.userEmail = $("#rentForm input[name='userEmail']").val();

	d.domic_license_no = $("option:selected", "#licenseNo1").val() + ""
			+ $("#rentForm input[name='licenseNo2']").val() + ""
			+ $("#rentForm input[name='licenseNo3']").val() + ""
			+ $("#rentForm input[name='licenseNo4']").val();
	var acqMM	= $("#rentForm input[name='licenseAcqMM']").val();
	var acqDD	= $("#rentForm input[name='licenseAcqDD']").val();

	if(acqMM!=undefined){
		if(acqMM.length == 1){
			acqMM = "0"+acqMM;
		}
	}
	if(acqDD!=undefined){
		if(acqDD.length == 1){
			acqDD = "0"+acqDD;
		}
	}
	d.license_acq_date = $("#rentForm input[name='licenseAcqYYYY']").val() + ""
			+ acqMM + ""
			+ acqDD;
	d.license_grade_code = $("option:selected", "#rentForm #licenseGradeCode").val();

	var avlMM	= $("#rentForm input[name='licenseAvlMM']").val();
	var avlDD	= $("#rentForm input[name='licenseAvlDD']").val();

	if(avlMM!=undefined){
		if(avlMM.length == 1){
			avlMM = "0"+avlMM;
		}
	}
	if(avlDD!=undefined){
		if(avlDD.length == 1){
			avlDD = "0"+avlDD;
		}
	}
	d.license_avl_s_date = $("#rentForm input[name='licenseAvlYYYY']").val() + ""
			+ avlMM + ""
			+ avlDD;

	//alert("GDATE::::면허취득일 총::::::"+d.license_acq_date);
	//alert("GDATE::::면허취득일 분산1::::::"+acqDD);
	//alert("GDATE::::면허취득일 분산2::::::"+acqMM);

	/***********************************************************************************************************************
	 *  2016.01.20 제2운전자 추가
	 *
	 *  기능: 공통(회원, 비회원) 예약 제2운전자 추가
	 *
	 ***********************************************************************************************************************/

	d.twocheck = $("#rentForm input[name='twocheck']").val();                                            // 팝업 체크값::::
	d.licensedivtwo = $("option:selected", "#rentForm #licensedivtwo").val();           							// 제 2운전자 면허구분
	d.licensegradecodetwo = $("option:selected", "#rentForm #licensegradecodetwo").val();           	// 제 2운전자 면허종류 selected 박스

	d.birthdaytwo = $("#rentForm input[name= 'birthdaytwo']").val();           									// 제 2운전자 법정생년월일
	d.nametwo = $("#rentForm input[name= 'nametwo']").val();           										// 제 2운전자 이름

	d.licensenotwo1 = $("#rentForm input[name='licensenotwo1']").val();           							// 제 2운전자 면허증번호 1번쨰
	d.licensenotwo2 = $("#rentForm input[name='licensenotwo2']").val();           							// 제 2운전자 면허증번호 2번쨰
	d.licensenotwo3 = $("#rentForm input[name='licensenotwo3']").val();           							// 제 2운전자 면허증번호 3번쨰
	d.licensenotwo4 = $("#rentForm input[name='licensenotwo4']").val();           							// 제 2운전자 면허증번호 4번쨰
	d.licensenotwototal = $("option:selected", "#licensenotwo1").val() + "" + $("#rentForm input[name='licensenotwo2']").val() + "" + $("#rentForm input[name='licensenotwo3']").val() + "" + $("#rentForm input[name='licensenotwo4']").val();

	d.licenseacqyyyytwo = $("#rentForm input[name='licenseacqyyyytwo']").val();           			// 제 2운전자 면허발급일자 1번째
	d.licenseacqmmtwo = $("#rentForm input[name='licenseacqmmtwo']").val();           				// 제 2운전자 면허발급일자 2번째
	d.licenseacqddtwo = $("#rentForm input[name='licenseacqddtwo']").val();           					// 제 2운전자 면허발급일자 3번쨰
	d.licenseatcqotal = $("#rentForm input[name='licenseacqyyyytwo']").val() + "" + $("#rentForm input[name='licenseacqmmtwo']").val() + "" + $("#rentForm input[name='licenseacqddtwo']").val();

	d.licenseaviyyyytwo = $("#rentForm input[name='licenseaviyyyytwo']").val();                          // 제 2운전자 적성검사 1번쨰
	d.licenseavimmtwo = $("#rentForm input[name='licenseavimmtwo']").val();           					// 제 2운전자 적성검사 2번쨰
	d.licenseaviddtwo = $("#rentForm input[name='licenseaviddtwo']").val();           						// 제 2운전자 적성검사 3번쨰
	d.licenseavitotal = $("#rentForm input[name='licenseaviyyyytwo']").val() + "" + $("#rentForm input[name='licenseavimmtwo']").val() + "" + $("#rentForm input[name='licenseaviddtwo']").val();

	d.licensegradeentwo = $("#rentForm input[name='licensegradeentwo']").val();           		    // 제 2운전자 외국면허종류
	d.internationallicensenumbertwo = $("#rentForm input[name='internationallicensenumbertwo']").val();  // 제 2운전자 면허증 번호

	//alert("internationallicensenumbertwo:::::::::::::::::::"+d.internationallicensenumbertwo);
	//alert("팝업체크값:::::::"+d.twocheck);
	//alert("면허종류::::::"+d.licensegradecodetwo);
	//alert("면허증번호1::::::"+d.licenseatcqotal);
	//alert("면허발급일자::::"+d.licenseavitotal);

	/****************************************************************************************************************************/

	// sap추가
	d.ldwcharge = $("#rentForm input[name='LDWCHARGE']").val(); // LDW요금
	d.kbetr2 = $("#rentForm input[name='KBETR2']").val(); // 일일요금
	d.kbetr3 = Math.round($("#rentForm input[name='dutimea2']").val() / $("#rentForm input[name='dutimea']").val() * carRentFee); // 주중요금
	d.kbetr4 = Math.round($("#rentForm input[name='dutimea3']").val() / $("#rentForm input[name='dutimea']").val() * carRentFee); // 주말요금

	d.kbstd = $("#rentForm input[name='KBSTD']").val(); // 할인이 적용 되지 않은 일일요금

	d.vkbur = $("#rentForm input[name='VKBUR']").val(); // 사업장
	d.vkgrp = $("#rentForm input[name='rentBranch']").val(); // 영업 그룹
	d.vkgrp2 = $("#rentForm input[name='realBranch']").val(); // 보유지점
	d.svkgrp = $("#rentForm input[name='rentBranch']").val(); // 대여지점
	d.evkgrp = $("#rentForm input[name='returnBranch']").val(); // 반납지점
	d.rvkgrp = $("#rentForm input[name='rentBranch']").val(); // 계약지점
	d.guebg = $("#rentForm input[name='sDate']").val().substring(0, 8); // 대여일
	d.stime = $("#rentForm input[name='sDate']").val().substring(8, 14); // 대여시간
	d.gueen = $("#rentForm input[name='eDate']").val().substring(0, 8); // 반납일
	d.etime = $("#rentForm input[name='eDate']").val().substring(8, 14); // 반납시간

	d.duday = $("#rentForm input[name='DUDAY']").val(); // 대여기간(일)
	d.dutime = $("#rentForm input[name='DUTIME']").val(); // 대여기간(시간)
	d.duday2 = $("#rentForm input[name='DUDAY2']").val(); // 휴일대여기간(일)
	d.dutime2 = $("#rentForm input[name='DUTIME2']").val(); // 휴일대여기간(시간)
	d.duday3 = $("#rentForm input[name='DUDAY3']").val(); // 평일대여기간(일)
	d.dutime3 = $("#rentForm input[name='DUTIME3']").val(); // 평일대여기간(시간)
	d.discount = $("#rentForm input[name='DISCOUNT']").val();
	d.matnr = $("#rentForm input[name='MATNR']").val(); // 자재번호--
	d.mvgr2 = carSize; // 차량유형
	d.gtrwr = carRentFee + Math.round($("#rentForm input[name='LDWCHARGE']").val()) + Math.round($("#rentForm input[name='onewayFee']").val()) 
			+ Math.round(jejuairportFee) + dsFee_711; // 총대여료
	d.gtdwr = carRentFee - carDiscountFee;
	d.balnc = carDiscountFee;
	d.lentf = (mysteryChk != "X" ? getRentFee() : getMysteryRentFee());

	d.totlaPoint = Math.round($("#rentForm input[name='totalPoint']").val());
	d.pointUseFee = $("#rentForm input[name='pointUseFee']").val() ? $("#rentForm input[name='pointUseFee']").val().split(",").join("") : '';

	d.splace = $("#rentForm input[name='splace']").val();
	d.eplace = $("#rentForm input[name='eplace']").val();

	d.dsiwr = hdsFee;

	//2016.07.22.카시트,유모차 추가
	var optionMap = {
		"1O101" : "내비게이션",
		"1O107" : "영문 네비게이션",
		"1O110" : "인스탁스 미니",
		"1O111" : "인스탁스 와이드",
		"1O106" : "tx내비게이션",
		"1O102" : "베이비시트",
		"1O112" : "카시트(영유아용)",
		"1O113" : "카시트(유아용)",
		"1O114" : "카시트(주니어용)",
		"1O115" : "유모차(절충형)",
		"1O116" : "유모차(휴대형)",
	};
	var options = [];
	var option_cd = [];
	var option_fee = [];
	$(".ckEvent:checked").each(function(i, s) {
		if($(s).prop("checked")){
			option_cd[i] = s.id;
			options[i] = optionMap[s.id];
			option_fee[i] = $(s).attr("price");
		}
	});

	d.options = options.join(",");
	d.option_cd = option_cd.join(",");
	d.option_fee = option_fee.join(",");
	d.systm = $("#rentForm input[name='camping_yn']").val(); // J-제주,CAMP-캠핑,S-오픈카

	// 할인 ( 회원할인인 경우 )
	d.kschn = $("#rentForm input[name='KSCHN']").val(); // 조건유형
	d.krate = $("#rentForm input[name='KRATE']").val(); // 할인율
	d.waerk = $("#rentForm input[name='WAERK']").val();// SD문서통화
	d.krech = $("#rentForm input[name='KRECH']").val(); // 조건의 계산유형
	d.name1 = $("#rentForm input[name='NAME1']").val();// 이름1
	d.kschn_tx = $("#rentForm input[name='KSCHN_TX']").val();// 이름
	d.kbetr = $("#rentForm input[name='KBETR']").val();// 할인금액
	d.bname = $("#rentForm input[name='BNAME']").val();// 쿠폰번호

	// 이벤트할인
	d.eventKschn = $("#rentForm input[name='EventKschn']").val(); // 조건유형
	d.eventKrate = $("#rentForm input[name='EventKrate']").val(); // 할인율
	d.eventWaerk = $("#rentForm input[name='EventWaerk']").val();// SD문서통화
	d.eventKrech = $("#rentForm input[name='EventKrech']").val(); // 조건의 계산유형
	d.eventName1 = $("#rentForm input[name='EventName1']").val();// 이름1
	d.eventKschn_tx = $("#rentForm input[name='EventKschn_tx']").val();// 이름
	d.eventKbetr = $("#rentForm input[name='EventKbetr']").val();// 할인금액
	d.eventBname = $("#rentForm input[name='EventBname']").val();// 쿠폰번호

	// 쿠폰할인
	d.couponKschn = $("#rentForm input[name='CouponKschn']").val(); // 조건유형
	d.couponKrate = $("#rentForm input[name='CouponKrate']").val(); // 할인율
	d.couponWaerk = $("#rentForm input[name='CouponWaerk']").val();// SD문서통화
	d.couponKrech = $("#rentForm input[name='CouponKrech']").val(); // 조건의 계산유형
	d.couponName1 = $("#rentForm input[name='CouponName1']").val();// 이름1
	d.couponKschn_tx = $("#rentForm input[name='CouponKschn_tx']").val();// 이름
	d.couponKbetr = $("#rentForm input[name='CouponKbetr']").val();// 할인금액
	d.couponBname = $("#rentForm input[name='CouponBname']").val();// 쿠폰번호

	// 이전쿠폰할인
	d.oldCouponKschn = $("#rentForm input[name='OldCouponKschn']").val(); // 조건유형
	d.oldCouponKrate = $("#rentForm input[name='OldCouponKrate']").val(); // 할인율
	d.oldCouponWaerk = $("#rentForm input[name='OldCouponWaerk']").val();// SD문서통화
	d.oldCouponKrech = $("#rentForm input[name='OldCouponKrech']").val(); // 조건의 계산유형
	d.oldCouponName1 = $("#rentForm input[name='OldCouponName1']").val();// 이름1
	d.oldCouponKschn_tx = $("#rentForm input[name='OldCouponKschn_tx']").val();// 이름
	d.oldCouponKbetr = $("#rentForm input[name='OldCouponKbetr']").val();// 할인금액
	d.oldCouponBname = $("#rentForm input[name='OldCouponBname']").val();// 쿠폰번호

	d.vtweg = $("#rentForm input[name='vtweg']").val();
	d.liznr = $("#rentForm input[name='liznr']").val();
	d.returnVtweg = $("#rentForm input[name='returnVtweg']").val();

	// 배반차 셋팅
	d.revDcPlaceKschn 		= $("#rentForm input[name='revDcPlaceKschn']").val();
	d.revDcPlaceKschn_tx 	= $("#rentForm input[name='revDcPlaceKschn_tx']").val();
	d.revDcPlaceKbetr 		= $("#rentForm input[name='revDcPlaceKbetr']").val();
	d.revDcPlaceKonwa 		= $("#rentForm input[name='revDcPlaceKonwa']").val();

	//무료 업그레이드
	d.upChk 			= $("#rentForm input[name='upChk']").val();
	d.upCarRealBranch 	= $("#rentForm input[name='upCarRealBranch']").val();
	d.upCarCode 		= $("#rentForm input[name='upCarCode']").val();
	d.upCarName 		= $("#rentForm input[name='upCarName']").val();
	d.upCarSize 		= $("#rentForm input[name='upCarSize']").val();

	// 지역할인
	d.konda					= $("#rentForm input[name='konda']").val();

	//알뜰카
	d.mysteryChk					= $("#rentForm input[name='mysteryChk']").val();//알뜰카구분
	d.mysteryCode					= $("#rentForm input[name='mysteryCode']").val();//알뜰카그룹

	// INCDW 셋팅
	var strIncdw = "";
	if ($("#rentForm input[name='memberGrade']").val() != "비회원") {
		if ($("input[name='CouponWaerk']").val() == "%" || $("input[name='EventWaerk']").val() == "%") {
			if ($("input[name='EventIncdw']").val() == "" || $("input[name='CouponIncdw']").val() == "") {
				strIncdw = " ";
			} else {
				strIncdw = "X";
			}
		} else {
			if($("input[name='DISCOUNT_GUBUN']").val()=='E')
				strIncdw = $("#rentForm input[name='incdw']").val();
			else
				strIncdw = "X";
		}
	} else {
		strIncdw = " ";
	}
	d.incdw = strIncdw;

	var kschl = new Array();
	var krech = new Array();
	var kbewr = new Array();
	var name1 = new Array();
	var maktx = new Array();
	var waers = new Array();
	var kbetr = new Array();
	var bname = new Array();

	var kbetrTmp = new Array();

	var num = 1;
	if (realGiftCardCount > 0) {

		for ( var i = 0; i < realGiftCardCount; i++) {
			kschl[i] = $("#rentForm input[name='kschl" + num + "']").val();
			krech[i] = $("#rentForm input[name='krech" + num + "']").val();
			kbewr[i] = $("#rentForm input[name='kbewr" + num + "']").val();
			name1[i] = $("#rentForm input[name='name1" + num + "']").val();
			maktx[i] = $("#rentForm input[name='maktx" + num + "']").val();
			waers[i] = $("#rentForm input[name='waers" + num + "']").val();
			bname[i] = $("#rentForm input[name='bname" + num + "']").val();

			if (kschl[i] == "RB02") {
				kbetr[i] = $("#rentForm input[name='kbetrTmp" + num + "']").val();
			} else {
				kbetr[i] = $("#rentForm input[name='kbetr" + num + "']").val();
			}

			num = num + 1;

			// alert(i + "::" + name1[i] + "::" + kbetr[i] )
		}

	} else {
		kschl[0] = 0;
		krech[0] = 0;
		kbewr[0] = 0;
		name1[0] = 0;
		maktx[0] = 0;
		waers[0] = 0;
		kbetr[0] = 0;
		bname[0] = 0;
	}

	d.giftCardKschl = kschl;
	d.giftCardKrech = krech;
	d.giftCardKbewr = kbewr;
	d.giftCardName1 = name1;
	d.giftCardMaktx = maktx;
	d.giftCardWaers = waers;
	d.giftCardKbetr = kbetr;
	d.giftCardBname = bname;

	d.realGiftCardCount = realGiftCardCount;
	d.tempLastDiscountFee = tempLastDiscountFee;
	d.maxCount = maxCount;

	// DS 오버부킹 확인
	var hdsCheck = "";
	if ($("#rentForm input[name='hdsCheck']").prop('checked')) {
		hdsCheck = "Y";
	} else {
		hdsCheck = "N";
	}

	d.hdsCheck 	= hdsCheck;
	d.hdsType 	= $(".hdsRadio:checked").index();

	//$("#ktkumhorent").attr("src","/facebook/fb_01.html");

	// return;

	//alert("kor/reservation/save.do서밋하기바로전....");

	var url = "/fr/kor/reservation/save.do";
	$.ajax({
		url : url,
		type : "POST",
		timeout : 60000,
		data : d,
		success : function(data) {
			if (data.success == "Y") {
				completeReservation(data);
				reservSubmitChk = false;
			} else {
				alert(data.message);
				reservSubmitChk = false;
				if(data.success == "L")
					top.location.href="/kor/member/login.do";
			}
		},
		dataType : "json"
	});
}

var optionStr = "";
function makeOptionStr() {

	var options = optionStr.split("||");
	var os = [];
	var objPrice = "";
	var objCnt = "";
	var ojbId = "";
	var i = 0;
	while (options.length > 0) {
		var objId = options.shift();
		var objCnt = options.shift();
		var objPrice = options.shift();
		//2016.07.20.bskwon
		//$("option:selected", "#carseat").val() != ""
		if ($(".ckEvent[id='" + objId + "']").prop("checked") || $(".ckEvent[id='" + objId + "']").attr("clicked") == "on") {
			os[i++] = objId;
			os[i++] = "01";
			os[i++] = objPrice;
		} else {
			os[i++] = objId;
			os[i++] = "00";
			os[i++] = "000000000";
		}
	}
	return os.join("||");
}

//validatioin
function reservationValidation() {
	if ($("#hdsCheck").prop("checked")) {
		if($('input[name="hdsType"]:checked').val() == "3"){
			//if (!$("input[name='rentZip1']").val() || !$("input[name='rentZip2']").val() || !$("input[name='rentAddr1']").val()) {
				if (!$("input[name='rentZip']").val() || !$("input[name='rentAddr1']").val()) {

				alert("대여장소를 입력해주세요.");
				//$("input[name='rentZip1']").focus();
				$("input[name='rentZip']").focus();
				return false;
			}
			if (!$("input[name='rentAddr2']").val()) {
				alert("대여장소의 상세주소를 입력해주세요.");
				$("input[name='rentAddr2']").focus();
				return false;
			}
		/*	if (!$("input[name='returnZip1']").val() || !$("input[name='returnZip2']").val() || !$("input[name='returnAddr1']").val()) {
		*/
			if (!$("input[name='returnZip']").val() || !$("input[name='returnAddr1']").val()) {

				alert("반납장소를 입력해주세요.");
				//$("input[name='returnZip1']").focus();

				$("input[name='returnZip']").focus();

				return false;
			}
			if (!$("input[name='returnAddr2']").val()) {
				alert("반납장소의 상세주소를 입력해주세요.");
				$("input[name='returnAddr2']").focus();
				return false;
			}
		} else if($('input[name="hdsType"]:checked').val() == "2"){
			//if (!$("input[name='rentZip1']").val() || !$("input[name='rentZip2']").val() || !$("input[name='rentAddr1']").val()) {
				if (!$("input[name='rentZip']").val()|| !$("input[name='rentAddr1']").val()) {

				alert("대여장소를 입력해주세요.");
				//$("input[name='rentZip1']").focus();
				$("input[name='rentZip']").focus();

				return false;
			}
			if (!$("input[name='rentAddr2']").val()) {
				alert("대여장소의 상세주소를 입력해주세요.");
				$("input[name='rentAddr2']").focus();
				return false;
			}
		} else if($('input[name="hdsType"]:checked').val() == "1"){
	/*		if (!$("input[name='returnZip1']").val() || !$("input[name='returnZip2']").val() || !$("input[name='returnAddr1']").val()) {
	*/
			if (!$("input[name='returnZip']").val() || !$("input[name='returnAddr1']").val()) {

				alert("반납장소를 입력해주세요.");
			/*	$("input[name='returnZip1']").focus();
		*/
				$("input[name='returnZip']").focus();

				return false;
			}
			if (!$("input[name='returnAddr2']").val()) {
				alert("반납장소의 상세주소를 입력해주세요.");
				$("input[name='returnAddr2']").focus();
				return false;
			}
		}
	}

/*********2016.01.25***********제2운전자 체크되었을시 필수값 체크 ***************************************************/

	// 제2운전자 체크값 가져와서 있을시 조건 체크 국제

	if($("#rentForm input[name='twocheck']").val() == "true" &&  $("select[name='licensedivtwo']").val() == "1"){

		if ($("#rentForm input[name='nametwo']").val() == "") {
			alert("제2운전자 이름 값을 넣어주세요.");
			return false;
		}

		if ($("#rentForm input[name='birthdaytwo']").val() == "" ) {
			alert("제2운전자 법정생년월일을 입력해주세요.");
			return false;
		}

		if ($("#rentForm input[name='birthdaytwo']").val().length != "8" ) {
			alert("제2운전자 법정생년월일을 8자리로 입력해주세요.");
			return false;
		}

		if ($("#rentForm input[name='licensenotwo1']").val() == "" ) {
			alert("제2운전자 면허증번호를 입력해주세요.");
			return false;
		}

		if ($("#rentForm input[name='licensenotwo2']").val() == "" ) {
			alert("제2운전자 면허증번호를 입력해주세요.");
			return false;
		}

		if ($("#rentForm input[name='licensenotwo3']").val() == "" ) {
			alert("제2운전자 면허증번호를 입력해주세요.");
			return false;
		}

		if ($("#rentForm input[name='licensenotwo4']").val() == "" ) {
			alert("제2운전자 면허증번호를 입력해주세요.");
			return false;
		}

		if ($("#rentForm input[name='licenseacqyyyytwo']").val() == "") {
			alert("제2운전자 면허발급일자 입력해주세요.");
			return false;
		}

		if ($("#rentForm input[name='licenseacqyyyytwo']").val().length != "04") {
			alert("제2운전자 면허발급일자  4자리로 입력해주세요.");
			return false;
		}

		if ($("#rentForm input[name='licenseacqmmtwo']").val() == "" ) {
			alert("제2운전자 면허발급일자 입력해주세요.");
			return false;
		}

		if ($("#rentForm input[name='licenseacqmmtwo']").val().length != "02") {
			alert("제2운전자 면허발급일자 2자리로 입력해주세요.");
			return false;
		}


		if ($("#rentForm input[name='licenseacqddtwo']").val() == "" ) {
			alert("제2운전자 면허발급일자 입력해주세요.");
			return false;
		}

		if ($("#rentForm input[name='licenseacqddtwo']").val().length != "02") {
			alert("제2운전자 면허발급일자 2자리로 입력해주세요.");
			return false;
		}

		if ($("#rentForm input[name='licenseaviyyyytwo']").val() == "" ) {
			alert("제2운전자 적성검사일자 입력해주세요.");
			return false;
		}

		if ($("#rentForm input[name='licenseaviyyyytwo']").val().length != "04") {
			alert("제2운전자 적성검사일자 4자리로 입력해주세요.");
			return false;
		}

		if ($("#rentForm input[name='licenseavimmtwo']").val() == "" ) {
			alert("제2운전자 적성검사일자 입력해주세요.");
			return false;
		}

		if ($("#rentForm input[name='licenseavimmtwo']").val().length != "02") {
			alert("제2운전자 적성검사일자 2자리로 입력해주세요.");
			return false;
		}

		if ($("#rentForm input[name='licenseaviddtwo']").val() == "" ) {
			alert("제2운전자 적성검사일자 입력해주세요.");
			return false;
		}

		if ($("#rentForm input[name='licenseaviddtwo']").val().length != "02") {
			alert("제2운전자  적성검사일자 2자리로 입력해주세요.");
			return false;
		}

	}


	if($("#rentForm input[name='twocheck']").val() == "true" && $("select[name='licensedivtwo']").val() == "2"){

		if ($("#rentForm input[name='internationallicensenumbertwo']").val() =="" ){
			alert("면허증 번호를 입력하여 주세요.");
			return false;
		}
	}

/**********************************************************제2운전자 체크 끝**********************************************************/

	if ($("#userName").val() == "") {
		alert("예약자 이름을 입력해 주세요.");
		$("#userName").focus();
		return false;
	}
	if ($("#phone1").val() == "" || $("#phone2").val() == "" || $("#phone3").val() == "") {
		alert("휴대전화 번호를 입력해 주세요.");
		$("#phone1").focus();
		return false;
	}
	if ($("#userEmail").val() == "") {
		alert("Email을 입력해 주세요.");
		$("#userEmail").focus();
		return false;
	}

	if (!$("input[name='sDate']").val()) {
		alert("대여일시를 선택해주세요.");
		$("input[name='sDate']").focus();
		return false;
	}
	if (!$("input[name='eDate']").val()) {
		alert("반납일시를 선택해주세요.");
		$("input[name='eDate']").focus();
		return false;
	}
	if (!$("input[name='rentBranch']").val()) {
		alert("대여지점을 선택해주세요.");
		return false;
	}
	if (($("input[name='rentArea']").val()=="6" && $("input[name='splace']").val()=="")
			|| ($("input[name='rentBranch']").val()=="605" && $("input[name='splace']").val()=="") || ($("input[name='returnBranch']").val()=="605" && $("input[name='eplace']").val()=="")
			|| ($("input[name='rentBranch']").val()=="711" && $("input[name='splace']").val()=="") || ($("input[name='returnBranch']").val()=="711" && $("input[name='eplace']").val()=="")
		) {
		alert("대여 상세지점을 선택해주세요.");
		return false;
	}
	if (!$("input[name='returnBranch']").val()) {
		alert("반납지점을 선택해주세요.");
		return false;
	}
	if (!$("input[name='carCode']").val()) {
		alert("대여차종을 선택해주세요.");
		return false;
	}


	if ($("input[name='pointUseFee']").val()) {
		if ($("input[name='pointUseFee']").val() != "" && $("input[name='pointUseFee']").val().replace(/,/g, "") < 1) {
			alert("최소 1포인트 이상 사용 가능합니다.");
			$("input[name='pointUseFee']").focus();
			return false;
		}
	}
	if ($("input[name='memberGrade']").val() != "비회원"){
		// 면허 정보 입력 추가 START
		if ($("select[name='LicenseDiv']").val() == "1") {
			if ($("input[name='userId']").val() != "") {

				if ($("select[name='LicenseDiv']").val() == "") {
					alert("면허 구분을 선택하여 주십시오.");
					$("select[name='LicenseDiv']").focus();
					return false;
				}

				if ($("option:selected", "#licenseNo1").val() == "") {
					alert("지역을 입력하여 주십시오.");
					$("#licenseNo1").focus();
					return false;
				}

				var lcsno = $("input[name='licenseNo2']").val() + "-" + $("input[name='licenseNo3']").val() + "-" + $("input[name='licenseNo4']").val();
				if ($("select[name='LicenseDiv']").val() == "1" && lcsno.length != "12") {
					alert("면허 번호을 정확히 입력하여 주십시오.");
					$("#licenseNo1").focus();
					return false;
				}

				if ($("select[name='LicenseDiv']").val() == "1" && $("select[name='licenseGradeCode']").val() == "") {
					alert("면허 종류을 선택하여 주십시오.");
					$("select[name='licenseGradeCode']").focus();
					return false;
				}

				if ($("input[name='licenseAvlYYYY']").val().length != 4
						|| ($("input[name='licenseAvlMM']").val() > 12
								|| $("input[name='licenseAvlMM']").val() <= 0 || $(
								"input[name='licenseAvlMM']").val() == "")
						|| ($("input[name='licenseAvlDD']").val() > 31
								|| $("input[name='licenseAvlDD']").val() <= 0 || $(
								"input[name='licenseAvlDD']").val() == "")) {
					alert("적성검사일자를 정확히 입력하여 주십시오.");
					$("input[name='licenseAvlYYYY']").focus();
					return false;
				}

				var td = new Date(srvTime());
				var today = "" + td.getFullYear() + getDec(td.getMonth() + 1)
						+ getDec(td.getDate());
				var licenseAv = $("input[name='licenseAvlYYYY']").val()
						+ $("input[name='licenseAvlMM']").val()
						+ $("input[name='licenseAvlDD']").val();
				if (today >= licenseAv) {
					alert("적성검사일자를 확인해주세요.");
					return false;
				}

				if ($("input[name='licenseAcqYYYY']").val().length != 4
						|| ($("input[name='licenseAcqMM']").val() > 12
								|| $("input[name='licenseAcqMM']").val() <= 0 || $(
								"input[name='licenseAcqMM']").val() == "")
						|| ($("input[name='licenseAcqDD']").val() > 31
								|| $("input[name='licenseAcqDD']").val() <= 0 || $(
								"input[name='licenseAcqDD']").val() == "")) {
					alert("면허발급일자를 정확히 입력하여 주십시오.");
					$("input[name='licenseAcqYYYY']").focus();
					return false;
				}

				var licenseAcq = $("input[name='licenseAcqYYYY']").val()
						+ $("input[name='licenseAcqMM']").val()
						+ $("input[name='licenseAcqDD']").val();

				// 회원이면서 운전면허 발급일자가 현재일자보다 1년 이내의 경우
				var today1Year = "" + getDec(td.getFullYear()-1) + getDec(td.getMonth() + 1) + getDec(td.getDate());
				var acqYear = $("input[name='licenseAcqYYYY']").val();
				var acqMM	= $("input[name='licenseAcqMM']").val();
				var acqDD	= $("input[name='licenseAcqDD']").val();

				if(acqMM!=undefined){
					if(acqMM.length == 1){
						acqMM = "0"+acqMM;
					}
				}
				if(acqDD!=undefined){
					if(acqDD.length == 1){
						acqDD = "0"+acqDD;
					}
				}

				var licenseAcq = acqYear + acqMM + acqDD;

				var licenseGetDate = $("input[name='srtLicenseGetDate']").val();
				var toLicenseGetDate = licenseGetDate.split("-").join("");


				var lic2 = "";
				if($("input[name='licenseNo2']").val() < 40){
					lic2 = "20";
				}else{
					lic2 = "19";
				}

				//국내: 면허번호 앞자리 2 + 발급월 + 발급일로 1년 미만 체크
				var licGetDate = ""+lic2+$("input[name='licenseNo2']").val() + $("input[name='licenseAcqMM']").val() + $("input[name='licenseAcqDD']").val();

				// 면허취득일자 1년 체크
				if(licGetDate > today1Year && $("select[name='LicenseDiv']").val() == "1"){
					alert("면허 취득 후 1년이 경과해야 예약을 진행하실 수 있습니다. \n자세한 내용은 고객센터(1588-1230)으로 문의 부탁 드립니다.");
					return false;
				}

				//회원이면서 운전면허 적성검사 만기일자가 반납일자보다 적은 경우
				if (licenseAv < licenseAcq) {
					alert("운전면허 적성검사 만기일자를 확인 부탁 드립니다.");
					return false;
				}

				// 대여일과 운전면허 적성검사 만료일자 비교
				if (licenseAv < $("input[name='sDate']").val().substring(0,8)) {
					alert("운전면허 적성검사 만기일자를 확인 부탁 드립니다.");
					return false;
				}

			}
		}else{
			if ($("select[name='LicenseDiv']").val() == "") {
				alert("면허 구분을 선택하여 주십시오.");
				$("select[name='LicenseDiv']").focus();
				return false;
			}

			if ($("select[name='licenseGradeCodeEn']").val() == "") {
				alert("면허 종류을 선택하여 주십시오.");
				$("select[name='LicenseDiv']").focus();
				return false;
			}

			if ($("select[name='InternationalLicenseNumber']").val() == "") {
				alert("면허 번호을 정확히 입력하여 주십시오.");
				$("select[name='LicenseDiv']").focus();
				return false;
			}
		}


			// 면허정보 체크
			if ($("select[name='licenseGradeCode']").val() == '16' && $("option:selected", "#carSize").val() == '21') {
				alert("2종 보통인 경우는 승합 차종 대여 불가능 합니다.\n 면허 정보를 확인해 주세요.");
				return false;
			}
			if ($("select[name='licenseGradeCode']").val() == '17' && $("option:selected", "#carSize").val() == '21') {
				alert("2종 오토인 경우는 승합 차종 대여 불가능 합니다.\n 면허 정보를 확인해 주세요.");
				return false;
			}
			if ($("select[name='licenseGradeCodeEn']").val() == '21' && $("option:selected", "#carSize").val() == '21') {
				alert("국제면허 B타입인 경우는 승합 차종 대여 불가능 합니다.\n 면허 정보를 확인해 주세요.");
				return false;
			}

			if ($("select[name='licenseGradeCode']").val() == '11') {
				alert("1종 소형인 경우는 차량 대여가 불가능합니다.\n 면허 정보를 확인해 주세요.");
				return false;

			}
			if ($("select[name='licenseGradeCode']").val() == '15') {
				alert("2종 소형인 경우는 차량 대여가 불가능합니다.\n 면허 정보를 확인해 주세요.");
				return false;

			}
			if ($("select[name='licenseGradeCodeEn']").val() == '21') {
				alert("국제면허 A타입은 차량 대여가 불가능합니다.\n 면허 정보를 확인해 주세요.");
				return false;

			}
			if ($("select[name='licenseGradeCodeEn']").val() == '23') {
				alert("국제면허 C타입은 차량 대여가 불가능합니다.\n 면허 정보를 확인해 주세요.");
				return false;

			}
			if ($("select[name='licenseGradeCodeEn']").val() == '25') {
				alert("국제면허 E타입은 차량 대여가 불가능합니다.\n 면허 정보를 확인해 주세요.");
				return false;
			}


	}
	// 면허 정보 입력 추가 END

	$(".liCarModel").each(function(i, s) {
		if($(s).hasClass("red_txt")){
			$("input[name='realBranch']").val($(this).attr("realbranch"));
		}
	});

	return true;
}

// 회원 예약 저장
function saveReservation() {
	if (reservationValidation()) {

		var ischecked = $("#exCheck").prop('checked');
		if(ischecked) {	//빠른(Express) 경우
			if (agreeCheck()=="Y") {
				reservationConfirmPay();
			}
		} else { //빠른(Express)가 아닌경우
			if($("input[name='rentBranch']").val()=="622"){	//제주 선결제


				reservationJejuConfirmPay();
			} else {
				var obj = hdsFee;
				if (obj > 0) {
					if (agreeCheck()=="Y") {
						if ($("input[name='gifcer_rn']").val() != "") {
							alert("상품권 사용시 '예약 및 결제하기'로 이용해주세요.");
						} else {
							submitReservation({
								pointUseFee : $("input[name='pointUseFee']").val().split(",").join("")
							});
						}
					}
				} else {
					if (agreeCheck()=="Y") {
						if ($("input[name='gifcer_rn']").val() != "") {
							alert("상품권 사용시 '예약 및 결제하기'로 이용해주세요.");
						} else {
							submitReservation({
								pointUseFee : $("input[name='pointUseFee']").val().split(",").join("")
							});
						}

					}
				}
			}
		}
	}
}


//예약 완료 후 페이지
function completeReservation(data) {
	if (data.payChk == "YP") {
		alert("이전 결제는 취소 되었습니다.");
	}

	if($("option:selected", "#selRentArea").val() == "6"){

		document.reservResult2.carCode.value = $("input[name='carCode']").val();
		document.reservResult2.carName.value = $("input[name='carName']").val();
		document.reservResult2.carSize.value = $("option:selected", "#carSize").val();
		document.reservResult2.editChk.value = $("input[name='editChk']").val();
		document.reservResult2.totalRentFee.value = (carDiscountFee + optionFee + insFee + onewayFee + dsFee_711 + jejuairportFee);
		document.reservResult2.reservNo.value = data.reservNo;
		document.reservResult2.usrName.value = data.usrName;
		document.reservResult2.usrPhoneNo.value = data.usrPhoneNo;
		document.reservResult2.submit();


   }else{

		document.reservResult.carCode.value = $("input[name='carCode']").val();
		document.reservResult.carName.value = $("input[name='carName']").val();
		document.reservResult.carSize.value = $("option:selected", "#carSize").val();
		document.reservResult.editChk.value = $("input[name='editChk']").val();
		document.reservResult.totalRentFee.value = (carDiscountFee + optionFee + insFee + onewayFee + dsFee_711 + jejuairportFee);
		document.reservResult.reservNo.value = data.reservNo;
		document.reservResult.usrName.value = data.usrName;
		document.reservResult.usrPhoneNo.value = data.usrPhoneNo;
		document.reservResult.submit();

	}

}

//빠른(Express) 예약 완료 후 페이지
function completeReservationExpress(data) {
	if (data.payChk == "YP") {
		alert("이전 결제는 취소 되었습니다.");
	}
	document.reservResult.carCode.value = $("input[name='carCode']").val();
	document.reservResult.carName.value = $("input[name='carName']").val();
	document.reservResult.carSize.value = $("option:selected", "#carSize").val();
	document.reservResult.editChk.value = $("input[name='editChk']").val();
	document.reservResult.totalRentFee.value = (carDiscountFee + optionFee + insFee + onewayFee + dsFee_711 + jejuairportFee);
	document.reservResult.reservNo.value = data.reservNo;
	document.reservResult.usrName.value = data.usrName;
	document.reservResult.usrPhoneNo.value = data.usrPhoneNo;
	document.reservResult.action = "/fr/kor/reservation/completeExpress.do";
	document.reservResult.submit();
}


//컨트롤러단에서 예약가능 시간체크
function serverDateCheck(){
	var check = true;
	$.ajax({
		  type: "POST",
		  dataType: "json",
			async : asyncCheck,
			url : "/fr/kor/reservation/serverDateCheck.do",
			data : {},
			success : function(data) {
				if(data.success == "N" ){
					alert(data.message);
					check = false;
				}else{
					sysTime = data.sysTime;
					var area1Val =  $("input[name='rentArea']").val();
					var toD =  new Date(  sysTime.substr(0,4), parseInt(sysTime.substr(4,2))-1,  sysTime.substr(6,2) ,sysTime.substr(8,2),sysTime.substr(10,2) );
					var day4 = new Date(Date.parse(toD)+1000*60*60*4);
					var day3 = new Date(Date.parse(toD)+1000*60*60*3);
					var day6 = new Date(Date.parse(toD)+1000*60*60*6);
					var sday4 = ""+day4.getFullYear()+getDec(day4.getMonth()+1)+getDec(day4.getDate())+getDec(day4.getHours())+getDec(day4.getMinutes())+"00";
					var sday3 = ""+day3.getFullYear()+getDec(day3.getMonth()+1)+getDec(day3.getDate())+getDec(day3.getHours())+getDec(day3.getMinutes())+"00";
					var sday6 = ""+day6.getFullYear()+getDec(day6.getMonth()+1)+getDec(day6.getDate())+getDec(day6.getHours())+getDec(day6.getMinutes())+"00";

					var today = ""+toD.getFullYear()+getDec(toD.getMonth()+1)+getDec(toD.getDate())+getDec(toD.getHours())+getDec(toD.getMinutes())+"00";

					var time = $("input[name='sDate_']").val().replace("/", "").replace("/", "") + $("#sHour").val() + $("#sMin").val()+"00";

					if(today > time ){
						alert("현재보다 이전일은 대여가 불가능 합니다");
						check = false ;
					}else{
						if (!$("input[name='hdsCheck']").prop('checked')) {
							if(area1Val  == "1"){
								if(time  <sday4 ){
									alert("서울권역은 현재시간부터 4시간,\n대전/충청/세종 및 광주/전라지역은 3시간,\n그외권역은 6시간 이후 예약이 가능합니다.");
									check = false ;
								}
							} else if(area1Val  == "3"||area1Val  == "4"){
								if(time  <sday3 ){
									alert("서울권역은 현재시간부터 4시간,\n대전/충청/세종 및 광주/전라지역은 3시간,\n그외권역은 6시간 이후 예약이 가능합니다.");
									check = false ;
								}
							}else{
								if(time  <sday6 ){
									alert("서울권역은 현재시간부터 4시간,\n대전/충청/세종 및 광주/전라지역은 3시간,\n그외권역은 6시간 이후 예약이 가능합니다.");
									check = false ;
								}
							}
						}
					}
				}
			}
		});

	return check;
}

// 비회원 예약 조회 페이지
function goGuestReservList(usrName, usrPhoneNo, reservNo) {
	document.reservListFrm.usrName.value = usrName;
	document.reservListFrm.usrPhoneNo.value = usrPhoneNo;
	document.reservListFrm.reservNo.value = reservNo;
	document.reservListFrm.submit();
}

//*************************************************************
//인증/예약/수정
//*************************************************************





/***********************************************************
 *  기능: 제2운전자 면허구분
 * 	작성일자: 2016.01.06
 *	설명: 국제 or 국내 버튼 제어
 *
 ***********************************************************/

function doPostBack22() {

	if ($("select[name='licensedivtwo']").val() == "2") {
		$(".usa").show();
		$(".korean").hide();

	} else {

		$(".usa").hide();
		$(".korean").show();
	}
}



//면허 구분
function doPostBack2() {

	if ($("select[name='LicenseDiv']").val() == "2") {
		$(".e_ins").show();
		$(".k_ins").hide();
	} else {
		$(".e_ins").hide();
		$(".k_ins").show();
	}
}

// 로딩 배경 닫기
function lodingDivClose(){
	setTimeout(function(){
		$(".lodingDiv").hide();
		$(".lodingIcon").hide();
	},2000);
};


//시간 가져오기 sDate_, eDate_ 대여일시, 반납일시
function getResDate(val) {
	var oo = $("input[name='" + val + "']");
	var date = oo.val().split("/").join("");

	if (val == "rentDate") {
		var hour = $("#sHour").val();
		var min = $("#sMin").val();
	} else {
		var hour = $("#eHour").val();
		var min = $("#eMin").val();
	}

	date = date + hour + min + "00";
	if (date.length < 14) {
		return false;
	}
	return date;
}

function getDec(val){
	if(val<10) return "0"+val;
	else return val;
}

// 차이미지 URL검사
function imageUrlCHeck(url) {
	var protocol = location.protocol;
	var host = location.host;
	var fullUrl = protocol + "//" + host + url;

	var successCheck = false;
	// alert(fullUrl);
	$.ajaxSetup({cache:false});
	$.ajax({
		url : fullUrl,
		type : 'HEAD',
		async : false,
		success : function() {
			successCheck = true;
		}
	});

	return successCheck;
}

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

	if ((hdsNsdt <= hdsTd && hdsTd <= hdsNedt && hdsDt < hdsNedt2)) {
		return false;
	}
	return true;
}

/*function timeChk() {
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
	var hdsDt = $("input[name='sDate_']").val().replace("/", "").replace("/", "")
			+ $("option:selected", "#sHour").val() + $("option:selected", "#sMin").val(); // 대여일시
	var hdsNedt2 = td1.getFullYear() + "" + getDec(td1.getMonth() + 1) + ""
			+ getDec(td1.getDate()) + "09" + "00"; // 예약가능 최소시간

	if ((hdsNsdt <= hdsTd && hdsTd <= hdsNedt && hdsDt < hdsNedt2)) {
		return false;
	}
	return true;
}*/


/**
 * 20170112
 해당 지점은 #영업종료시간-1시간# 이후 다음날의 예약을 진행하는 경우
 대여시간은 #영업시작시간+1시간# 이후로 선택하셔야 예약이 가능합니다.
 대여시간을 다시 선택해 주세요.
 * **/
//20170112. 지점 예약가능 시간 제한
function validTimeChk(tfrom, tend) {
	var closeHour = Number(tend.substring(0,2)) - 1;
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
			+ $("option:selected", "#sHour").val() + $("option:selected", "#sMin").val(); // 대여일시

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

//서버시간 체크
function srvTime(){
	var xmlHttp;
	if (window.XMLHttpRequest) {//분기하지 않으면 IE에서만 작동된다.
		xmlHttp = new XMLHttpRequest(); // IE 7.0 이상, 크롬, 파이어폭스 등
		xmlHttp.open('HEAD',window.location.href.toString(),false);
		xmlHttp.setRequestHeader("Content-Type", "text/html");
		xmlHttp.send('');
		return xmlHttp.getResponseHeader("Date");
	} else if (window.ActiveXObject) {
		xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
		xmlHttp.open('HEAD',window.location.href.toString(),false);
		xmlHttp.setRequestHeader("Content-Type", "text/html");
		xmlHttp.send('');
		return xmlHttp.getResponseHeader("Date");
	}
}

function checkResDate() {

	// 날짜선택을 먼저 해야함.
	var sDate = getResDate("rentDate");
	if (!sDate) {
		alert("대여일을 선택하세요.");
		$("input[name='rentDate']").focus();
		return false;
	}
	var eDate = getResDate("returnDate");
	if (!eDate) {
		alert("반납일을 선택하세요.");
		$("input[name='returnDate']").focus();
		return false;
	}
	$("input[name='sDate']").val(sDate);
	$("input[name='eDate']").val(eDate);
}






//=====================================================================================================
/*
 * Express service 결재 및 예약
 */
var submitChk = false;
function reservationConfirmPay() {

	// 유효성
	if(!agreeAgreement.agreement()){
		return false;
	}

	//[DEV]podl
//	if(location.href.indexOf("14.49.24") > -1 || location.href.indexOf("t.lotterentacar.net") > -1) {
//		$("input[name='ipinResult']").val("Y");
//	}
	////////
	if($("input[name='ipinResult']").val() != "Y" ){
		alert("본인인증을 완료하셔야 예약을 완료할 수 있습니다.");
		return false;
	}

	var sTime = $("input[name='sDate']").val().replace(/-/g, "").substring(0, 12); //대여 시간
	var eTime = $("input[name='eDate']").val().replace(/-/g, "").substring(0, 12); //반납 시간
	var usePoint = $("input[name='pointUseFee']").val() ? $("input[name='pointUseFee']").val().split(",").join("") : '';

	var kstbw = $("input[name='kstbw']").val();
	if(sTime >= shiftTime(sTime,0,0,0,-4) && getCurrentTime() <= sTime && getHourInterval(sTime,eTime) >= 24 && ( carDiscountFee - usePoint ) >= 6000){
		$("#sun").show();
		$("input[name='pre_pay_yn']").val("Y");
	}else{
		$("#sun").hide();
		kstbw = 0;
		$("input[name='pre_pay_yn']").val("");
	}

	// 결재 금액 계산
	if(mysteryChk != "X"){
		var totRent = Number((Number(carDiscountFee) + Number(optionFee) + Number(optionBabyseatFee + optionCarseatFee + optionCarriageFee)) - usePoint)
					+Number(kstbw) + Number(insFee);
	}else{
		//알뜰카 일시 선결제 삭제
		var totRent = Number((Number(carRentFee) + Number(optionFee) + Number(optionBabyseatFee + optionCarseatFee + optionCarriageFee)) - usePoint)
					 + Number(insFee);
	}
	$("input[name='totRent']").val(totRent);


	// 변수 히든값으로 셋팅
	reservationSetting(totRent);

	if($("#price").val() < 1000){
		alert("1000원 이하는 결제 하실 수 없습니다.");
		return false;
	}
	if(submitChk == false){
		//document.payForm.target = "inicispay";
		//document.payForm.action = "/kor/reservation/expressPayOnly.do";
		//document.payForm.method = "post";
		//document.payForm.submit();
		var frm = document.payForm;
		var target = "payreserv";
		window.open("", target, "width=843,height=700,location=no,directories=no,status=no,toolbar=no,menubar=no,scrollbars=yes");
		frm.action = "/fr/kor/popup/popPayReservExpress.do";
		frm.target = target;
		frm.submit();
		submitChk = true;
	}else{
		alert("결제가 진행중입니다. 잠시 기다려 주십시오");
	}
}

//제주 선결제
function reservationJejuConfirmPay() {

	var sTime = $("input[name='sDate']").val().replace(/-/g, "").substring(0, 12); //대여 시간
	var eTime = $("input[name='eDate']").val().replace(/-/g, "").substring(0, 12); //반납 시간
	var usePoint = $("input[name='pointUseFee']").val() ? $("input[name='pointUseFee']").val().split(",").join("") : '';

	var kstbw = $("input[name='kstbw']").val();
	if(sTime >= shiftTime(sTime,0,0,0,-4) && getCurrentTime() <= sTime && getHourInterval(sTime,eTime) >= 24 && ( carDiscountFee - usePoint ) >= 6000){
		$("#sun").show();
		$("input[name='pre_pay_yn']").val("Y");
	}else{
		$("#sun").hide();
		kstbw = 0;
		$("input[name='pre_pay_yn']").val("");
	}

	// 결재 금액 계산
	if(mysteryChk != "X"){
		var totRent = Number((Number(carDiscountFee) + Number(optionFee) + Number(optionBabyseatFee + optionCarseatFee + optionCarriageFee)) - usePoint)
					+Number(kstbw) + Number(insFee);
	}else{
		//알뜰카 일시 선결제 삭제
		var totRent = Number((Number(carRentFee) + Number(optionFee) + Number(optionBabyseatFee + optionCarseatFee + optionCarriageFee)) - usePoint)
					 + Number(insFee);
	}
	$("input[name='totRent']").val(totRent);


	// 변수 히든값으로 셋팅
	reservationSetting(totRent);

	if($("#price").val() < 1000){
		alert("1000원 이하는 결제 하실 수 없습니다.");
		return false;
	}
	if(submitChk == false){
		//document.payForm.target = "inicispay";
		//document.payForm.action = "/kor/reservation/expressPayOnly.do";
		//document.payForm.method = "post";
		//document.payForm.submit();
		var frm = document.payForm;
		var target = "payreserv";
		window.open("", target, "width=843,height=700,location=no,directories=no,status=no,toolbar=no,menubar=no,scrollbars=yes");
		frm.action = "/fr/kor/popup/popPayReservJeju.do";
		frm.target = target;
		frm.submit();
		submitChk = true;
	}else{
		alert("결제가 진행중입니다. 잠시 기다려 주십시오");
	}
}

/** 20160905. bskwon
 *  결제취소,팝업닫기 클릭시 결제중 상태 초기화
 * */
function initPayChk() { //20160905. bskwon
	submitChk = false;
}


//변수값 셋팅
function reservationSetting(totRent){

	$("input[name='rentDate']").val($("input[name='sDate']").val());
	$("input[name='returnDate']").val($("input[name='eDate']").val());
	$("input[name='rentArea']").val($("input[name='rentArea']").val());
	$("input[name='rentBranch']").val($("input[name='rentBranch']").val());
	$("input[name='returnBranch']").val($("input[name='returnBranch']").val());
	$("input[name='realBranch']").val($("input[name='realBranch']").val());
	$("input[name='rentPlace']").val($("input[name='rentPlace']").val());
	$("input[name='returnPlace']").val($("input[name='returnPlace']").val());
	$("input[name='carCode']").val($("input[name='carCode']").val());
	$("input[name='carName']").val($("input[name='carName']").val());
	$("input[name='ldwCode']").val($("input[name='ldwCode']").val());
	$("input[name='ldwFee']").val(insFee);
	$("input[name='carRentFee']").val(carRentFee);
	$("input[name='discountRate']").val(carDiscount);
	$("input[name='optionStr']").val(makeOptionStr());
	$("input[name='onewayFee']").val($("input[name='onewayFee']").val());
	$("input[name='totalRentFee']").val((carDiscountFee + optionFee + insFee + onewayFee + dsFee_711 + jejuairportFee));
	$("input[name='pointUseYn']").val($("input[name='pointUseYn']").val());
	$("input[name='pointUseFee']").val($("input[name='pointUseFee']").val());
	$("input[name='reservNo']").val($("input[name='reservNo']").val());
	$("input[name='as_dlcr_yn']").val($("input[name='as_dlcr_yn']").val());
	$("input[name='ad_dlcr_fee']").val($("input[name='ad_dlcr_fee']").val());
	$("input[name='as_rtcr_yn']").val($("input[name='as_rtcr_yn']").val());
	$("input[name='ad_rtcr_fee']").val($("input[name='ad_rtcr_fee']").val());

	//알뜰카
	$("input[name='mysteryChk']").val($("#mysteryChk").val());
	$("input[name='mysteryCode']").val($("#mysteryCode").val());
	$("input[name='mysteryGroupName']").val($("#mysteryGroupName").val());

	//수정시 딜리버리값 확인을 위한 값
	$("input[name='old_as_dlcr_yn']").val($("input[name='old_as_dlcr_yn']").val());
	$("input[name='old_ad_dlcr_fee']").val($("input[name='old_ad_dlcr_fee']").val());
	$("input[name='old_as_rtcr_yn']").val($("input[name='old_as_rtcr_yn']").val());
	$("input[name='old_ad_rtcr_fee']").val($("input[name='old_ad_rtcr_fee']").val());

	$("input[name='rentZip']").val($("input[name='rentZip']").val());

	$("input[name='rentAddr1']").val($("input[name='rentAddr1']").val());
	$("input[name='rentAddr2']").val($("input[name='rentAddr2']").val());

	$("input[name='returnZip']").val($("input[name='returnZip']").val());
	$("input[name='returnAddr1']").val($("input[name='returnAddr1']").val());
	$("input[name='returnAddr2']").val($("input[name='returnAddr2']").val());

	$("input[name='eventCode']").val($("input[name='eventCode']").val());
	$("input[name='eventDiscount']").val($("input[name='eventDiscount']").val());

	$("input[name='cp_code']").val($("input[name='cp_code']").val());
	$("input[name='cp_dcrt']").val($("input[name='cp_dcrt']").val());
	$("input[name='cp_amt']").val($("input[name='cp_amt']").val());

	$("input[name='userName']").val($("input[name='userName']").val());
	$("input[name='userPhoneNo']").val($("input[name='phone1']").val() + "-"
			+ $("input[name='phone2']").val() + "-"
			+ $("input[name='phone3']").val());
	$("input[name='userEmail']").val($("input[name='userEmail']").val());

	// phone
	$("input[name='phone']").val($("input[name='phone1']").val() + "-"
			+ $("input[name='phone2']").val() + "-"
			+ $("input[name='phone3']").val());

	$("input[name='domic_license_no']").val($("option:selected", "#licenseNo1").val() + ""
			+ $("input[name='licenseNo2']").val() + ""
			+ $("input[name='licenseNo3']").val() + ""
			+ $("input[name='licenseNo4']").val());

	var acqMM	= $("input[name='licenseAcqMM']").val();
	var acqDD	= $("input[name='licenseAcqDD']").val();

	if(acqMM!=undefined){
		if(acqMM.length == 1){
			acqMM = "0"+acqMM;
		}
	}
	if(acqDD!=undefined){
		if(acqDD.length == 1){
			acqDD = "0"+acqDD;
		}
	}
	$("input[name='license_acq_date']").val($("input[name='licenseAcqYYYY']").val() + ""
			+ acqMM + ""
			+ acqDD);
	$("input[name='license_grade_code']").val($("select[name='licenseGradeCode']").val());


	var avlMM	= $("input[name='licenseAvlMM']").val();
	var avlDD	= $("input[name='licenseAvlDD']").val();

	if(avlMM!=undefined){
		if(avlMM.length == 1){
			avlMM = "0"+avlMM;
		}
	}
	if(avlDD!=undefined){
		if(avlDD.length == 1){
			avlDD = "0"+avlDD;
		}
	}
	$("input[name='license_avl_s_date']").val($("input[name='licenseAvlYYYY']").val() + ""
			+ avlMM + ""
			+ avlDD);


	//alert("@@@"+$("input[name='userName']").val());
	/*********************************************************************************
	 *  2016.01.25 제2운전자 추가
	 *
	 *  제주도 예약버튼 날릴때
	 *
	 **********************************************************************************/
	//alert("제주도제주도--예약저장쪽으로 옵니다....");

	twocheck = $("#rentForm input[name='twocheck']").val();                                            // 팝업 체크값::::
	licensedivtwo = $("option:selected", "#rentForm #licensedivtwo").val();           							// 제 2운전자 면허구분
	licensegradecodetwo = $("option:selected", "#rentForm #licensegradecodetwo").val();           	// 제 2운전자 면허종류 selected 박스

	birthdaytwo = $("#rentForm input[name= 'birthdaytwo']").val();           									// 제 2운전자 법정생년월일
	nametwo = $("#rentForm input[name= 'nametwo']").val();           										// 제 2운전자 이름

	licensenotwo1 = $("#rentForm input[name='licensenotwo1']").val();           							// 제 2운전자 면허증번호 1번쨰
	licensenotwo2 = $("#rentForm input[name='licensenotwo2']").val();           							// 제 2운전자 면허증번호 2번쨰
	licensenotwo3 = $("#rentForm input[name='licensenotwo3']").val();           							// 제 2운전자 면허증번호 3번쨰
	licensenotwo4 = $("#rentForm input[name='licensenotwo4']").val();           							// 제 2운전자 면허증번호 4번쨰
	licensenotwototal = $("option:selected", "#licensenotwo1").val() + "" + $("#rentForm input[name='licensenotwo2']").val() + "" + $("#rentForm input[name='licensenotwo3']").val() + "" + $("#rentForm input[name='licensenotwo4']").val();

	licenseacqyyyytwo = $("#rentForm input[name='licenseacqyyyytwo']").val();           			// 제 2운전자 면허발급일자 1번째
	licenseacqmmtwo = $("#rentForm input[name='licenseacqmmtwo']").val();           				// 제 2운전자 면허발급일자 2번째
	licenseacqddtwo = $("#rentForm input[name='licenseacqddtwo']").val();           					// 제 2운전자 면허발급일자 3번쨰
	licenseatcqotal = $("#rentForm input[name='licenseacqyyyytwo']").val() + "" + $("#rentForm input[name='licenseacqmmtwo']").val() + "" + $("#rentForm input[name='licenseacqddtwo']").val();

	licenseaviyyyytwo = $("#rentForm input[name='licenseaviyyyytwo']").val();                          // 제 2운전자 적성검사 1번쨰
	licenseavimmtwo = $("#rentForm input[name='licenseavimmtwo']").val();           					// 제 2운전자 적성검사 2번쨰
	licenseaviddtwo = $("#rentForm input[name='licenseaviddtwo']").val();           						// 제 2운전자 적성검사 3번쨰
	licenseavitotal = $("#rentForm input[name='licenseaviyyyytwo']").val() + "" + $("#rentForm input[name='licenseavimmtwo']").val() + "" + $("#rentForm input[name='licenseaviddtwo']").val();

	licensegradeentwo = $("#rentForm input[name='licensegradeentwo']").val();           		    // 제 2운전자 외국면허종류
	internationallicensenumbertwo = $("#rentForm input[name='internationallicensenumbertwo']").val();  // 제 2운전자 면허증 번호

	$("input[name='twocheck']").val(twocheck);
	$("input[name='licensedivtwo']").val(licensedivtwo);
	$("input[name='licensegradecodetwo']").val(licensegradecodetwo);
	$("input[name='birthdaytwo']").val(birthdaytwo);
	$("input[name='nametwo']").val(nametwo);
	$("input[name='licensenotwototal']").val(licensenotwototal);
	$("input[name='licenseatcqotal']").val(licenseatcqotal);
	$("input[name='licenseavitotal']").val(licenseavitotal);
	$("input[name='licensegradeentwo']").val(licensegradeentwo);
	$("input[name='internationallicensenumbertwo']").val(internationallicensenumbertwo);


/*
		alert("제주도 팝업체크값:::::::"+twocheck);
	alert("제주도 면허구분::::::"+licensedivtwo);
	alert("제주도 면허종류::::::"+licensegradecodetwo);
	alert("제주도 생년월일::::"+birthdaytwo);
	alert("제주도 이름::::"+nametwo);
*/
	/***************************************************************************************/
	// sap추가
	$("input[name='ldwcharge']").val($("input[name='LDWCHARGE']").val()); // LDW요금
	$("input[name='kbetr2']").val($("input[name='KBETR2']").val()); // 일일요금
	// $("input[name='kbetr3']").val($("input[name='KBETR3']").val()); //주중요금
	// $("input[name='kbetr4']").val($("input[name='KBETR4']").val()); //주말요금
	$("input[name='kbetr3']").val(Math.round($("input[name='dutimea2']").val()
			/ $("input[name='dutimea']").val() * carRentFee)); // 주중요금
	$("input[name='kbetr4']").val(Math.round($("input[name='dutimea3']").val()
			/ $("input[name='dutimea']").val() * carRentFee)); // 주말요금

	$("input[name='kbstd']").val($("input[name='KBSTD']").val()); // 할인이 적용 되지 않은 일일요금

	$("input[name='vkbur']").val($("input[name='VKBUR']").val()); // 사업장
	$("input[name='vkgrp']").val($("input[name='rentBranch']").val()); // 영업 그룹
	$("input[name='vkgrp2']").val($("input[name='realBranch']").val()); // 보유지점
	$("input[name='svkgrp']").val($("input[name='rentBranch']").val()); // 대여지점
	$("input[name='evkgrp']").val($("input[name='returnBranch']").val()); // 반납지점
	$("input[name='rvkgrp']").val($("input[name='rentBranch']").val()); // 계약지점
	$("input[name='guebg']").val($("input[name='sDate']").val().substring(0, 8)); // 대여일
	$("input[name='stime']").val($("input[name='sDate']").val().substring(8, 14)); // 대여시간
	$("input[name='gueen']").val($("input[name='eDate']").val().substring(0, 8)); // 반납일
	$("input[name='etime']").val($("input[name='eDate']").val().substring(8, 14)); // 반납시간

	$("input[name='duday']").val($("input[name='DUDAY']").val()); // 대여기간(일)
	$("input[name='dutime']").val($("input[name='DUTIME']").val()); // 대여기간(시간)
	$("input[name='duday2']").val($("input[name='DUDAY2']").val()); // 휴일대여기간(일)
	$("input[name='dutime2']").val($("input[name='DUTIME2']").val()); // 휴일대여기간(시간)
	$("input[name='duday3']").val($("input[name='DUDAY3']").val()); // 평일대여기간(일)
	$("input[name='dutime3']").val($("input[name='DUTIME3']").val()); // 평일대여기간(시간)
	$("input[name='discount']").val($("input[name='DISCOUNT']").val());
	$("input[name='matnr']").val($("input[name='MATNR']").val()); // 자재번호--
	$("input[name='mvgr2']").val(carSize); // 차량유형
	$("input[name='gtrwr']").val(carRentFee + Math.round($("input[name='LDWCHARGE']").val())
			+ Math.round($("input[name='onewayFee']").val()) + dsFee_711 + Math.round(jejuairportFee)); // 총대여료
	$("input[name='gtdwr']").val(carRentFee - carDiscountFee);
	$("input[name='balnc']").val(carDiscountFee);
	$("input[name='lentf']").val((mysteryChk != "X" ? getRentFee() : getMysteryRentFee()));

	$("input[name='totlaPoint']").val(Math.round($("input[name='totalPoint']").val()));
	$("input[name='pointUseFee']").val($("input[name='pointUseFee']").val() ? $(
			"input[name='pointUseFee']").val().split(",").join("") : '');

	$("input[name='splace']").val($("input[name='splace']").val());
	$("input[name='eplace']").val($("input[name='eplace']").val());

	$("input[name='dsiwr']").val(hdsFee);

	$("input[name='mysteryChk']").val($("input[name='mysteryChk']").val());
	$("input[name='mysteryCode']").val($("input[name='mysteryCode']").val());
	// 선결제 여부
//	alert("pre_pay_yn ::"+$("input[name='pre_pay_yn']").val());
	$("input[name='pre_pay_yn']").val($("input[name='pre_pay_yn']").val());

	var optionMap = {
		"1O101" : "내비게이션",
		"1O107" : "영문 네비게이션",
		"1O110" : "인스탁스 미니",
		"1O111" : "인스탁스 와이드",
		"1O106" : "tx내비게이션",
		"1O102" : "베이비시트",
		"1O112" : "카시트(영유아용)",
		"1O113" : "카시트(유아용)",
		"1O114" : "카시트(주니어용)",
		"1O115" : "유모차(절충형)",
		"1O116" : "유모차(휴대형)",
	};
	var options = [];
	var option_cd = [];
	var option_fee = [];
	$(".ckEvent:checked").each(function(i, s) {
		if($(s).prop("checked")){
			option_cd[i] = s.id;
			options[i] = optionMap[s.id];
			option_fee[i] = $(s).attr("price");
		}
	});

	$("input[name='options']").val(options.join(","));
	$("input[name='option_cd']").val(option_cd.join(","));
	$("input[name='option_fee']").val(option_fee.join(","));
	$("input[name='systm']").val($("input[name='camping_yn']").val()); // J-제주,CAMP-캠핑,S-오픈카

	// 할인 ( 회원할인인 경우 )
	$("input[name='kschn']").val($("input[name='KSCHN']").val()); // 조건유형
	$("input[name='krate']").val($("input[name='KRATE']").val()); // 할인율
	$("input[name='waerk']").val($("input[name='WAERK']").val());// SD문서통화
	$("input[name='krech']").val($("input[name='KRECH']").val()); // 조건의 계산유형
	$("input[name='name1']").val($("input[name='NAME1']").val());// 이름1
	$("input[name='kschn_tx']").val($("input[name='KSCHN_TX']").val());// 이름
	$("input[name='kbetr']").val($("input[name='KBETR']").val());// 할인금액
	$("input[name='bname']").val($("input[name='BNAME']").val());// 쿠폰번호

	// 이벤트할인
	$("input[name='eventKschn']").val($("input[name='EventKschn']").val()); // 조건유형
	$("input[name='eventKrate']").val($("input[name='EventKrate']").val()); // 할인율
	$("input[name='eventWaerk']").val($("input[name='EventWaerk']").val());// SD문서통화
	$("input[name='eventKrech']").val($("input[name='EventKrech']").val()); // 조건의 계산유형
	$("input[name='eventName1']").val($("input[name='EventName1']").val());// 이름1
	$("input[name='eventKschn_tx']").val($("input[name='EventKschn_tx']").val());// 이름
	$("input[name='eventKbetr']").val($("input[name='EventKbetr']").val());// 할인금액
	$("input[name='eventBname']").val($("input[name='EventBname']").val());// 쿠폰번호

	// 쿠폰할인
	$("input[name='couponKschn']").val($("input[name='CouponKschn']").val()); // 조건유형
	$("input[name='couponKrate']").val($("input[name='CouponKrate']").val()); // 할인율
	$("input[name='couponWaerk']").val($("input[name='CouponWaerk']").val());// SD문서통화
	$("input[name='couponKrech']").val($("input[name='CouponKrech']").val()); // 조건의 계산유형
	$("input[name='couponName1']").val($("input[name='CouponName1']").val());// 이름1
	$("input[name='couponKschn_tx']").val($("input[name='CouponKschn_tx']").val());// 이름
	$("input[name='couponKbetr']").val($("input[name='CouponKbetr']").val());// 할인금액
	$("input[name='couponBname']").val($("input[name='CouponBname']").val());// 쿠폰번호

	// 이전쿠폰할인
	$("input[name='oldCouponKschn']").val($("input[name='OldCouponKschn']").val()); // 조건유형
	$("input[name='oldCouponKrate']").val($("input[name='OldCouponKrate']").val()); // 할인율
	$("input[name='oldCouponWaerk']").val($("input[name='OldCouponWaerk']").val());// SD문서통화
	$("input[name='oldCouponKrech']").val($("input[name='OldCouponKrech']").val()); // 조건의 계산유형
	$("input[name='oldCouponName1']").val($("input[name='OldCouponName1']").val());// 이름1
	$("input[name='oldCouponKschn_tx']").val($("input[name='OldCouponKschn_tx']").val());// 이름
	$("input[name='oldCouponKbetr']").val($("input[name='OldCouponKbetr']").val());// 할인금액
	$("input[name='oldCouponBname']").val($("input[name='OldCouponBname']").val());// 쿠폰번호

//	alert("krate ::"+$("input[name='krate']").val());
//	alert("EventKrate ::"+$("input[name='EventKrate']").val());
//	alert("CouponKrate ::"+$("input[name='CouponKrate']").val());

	// 화성셋팅 - 대차 / 반차가 화성일 경우
	if ($("input[name='returnPlace']").val() == "화성" || $("input[name='returnPlace']").val() == "화성보험영업소") {
//	if ($("input[name='returnBranch']").val() == "511" ){
		$("input[name='returnVtweg']").val("X");
	}

	$("input[name='vtweg']").val($("input[name='vtweg']").val());
	$("input[name='liznr']").val($("input[name='liznr']").val());
	$("input[name='returnVtweg']").val($("input[name='returnVtweg']").val());

	// 배반차 셋팅
	$("input[name='revDcPlaceKschn']").val($("input[name='revDcPlaceKschn']").val());
	$("input[name='revDcPlaceKschn_tx']").val($("input[name='revDcPlaceKschn_tx']").val());
	$("input[name='revDcPlaceKbetr']").val($("input[name='revDcPlaceKbetr']").val());
	$("input[name='revDcPlaceKonwa']").val($("input[name='revDcPlaceKonwa']").val());

	//무료 업그레이드
	$("input[name='upChk']").val($("#rentForm input[name='upChk']").val());
	$("input[name='upCarRealBranch']").val($("#rentForm input[name='upCarRealBranch']").val());
	$("input[name='upCarCode']").val($("#rentForm input[name='upCarCode']").val());
	$("input[name='upCarName']").val($("#rentForm input[name='upCarName']").val());
	$("input[name='upCarSize']").val($("#rentForm input[name='upCarSize']").val());

	// 지역할인
	$("input[name='konda']").val($("input[name='konda']").val());

	// INCDW 셋팅
	var strIncdw = "";
	if ($("input[name='memberGrade']").val() != "비회원") {
		if ($("input[name='CouponWaerk']").val() == "%" || $("input[name='EventWaerk']").val() == "%") {
			if ($("input[name='EventIncdw']").val() == "" || $("input[name='CouponIncdw']").val() == "") {
				strIncdw = " ";
			} else {
				strIncdw = "X";
			}
		} else {
			if($("input[name='DISCOUNT_GUBUN']").val()=='E')
				strIncdw = $("input[name='incdw']").val();
			else
				strIncdw = "X";
		}
	} else {
		strIncdw = " ";
	}
	$("input[name='incdw']").val(strIncdw);

	var kschl = new Array();
	var krech = new Array();
	var kbewr = new Array();
	var name1 = new Array();
	var maktx = new Array();
	var waers = new Array();
	var kbetr = new Array();
	var bname = new Array();

	var kbetrTmp = new Array();

	var num = 1;
	if (realGiftCardCount > 0) {

		for ( var i = 0; i < realGiftCardCount; i++) {
			kschl[i] = $("input[name='kschl" + num + "']").val();
			krech[i] = $("input[name='krech" + num + "']").val();
			kbewr[i] = $("input[name='kbewr" + num + "']").val();
			name1[i] = $("input[name='name1" + num + "']").val();
			maktx[i] = $("input[name='maktx" + num + "']").val();
			waers[i] = $("input[name='waers" + num + "']").val();
			bname[i] = $("input[name='bname" + num + "']").val();

			if (kschl[i] == "RB02") {
				kbetr[i] = $("input[name='kbetrTmp" + num + "']").val();
			} else {
				kbetr[i] = $("input[name='kbetr" + num + "']").val();
			}

			num = num + 1;

			// alert(i + "::" + name1[i] + "::" + kbetr[i] )
		}

	} else {
		kschl[0] = 0;
		krech[0] = 0;
		kbewr[0] = 0;
		name1[0] = 0;
		maktx[0] = 0;
		waers[0] = 0;
		kbetr[0] = 0;
		bname[0] = 0;
	}

	$("input[name='giftCardKschl']").val(kschl);
	$("input[name='giftCardKrech']").val(krech);
	$("input[name='giftCardKbewr']").val(kbewr);
	$("input[name='giftCardName1']").val(name1);
	$("input[name='giftCardMaktx']").val(maktx);
	$("input[name='giftCardWaers']").val(waers);
	$("input[name='giftCardKbetr']").val(kbetr);
	$("input[name='giftCardBname']").val(bname);

	$("input[name='realGiftCardCount']").val(realGiftCardCount);
	$("input[name='tempLastDiscountFee']").val(tempLastDiscountFee);
	$("input[name='maxCount']").val(maxCount);

	// 결제금액
	$("input[name='price']").val(totRent);
}

/*
 * 빠른(Express) 서비스 본인인증
 */
function returnIpin(msg){

	if(msg == "Y"){
		alert("본인 인증을 확인했습니다.");
		$("input[name='ipinResult']").val("Y");
	}
}

/*
 * 예약 및 결제 안내
 */
function reservationInfo(){
	window.open("/fr/kor/popup/pop_reservation_infor.do", "pop_reservation_infor", "width=850,height=600,location=no,directories=no,status=no,toolbar=no,menubar=no,scrollbars=yes");
}

/*
 * 빠른(Express) 서비스 동의서 작성
 */
function returnAgreement(yyyy, mm, dd, name){
		$("input[name='agreementResult']").val("Y");
		agreeAgreement.popupSetting(yyyy, mm, dd, name);
}
/*
 * 빠른(Express) 동의서 팝업 호출
 */
function expressAgreement(){
	window.open("/fr/kor/popup/expressAgreement.do", "expressAgreement", "width=1000,height=800,location=no,directories=no,status=no,toolbar=no,menubar=no,scrollbars=yes");
}

/*
 * 빠른(Express) 동의서 전체동의
 */
function completeAgreement(){
	agreeAgreement.allAgreement();
}

//빠른(Express) 서비스 본인인증 ( 아이핀 인증 )
function certKCBIpin(){
	var popupWindow = window.open( "", "kcbpop", "left=200, top=100, status=0, width=450, height=550" );
	document.kcbInForm.target = "kcbpop";

 //KCB 운영서버를 호출할 경우
	document.kcbInForm.action = "https://ipin.ok-name.co.kr/tis/ti/POTI01A_LoginRP.jsp";

	document.kcbInForm.submit();
	popupWindow.focus();
	return;
}

function hscertPopPw(){
	window.open("/fr/kor/reservation/safe_hs_cert_express.do", "auth_popup", "width=430,height=590,scrollbar=yes");
}

//아이핀,핸드폰 인증시 완료시 실행
function joinUsSubmitIpinPass(ci,di,nm){
	alert("본인 인증을 확인했습니다.");
	$("input[name='ipinResult']").val("Y");
}

//로딩 배경 띄우기
function lodingDivOpen(){
	$(".lodingDiv").css({
		"position":"absolute",
		"top":0,
		"left":0,
		"width":"100%",
		"height":"100%",
		"z-index":"50000",
		"background":"#000",
		"text-align":"center",
		"opacity":"0.2"
	});
	$(".lodingIcon").css({
		"position":"absolute",
		"top":($(window).height()/2-8)+"px",
		"left":($(window).width()/2-8)+"px",
		"z-index":"50001"
	});
	$(".lodingDiv").show();
	$(".lodingIcon").show();
};

/*function setBranchReturnCheck(aCode , bCode){
	var areaCode = aCode;
	var check ="N";
	var rentTime = "";
	if($("#sHour").val()!="" && $("#sMin").val()!=""){
		rentTime = $("#sHour").val()+""+$("#sMin").val()+"00";
	} else {
		rentTime = "";
	}
	var returnTime = "";
	if($("#eHour").val()!="" && $("#eMin").val()!=""){
		returnTime = $("#eHour").val()+""+$("#eMin").val()+"00";
	} else {
		returnTime = "";
	}

	var hdsCheck = "";
	if ($("input[name='hdsCheck']").prop('checked')) {
		if($("input[name='hdsType']:checked").val()=="3"){
			hdsCheck = "A";
		} else if($("input[name='hdsType']:checked").val()=="2"){
			hdsCheck = "B";
		} else if($("input[name='hdsType']:checked").val()=="1"){
			hdsCheck = "C";
		}
	} else {
		hdsCheck = "";
	}

	var jejuAuto = "";
	if(areaCode=="6"){
		jejuAuto = "X";
	}

	var carCode = $("input[name='carCode']").val();
	//날짜변경시
	if($("#editChk").val()=="1" || nowProcess=="D"){
		carCode = "";
	}
	$.ajax({
		type: "POST",
		dataType: "json",
		async : false,
		url : "/fr/kor/reservation/branchList.do",
		data : {
			gubun : "S",
			carCode : carCode,
			rentDate : $("input[name='eDate_']").val().replace("/", "").replace("/", ""),
			rentTime : returnTime,
			returnDate : $("input[name='eDate_']").val().replace("/", "").replace("/", ""),
			returnTime : returnTime,
			areaCode : areaCode,
			dsGubun : hdsCheck,
			jejuAuto : jejuAuto
		},
		success : function(data) {
			$.each(data.branchList, function(i,s){
				if(bCode == s.VKGRP){
					if(s.ENABLE2 == "X" ){
						check ="Y";
					}else{
						check ="N";
					}

				}
			});

		},
		error:function(request,status,error){
			check ="N";
		}
	});
	return check;
}*/

//20160812. 제주(622)/인천공항(503)은 90일 뒤까지 예약 가능, 그 외 60일
function refreshDatepicker(dayterm) {
	//달력 재세팅
	if(LIMIT_TERM != dayterm) {
		$( "#reservDatepicker1" ).datepicker("destroy");
		$( "#reservDatepicker1" ).datepicker({
			minDate:new Date(srvTime()),
			maxDate:'+'+dayterm+'d',
			showButtonPanel: true,
			dateFormat: "yy.mm.dd" //날짜 출력 형식
		});
		$( "#reservDatepicker1" ).datepicker("refresh");
	}

	//////////////////////////////////////////////////////////////////////////////
	//대여일시를 재세팅 할경우 >> dayterm == LIMIT_TERM_60 && 대여일 인풋값이 현재일 +60일을 넘었다면
/*	var td = new Date(srvTime());
	var td6 = new Date(Date.parse(td) + 1000 * 60 * 60 * 24 * LIMIT_TERM_60);
	var today6 = "" + td6.getFullYear() + getDec(td6.getMonth() + 1)
			+ getDec(td6.getDate()) + getDec(td6.getHours())
			+ getDec(td6.getMinutes()) + "00";
	var msg = IS_JEJU == "Y" ? "" : "\n(단, 인천공항점은 90일까지 가능)";

	if(dayterm == LIMIT_TERM_60 && $("input[name='sDate']").val() > today6) {
		alert("대여일은 현재일로부터 60일 이내여야 합니다."+msg);
		dateSetting();
	}*/
	//////////////////////////////////////////////////////////////////////////////

	LIMIT_TERM = dayterm; //대여가능일 스왑
}

function fnEvent(){
	if($('#eventSpan').hasClass("disabled")){
		$('#eventSpan').removeClass('disabled');
	}
	$("#selEvent").selectmenu({
		disabled: false
	});
	if($('#couponSpan').hasClass("disabled") == false){
		$('#couponSpan').addClass('disabled');
	}
	$("#selCoupon").selectmenu({
		disabled: true
	});
}

function fnCoupon(){
	$("#selEvent").selectmenu({
		disabled: true
	});
	if($('#couponSpan').hasClass("disabled")){
		$('#couponSpan').removeClass('disabled');		
	}
	$("#selCoupon").selectmenu({
		disabled: false
	});
	if($('#eventSpan').hasClass("disabled") == false){
		$('#eventSpan').addClass('disabled');
	}
}

function fnSale() {
	$('#eventSpan').addClass('disabled');
	$('#couponSpan').addClass('disabled');
	$("#selEvent").prop("disabled",true);
	$("#selCoupon").prop("disabled",true);
}

function cdwCheck(LS_CHR_DC,LD_LDW_CHARGE) {
	var lsChrDc = String(LS_CHR_DC).length;
	
	if(lsChrDc == "1") {
		$("#ldwCode").val("0"+LS_CHR_DC)	
	} else{
		$("#ldwCode").val(LS_CHR_DC)
	}
	$("#LDWCHARGE").val(LD_LDW_CHARGE)
	totalPrice();
}


	function layerPop (id) {
		var layer = null;
		var dimm = null;
		var scrollTop = $(window).scrollTop();

		if ($(id).hasClass('layer_b')) {
			$('body').append('<div class="dimm_w"></div>');
			layer = function() {
				if ($(id).height() >= $(window).height()) {
					$(id).find('.layer_con').height($(window).height() - 160);
				}

				$(id).find('.layer_con').height($(window).height() - 50);

				$(id).css({
					'top':0
				});

				dimm = '.dimm_w';

				$(dimm).css({
					'width': $('html, body').width(),
					'height': $('html, body').height()
				}).show();                
			}

			$('#container').hide();
		}

		else {            
			$('body').append('<div class="dimm_b"></div>');
			layer = function() {
				$(id).css({
					'top': $(window).scrollTop() + $(window).height() / 2 - $(id).outerHeight() / 2                
				});

				dimm = '.dimm_b';

				$(dimm).css({
					'top': $(window).scrollTop(),
					'width': $(window).width(),
					'height': $(window).height()
				}).show();                
			}

			$(document).on("mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll", function(e) {
				e.preventDefault();
				return;
			});
		}

		layer();
		$('html, body').css('overflow','hidden');
		$(id).show().attr('tabindex',0).focus();

		$('h2.type2').css({
			'padding-top':($('.layer_tit').height() - $(id).find('h2.type2').height()) / 2
		});
	}