/*
 *	Plugin: MagicWand - font animation
 *	Author: Krzysztof Syrytczyk
 *  Created: 03.04.13
 */

(function( $ ){
	$.fn.magicWand = function(opts){
		var $this = this,
			defaults = {
				speed: 500,
				scale: 5,
				tagName: 'i',
				animation: 'color',
				color: '#ff0000'
			},
			settings = $.extend(defaults, opts);
		
		// Wrap function
		function wrap(target) {
			var newtarget = $("<div></div>");
			nodes = target.contents().clone(); // The clone is critical!
			nodes.each(function() {
				if (this.nodeType == 3) { // Text
					var newhtml = "";
					var text = this.wholeText; // Maybe "textContent" is better?
					for (var i=0; i < text.length; i++) {
						if (text[i] == ' ') newhtml += " ";
						else newhtml += "<" +settings.tagName+ ">" + text[i] + "</" +settings.tagName+ ">";
					}
					newtarget.append($(newhtml));
				}
				else { // Recursion FTW!
					$(this).html(wrap($(this)));
					newtarget.append($(this));
				}
			});
			return newtarget.html();
		};
			
		// Let's wrap!
		$this.html(wrap($this)); 
		
		// Type of animation - Size
		function animSize(el){
			el.find(settings.tagName).hover(function(){
				$(this).stop(true, true).animate({ 'fontSize': '+=' +settings.scale+ 'px', 'line-height': '-=' +settings.scale+ 'px' }, settings.speed);
			}, function(){
				$(this).stop(true, true).animate({ 'fontSize': '-=' +settings.scale+ 'px', 'line-height': '+=' +settings.scale+ 'px' }, settings.speed);
			});
		};
		
		// Type of animation - Color
		function animColor(el){
			var baseColor = el.css('color');
			el.find(settings.tagName).hover(function(){
				// Randomize if needed
				if (settings.color == 'random') settings.color = "#"+((1<<24)*Math.random()|0).toString(16);
				$(this).stop(true, true).animate({ 'color': settings.color }, settings.speed);
			}, function(){
				$(this).stop(true, true).animate({ 'color': baseColor }, settings.speed);
			});
		};
		
		// Animation of choice
		switch(settings.animation){
			case 'size': 
				animSize($this);
				break;
			case 'color':
				animColor($this);
				break;
			default:
				animColor($this);
		};
	};
}) ( jQuery );