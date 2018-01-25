var LCalendar, lCalendarEvent;

LCalendar = function (selector, date) {
	this.selector = null;

	this.date = null;

	this.currentYear = null;
	this.currentMonth = null;
	this.currentDate = null;
	this.currentDay = null;

	this.todayYear = null;
	this.todayMonth = null;
	this.todayDate = null;
	this.today = null;

	this.rentable = null;
	this.rentableYear = null;
	this.rentableMonth = null;
	this.rentableDate = null; 	

	this.dateString = null;
	this.lastDate = null;
	this.currentLastDate = null;
	this.week = null

	this.prevDate = null;
	this.nextDate = null;

	this.selectedYear = null;
	this.selectedMonth = null;
	this.selectedDate = null;
	this.selected = null;

	this.selectedRentYear = null;
	this.selectedRentMonth = null;
	this.selectedRentDate = null;
	this.selectedRent = null;

	this.rentDate = null;
	this.returnable = null;
	this.returnableYear = null;
	this.returnableMonth = null;
	this.returnableDate = null;


	this.cal = null;
	this.focus = null

	this.init(selector, date);
}

LCalendar.prototype.init = function(selector, date, cal, focus) {

	this.focus = focus;

	this.selector = selector;

	if( typeof(date) !== 'undefined' ) {
		this.date = date.split('/');
		this.date[1] = this.date[1] - 1;
		this.date = new Date(this.date[0], this.date[1], this.date[2]);
	}

	else {
		this.date = new Date();
	}

	this.cal = cal;

	this.currentYear = this.date.getFullYear();
	this.currentMonth = this.date.getMonth() + 1;	// 월은 0부터 시작
	this.currentDate = this.date.getDate();
	
	this.date.setDate(1);
	this.currentDay = this.date.getDay();	// 요일은 0부터 시작

	// this.selected = this.currentYear + '/' + this.currentMonth + '/' + this.currentDate;

	this.today = new Date();
	this.todayYear = this.today.getFullYear();
	this.todayMonth = this.today.getMonth() + 1;
	this.todayDate = this.today.getDate();

	if( this.todayMonth < 10 ) {
		this.todayMonth = '0' + this.todayMonth;
	}

	this.selectedRent = new Date(this.selectedRentYear,this.selectedRentMonth,this.selectedRentDate);

	if ($(selector).hasClass('limit')) {
		this.rentable = new Date(this.todayYear,this.todayMonth,(this.todayDate + 90));	
		this.returnable = new Date(this.selectedRent.getFullYear(),this.selectedRent.getMonth(),(this.selectedRent.getDate() + 30));
	}
	else {
		this.rentable = new Date(this.todayYear,this.todayMonth,(this.todayDate + 60));
		this.returnable = new Date(this.todayYear,this.todayMonth,(this.todayDate + 60));
	}
	
	this.rentableYear  = this.rentable.getFullYear();
	this.rentableMonth = this.rentable.getMonth();
	this.rentableDate = this.rentable.getDate();

	this.returnableYear = this.returnable.getFullYear();
	this.returnableMonth = this.returnable.getMonth();
	this.returnableDate = this.returnable.getDate();	

	this.dateString = new Array('sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat');
	this.lastDate = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	if( (this.currentYear % 4 === 0 && this.currentYear % 100 !== 0) || this.currentYear % 400 === 0 ){
		this.lastDate[1] = 29;
	}
	//각 달의 마지막 일을 계산, 윤년의 경우 년도가 4의 배수이고 100의 배수가 아닐 때 혹은 400의 배수일 때 2월달이 29일 임.
	
	this.currentLastDate = this.lastDate[this.currentMonth-1];
	this.week = Math.ceil(( this.currentDay + this.currentLastDate) / 7 );	//총 몇 주인지 구함.
	
	if (this.currentMonth != 1) {
		this.prevDate = this.currentYear + '/' + (this.currentMonth - 1) + '/' + this.currentDate;
	}

	else {
		this.prevDate = ( this.currentYear - 1 ) + '/' + 12 + '/' + this.currentDate;	// 이번달이 1월이라면 1년 전 12월로 출력.
	}
	
	if(this.currentMonth != 12) {
		this.nextDate = this.currentYear + '/' + ( this.currentMonth + 1 ) + '/' + '1';	//this.currentDate;
	}

	else {
		this.nextDate = ( this.currentYear + 1 ) + '/' + 1 + '/' + '1'; //this.currentDate;
	}

	//만약 이번달이 12월이라면 1년 후 1월로 출력.

	if(this.currentMonth < 10 ){
		this.currentMonth = '0' + this.currentMonth; //10월 이하라면 앞에 0을 붙여준다.
	}
	
	this.showCalendar(selector, date, cal);
};

LCalendar.prototype.showCalendar = function(selector, date, cal) {
	
	$(this.selector).parents('.layer_con').addClass('calendar');
	
	var currentMonthEng = null;

	if(this.currentMonth == 1) {
		currentMonthEng  = 'Jan'
	}

	if(this.currentMonth == 2) {
		currentMonthEng  = 'Feb'
	}

	if(this.currentMonth == 3) {
		currentMonthEng  = 'Mar'
	}

	if(this.currentMonth == 4) {
		currentMonthEng  = 'Apr'
	}

	if(this.currentMonth == 5) {
		currentMonthEng  = 'May'
	}

	if(this.currentMonth == 6) {
		currentMonthEng  = 'Jun'

	}

	if(this.currentMonth == 7) {
		currentMonthEng  = 'Jul'
	}

	if(this.currentMonth == 8) {
		currentMonthEng  = 'Aug'
	}

	if(this.currentMonth == 9) {
		currentMonthEng  = 'Sep'
	}

	if(this.currentMonth == 10) {
		currentMonthEng  = 'Oct'
	}
	
	if(this.currentMonth == 11) {
		currentMonthEng  = 'Nov'
	}

	if(this.currentMonth == 12) {
		currentMonthEng  = 'Dec'
	}

	this.calendar = '<div class="top_cal">';

	this.calendar += '	<a href="#" title="" class="btn_prev">Previous</a>';

	this.calendar += '	<a href="#" class="btn_next">next</a>';

	this.calendar += '	<span class="txt">' + currentMonthEng + ' ' + this.currentYear + '</span>';

	this.calendar += '</div>';

	this.calendar += '<div class="calendar">';

	this.calendar += '	<table>';

	this.calendar += '		<colgroup>';

	this.calendar += '			<col style="width:45px;">';

	this.calendar += '			<col style="width:45px;">';

	this.calendar += '			<col style="width:45px;">';

	this.calendar += '			<col style="width:45px;">';

	this.calendar += '			<col style="width:45px;">';

	this.calendar += '			<col style="width:45px;">';

	this.calendar += '			<col style="width:45px;">';

	this.calendar += '		</colgroup>';

	this.calendar += '		<caption>' + currentMonthEng + ' ' + this.currentYear + ' calender </caption>';

	this.calendar += '		<thead>';

	this.calendar += '			<tr>';

	this.calendar += '				<th>Su</th>';

	this.calendar += '				<th>Mo</th>';

	this.calendar += '				<th>Tu</th>';

	this.calendar += '				<th>We</th>';

	this.calendar += '				<th>Th</th>';

	this.calendar += '				<th>Fr</th>';

	this.calendar += '				<th>Sa</th>';

	this.calendar += '			</tr>';

	this.calendar += '		</thead>';

	this.calendar += '		<tbody>';

	

	this.dateNum = 1 - this.currentDay;



	for(var i = 0; i < this.week; i++) {
		this.calendar += '			<tr>';
		for(var j = 0; j < 7; j++, this.dateNum++) {
			if( this.dateNum < 1 || this.dateNum > this.currentLastDate ) {
				this.calendar += '				<td class="' + this.dateString[j] + '"> </td>';
				continue;
			}

			if (this.currentYear <= this.todayYear && this.currentMonth <= this.todayMonth && this.dateNum < this.todayDate) {
				this.calendar += '				<td class="' + this.dateString[j] + ' disabled">' + this.dateNum + '</td>';
			}

			else if (this.cal == 'rent' && this.rentableYear <= this.currentYear && this.rentableMonth <= this.currentMonth && this.rentableDate <= this.dateNum) {
				this.calendar += '				<td class="' + this.dateString[j] + ' disabled">' + this.dateNum + '</td>';
			}

			else if (this.cal == 'return' && this.returnableYear >= this.currentYear && this.returnableMonth > this.currentMonth && this.returnableDate >= this.dateNum) {
				this.calendar += '				<td class="' + this.dateString[j] + ' disabled">' + this.dateNum + '</td>';
			}

			else if (this.currentYear <= this.selectedRentYear && this.currentMonth <= this.selectedRentMonth && this.dateNum < this.selectedRentDate) {
				this.calendar += '				<td class="' + this.dateString[j] + ' disabled">' + this.dateNum + '</td>';
			}

			else if (this.currentYear === this.selectedYear && this.currentMonth === this.selectedMonth && this.dateNum == this.selectedDate) {
				this.calendar += '				<td class="' + this.dateString[j] + ' on"><a href="#" class="dateNum">' + this.dateNum + '</a></td>';	
			}		

			else {
				this.calendar += '				<td class="' + this.dateString[j] + '"><a href="#" class="dateNum">' + this.dateNum + '</a></td>';	
			}

		}
		this.calendar += '			</tr>';
	}
	
	this.calendar += '			</tbody>';
	this.calendar += '		</table>';
	this.calendar += '	</div>';
	
	$(this.selector).html(this.calendar);

	$(selector + ' .btn_' + this.focus).focus();

	if (this.currentDate < 10) {
		this.currentDate = '0' + this.currentDate;
	}

	this._initEvent(selector, date);
};

LCalendar.prototype._initEvent = function(selector,date) {
	var objThis = this;

	$(this.selector).find('.btn_prev').click(function(e){
		e.preventDefault();
		if (objThis.selectedRentMonth === null) {
			if (objThis.currentYear > objThis.todayYear || objThis.currentMonth > objThis.todayMonth) {
				objThis.init(selector,objThis.prevDate,'rent','prev');
			}
		}
		else {
			if (objThis.date >= objThis.today && objThis.currentYear >= objThis.selectedRentYear && objThis.currentMonth >= objThis.selectedRentMonth + 1) {
				objThis.init(selector,objThis.prevDate,'return','prev');
			}
		}
	});

	$(this.selector).find('.btn_next').click(function(e){
		e.preventDefault();

		if (objThis.rentableYear >= objThis.currentYear && objThis.rentableMonth - 1 >= objThis.currentMonth) {
			objThis.init(selector,objThis.nextDate,'rent','next');	
		}

		else if (objThis.returnableYear >= objThis.currentYear && objThis.returnableMonth - 1 >= objThis.currentMonth) {
			objThis.init(selector,objThis.nextDate,'return','next');	
		}	
/*
		if (selector == '.calendar_s' || selector == '.calendar_sd') {
			objThis.init(selector,objThis.nextDate,'rent','next');
		}

		else {
			if (selector == '.left_cal .calendar_b') {
				if (objThis.rentableYear >= objThis.currentYear && objThis.rentableMonth - 1 >= objThis.currentMonth) {
					objThis.init(selector,objThis.nextDate,'rent','next');	
				}
			}
			else {
				if (objThis.returnableYear >= objThis.currentYear && objThis.returnableMonth - 1 >= objThis.currentMonth) {
					objThis.init(selector,objThis.nextDate,'return','next');	
				}	
			}
		}
*/
	});

	$(this.selector).find('a.dateNum').click(function(e){
		e.preventDefault();

		$(this).parents('table').find('td').removeClass('on');
		$(this).parent().addClass('on');

		objThis.selectedYear = objThis.currentYear;
		objThis.selectedMonth = objThis.currentMonth;
		objThis.selectedDate = $(this).text();

		if (objThis.selectedDate < 10) {
			objThis.selectedDate = '0' + objThis.selectedDate;
		}

		objThis.selected = objThis.selectedYear + '/' + objThis.selectedMonth + '/' + objThis.selectedDate;
		
		if($(this).parents().is('.calendar_b')) {
			$(this).parents('.calendar_b').siblings('.cal_date').find('.date').html(objThis.selected);
		}
		else if ($(this).parents().is('.calendar_sd')) {
			$(this).parents('.calendar_sd').siblings('.cal_date').find('.date').html(objThis.selected);	
		}

		var $layerBtn = $('.' + $(this).parents('.layer').attr('id'));

		if (selector == '.calendar_s' || selector == '.calendar_sd') {
		}

		else {
			if (selector.match('.left_cal .calendar_b')) {
				$layerBtn.siblings('.rent_date').val(objThis.selected);
				$layerBtn.siblings('.start_date').val(objThis.selected);
			}
			if (selector.match('.right_cal .calendar_b')) {
				$layerBtn.siblings('.return_date').val(objThis.selected);
				$layerBtn.siblings('.end_date').val(objThis.selected);
			}
		}

	});
};

lCalendarEvent = function($rentCal, $returnCal){
	this._initEvent($rentCal, $returnCal);
}

lCalendarEvent.prototype._initEvent = function($rentCal, $returnCal) {

	var objThis = this;
	$($rentCal.selector).find('a.dateNum').click(function(){
	
		if ($rentCal.selectedYear > $returnCal.selectedYear) {
			$returnCal.selectedYear = null;
		}

		if ($rentCal.selectedMonth > $returnCal.selectedMonth) {
			$returnCal.selectedMonth = null;
		}

		$returnCal.selectedRentYear = $rentCal.selectedYear;
		$returnCal.selectedRentMonth = $rentCal.selectedMonth;
		$returnCal.selectedRentDate = $rentCal.selectedDate;


		var	rentMonth = new Date($rentCal.currentYear,$rentCal.currentMonth),
			currentReturnMonth = new Date($returnCal.currentYear,$returnCal.currentMonth);

		if ($rentCal.selected > $returnCal.selected) {
			// $returnCal.$calendar.siblings('.cal_date').find('.date').html('YYYY/MM/DD');
		}

		if ($returnCal.selectedMonth !== null) {
			if ($rentCal.date >= $returnCal.date) {
				$returnCal.init($returnCal.selector, $rentCal.selected,'return');
				
			}
			else {
				if ($returnCal.currentYear >= $returnCal.returnableYear && $returnCal.currentMonth > $returnCal.returnableMonth) {
					$returnCal.init($returnCal.selector, $rentCal.selected,'return');
				}
				else {
					$returnCal.init($returnCal.selector, $returnCal.selected,'return');
				}
			}
		}

		else {
			$returnCal.init($returnCal.selector, $rentCal.selected,'return');			
		}
		
		//objThis._initEvent($rentCal, $returnCal);
	});

	$($rentCal.selector).find('.btn_next').click(function(e){
		objThis._initEvent($rentCal, $returnCal);
	});	

	$($rentCal.selector).find('.btn_prev').click(function(){
		objThis._initEvent($rentCal, $returnCal);
	});
}

$(function(){
    var lCalendar1 = new LCalendar('.calendar_s'),
    	lCalendar2 = new LCalendar('.calendar_sd'),
    	lCalendar3 = new LCalendar('.left_cal .calendar_b'),
    	lCalendar4 = new LCalendar('.right_cal .calendar_b'),
    	lCalEvent = new lCalendarEvent(lCalendar3, lCalendar4);
    
    	reserveCalLeft = new LCalendar('#reserveCal .left_cal .calendar_b'),
    	reserveCalRight = new LCalendar('#reserveCal .right_cal .calendar_b'),
    	reserveCalEvent = new lCalendarEvent(reserveCalLeft, reserveCalRight),
    	
    	reserveJeJuCalLeft =  new LCalendar('#reserveJeJuCal .left_cal .calendar_b'),    	
    	reserveJeJuCalRight = new LCalendar('#reserveJeJuCal .right_cal .calendar_b'),
    	reserveJeJuCalEvent = new lCalendarEvent(reserveJeJuCalLeft, reserveJeJuCalRight);

	$('.calendar_s').find('a.dateNum:first').trigger('click');
	$('.calendar_sd').find('a.dateNum:first').trigger('click');
	
	var leftDate = '.left_cal .calendar_b a.dateNum',
		rightDate = '.right_cal .calendar_b a.dateNum';
	
	$('.wrap_cal').each(function(i){				
		if ($(this).find(leftDate).length > 1) {			
		   	if($(this).find(leftDate).length == 2) {
		   		$(this).find(leftDate).eq(1).trigger('click');		   		
				$(this).find('.right_cal .calendar_b a.btn_next').trigger('click');
				$(this).find(rightDate).eq(0).trigger('click');
		   	}
		   	else {
		   		$(this).find(leftDate).eq(1).trigger('click');	
		   		$(this).find(rightDate).eq(1).trigger('click');
		   	}		
		}
		
		else {			
			$(this).find('.left_cal .calendar_b a.btn_next').trigger('click');			
			$(this).find(leftDate).eq(0).trigger('click');
			$(this).find(rightDate).eq(1).trigger('click');				
		}
	});
	
	var tempShowDate = $('#tempShowDate').val(),
		tempShowReDate = $('#tempShowReDate').val();
	
   	if (tempShowDate && tempShowReDate) {   	      		
   		var tempShowDateNum = tempShowDate.substring(tempShowDate.length, tempShowDate.length - 2),
   			tempShowReDateNum = tempShowReDate.substring(tempShowReDate.length, tempShowReDate.length - 2),   		

	   		carSearchCalLeft =  new LCalendar('#carSearchCal .left_cal .calendar_b', tempShowDate),    	
	   		carSearchCalRight = new LCalendar('#carSearchCal .right_cal .calendar_b'),
	   		carSearchCalEvent = new lCalendarEvent(carSearchCalLeft, carSearchCalRight);
   		
		$('#carSearchCal .left_cal .calendar_b').find('a.dateNum').each(function(){
			var leftDateNum = $(this).text();

			if (leftDateNum < 10) {
				leftDateNum = '0' + leftDateNum;
			}
			
			if(leftDateNum == tempShowDateNum) {
				$(this).trigger('click');
			}
		});
		
		if (Number($('#carSearchCal .right_cal .calendar_b').find('a.dateNum').eq(0).text()) > Number(tempShowReDateNum)) {						
			$('#carSearchCal .right_cal .calendar_b a.btn_next').trigger('click');
		}
		
		$('#carSearchCal .right_cal .calendar_b').find('a.dateNum').each(function(){
			var rightDateNum = $(this).text();

			if (rightDateNum < 10) {
				rightDateNum = '0' + rightDateNum;
			}
			
			if(rightDateNum == tempShowReDateNum) {				
				$(this).trigger('click');
			}
		});			
   	}
});