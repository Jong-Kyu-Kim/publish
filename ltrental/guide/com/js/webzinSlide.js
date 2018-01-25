/****************************************/
/*	Name: LOTTE HOTEL
/*	PART: Javascript
/*	Version: 1.0
/*	Author: Hyun-Ah Park
/****************************************/

$(window).load(function(){
	
	/*
		Part : WebZin Slide
	*/

	var webzinList = [
		{src: '/front/img/com/temp/temp_img_95x132.jpg', alt: '해당 이미지 대체 텍스트1', monthly: 'December'},
		{src: '/front/img/com/temp/temp_img_95x132.jpg', alt: '해당 이미지 대체 텍스트2', monthly: 'November'},
		{src: '/front/img/com/temp/temp_img_95x132.jpg', alt: '해당 이미지 대체 텍스트3', monthly: 'October'},
		{src: '/front/img/com/temp/temp_img_95x132.jpg', alt: '해당 이미지 대체 텍스트4', monthly: 'September'},
		{src: '/front/img/com/temp/temp_img_95x132.jpg', alt: '해당 이미지 대체 텍스트5', monthly: 'August'},
		{src: '/front/img/com/temp/temp_img_95x132.jpg', alt: '해당 이미지 대체 텍스트6', monthly: 'July'},
		{src: '/front/img/com/temp/temp_img_95x132.jpg', alt: '해당 이미지 대체 텍스트7', monthly: 'June'},
		{src: '/front/img/com/temp/temp_img_95x132.jpg', alt: '해당 이미지 대체 텍스트8', monthly: 'May'},
		{src: '/front/img/com/temp/temp_img_95x132.jpg', alt: '해당 이미지 대체 텍스트9', monthly: 'April'},
		{src: '/front/img/com/temp/temp_img_95x132.jpg', alt: '해당 이미지 대체 텍스트10', monthly: 'March'},
		{src: '/front/img/com/temp/temp_img_95x132.jpg', alt: '해당 이미지 대체 텍스트11', monthly: 'February'},
		{src: '/front/img/com/temp/temp_img_95x132.jpg', alt: '해당 이미지 대체 텍스트12', monthly: 'January'}
	];
	var years = '2013';

	jQuery.webzinSlide = function(data){
		var $nowCount = $('.nowCount');
		var $totalCount = $('.totalCount');
		var intNowCount = 1;
		var intTotalCount = data.length;
		var pageCount = 6;
		var appCount;

		var $webzin = $('.wrap_webzin');
		var webzinUl = '<ul></ul>';
		var webzinLi = '';
		if (intTotalCount > 6){
			appCount = (intTotalCount-6);
		}else{
			appCount = intTotalCount;
		}//end if

		for (i=0; i<appCount; i++){
			webzinLi += '<li>';
			webzinLi += '<a href="#">';
			webzinLi += '<img src="' + data[i].src + '" alt="' + data[i].alt + '" />';
			webzinLi += '<span>';
			webzinLi += '<em>';
			webzinLi += data[i].monthly;
			webzinLi += '<br />';
			webzinLi += years;
			webzinLi += '</em>'
			webzinLi += '</span>';
			webzinLi += '</a>';
			webzinLi += '</li>';
		}

		$webzin.append(webzinUl);
		$webzin.find('ul').append(webzinLi);
		
		var $webZinUl = $webzin.find('ul');
		var $webzinLi = $webzin.find('ul>li');
		var webzinLiW = $webzinLi.outerWidth(true);
		$webzin.find('ul').css('width', (intTotalCount * webzinLiW));
		$webzinLi.eq(0).addClass('on');

		// paging
		var $btnCountPrev = $('.count_paging .btn_prev');
		var $btnCountNext = $('.count_paging .btn_next');

		//setting total countNum
		if(intTotalCount<=9){
			$totalCount.text('0'+intTotalCount);
		}else{
			$totalCount.text(intTotalCount);
		} //end if

		$btnCountNext.on('click', function(){
			if(intNowCount == intTotalCount){
				return false;
			}else{
				intNowCount++
			
				if(intNowCount<=9){
					$nowCount.text('0'+intNowCount);
				}else{
					$nowCount.text(intNowCount);
				} //end if
				
				if(intNowCount > 6){
					
					var webzinLi2 = '';
					for (i=pageCount; i<(pageCount+1); i++){
						webzinLi2 += '<li>';
						webzinLi2 += '<a href="#">';
						webzinLi2 += '<img src="' + data[i].src + '" alt="' + data[i].alt + '" />';
						webzinLi2 += '<span>';
						webzinLi2 += '<em>';
						webzinLi2 += data[i].monthly;
						webzinLi2 += '<br />';
						webzinLi2 += years;
						webzinLi2 += '</em>'
						webzinLi2 += '</span>';
						webzinLi2 += '</a>';
						webzinLi2 += '</li>';
					}
					$webZinUl.append(webzinLi2);

					pageCount++;
					
				} //end if

				$webZinUl.find('li').removeClass('on');
				$webZinUl.find('li').eq(intNowCount-1).addClass('on');
				
				webZinUlPosL = (-$webZinUl.position().left);
				webZinLiOnPosL = $webZinUl.find('li.on').position().left;

				if(Number(webZinLiOnPosL-webZinUlPosL) >= 660){
					var webzinLiW = $webZinUl.find('li').width();
					var webzinL = webzinLiW*(intNowCount-6);

					$webZinUl.stop().animate({left: -webzinL});
				} //end if

			}//end if
			return false;
		});//end click

		$btnCountPrev.on('click', function(){
			if(intNowCount == 1){
				return false;
			}else{
				intNowCount--;
				if(intNowCount <= 9){
					$nowCount.text('0'+intNowCount);
				}else{
					$nowCount.text(intNowCount);
				}
				
			} //end if

			$webZinUl.find('li').removeClass('on');
			$webZinUl.find('li').eq(intNowCount-1).addClass('on');

			webZinUlPosL = (-$webZinUl.position().left);
			webZinLiOnPosL = $webZinUl.find('li.on').position().left;

			if(webZinUlPosL > webZinLiOnPosL){
				var webzinLiW = $webZinUl.find('li').width();
				var webzinL = webzinLiW*(intNowCount-1);

				$webZinUl.stop().animate({left: -webzinL});
			}//end if

			return false;
		});//end click

		$webZinUl.find('li > a').on('click', function(){
			$webZinUl.find('li').removeClass('on');
			$(this).parent().addClass('on');
			intNowCount = $(this).parent().index()+1;

			if(intNowCount<=9){
				$nowCount.text('0'+intNowCount);
			}else{
				$nowCount.text(intNowCount);
			} //end if
		}); //end click
	}
	

$.webzinSlide(webzinList);

});

