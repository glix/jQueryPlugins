var c_alert_opened = false;
var c_settings = {
	scrollbar: false,
	width: "50%",
	color: "#ffffff",
	font: "'Montserrat', sans-serif",
	uppercase: true,
	x_toclose: true,
	animation: 'fade'
}
function c_alert_setup() {
	$("#c_alert").css({'width':c_settings['width'],'background-color':c_settings['color']});
	if(!c_settings['uppercase']) { text_transform = 'none'; } else { text_transform = 'uppercase'; }
	$("#c_body_alert").css({'font-family':c_settings['font'],'text-transform':text_transform});
	if(!c_settings['x_toclose']) { $("#c_alert_close").hide(); } else { $("#c_alert_close").show(); }
}
function c_alert_settings(options) {
	c_settings = $.extend(c_settings, options);
	c_alert_setup();
}
function c_alert(html,button) {
	html = typeof html !== 'undefined' ? html : '';
	button = typeof button !== 'undefined' ? button : 'Ok';
	if(html.length == 0) {
		return $("#c_body_alert").html();
	}
	else {
		if($("#c_alert:visible").length == 0) {
			var window_size = $(window).height();
			if($(document).height() > window_size) {
				var page_size = $(document).height();
			} 
			else {
				var page_size = window_size;
			}
			$("#c_page_size").height(page_size); //+500 in case of window resize
			$("#c_page_size").css('z-index','1');
			$("#c_page_size").hide();
			$("#c_page_size").css('background-color','rgba(0, 0, 0, 0.5)');
			$("#c_page_size").fadeIn();
			$("#c_alert").css('top',$("#c_alert").height());
			switch(c_settings['animation']) {
				case 'fade':
					$("#c_alert").fadeIn("slow");
					break;
			}
			$("#c_alert_button").val(button);
		}
		if(button.length == 0) {
			$("#c_alert_button").hide();
		}
		else {
			$("#c_alert_button:hidden").show();
		}
		$("#c_body_alert").html(html);
		c_alert_opened = true;
		if(!c_settings['scrollbar']) {
			$('html, body').css({
				'overflow': 'hidden',
				'height': '100%'
			});	
		}
		return true;
	}
}
function c_alert_close() {
	if(!c_settings['scrollbar']) {
		$('html, body').css({
			'overflow': 'auto',
			'height': 'auto'
		});
	}
	$("#c_alert,#c_page_size").fadeOut("fast",function() {
		$("#c_page_size").css('background-color','rgba(0, 0, 0, 0)');
		$("#c_page_size").css('z-index','-1').fadeIn();
		$("#c_body_alert").html('');
		c_alert_opened = false;
	});
}
$(document).ready(function(){
	$('body').prepend('<div id="c_page_size"><div id="c_alert"><div id="c_alert_close" class="c_close_box">x</div><div id="c_body_alert"></div><div id="c_div_alert_button"><input type="button" id="c_alert_button" class="c_alert_btn c_alert_btn-primary" value="Ok" /></div></div></div>');
	$("#c_alert_close,#c_alert_button").click(function() {
		c_alert_close();
	});
	c_alert_setup()
});
