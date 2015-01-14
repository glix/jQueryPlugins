/*
 * jQuery sticky slider plugin
 *
 * @author: Jonathan Brumley <cayasso@gmail.com>
 */		
(function ($) {
	
	$.fn.stickySlide = function(options){
		
		if (!this.length) return this;

		var toggle = 1;
		
		return this.each(function(){		
			
			var $this = $(this), $handler = $this.find('.ss_handler_link:first');
			
			// Bind handler event			
			$handler.live('click', function(){	
				$this.trigger('ssToggle');				
				return false;
			});
			
			// Bind toggle custom event
			$this.bind('ssToggle', function(){		
				
				var cw = $this.width(), hw = $handler.width();
				
				toggle = (toggle) ? 0 : 1;
												
				$this.animate({ left: toggle * -(cw - hw) }, 900, function(){
																		   
					// Toggle close and open handler
					if (toggle)
						$('.ss_handler').removeClass('ss_handler_close').addClass('ss_handler_open');	
					else
						$('.ss_handler').removeClass('ss_handler_open').addClass('ss_handler_close');																			   
				});
			})
			
			// Set css
			.css({'position' : 'absolute', 'visibility': 'visible'});
			
			// Load remote content to div
			$('.ss_content').load('slider_content.html');
		});			
	}	
})(jQuery);
