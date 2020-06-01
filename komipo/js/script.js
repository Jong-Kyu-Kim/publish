$(function () {
	$('.slideshow').each(function () {

		var $slides = $(this).find('.slide'), // 모든 슬라이드
			slideCount = $slides.length,   // 슬라이드 점수
			currentIndex = 0;              // 현재 슬라이드를 나타내는 인덱스

		// 첫번째 슬라이드에 페이드 인으로 표시
		$slides.eq(currentIndex).fadeIn();

		// 7500 밀리 초마다 showNextSlide 함수를 실행
		setInterval(showNextSlide, 7500);

		// 다음 슬라이드를 표시하는 함수
		function showNextSlide () {

			// 다음 표시 할 슬라이드의 인덱스
			// (만약 마지막 슬라이드이라면 처음으로 돌아 가기)
			var nextIndex = (currentIndex + 1) % slideCount;

			// 현재 슬라이드 페이드 아웃
			$slides.eq(currentIndex).fadeOut();

			// 다음 슬라이드를 페이드 인
			$slides.eq(nextIndex).fadeIn();

			// 현재 슬라이드 인덱스를 업데이트
			currentIndex = nextIndex;
		}

	});

});
function ImageSlider(selector, options){

    this.$imageSlider = null;
    this._$images = null;

    this.currentIndex = null;
    this.nextIndex = null;

    this._imageWidth = 0;

    this._$indexItems = null;

    this._timerID = 0;

    this.options = null;
    
    this.initOptions(options);
    this._init(selector);
    this._initImages(selector);

    this._initEvent(selector);
    //this.showImageAt(this.options.startIndex);
    
    this.startAutoPlay();
}

ImageSlider.defaultOptions = {
    startIndex:0,
    autoPlay:false,
    autoPlayDelayTime:5000,
    animationDuration:700,
    animationEasing:'easeOutQuart'
}

ImageSlider.prototype.initOptions = function(options){
    this.options = $.extend({}, ImageSlider.defaultOptions, options);
}

ImageSlider.prototype._init = function(selector){
    this.$imageSlider = $(selector);
    this._$images = this.$imageSlider.find('.slider-body .image-list > div');

    this._imageWidth = this.$imageSlider.find('.slider-body').width();
    // this._imageWidth='100%';
}

ImageSlider.prototype._initImages=function(selector){
	var indicatorHTML = '';
	
    this._$images.each(function(i){
        $(this).css({
        	opacity:0
        });
        
        indicatorHTML += '<li><a href="#"><span>' + (i + 1) + '</span></a></li>';
    });
    
    $(selector + ' .index-nav').html(indicatorHTML);
    this._$indexItems = this.$imageSlider.find('.index-nav li');
}

ImageSlider.prototype._initEvent = function(selector){
    var objThis = this;
    
    this.$imageSlider.find('.slider-btn-prev').on('click', function(){
    	objThis.changeImage('prev');
    });
    
    this.$imageSlider.find('.slider-btn-next').on('click', function(){
        objThis.changeImage('next');
    });
    
	this._$indexItems.on('click', function(e){
		e.preventDefault();
		var index = objThis._$indexItems.index(this);
		
		if (objThis.currentIndex != index) {
			if(objThis.currentIndex > index) {
				objThis.showImageAt(index,'prev');
			}
			
			else {
				objThis.showImageAt(index,'next');
			}
		}
	});
}

ImageSlider.prototype.changeImage=function(direction){
	var index = 0;
	
	if (direction == 'prev') {
		index = this.currentIndex-1;
	}
	
	else { 
		index = this.currentIndex+1;
	}


	if (this.nextIndex == null || this.nextIndex == this.currentIndex + 1) {
		this.showImageAt(index, direction);
	}
}

ImageSlider.prototype.showImageAt = function(index, direction, move_dx, status){
    if(index < 0) {
        index = this._$images.length-1;
    }
    
    if(index >= this._$images.length) {
        index = 0;
    }
    
    var objThis = this,
    	$currentImage = this._$images.eq(this.currentIndex),
    	$newImage = this._$images.eq(index);

    if (status == 'touch_move') {
    	var nextStartLeft = move_dx;
    	
    	if (direction == 'prev') {
    		nextStartLeft -= 100;
    	}
    	
    	else {
    		nextStartLeft += 100;
    	}
    	
		$currentImage.stop().css({
            left:move_dx + '%',
            opacity:1
        });
		
		$newImage.stop().css({
            left:nextStartLeft + '%',
            opacity:1
        });
    }
    
    else if (status == 'touch_end' || !status) {
    	if (Math.abs(move_dx) > 20 || !move_dx) {

	   	    if (direction == 'prev' || direction == 'next'){
	   	        
	   	        // var currentEndLeft=this._imageWidth;
	   	        // var nextStartLeft =-this._imageWidth;
	   	    	
	   	        var currentEndLeft = '100%';
	   	        var nextStartLeft = '-100%';
	   	    
	   	        if (direction == 'next'){
	   	        	
	   	        	// currentEndLeft= -this._imageWidth;
	   	            // nextStartLeft=this._imageWidth;
	   	        	
	   	            currentEndLeft = '-100%';
	   	            nextStartLeft = '100%'; 
	   	        }
	   	     
	   	        $currentImage.stop().animate({
	   	            left:currentEndLeft,
	   	            opacity:1
	   	        },this.options.animationDuration, this.options.animationEasing);
	   	        
	   	        if (!status && !move_dx) {
	   		        $newImage.css({
	   		            left:nextStartLeft,
	   		            opacity:1
	   		        });
	   	        }
	   	        
	   	        $newImage.stop().animate({
	   	            left:0,
	   	            opacity:1
	   	        },this.options.animationDuration, this.options.animationEasing,function(){
	   	        	 objThis.nextIndex = index + 1;
	   	        });
	   	    }
	   	    
	   	    else {
	   	       // direction 값이 없거나 prev, next가 아닌 경우는 애니메이션 없이 이미지 활성화/비활성화
	   	        $newImage.css({
	   	            left:0,
	   	            opacity:1
	   	        });
	   	    }
	   	    
	   	    this._selectIndexAt(index);
	   	        
	   	    var oldIndex = this.currentIndex;
	   	    this.currentIndex = index;
	   	    this._dispatchChangeEvent(oldIndex, this.currentIndex);
    	}
    	
    	else if (Math.abs(move_dx) <= 20) {
    		var nextStartLeft = 0;
    		
   	        if (direction == 'prev') {
   	        	nextStartLeft =- 100;
   	        } 
   	        else {
   	        	nextStartLeft = 100;
   	        }
   	        
   			$currentImage.stop().animate({
   	            left:0,
   	            opacity:1
   	        },this.options.animationDuration, this.options.animationEasing);
   			
   			$newImage.stop().animate({
   	            left:nextStartLeft + '%',
   	            opacity:1
   	        },this.options.animationDuration, this.options.animationEasing,function(){
  	        });
    	}
    }
}

ImageSlider.prototype._selectIndexAt = function(index){
    if(this.currentIndex != -1) {
        this._$indexItems.eq(this.currentIndex).removeClass('select'); 
    }
    this._$indexItems.eq(index).addClass('select');
}

ImageSlider.prototype._dispatchChangeEvent = function(oldIndex, newIndex){
    var event = jQuery.Event('change');
    event.oldIndex = oldIndex;
    event.newIndex = newIndex;
    this.$imageSlider.trigger(event);
}

ImageSlider.prototype.startAutoPlay = function(){
    if(this.options.autoPlay == true){
		if(this._timerID == 0){
			this._timerID= setInterval($.proxy(function(){
				this.changeImage('next');
	        }, this), this.options.autoPlayDelayTime);         
		}
    }
}

ImageSlider.prototype.stopAutoPlay = function(){
	if(this.options.autoPlay == true){
		if(this._timerID != 0){
			clearInterval(this._timerID);
			this._timerID = 0;
		}
	}
}


function DoubleSlider($selector1, $selector2){
	this._$indexItems1 = null,
	this._$offsetTop = null,
	this._$offsetTop2 = null;
	
	this._init($selector1, $selector2);
	this._initOffset();
	this._initEvent($selector1, $selector2);
}

DoubleSlider.prototype._init = function($selector1, $selector2){
	this._$indexItems1 = $selector1.$imageSlider.find('.index-nav li');
}

DoubleSlider.prototype._initOffset = function(){
	this._$offsetTop = $('.main_good').offset().top - $('#header').height();
	this._$offsetTop2 = $('.main_whoever').offset().top - $('#header').height();
}

DoubleSlider.prototype._initEvent = function($selector1, $selector2){
	var objThis = this,
		$window = $(window);
	
	this._$indexItems1.on('click', function(e){
		e.preventDefault();
		var index = objThis._$indexItems1.index(this);
		
		if ($selector1.currentIndex != index) {
			if($selector1.currentIndex > index) {
				$selector1.showImageAt(index,'prev');
				$selector2.showImageAt(index,'prev');
			}
			else {
				$selector1.showImageAt(index,'next');
				$selector2.showImageAt(index,'next');
			}
		}
	});
		
	$window.resize(function(){
		objThis._initOffset();
	});
	
	
	$(document).mousewheel(function(event, delta) {
		if ($window.width() >= 980) {
    		var scrollAnimate = function() {
    			event.preventDefault();
    			$('html, body').stop().animate({
        			scrollTop:objThis._$offsetTop
        		},300);	
    		}
    		
	        if (delta < 0) {
	        	if ($selector1.currentIndex != 2) {
	        		scrollAnimate();
	        		if ($window.scrollTop() >= objThis._$offsetTop -1) {
	        			$selector1.changeImage('next');
	        			$selector2.changeImage('next');	
	           	 	}
	        	}
	        }
	        
	        else  {
		        if ($selector1.currentIndex != 0) {
	        		if ($window.scrollTop() <= objThis._$offsetTop2) {
	        			scrollAnimate();
	        		}
	        		if ($window.scrollTop() <= objThis._$offsetTop) {
	        			$selector1.changeImage('prev');
	        			$selector2.changeImage('prev');	
	        		}
	    		}
	        }
		}
	});
	$window.trigger('scroll');
}

