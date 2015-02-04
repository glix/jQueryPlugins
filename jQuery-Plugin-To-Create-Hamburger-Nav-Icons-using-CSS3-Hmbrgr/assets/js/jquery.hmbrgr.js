/*!
 * jquery-hmbrgrs.js v0.0.1
 * https://github.com/MorenoDiDomenico/jquery-hmbrgr
 *
 * Copyright 2015, Moreno Di Domenico
 * Released under the MIT license
 * http://mdd.mit-license.org
 *
 */

(function ( $ ) {

  $.fn.hmbrgr = function( settings ){

    var config = $.extend( {
      width     : 60,
      height    : 50,
      speed     : 200,
      barHeight : 8,
      barRadius : 0,
      barColor  : '#ffffff',
      animation : 'expand'
    }, settings);

    var posTop    = 0,
        posMiddle = (config.height/2) - (config.barHeight/2),
        posBottom = config.height - config.barHeight;

    function hmbrgrBuild(el){
      $(el)
      .css({
        'width'     : config.width,
        'height'    : config.height
      })
      .html('<span /><span /><span />')
      .find('span').css({
        'position'            : 'absolute',
        'width'               : '100%',
        'height'              : config.barHeight,
        'border-radius'       : config.barRadius,
        'background-color'    : config.barColor,
        'transition-duration' : config.speed+'ms'
      });

      hmbrgrSpanReset(el);
    }

    function hmbrgrSpanReset(el){
      $(el)
      .find('span').eq(0).css({
        'top' : posTop
      });

      $(el)
      .find('span').eq(1).css({
        'top' : posMiddle
      });

      $(el)
      .find('span').eq(2).css({
        'top' : posBottom
      });
    }

    function hmbrgrCommand(el){
      $(el).on('click', function(e){
        e.preventDefault();
        $(el).toggleClass('cross');

        if( $(el).hasClass('cross') )
          hmbrgrExpand(el);
        else
          hmbrgrCollapse(el);
      });
    }

    function hmbrgrExpand(el){
      $(el).find('span').css({
        top : posMiddle
      });

      setTimeout(function(){
        $(el).addClass(config.animation);
      }, config.speed);
    }

    function hmbrgrCollapse(el){
      $(el).removeClass(config.animation);

      setTimeout(function(){
        hmbrgrSpanReset(el);
      }, config.speed);
    }

    return this.each(function(){
      hmbrgrBuild(this);
      hmbrgrCommand(this);
    });

  };

}( jQuery ));
