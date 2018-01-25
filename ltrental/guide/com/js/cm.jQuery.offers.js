/****************************************/
/*	Name: LOTTE HOTEL
/*	PART: Javascript
/*	Version: 1.0
/*	Author: Hyun-Ah Park
/****************************************/

$(function(){
	/*
		Part : Offer
	*/
	

	jQuery.offerFn = function(data){
		var $nowCount = $('.offers .nowCount, .event_offer .nowCount');
		var $totalCount = $('.offers .totalCount, .event_offer .totalCount');
		var intTotalCount = Math.ceil(data.length/3);

		//setting total countNum
		if(intTotalCount<=9){
			$totalCount.text('0'+intTotalCount);
		}else{
			$totalCount.text(intTotalCount);
		} //end if

		//Create Tags
		var $dataList = $('.wrap_offers');
		var dataUl = '<ul></ul>';
		var dataLi = '';
		if (intTotalCount > 3){
			appCount = 3;
		}else{
			appCount = intTotalCount;
		}//end if

		for (i=0; i<3; i++){
			dataLi += '<li>';
			dataLi += '<a href="' + data[i].linkUrl + '">';
			dataLi += '<strong class="sub_tit">'+data[i].subTit+'</strong>';
			dataLi += '<span class="date">'+data[i].date+'</span>';
			if($dataList.parents().is('.offers')){
				if($dataList.parents().is('#global .main')){
					dataLi += '<span class="location">'+data[i].hotelLC+'</span>';
				}
				dataLi += '<img src="'+data[i].imgSrc+'" alt="'+ data[i].imgAlt +'" />';
				dataLi += '<span class="txt">' +data[i].overTxt+'</span>'
				
			}
			dataLi += '</a>';
			dataLi += '</li>';
		}
		$dataList.append(dataUl);
		$('.wrap_offers ul').append(dataLi);
		$('.wrap_offers li>a .txt').hide();
		

		// Effects
		$('.wrap_offers li>a').on('mouseenter', function(){
			$(this).find('img').css('opacity', 0);
			if($dataList.parents().is('.offers')){
				$(this).find('.date').hide();
				if($dataList.parents().is('#global .main')){
					$(this).find('.location').hide();
				}
			}
			
			$(this).find('.txt').show();
		});

		$('.wrap_offers li>a').on('mouseleave', function(){
			$(this).find('img').css('opacity', 1);
			$(this).find('.date').show();
			$(this).find('.txt').hide();
			$(this).find('.location').show();
		});

		$('.wrap_offers li>a').on('focusin', function(){
			$(this).find('img').css('opacity', 0);
			if($dataList.parents().is('.offers')){
				$(this).find('.date').hide();
				if($dataList.parents().is('#global .main')){
					$(this).find('.location').hide();
				}
			}
			$(this).find('.txt').show();
		});

		$('.wrap_offers li>a').on('focusout', function(){
			$(this).find('img').css('opacity', 1);
			$(this).find('.date').show();
			$(this).find('.txt').hide();
			$(this).find('.location').show();
		});


		var $btnCountPrev = $('.offers .count_paging .btn_prev, .event_offer .count_paging .btn_prev');
		var $btnCountNext = $('.offers .count_paging .btn_next, .event_offer .count_paging .btn_next');
		var $btnAll = $('.offers .btn_all');
		var intNowCount = 1;
		var $dataUl = $('.wrap_offers ul');
		var wrapdataW = $('.wrap_offers').width();
		var dataLiW = $dataUl.find('li').outerWidth();
		var dataUlW;
		if($dataList.parents().is('.offers')){
			dataUlW = dataLiW*data.length
		}else{
			dataUlW = (dataLiW*data.length)+(10*data.length);
		}
		
		$dataUl.css('width', dataUlW);

		$btnCountNext.on('click', function(){
			if(intNowCount == intTotalCount){
				return false;
			}else{

				intNowCount++;
				if(intNowCount <= intTotalCount){
					if(intNowCount<=9){
						$nowCount.text('0'+intNowCount);
					}else{
						$nowCount.text(intNowCount);
					} // end if
				}//end if

				var dataLi2 = '';

				var num = Number((intNowCount-1)*3);
				var numLen = intNowCount*3;
				if(numLen<data.length){
					var numLen = intNowCount*3;
				}else{
					var numLen = data.length;
				}
					for (i=num; i<numLen; i++){
						dataLi2 += '<li>';
						dataLi2 += '<a href="' + data[i].linkUrl + '">';
						dataLi2 += '<strong class="sub_tit">'+data[i].subTit+'</strong>';
						dataLi2 += '<span class="date">'+data[i].date+'</span>';
						if($dataList.parents().is('.offers')){
							if($dataList.parents().is('#global .main')){
								dataLi2 += '<span class="location">'+data[i].hotelLC+'</span>';
							}
							dataLi2 += '<img src="'+data[i].imgSrc+'" alt="'+data[i].imgAlt+'" />';
							dataLi2 += '<span class="txt">' +data[i].overTxt+'</span>'
						}
						dataLi2 += '</a>';
						dataLi2 += '</li>';
					}

					var animateLeft;
					if($dataList.parents().is('.offers')){
						animateLeft = -wrapdataW *(intNowCount-1);
					}else{
						animateLeft = -wrapdataW *(intNowCount-1)-(10*(intNowCount-1));
					}

					$dataUl.append(dataLi2).stop().animate({'left': animateLeft});

					$('.wrap_offers li>a .txt').hide();
					$('.wrap_offers li>a').on('mouseenter', function(){
						$(this).find('img').css('opacity', 0);
						if($dataList.parents().is('.offers')){
							$(this).find('.date').hide();
							if($dataList.parents().is('#global .main')){
								$(this).find('.location').hide();
							}
						}
						$(this).find('.txt').show();
					});

					$('.wrap_offers li>a').on('mouseleave', function(){
						$(this).find('img').css('opacity', 1);
						$(this).find('.date').show();
						$(this).find('.txt').hide();
						$(this).find('.location').show();
					});

					$('.wrap_offers li>a').on('focusin', function(){
						$(this).find('img').css('opacity', 0);
						$(this).find('.date').hide();
						$(this).find('.txt').show();
						$(this).find('.location').show();
					});

					$('.wrap_offers li>a').on('focusout', function(){
						$(this).find('img').css('opacity', 1);
						$(this).find('.date').show();
						$(this).find('.txt').hide();
						$(this).find('.location').show();
					});
				return false;
			} //end if

		}); //end click
		
		$btnCountPrev.on('click', function(){
			if(intNowCount == 1){
				return false;
			}else{
				intNowCount--
				if(intNowCount <= intTotalCount){
					if(intNowCount<=9){
						$nowCount.text('0'+intNowCount);
					}else{
						$nowCount.text(intNowCount);
					} // end if
				}//end if

				if($('.wrap_offers').height()>$dataUl.find('li').height()){
					return false;
				}else{
					
					var animateLeft;
					if($dataList.parents().is('.offers')){
						animateLeft = -wrapdataW *(intNowCount-1);
					}else{
						animateLeft = -wrapdataW *(intNowCount-1)-(10*(intNowCount-1));
					}

					$dataUl.stop().animate({'left': animateLeft});

				}
				
				return false;
			}//end if
		}); //end click
	}; //end offerFn


}); //end load