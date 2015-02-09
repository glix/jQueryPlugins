/*! CopyRight: Aisin http://github.com/aisin/Tips, Licensed under: MIT */

;(function($, win){

	$.fn.tips = function(options){

		var defaults = {
			
			destroy : false,
			skin    : 'black',
			msg     : ''
			
		};

		var data = $.extend( {}, defaults, options || {} );

		return this.each(function(){

			var $this = $(this);
			
			if (data.destroy) {
			
				$this.unbind('hover');
				return false;
				
			}

			$this.hover(function(){

				// Get the element's params
				var left = $this.offset().left;
				var top = $this.offset().top;
				var height = $this.outerHeight();

				var $tipDom = $('<div class="tip"><div class="tip-inner"><div class="tip-content"><div class="tip-msg">'+ data.msg +'</div></div></div><div class="arrow arrow-back"></div><div class="arrow arrow-front"></div></div>');

				$tipDom.css({ left : left }).appendTo('body');

				var $tip = $('.tip');
				var tipHeight = $tip.outerHeight();
				var scrollTop = $(win).scrollTop();

				if(top - scrollTop < tipHeight){
				
					top += height;
					$tip.addClass('bottom');
					
				} else { 
				
					top -= tipHeight;
					$tip.addClass('top');
					
				}

				$tip.addClass(data.skin).css({ top : top }).fadeIn(300);

			}, function(){

				$('.tip').fadeOut(300, function(){ $(this).remove() });
				
			});
		});
	}
})(jQuery, window);
