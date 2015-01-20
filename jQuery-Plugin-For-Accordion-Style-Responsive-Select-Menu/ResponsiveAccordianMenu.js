$(window).load(function() {
	
	var divs = $('.expandContent'),
	content = divs.children('div');
	
	// hide all divs initially
	content.hide();
	
	// drop down menu - on change show the selected div
	$('#SelectMenu').on('change', function() {
	  content.hide();
	  showDiv(this.value);
	});

	// function that shows the selected div
	function showDiv(divID) {
		$(".styled option").removeClass("selected");
		$(".styled option").removeAttr("style");
		var thisContent = $('#'+divID).find('.expandedContent')
		if ($(thisContent).is(':visible')) {
			thisContent.slideUp("slow");
			$('#'+divID).find('.header .expand img').attr('src', 'plus.png');
		}
		else {
			content.not(thisContent).slideUp("slow", function() {
				$('#'+divID).parent().find('.header .expand img').attr('src', 'plus.png');
			});
			thisContent.slideDown("slow", function() {
				// scroll to selected div
				$('html, body').animate({
					scrollTop: $("#"+divID).offset().top
				}, 500);
				
				// change drop down menu's selected option  
				$('#SelectMenu').val(divID);
				$('#SelectMenu option[value="'+divID+'"]').addClass("selected");
				
				//change + icon to -
				$('#'+divID).find('.header .expand img').attr('src', 'minus.png');
			});
		}
	}	
	
	// on click show the selected div
	divs.click(function() {
		showDiv($(this).attr('id'));
	});	
});
