/*************************************************************************************************
 *
 * INPORTS
 *
 *************************************************************************************************/

$(document).ready(function(){
	resize_table();

})

/*************************************************************************************************
 *
 * UI-MANAGER
 *
 *************************************************************************************************/



	function resize_table(){
		alert()
		/**
		 * thead, tbody, tfoot 이 분리되어 있는 경우
		 * tbody 에 분리되는 thead 의 가로 길이 추가
		 */
		var btype=ValidationUtil.get_browser_type();
		var d=(String(btype).indexOf('msie')=='msie7' || String(btype).indexOf('msie')=='msie8')?2:0;

		$('table').each(function(a){
			try{
				if($(this).is(':visible') && String($(this).attr('data-direction')).toUpperCase()!='VERTICAL'){
					if(
						($(this).find('>thead').hasClass('blind') || $(this).find('>thead>tr').hasClass('blind')) &&
						!$(this).find('>tbody>tr').hasClass('tfoot')
					){
						/**
						 * 1. 타이틀 가로 길이에 맞춰 길이 조정
						 */
						var ascope=$(this).parent()[0].previousElementSibling || $(this).parent()[0].previousSibling;
						var aw=Number($(ascope).find('table>tbody').outerWidth(true) || $(ascope).outerWidth(true))+d;

						$(this).css({
							'width':aw+'px'
						});

						/**
						 * 2. 세로 스크롤이 생겼을 때 (data-role=common-table-scroll-sync)
						 *
						 */
						if(String($(this).attr('data-role')).indexOf('common-table-scroll-sync')!=-1){
							if($(ascope).find('>table') && !ValidationUtil.is_null($(ascope).find('>table').attr('data-width'))){

								/**
								 * 스크롤 영역일 때만 적용
								 * class="row"
								 * max-height!="none"
								 */
								if(StringUtil.to_pureNumber($(this).parent().css('max-height'))>0){
									var ow=Number($(ascope).find('>table').attr('data-width'));
									var mh=StringUtil.to_pureNumber($(this).parent().css('max-height'));
									var ah=$(this).outerHeight(true);
									var isvscroll=(mh<ah)?true:false;
									var vd=(isvscroll)?17:0;

									$(ascope).find('>table').css({
										'width':(ow+vd)+'px',
										'padding-right':vd+'px',
										'scrollLeft':0
									});

									/**
									 * IE7 일 때만 margin-right 적용 (2014.06.11)
									 */
									if(ValidationUtil.get_browser_type()=='msie7'){
										$(ascope).find('>table').css({
											'margin-right':vd+'px'
										});
									};

									/**
									 * data-target 이 존재할 때, 처리 추가
									 */
									if($('*[data-name='+$(this).attr('data-target')+']').length>0){
										// 결함번호 58164 : 투자자클럽(AIC)>전체회원 리스트 더보기 시 가로 사이즈 확장 오류 시작
										var momDiv = $('*[data-name='+$(this).attr('data-target')+']');
										var childTable = $('*[data-name='+$(this).attr('data-target')+']').find('>table');
										// 2014-09-16 결함번호 57407 시작
										if(ValidationUtil.get_browser_type()=='msie9'){
											if(momDiv.width() < childTable.width()){
												childTable.css({
													'width':(ow)+'px',
													'padding-right':vd+'px',
													'scrollLeft':0
												});
											} else {
												childTable.css({
													'width':(ow+vd)+'px',
													'padding-right':vd+'px',
													'scrollLeft':0
												});
											}
										// 결함번호 58164 : 투자자클럽(AIC)>전체회원 리스트 더보기 시 가로 사이즈 확장 오류 끝
										} else {
											childTable.css({
												'width':(ow+vd)+'px',
												'padding-right':vd+'px',
												'scrollLeft':0
											});
										}
										// 2014-09-16 결함번호 57407 끝
									};
								};
							};
						};

						// 2014-10-21 테이블 tr갯수에 따른 클래스 추가 시작
						if(String($(this).parent().attr('class')).indexOf('tbl-scroll')!=-1){							
							var trn = $(this).find('>tbody>tr').length;
							var tc = $(this).parent().attr('class');							
							var state = $(this).parent().hasClass('exception');
							var trs = tc.split(' ');													
							var trsc = trs[1].split('-');
							var trsn = trsc[1];							
							//2014.11.10 예외 테이블 조건분기, 클래스 exception 추가 
							if(!state){
								if(trn > trsn){
									$(this).parent().addClass('over');	
								}else{
									$(this).parent().removeClass('over');
								}																
							}else{
								if(trn > trsn*2){
									$(this).parent().addClass('over');
								}else{
									$(this).parent().removeClass('over');
								}
							}
							
							/*if(trn > trsn){
								$(this).parent().addClass('over');
							} else{
								$(this).parent().removeClass('over'); // 2014-10-27 2014-10-21 테이블 tr갯수에 따른 클래스 추가 수정
							}*/
						};
						// 2014-10-21 테이블 tr갯수에 따른 클래스 추가 끝


					};
				};
			}catch(e){};
		});
	}

















