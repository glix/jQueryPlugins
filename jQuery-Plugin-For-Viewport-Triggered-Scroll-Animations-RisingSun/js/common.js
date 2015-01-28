$(function(){
	var MINWIDTH=980;
	var MINHEIGHT=600;

	smoothScroll();
	function resizeContainer(e) {
		resizeWin();
	}
	$(window).bind("resize", resizeContainer);
	resizeWin();
	$(window).scroll(changeScroll);

	function resizeWin(){
		var w=$(window).width()
		var h=$(window).height()
		var STwidth=(w>MINWIDTH)?w:MINWIDTH;
		var STheight = (h>MINHEIGHT)?h:MINHEIGHT;
		$("#topArea").height(STheight);
		$("#down").css("top",STheight-50);
	}
	function changeScroll(){
		var scr = $(window).scrollTop();
		if(scr>0){
			$("#down").fadeOut(300);
		}else{
			$("#down").fadeIn(300);
		}
	}

	function smoothScroll(hash){
		var defaults = {
			EASING : 'easeInOutCubic',	//easeInOutQuad
			SPEED : 2000
		}
		if(hash){
			smoothScrollAction(hash);
			return false;
		}else{
			$('a[href="#"],area[href="#"]').click(function(){
				$('html,body').stop(false).animate({scrollTop: 0},defaults.SPEED,defaults.EASING);
				return false;
			});
			$('a[href^="#"],area[href^="#"]').each(function(){
				var hash = $(this).attr('href');
				if(hash.match(/^#./)){
					$(this).click(function(){
						if($(hash).size() > 0){
							smoothScrollAction(hash);
						}
						return false;
					});
				}
			});
		}
		function smoothScrollAction(hash){
			var endPos = Math.round($(hash).offset().top);
			if(endPos != $(window).scrollTop()){
				$('html,body').stop(false).animate({scrollTop: endPos},defaults.SPEED,defaults.EASING);
			}
		}
	}
});

