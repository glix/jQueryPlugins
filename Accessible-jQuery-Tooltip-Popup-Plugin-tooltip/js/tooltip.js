$(document).ready(function() {
  $.fn.tooltip = function() {
    return this.each(function() {
      var $tooltip,
          changeTipPosition = function(event, action) {
            var xPos, yPos, $target;

            if (action === "keyboard") {
              $target = $(event.target);
              xPos = $target.offset().left;
              yPos = $target.offset().top + 25;
            } else {
              xPos = event.pageX;
              yPos = event.pageY;
            }

            $tooltip.css({
              top: yPos + "px",
              left: xPos + "px"
            });
          },
          showTip = function(event, action) {
            var $target    = (action === "keyboard") ? $(event.target) : $(this),
                tooltip_id = $target.attr("aria-describedby");

            hideTip();
            $tooltip = $("#" + tooltip_id);
            $tooltip.attr("aria-hidden", false);
            changeTipPosition(event, action);
          },
          hideTip = function() {
            $("[role=tooltip]").attr("aria-hidden", true);
          };

      $(this).on({
        mousemove: changeTipPosition,
        mouseenter: showTip,
        focus: function(event) {
          showTip(event, 'keyboard');
        },
        mouseleave: hideTip,
        blur: hideTip
      });
    });
  };
});
