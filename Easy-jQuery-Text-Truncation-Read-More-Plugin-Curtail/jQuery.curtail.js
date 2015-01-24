/* jQuery Plugin: Curtail
 *
 * Version 1.0.0 (January 2015)
 *
 * Curtail is a small jQuery plugin that truncates text
 * to a specific number of characters and allows for show more text.
 *
 * License: none (public domain) http://unlicense.org/
 */

/* global jQuery */ 
(function ($) {
    'use strict';

    $.fn.curtail = function (options) {

        var settings, obj;

        settings = $.extend({
            limit: 250,
            ellipse: '...'
        }, options);

        obj = [];

        $(this).each(function (i) {
            var $this = $(this);

            obj.push({
                p: $this.children('p'),
                a: $this.children('a'),
                len: function () {
                    return this.p.text().length;
                },
                btn: function (hide) {
                    var oldP, curP;

                    oldP = this.oldP;
                    curP = this.p;

                    if (hide) {
                        this.a.each(function () {
                            $(this).hide();
                        });
                    } else {
                        this.a.each(function () {
                            var el = $(this);

                            el.click(function () {
                                for (var i = 0; i < curP.length; i++) {
                                    $(curP[i]).text(oldP[i]);
                                }
                                el.hide();
                                return false;
                            });
                        });
                    }
                },
                cut: function () {
                    var str, len, total, oldP, newP, el;

                    str = '';
                    len = '';
                    total = 0;
                    oldP = [];
                    newP = [];

                    this.p.each(function (i, current) {
                        el = $(this);
                        str = $(current).text();
                        len = $(current).text().length;
                        total += len;

                        oldP.push(str);

                        if (total < settings.limit) {
                            newP.push(str);
                        } else {
                            newP.push((function () {
                                var calc = len - (total - settings.limit);

                                if (calc > 0) {
                                    return str.slice(0, calc) + settings.ellipse;
                                }

                                return "";
                            }()));
                        }

                        el.text(newP[i]);
                    });

                    this.oldP = oldP;
                    this.newP = newP;
                },
                run: function () {
                    if (this.len() > settings.limit) {
                        this.cut();
                        this.btn(false);
                    } else {
                        this.btn(true);
                    }
                }
            });

            obj[i].run();
        });
    };
}(jQuery));