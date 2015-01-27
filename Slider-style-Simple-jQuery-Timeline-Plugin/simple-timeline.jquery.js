/**
 * Simple-Timeline plugin
 * (c) Alexander Tchernitchenko 2015
 */
if ( typeof Object.create !== 'function' ) {
  Object.create = function( obj ) {
    function F() {};
    F.prototype = obj;
    return new F();
  };
}

(function( $, window, document, undefined ) {

    var Timeline = {

      init: function( options ) {

        var self = this;

            //Useful global variables.
            self.firstDate = '',
            self.lastDate = '',
            self.allDates = [],
            self.allYears = [],
            self.windowWidth = $(window).width(),
            self.currentDate = '';
            

        //Manage options
        self.options = $.extend( {}, $.fn.simpleTimeline.options, options ); //Options

        //Content
        self.content = self.options.content; //all divs containing the event
        //Months
        self.months = self.options.months;

        //Start out by hiding all events
        self.content.hide(); //Hide all events


        self.fetchDates( self.allDates ); //Fetch all dates given, push them into allDates array
        self.fetchYears( self.allDates, self.allYears ); //Fetch all years.

        self.createTimelines( self.allDates ); //Create a timeline for every year given
        self.addEvents(); //Add events (blob), and append them on the correct timeline at the correct time.
        self.selectYear(); // Make year selection available
        self.selectDate( self.options.startDate - 1 ); //Select what date + year to start on
        self.mouseEvents(); //Hover and click functions.

      },

      fetchDates: function( arr ) {

        this.options.content.each(function() {

          var dateId = $(this).data("date");
          arr.push(dateId);

        });

      },

      fetchYears: function( dates, arr ) {

        var self = this;
            dates = dates.sort();
            firstDate = dates.slice(0, 1);
            firstYear = firstDate[0].slice(0,4);
            lastDate = dates.slice(dates.length - 1, dates.length);
            lastYear = lastDate[0].slice(0,4);

            //Create array that fills in the values for years between first and last.
            for (var i = parseInt(firstYear); i <= lastYear; i++) {
                arr.push(i);
            }

      },

      createTimelines: function( dates ) {
            var self = this,
                timelineWrap = $('#timelineWrap');

            //Add a timeline for every year
            $.each(self.allYears, function( index, value ) {
              timelineWrap.append('<div class=timelineLine id=' + value + '></div>');
            });

            //Hide all timelines
            $('.timelineLine').hide();

      },

      //Date selection options
      selectDate: function( current ) {
          var self = this,
              min = 0,
              max = self.allDates.length -1,
              next = $('button#dnext'),
              prev = $('button#dprev');

          //Start out by selecting the date
          self.checkDisable( current, min, max, next, prev);
          self.changeEvent( 0, current );

          //Next click event
          next.on("click", function(e) {
            e.preventDefault();
            var newCurrent = $.inArray(self.currentDate, self.allDates);

            newCurrent += 1;
            self.checkDisable( newCurrent, min, max, next, prev);
            self.changeEvent( -1, newCurrent);

            self.checkDisableYearHelper();
          });

          //Previous click event
          prev.on("click", function(e) {
            e.preventDefault();
            var newCurrent = $.inArray(self.currentDate, self.allDates);

            newCurrent -= 1;
            self.checkDisable( newCurrent, min, max, next, prev);
            self.changeEvent( +1, newCurrent );

            self.checkDisableYearHelper();
          });


      },

      //Helps out with disabling buttons when coming to an end
      checkDisableYearHelper: function() {
        var self = this,
            ymin = 0,
            ymax = self.allYears.length -1,
            ynext = $('button#ynext'),
            yprev = $('button#yprev'),

            currentYear = $('.currentYear').text(),
            currentYearInt = parseInt(currentYear),
            ycurrent = $.inArray(currentYearInt, self.allYears);

        self.checkDisable( ycurrent, ymin, ymax, ynext, yprev);

      },


      //Chained to selectDate, making the event change when button clicked
      changeEvent: function( direction, current) {
          var self = this,
              newDate = self.allDates[current],
              year = parseInt(self.allDates[current].slice(0,4)),
              yearHeading = $('.currentYear'),

              currentYear = parseInt($('.currentYear').text()),
              timeline = $('.timelineLine');


          if( currentYear !== year) {
            $('#' + currentYear).hide();
            $('#' + year).show().children().hide().fadeIn(300);
            yearHeading.text(year);

          }

          self.content.each(function() {
            var $this = $(this);

            //Find content with matching date
            if (newDate === $this.data("date")) {

              var monthIndex = parseInt(newDate.slice(5,7)) -1;
              //Hide previous content
              self.content.hide();

              //Animate the timeline blob to default white
              $('div.blob').animate({"backgroundColor": "#fefefe"}, 200);
              self.currentDate = $this.data("date");
              //Show new content
              $this.show();

              //Make the correct button animated black
              $('.eventButton').each(function() {
                if('d' + newDate  ===  $(this).attr('id')) {
                  $(this).children( ".blob" ).animate({"backgroundColor": "#444"}, 200);
                }

              }); 

              //Update the current date text
              $('p.currentDate').text(self.months[monthIndex] + ' ' + newDate.slice(8,10));
            }
          });

      },

      selectYear: function( current ) {
        var self = this,
            min = 0,
            max = self.allYears.length - 1,
            current,
            next = $('button#ynext'),
            prev = $('button#yprev');
            

        //Hide buttons if there is only one year in timeline
        if (max === 0) {
          $('.yselect').hide();
        }

        //Deefault action
        self.changeTimeline( 0, current );
        self.checkDisable( current, min, max, next, prev);


        //Next click function
        next.on("click", function(e) {
          e.preventDefault();
          var currentYear = $('.currentYear').text();
          var currentYearInt = parseInt(currentYear);

          var current = $.inArray(currentYearInt, self.allYears);

          current += 1;
          self.changeTimeline( -1, current );
          self.checkDisable( current, min, max, next, prev);
        });

        //Prev click function
        prev.on("click", function(e) {
          e.preventDefault();
          var currentYear = $('.currentYear').text();
          var currentYearInt = parseInt(currentYear);

          var current = $.inArray(currentYearInt, self.allYears);

          current -= 1;
          self.changeTimeline( +1, current );
          self.checkDisable( current, min, max, next, prev);
        });


      },


      changeTimeline: function( direction, current ) {
          var self = this,
              currentYear = $('.currentYear'),
              oldTimeline = $('#' + self.allYears[current + direction]),
              newTimeline = $('#' + self.allYears[current]);

          //Hide old info
          oldTimeline.hide();

          //Show new timeline, hide children then animate in the children again.
          newTimeline.show().children().hide().fadeIn(300);
          //Change year heading
          currentYear.text(self.allYears[current]);

        },


      //Checks if buttons ned disabling
      checkDisable: function( current, min, max, next, prev) {

          if(current === min) {
            prev.prop("disabled",true);
          } else {
            prev.prop("disabled",false);
          }

          if(current === max) {
            next.prop("disabled",true);
          } else {
            next.prop("disabled",false);
          }
        },



      addEvents: function() {
        var self = this,
            timelineLength = 850 - 9, //hardcode
            yearLength = 365,     //not supporting skottår
            relevantYears = [],
            margins = [],
            marginInd = 0,
            justAdded = 0,
            arr = [ 0, 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334 ]; //Days after each month

        

            //Creating and array of all dates contained in a year
            $.each(self.allYears, function(index, value) {
              self.content.each(function() {
                  var dateId = $(this).data("date");
                    if (dateId.indexOf(value) >= 0) {
                        relevantYears.push($(this));
                    }
              });


              //Sort the years by date so they are inscreasing
              relevantYears.sort(function(a, b) {
                var aData = a.data('date');
                var bData = b.data('date'); 
                return ((aData < bData) ? -1 : ((aData > bData) ? 1 : 0));
              });

                //Go through each year and add events to its timeline
                $.each(relevantYears, function() {


                  var date = $(this).data("date"),
                      month = date.slice(5,7),
                      day = date.slice(8,10),
                      totalDays = arr[parseInt(month)] + parseInt(day),
                      currentTimeline = $('#' + date.slice(0,4)),
                      marginTop = 0,
                      pixelsPerEvent = timelineLength / yearLength,


                      marginLeft = totalDays * pixelsPerEvent;


                      margins.push(marginLeft);

                      distance = margins[marginInd +1] - margins[marginInd];

                        //VERY BAD code quality, sorry
                        //If new node is within 6PX range of previous one
                        if( (distance < 6) && (distance >= 0) ) {

                          //AND if a node was added previously and the new node is still within 6px range of the original one
                          if(justAdded === 1 && (margins[marginInd + 1] - margins[marginInd -1] < 8) && (margins[marginInd + 1] - margins[marginInd -1] >= 0)) {
                            marginTop = 14;
                            marginLeft = margins[marginInd - 1];
                            if(timelineLength === 700 - 11) {
                              justAdded = 2;
                            } else {
                              justAdded = 4;
                            }
                          }
                          //OR if a node was added BUT the new one is further than 6px away from the original one
                          else if (justAdded === 1 && margins[marginInd + 1] - margins[marginInd -1] > 8) {
                            marginTop = 0;
                            justAdded = 0;
                          } else if (justAdded === 2 && (margins[marginInd +1] - margins[marginInd -2] < 8) && (margins[marginInd +1] - margins[marginInd -2] >= 0)) {
                            marginTop = 21;
                            marginLeft = margins[marginInd -2];
                            justAdded = 3;
                            console.log("hi");
                          } else if (justAdded === 3) {
                            marginTop: 0;
                            justAdded = 0;
                          } else if (justAdded === 4) {
                            marginTop: 0;
                            justAdded = 0;
                          }
                          //ELSE Its a new node so just give it margintop of 7.
                          else {
                            marginTop = 7;
                            marginLeft = margins[marginInd];
                            justAdded = 1;
                          }

                        //Otherwise set added variable to false
                        } else {
                          justAdded = 0;
                        }

                        if (margins[1] !== undefined) {
                          marginInd += 1;
                        }

                      //Div to place the blob inside
                      currentTimeline.append('<div class=eventButton id=d' + date + '></div>');

                        //Create the blob
                        $('div#d' + date).append('<div class=blob></div>').css({
                            "margin-left": marginLeft,
                            "position": "absolute",
                            "margin-top": marginTop,
                          });

                        //Create the hover infobox with title + date.
                        $('div#d' + date).append('<div class=hoverInfo id=h' + date + '>' + $(this).children().children("p.eventTitle").html() + '<span> | ' + date + '</span></div>');


                });
  

            //Empty the relevant yars array
            relevantYears = [];
            //Hide all hoverinfo boxes
            $('.hoverInfo').hide();

            });

      },

      mouseEvents: function() {

          var self = this;

          $('.eventButton').on({

            //Events for mouseenter
            mouseenter: function(e) {

              //Fetcha dateId från button
              var dateId = $(this).attr("id").substring(1, this.length);
                  hoverInfo = $('div.hoverInfo');
                  hoverDiv = $('div#h' + dateId);
                  blob = $(this).children('.blob');


              self.options.content.each(function() {
                var $this = $(this);

                if (dateId === $this.data("date")) {
                  hoverDiv[self.options.hoverTrans.trans](self.options.hoverTrans.transIn);
                  blob.animate({backgroundColor: "#444444"}, 300);
                  
                }
              })
          
            },

            //Events for mouseleave
            mouseleave: function(e) {

              hoverDiv[self.options.hoverTrans.trans](self.options.hoverTrans.transOut);

              var dateId = $(this).attr("id").substring(1, this.length);


              if(dateId !== self.currentDate) {
              blob.animate({backgroundColor: "#fefefe" }, 200);
              } else {
                blob.animate({backgroundColor: "#444444"}, 200);
              }
            },

            //Events for mouseclick
            click: function(e) {
              e.preventDefault();
              //Fetcha dateId från button
              var dateId = $(this).attr("id").substring(1, this.length);
              var blob = $(this).children('.blob');

              var monthIndex = parseInt(dateId.slice(5,7)) -1;
              $('p.currentDate').text(self.months[monthIndex] + ' ' + dateId.slice(8,10));

              $('.blob').css({backgroundColor: "#fefefe"});
              blob.css({backgroundColor: "#444444" });

              self.content.each(function() {
                var $this = $(this);

                //Leta efter diven som matchar kappen
                if (dateId === $this.data("date")) {

                  self.currentDate = $this.data("date");
                  self.checkDisableDate( $this.data("date") );


                  //Dölj det som visades tidigare, om det fanns något
                  self.content.hide();

                  //Visa content
                  $this.show();

                }
              });
            }

            });

      },

      //Disable check helper
      checkDisableDate: function ( date ) {
        var self = this;

        var dmin = 0,
            dmax = self.allDates.length -1.
            dnext = $('button#dnext'),
            dprev = $('button#dprev');

        var dcurrent = $.inArray(date, self.allDates);
        self.checkDisable(dcurrent, dmin, dmax, dnext, dprev);
      
      }
    };

  //Default options
  $.fn.simpleTimeline = function( options ) {
      var timeline = Object.create( Timeline );
      
      timeline.init( options );
  };

  $.fn.simpleTimeline.options = {
    content: $('div.tlcontainer'),
    hoverTrans: {
      trans: 'fadeToggle',
      transIn: 300,
      transOut: 300,
    },
    startDate: 1,
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };

})( jQuery, window, document );
