/*
-----------------------------------------------------------------
-----------------------------------------------------------------
risingSun 1.0  	jQuery plugin
written by Kiyoshi Honda

Copyright (c) 2015 Kiyoshi Honda (http://hondakiyoshi.com/risingsun )
Released under the MIT license
http://opensource.org/licenses/mit-license.php

Built for jQuery library
http://jquery.com
-----------------------------------------------------------------
-----------------------------------------------------------------
*/

(function($){
	var RS = $.fn.RisingSun = function(options){
		$.fn.RisingSun.initScrollAnime();
		this.each(function(i,elem) {
			var $this = $(elem);
			var Default={
				mode:"school",timer:-1,duration:500,x:0,y:0,scale:1.0,ease:"linear",startPosition:0.5,wipe:false,fadeStart:0,fadeEnd:1.0,popanime:false,onWakeup:function(){},onComplete: function(){},replay:true,onReplay: function(){}
			};
			var s = $.extend(Default, options);
			if(s.timer==-1){
				$.fn.RisingSun._setScrollObj($this,s.duration,s.x,s.y,s.scale,s.ease,s.startPosition,s.wipe,s.fadeStart,s.fadeEnd,-9999,s.popanime,s.onWakeup,s.onComplete,s.replay,s.onReplay);
			}else{
				$.fn.RisingSun._setTimerObj(s.timer,$this,s.duration,s.x,s.y,s.scale,s.ease,s.wipe,s.fadeStart,s.fadeEnd,s.popanime,s.onWakeup,s.onComplete,false/*replay*/,s.onReplay);
			}
		});
	};

	$.extend(RS,{
		scrObj: new Array(),
		startScrollFlag: false,
		initScrollAnime: function(){
			$(window).scroll(RS.changeScrollAnimeLoop);
			if(!RS._startScrollFlag){
				if( !RS.pluginExists( "easing" ) ){
					alert("RisingSun needs jquery easing plug-In");
				}
				RS._startScrollFlag=true;$(window).scroll(RS.changeScrollAnimeLoop);
			}
		},
		changeScrollAnimeLoop: function(){
			scr=$(window).scrollTop();
			wh=$(window).height();
			RS.scrollObj();
		},
		_setTimerObj: function(timer,obj,duration,left,top,scale,ease,wipe,fadeStart,fadeEnd,popanime,onWakeup,onComplete,onReplay){
			if(timer<=0){timer=1;}
			RS._setScrollObj(obj,duration,left,top,scale,ease,0,wipe,fadeStart,fadeEnd,timer,popanime,onWakeup,onComplete,onReplay);
		},
		_setScrollObj: function(obj,duration,left,top,scale,ease,startPosition,wipe,fadestart,fadeend,autostart,popanime,onWakeup,onComplete,replay,onReplay){
			var as = autostart || -9999;

			if(popanime==true){popanime=1.1;}
			if(obj.css("display")=="none"){
				obj.css("opacity",0);
				obj.css("display","block");
			}
			RS.scrObj.push( { obj:obj,duration:duration,positionLeft:obj.position().left,positionTop:obj.position().top,top:top,left:left,scale:scale,ease:ease,oiginaltop:(obj.offset().top),oiginalleft:obj.offset().left,pos:obj.position(),done:false,width:obj.width(),height:obj.height(),startPosition:startPosition,fadeStart:fadestart,fadeEnd:fadeend,wipe:wipe,autostart:as,popanime:popanime,onWakeup:onWakeup,onComplete:onComplete,replay:replay,onReplay:onReplay} );
			RS.resetObject(RS.scrObj[RS.scrObj.length-1]);
		},
		timerOver: function(e) {
		   RS.animeObjStart(this);
		},
		resetObject: function(obj){
			ratio = obj.height / obj.width;
			sw=obj.width*obj.scale;
			sh=obj.width*ratio*obj.scale;
			//if(obj.obj.css("position")=="static"){obj.obj.css("position","absolute");};
			obj.obj.css("left",Number(obj.positionLeft+obj.left- ((sw-obj.width )>>1) ));
			obj.obj.css("top",Number(obj.positionTop+obj.top- ((sh-obj.height )>>1) ));

			if(obj.wipe=="LR"){
				obj.obj.wrapInner("<div style='width:"+(obj.width+1)+"px;'></div>");
				obj.obj.css("width",0);
				obj.obj.css("overflow","hidden");
			}else if(obj.wipe=="TB"){
				obj.obj.css("height",0);
				obj.obj.css("overflow","hidden");
			}else{
				obj.obj.find("img").each(function (i) {
					if($(this).css("width").match(/[%]/)!="%"){
						imgw=$(this).css("width").match(/[0-9]+/);
						imgh=$(this).css("height").match(/[0-9]+/);
						$(this).css("width",100*imgw/obj.width+"%");
						$(this).css("height",100*imgh/obj.height+"%");
					}

				});
				obj.obj.css("width",sw);
				obj.obj.css("height",sh);
			}
			obj.obj.css("opacity",obj.fadeStart);
			obj.done=false;
			if(obj.autostart!=-9999){
				obj.done=true;
				setTimeout(RS.timerOver.bind(obj, ''), obj.autostart);
			}
		},
		scrollObj: function(){
			for(var i=0;i<RS.scrObj.length;i++){
				var useScrObj = RS.scrObj[i];
				if(useScrObj.done==false ){
					if(scr > Number(useScrObj.oiginaltop-wh*useScrObj.startPosition + useScrObj.height/2 ) ){
						RS.animeObjStart(useScrObj);
					}
				}else if(useScrObj.replay){
					if(scr+wh < Number(useScrObj.oiginaltop ) ){
						RS.resetObject(useScrObj);
						useScrObj.onReplay();
					}
				}else{
					RS.scrObj.splice(i, 1);
					i--;
				}
			}
		},
		animeObjStart: function(obj) {
			obj.done=true;
			obj.onWakeup();
			if(!obj.popanime){
				obj.obj.stop(false).animate(
				{
					opacity: obj.fadeEnd,
					left:obj.pos.left,
					top:obj.pos.top,
					width: obj.width,
					height: obj.height
				},
				{'complete': RS.endAnime.bind(obj, ''),
				'duration':obj.duration,'easing':obj.ease});
			}else{
				obj.obj.stop(false).animate(
				{
					opacity: obj.fadeEnd,
					left:obj.pos.left-((obj.width*obj.popanime-obj.width)>>1),
					top:obj.pos.top-((obj.height*obj.popanime-obj.height)>>1),
					width: obj.width*obj.popanime,
					height: obj.height*obj.popanime
				},
				{'complete': RS.endPopanime.bind(obj, ''),
				'duration':obj.duration*0.7,'easing':obj.ease});
			}
		},
		endAnime: function(e) {
			this.onComplete();
		},
		endPopanime: function(e) {
			this.obj.stop(false).animate(
			{
				opacity: this.fadeEnd,
				left:this.pos.left,
				top:this.pos.top,
				width: this.width,
				height: this.height
			},
			this.duration*0.3,'easeOutCubic');
			this.onComplete();
		},
		pluginExists: function(pluginName){
			return [pluginName] || $.fn[pluginName] ? true : false;
		}
	});
})(jQuery);

