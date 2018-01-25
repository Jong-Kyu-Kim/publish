var LCalendar, ReturnDay;

LCalendar = function (selector, date) {
	this.selector = null;
	this.$calendar = null;

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

	this.selectedRentYear = null;
	this.selectedRentMonth = null;
	this.selectedRentDate = null;
	this.selectedRent = null;

	this.selectedReturnYear = null;
	this.selectedReturnMonth = null;
	this.selectedReturnDate = null;
	this.selectedReturn = null;

	this.rentDate = null;
	this.returnable = null;
	this.returnableYear = null;
	this.returnableMonth = null;
	this.returnableDate = null;

	this.focus = null

	this.start = null;

	this.init(selector, date);
}

LCalendar.prototype.init = function(selector, date, start, focus) {

	this.focus = focus;

	this.selector = selector;
	this.$calendar = $(selector);

	if(typeof(date) !== 'undefined') {
		this.date = date.split('/');
		this.date[1] = this.date[1] - 1;
		this.date = new Date(this.date[0], this.date[1], this.date[2]);
	}

	else {
		this.date = new Date();
	}

	if (this.start == null) {
		this.start = true;	
	}

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
	
	this.showCalendar(selector, date);
};

LCalendar.prototype.showCalendar = function(selector, date) {
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
	this.calendar += '	<a href="#" class="btn_prev">이전</a>';
	this.calendar += '	<a href="#" class="btn_next">다음</a>';
	this.calendar += '	<span class="txt">' + currentMonthEng + ' ' + this.currentYear + '</span>';
	this.calendar += '</div>';
	this.calendar += '<div class="calendar">';
	this.calendar += '	<table>';
	this.calendar += '		<colgroup>';
	this.calendar += '			<col style="width:15%;">';
	this.calendar += '			<col style="width:14%;">';
	this.calendar += '			<col style="width:14%;">';
	this.calendar += '			<col style="width:14%;">';
	this.calendar += '			<col style="width:14%;">';
	this.calendar += '			<col style="width:14%;">';
	this.calendar += '			<col style="width:14%;">';
	this.calendar += '		</colgroup>';
	this.calendar += '		<caption>' + currentMonthEng + ' ' + this.currentYear + ' calender</caption>';
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

			var selectedRent = new Date (this.selectedRentYear,this.selectedRentMonth - 1, this.selectedRentDate, 9).getTime(),
				selectedReturn = new Date (this.selectedReturnYear,this.selectedReturnMonth - 1, this.selectedReturnDate, 9).getTime(),
				rentable = new Date (this.rentableYear, this.rentableMonth - 1, this.rentableDate, 9).getTime(),
				returnable = new Date (this.returnableYear, this.returnableMonth - 1, this.returnableDate, 9).getTime(),
				current = new Date (this.currentYear, this.currentMonth -1, this.dateNum, 9).getTime();

			if (current < this.today) {
				this.calendar += '				<td class="' + this.dateString[j] + ' disabled">' + this.dateNum + '</td>';
			}

			else if (current === selectedRent) {
				this.calendar += '				<td class="' + this.dateString[j] + ' start"><a href="#" class="dateNum">' + this.dateNum + '</a></td>';	
			}

			else if (current === selectedReturn) {
				if (selectedReturn > rentable) {
					this.calendar += '				<td class="' + this.dateString[j] + ' end unlink">' + this.dateNum + '</td>';	
				}
				else {
					this.calendar += '				<td class="' + this.dateString[j] + ' end"><a href="#" class="dateNum">' + this.dateNum + '</a></td>';		
				}	
			}

			else if (this.start === true && current > selectedRent && current < selectedReturn) {
				if (current > rentable) {
					this.calendar += '				<td class="' + this.dateString[j] + ' during unlink">' + this.dateNum + '</td>';	
				}

				else {
					this.calendar += '				<td class="' + this.dateString[j] + ' during"><a href="#" class="dateNum">' + this.dateNum + '</a></td>';	
				}
			}							

			else if (this.start === true && current > rentable) {
				this.calendar += '				<td class="' + this.dateString[j] + ' disabled">' + this.dateNum + '</td>';
			}

			else if (this.start === false && current < selectedRent) {
				this.calendar += '				<td class="' + this.dateString[j] + ' disabled">' + this.dateNum + '</td>';
			}

			else if (this.start === false && current > returnable) {
				this.calendar += '				<td class="' + this.dateString[j] + ' disabled">' + this.dateNum + '</td>';
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
	
	this.$calendar.html(this.calendar);

	$(selector + ' .btn_' + this.focus).focus();

	if (this.currentDate < 10) {
		this.currentDate = '0' + this.currentDate;
	}

	this._initEvent(selector, date);
};

LCalendar.prototype._initEvent = function(selector,date) {
	var objThis = this;

	this.$calendar.find('.btn_prev').click(function(e){
		e.preventDefault();

		if (objThis.start === true) {
			if (objThis.currentYear > objThis.todayYear || objThis.currentMonth > objThis.todayMonth) {
				objThis.init(selector,objThis.prevDate,objThis.start,'prev');
			}
		}

		else {
			if (objThis.date >= objThis.today && objThis.currentYear >= objThis.selectedRentYear && objThis.currentMonth >= objThis.selectedRentMonth + 1) {
				objThis.init(selector,objThis.prevDate,objThis.start,'prev');
			}
		}
	});

	this.$calendar.find('.btn_next').click(function(e){
		e.preventDefault();
		if (objThis.start === true) {
			if (objThis.rentableYear >= objThis.currentYear && objThis.rentableMonth - 1 >= objThis.currentMonth) {
				objThis.init(selector,objThis.nextDate,objThis.start,'next');	
			}
			if (objThis.selectedReturnYear >= objThis.currentYear && objThis.selectedReturnMonth - 1 >= objThis.currentMonth) {
				objThis.init(selector,objThis.nextDate,objThis.start,'next');	
			}			
		}

		else {
			if (objThis.returnableYear >= objThis.currentYear && objThis.returnableMonth - 1 >= objThis.currentMonth) {
				objThis.init(selector,objThis.nextDate,objThis.start,'next');	
			}	
		}
	});

	this.$calendar.find('a.dateNum').click(function(e){
		e.preventDefault();

		var thisText = $(this).text();
		if (thisText < 10) {
			thisText = '0' + thisText;
		}

		if (objThis.start == true) {

			objThis.selectedRentYear = objThis.currentYear;
			objThis.selectedRentMonth = objThis.currentMonth;
			objThis.selectedRentDate = thisText;

			$(this).parents(selector).siblings('.rent').find('.date').html(objThis.selectedRentYear + '/' + objThis.selectedRentMonth + '/' + objThis.selectedRentDate);

			if (selector == '.calendar_b') {
				alert('Please select rental  Return date & Time.');
							
				objThis.start = false;

				objThis.selectedReturnYear = null;
				objThis.selectedReturnMonth = null;
				objThis.selectedReturnDate = null;
					
				objThis.init(selector,objThis.selectedRentYear + '/' + objThis.selectedRentMonth + '/' + objThis.selectedRentDate);
			}

			$(this).parents('table').find('td').removeClass('start');
			$(this).parents('table').find('td').removeClass('end');
			$(this).parent().addClass('start');			
		}

		else {
			$(this).parent().addClass('end');
			objThis.start = true;

			objThis.selectedReturnYear = objThis.currentYear;
			objThis.selectedReturnMonth = objThis.currentMonth;
			objThis.selectedReturnDate = thisText;

			objThis.returnableYear =  null;
			objThis.returnableMonth =  null;
			objThis.returnableDate =  null;

			$(this).parents('.calendar_b').siblings('.return').find('.date').html(objThis.selectedReturnYear + '/' + objThis.selectedReturnMonth + '/' + objThis.selectedReturnDate);

			objThis.init(selector,objThis.selectedReturnYear + '/' + objThis.selectedReturnMonth + '/' + objThis.selectedReturnDate);	
		}
	});
};

$(function(){
    var mCalendar1 = new LCalendar('.calendar_b'),
    	mCalendar2 = new LCalendar('.calendar_sd');
    	mCalendar3 = new LCalendar('.calendar_s');
});