/****************************************/
/*	Name: LOTTE HOTEL
/*	PART: Javascript
/*	Version: 1.0
/*	Author: Hyun-Ah Park
/****************************************/

$(function(){
	jQuery.thumbSlide = function(data){
		var galleryUlPosL = 0;
		var galleryLiOnPosL = 0;
		var $nowCount = $('.wrap_gallery.type2 .nowCount');
		var $totalCount = $('.wrap_gallery.type2 .totalCount');
		var intTotalCount = data.length;

		var $btnCountPrev = $('.wrap_gallery.type2 .count_paging .btn_prev');
		var $btnCountNext = $('.wrap_gallery.type2 .count_paging .btn_next');
		var intNowCount = 1;
		var thumbCount = 1;
		var lastCount = 0;
		var firstCount = 0;
		var appCount;

		//setting total countNum
		if(intTotalCount<=9){
			$totalCount.text('0'+intTotalCount);
		}else{
			$totalCount.text(intTotalCount);
		} //end if

		var $galleryList = $('.wrap_gallery.type2>.wrap_list');
		var $galleryListUl = '<ul class="lst type2"></ul>';
		var galleryListLi = '';
		if (intTotalCount > 5){
			
			if($('.wrap_gallery').hasClass('thumb_small')){
				appCount = 3;
			}else{
				appCount = 5;
			}
			
		}else{
			appCount = intTotalCount;
		}//end if

		for (i=0; i<appCount; i++){
			galleryListLi += '<li>';
			galleryListLi += '<a href="#">';
			galleryListLi += '<img src="' + data[i].src + '" alt="' + data[i].alt + '" />';
			galleryListLi += '</a>';
			galleryListLi += '</li>';
		}
		
		//galleryList append
		$galleryList.append($galleryListUl);
		$('.wrap_gallery.type2 .wrap_list ul').append(galleryListLi);

		var $galleryUl =$('.wrap_gallery.type2 .wrap_list ul');
		var $galleryLi = $galleryUl.find('li');
		var galleryLiW = $galleryLi.outerWidth(true);
		var galleryUlW = galleryLiW*intTotalCount;
		$galleryUl.css('width', galleryUlW);
		$galleryLi.eq(0).addClass('on');
		$('.wrap_gallery.type2 .view img').attr({'src': data[0].src.replace('/Thumbnail', ''),'alt': data[0].alt});

		//select galleryThumb img view
		jQuery.fn.slideView = function(options) {
			var imgThumb = $(this).find('img');
			var imgView = $('.wrap_gallery.type2 .view img');
			var imgSrc = imgThumb.attr('src').replace('/Thumbnail', '');
			var imgAlt = imgThumb.attr('alt');
			
			/*imgView.animate({'opacity': 0}, function(){
				imgView.attr({'src': imgSrc,'alt': imgAlt}).animate({'opacity': 1});
			})*/
			imgView.attr({'src': imgSrc,'alt': imgAlt});
			if($('.wrap_gallery').hasClass('thumb_small')){
				$('.wrap_gallery.type2 .view .tit').html(imgAlt);
			} //end if
		}; //end slideView
		

		var listThumbA= $('.wrap_list .lst.type2 li >a');
		listThumbA.on('click', function(){
			$('.wrap_list .lst.type2 li').removeClass('on');
			$(this).parent().addClass('on');
			$(this).slideView();
			intNowCount = $(this).parent().index()+1;
			if(intNowCount<=9){
				$nowCount.text('0'+intNowCount);
			}else{
				$nowCount.text(intNowCount);
			} // end if

			return false;
		}); //end click

		var pageCount;
		var moveCount = 0;

		if($('.wrap_gallery').hasClass('thumb_small')){
			pageCount = 3;
		}else{
			pageCount = 5;
		}

		$btnCountNext.on('click', function(){
			
			galleryUlPosL = (-$galleryUl.position().left);
			galleryLiOnPosL = $galleryUl.find('li.on').position().left;
			if(intNowCount == intTotalCount){
				return false;
			}else{
				intNowCount++;
				var galleryListLi2 = '';
				if(intNowCount>appCount){
					if(pageCount < data.length){
						for (i=pageCount; i<(pageCount+1); i++){
							galleryListLi2 += '<li>';
							galleryListLi2 += '<a href="#">';
							galleryListLi2 += '<img src="' + data[i].src + '" alt="' + data[i].alt + '" />';
							galleryListLi2 += '</a>';
							galleryListLi2 += '</li>';
						}
						$galleryUl.append(galleryListLi2);
						$galleryUl.find('li').eq(intNowCount-1).addClass('on').slideView();

						$galleryUl.find('li a').on('click', function(){
							$('.wrap_list .lst.type2 li').removeClass('on');
							$(this).parent().addClass('on');
							$(this).slideView();
							intNowCount = $(this).parent().index()+1;
							if(intNowCount<=9){
								$nowCount.text('0'+intNowCount);
							}else{
								$nowCount.text(intNowCount);
							} // end if
							return false
						});

						pageCount++;
					}//end if

				}//end if
				
				/** After counting, the image view **/
				if(intNowCount <= intTotalCount){
					if(intNowCount<=9){
						$nowCount.text('0'+intNowCount);
					}else{
						$nowCount.text(intNowCount);
					} // end if
					$galleryUl.find('li').removeClass('on');
					$galleryUl.find('li').eq(intNowCount-1).addClass('on');
					$galleryUl.find('li').eq(intNowCount-1).slideView();
				}//end if
				
			} //end if
			
			var movePosV;

			if($('.wrap_gallery').hasClass('thumb_small')){
				movePosV = 140;
			}else{
				movePosV = 428;
			}

			if(Number(galleryLiOnPosL-galleryUlPosL) >= movePosV){
				$galleryUl.animate({left: -galleryLiW*(intNowCount-appCount)});
			} //end if

			return false;
		}); //end click

		$btnCountPrev.on('click', function(){
			if(intNowCount == 1){
				return false;
			}else{
				intNowCount--;
				$nowCount.text('0'+intNowCount);
			} //end if
			$galleryUl.find('li').removeClass('on');
			$galleryUl.find('li').eq(intNowCount-1).addClass('on');
			$galleryUl.find('li').eq(intNowCount-1).slideView();

			galleryUlPosL = (-$galleryUl.position().left);
			galleryLiOnPosL = $galleryUl.find('li.on').position().left;

			if(galleryUlPosL > galleryLiOnPosL){
				$galleryUl.stop().animate({left: -galleryLiW*(intNowCount-1)});
			}//end if

			return false;
		}); //end click
	} //end thumbSlide


}); //end function