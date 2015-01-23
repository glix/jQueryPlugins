////////////////////////////////////////////////////////////////////////
///////////------Factor1 Nav------//////////////////////////////////////
// a jquery tool by Eric Stout (@buschschwick) and Matt Adams (@mattada) 
// version 1.4 ////////////////////////////////////////////////////////
// http://factor1studios.com  ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
jQuery(document).ready(function($) {
	$(document).ready(function(){
		
		var remove = function(){ //function we use to remove the mask
						$('.mask').remove(); 
					  }
					  
			maskit = function(){
					$('.mask').animate({opacity:.0});	
					setTimeout(remove, 800);
					}
			i = 0;
			
		$('#nav-toggle').click(function(){ //listen for the click on the menu icon
			i++; // Add 1 to the count
			$('#nav-toggle').toggleClass('active');
			$('.panel').slideToggle(500).css("position", "fixed"); //toggle the nav up/down
			
			// Check if the counter is even or odd
			var isEven = function(clickCounter){
				return (clickCounter%2 == 0) ? true : false;
			};
			
			if (isEven(i) == false){											
				$('body').append('<div class="mask"></div>'); //lets create a nice mask to dim the content
				$('.mask').animate({opacity:1.0});	
			} else {
				maskit();
			}

	//or alternatively you can click the mask and make that shit go away.
		$('.mask').click(function(){ //listen for the click on the mask
			$('.panel').slideUp(500); //pull up the nav
			maskit();
			$('#nav-toggle').removeClass('active'); //mmm hamburger
			i++;  // Add 1 to the count
			});
			
		$('.nav-item').click(function(){ //oh snap, you want to close the nav on a link click?
			$('.panel').slideUp(500); //pull up the nav
			maskit(); 
			$('#nav-toggle').removeClass('active');
			i = 0;  // reset the counter
			});
		});//close up everything
	});
});