(function($) {
	$.fn.showByScroll = function(options) {
		
		// Settings
		var settings = $.extend({
			'obj' : $(this),
			'name' : 'show',
			'offsetIndex' : 2,
			'onlyView': false
		}, options );

		function scrollOffset() {
			return $(window).height()/settings.offsetIndex + $(window).scrollTop();
		};	

		function check_item() {
			settings.obj.each(function() {
				if (settings.onlyView) {
					if ( $(this).offset().top < scrollOffset() &&
						 $(this).offset().top+$(this).height() > $(window).scrollTop() ) {

						show_item($(this));

					}

				}
				else {
					if ( $(this).offset().top < scrollOffset() ) {

						show_item($(this));

					}
				};
			});
		}

		function show_item(t) {
			t.addClass( settings.name ).trigger('showedByScroll');
			settings.obj = settings.obj.not( t );
		}
		
		check_item();
		
		// When scroll
		$(window).scroll(function() {	
			check_item();
		});	
			
	};
})(jQuery);