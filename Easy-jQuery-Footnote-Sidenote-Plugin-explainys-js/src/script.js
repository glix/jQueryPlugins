/**
 * jQuery Explainys Plugin v0.1
 */
;(function($, window) {
  jQuery.fn.explainys = function(options) {


    // Give plugin options
    // + The class of the details element.
    // + Class of the span in text.
    // + Where to position the details.
    // + Default snippet when text is missing.

    var defaults = {
      detailsClass: 'explainys',
      spanClass: ".explain",
      targetDiv: "#sidecontent",
      textFail: "Opps!!! Someone forgot to write the sidenote.&#9786;",
      divPosition: 0,
      divNumbers: "explainys-number",
      divOpen: "open",
    };
    var options = $.extend(defaults, options);

    // Get mark element css color
    var markColor = $('<mark />')
      .appendTo('html')
      .css('backgroundColor');
    var detailsColor;


    // Encounter a target
    // Each span element in the text marked with
    // class[see options] will have:
    // + a reference number attached to it.
    // + a html5 details element associated with it.

    $(options.spanClass).each(function(index, value) {

      // Only jump in the pool once.
      var $this           = $(this);

      // Get data
      var dataText        = $this.data('explain');
      var dataTitle       = $this.data('title');
      var dataTitleFail   = $this.text();

      // Insert reference.
      $('<sup />', {
        text: (index + 1)
      })
      .css({
        '-webkit-user-select': 'none',
        '-moz-user-select': 'none',
        '-ms-user-select': 'none',
        'user-select': 'none',
      })
      .insertBefore($this);

      // Create html5 details element
      // Each details element gets class for styling purpose and
      // id for link purpose.
      // We also have to tell details were on the page it should
      // append itself.

      jQuery('<details />', {
        class: options.detailsClass,
        id: 'explainys-ref-' + (index + 1)
      })
      .attr('open', options.divOpen)
      .appendTo(options.targetDiv)
      .each(function(i, e) {

        var $that = $(this);
        detailsColor = $that.css('backgroundColor');

        // Reference number
        var referenceNumber = $('<span />', {
          class: options.divNumbers,
          text: (index + 1)
        });


        // Highlight span on hover.
        $that.on({
          mouseenter: function() {
            $this.css('backgroundColor', markColor)
          },
          mouseleave: function() {
            $this.css('backgroundColor', 'transparent');
          }
        });


        // Append title to details element.
        // Either the user input title or use the
        // word that is marked.

        if (typeof dataTitle !== 'undefined' && dataTitle.length > 0) {
          $that
          .append('<summary><span>' + dataTitle + '</span></summary>');
        } else {
          $that
          .append('<summary><span>' + dataTitleFail + '</span></summary>');
        }

        // Append reference number and class name.
        $that
          .find('summary')
          .append(referenceNumber)
          .end()
          .find('summary > span:first-child')
          .addClass('explainys-title');

        // Append text
        if (typeof dataText !== 'undefined' && dataText.length > 0) {
          // Attribute data-explain
          $that
          .append('<p>' + dataText + '</p>');
        } else {
          // If non existing
          $that
          .append('<p>' + options.textFail + '</p>')
          .removeAttr('open');
        }

        // Add link to sidenotes
        var linky = $that.attr('id');
        var linky2 = $('<a />', {
          class: 'explainys-link',
          text: 'Link',
          href: '#' + linky
        });

        // Append the links
        $that.append(linky2).find('.explainys-link');


        // Hover span highlight details
        $this.on({
          mouseover: function(evt) {
            $that
              .css('background', markColor)
              .addClass('explainys-highlight');
          },
          mouseout: function() {
            $that
              .css('background', detailsColor)
              .removeClass('explainys-highlight');
          }
        });

      }); // end each for detail element 

    });// end each for span element
  };
})(jQuery, window);

