var View     = require('./view'),
	template = require('./templates/booking');

var events = {
  // 'click .seat'  : 'seatClicked'
  // 'click .submitbooking'  : 'submitBooking'
};

var bookedSeats;

var movieDetails;

var getRenderData = function() {
  if(localStorage.userId == undefined || localStorage.name == undefined) {
    alert("Please log in to continue");
    Application.router.navigate('login', {trigger: true});
    return false;
  }

  var hash    = window.location.hash,
      temp    = hash.indexOf('?sid='),
      sid     = hash.substring(temp+5),
      params  = {sid: sid};
  
  var dfdResult = $.Deferred();

  var onSuccess = function( response ) {
    var seats       = response.data;
    var responseObj = {};
    bookedSeats     = [];

    for(var i=0; i<seats.length; i++) {
      bookedSeats.push(seats[i].SEATNUM);
    }

    $.ajax({
        url       : Application.api+"movie?sid="+sid,
        type      : "GET",
        dataType  : 'json',
        success   : function(response) {
          var details = response.data;
          movieDetails = details[0];
          responseObj.details  = details[0];
          responseObj.seats    = seats;
          return dfdResult.resolve( responseObj );
        },
        error     : function(response) {
          console.log("Error in ajax call.");
          return dfdResult.reject( responseObj );
        }
    });
  };
  
  var onError = function( response ) {
    return dfdResult.reject( response );
  };
  
  $.ajax({
      url       : Application.api+"seats",
      type      : "GET",
      dataType  : 'json',
      data      : params,
      success   : onSuccess,
      error     : onError
  });
  
  return dfdResult;
};

var logout = function() {
  localStorage.removeItem('userId');
  localStorage.removeItem('name');
  localStorage.removeItem('userType');
  localStorage.removeItem('booking');
  Application.router.navigate('login', {trigger: true});
  return false;
};

var afterRender = function() {
	setTimeout( function() {
		// init([ "A-1", "B-10", "C-5" ]);
    init(bookedSeats);
	}, 1000);
};

var settings = {
   rows: 11,
   cols: 20,
   rowCssPrefix: 'row-',
   colCssPrefix: 'col-',
   seatWidth: 35,
   seatHeight: 35,
   seatCss: 'seat',
   selectedSeatCss: 'selectedSeat',
   selectingSeatCss: 'selectingSeat'
};

var rowArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

var init = function (reservedSeat) {
    var str = [], seatNo, className, rowChar;

    for( var i=0, iLen=settings.rows; i<iLen; i++) {
    	rowChar = rowArr[i];

        for (var j = 0, jLen=settings.cols; j<jLen; j++) {
            seatNo = j + 1;
            if(seatNo < 10) {
              seatNo = "0"+seatNo.toString();
            }
            className = settings.seatCss + ' ' + settings.rowCssPrefix + rowChar + ' ' + settings.colCssPrefix + seatNo.toString();
            
            if( $.isArray(reservedSeat)  )
            if ($.isArray(reservedSeat) && $.inArray(rowChar + "-" + seatNo, reservedSeat) != -1) {
                className += ' ' + settings.selectedSeatCss;
            }
            
            str.push('<li class="' + className + '"' +
                      'style="top:' + (i * settings.seatHeight).toString() + 'px;left:' + (j * settings.seatWidth).toString() + 'px">' +
                      '<a title="' + seatNo + '">' + seatNo + '</a>' +
                      '</li>');
        }
    }
    $('#place').html(str.join(''));

    $(".seat").click(seatClicked);
    $(".submitbooking").click(submitBooking);
};

var seatClicked = function( ev ) {
	var $seat = $(ev.target),
		targetClasses = "",
		seatRow = "",
		seatCol = "",
		charPos,
		spacePos;

	if( $seat.hasClass("selectedSeat") ) { return; }

	$seat.toggleClass( "selectingSeat" );
	targetClasses = $seat.attr("class");
	
	// Get row character
	charPos = targetClasses.indexOf("row-");
	spacePos = targetClasses.indexOf(" ", charPos);
	seatRow = targetClasses.substring( charPos+4, spacePos );

	// Get column number
	charPos = targetClasses.indexOf("col-");
	spacePos = targetClasses.indexOf(" ", charPos);
	if( spacePos === -1 ) { spacePos = targetClasses.length; }
	seatCol = targetClasses.substring( charPos+4, spacePos );
};

var submitBooking = function() {
  var that = this;

  var selectedSeats = $(".selectingSeat"),
      bookedSeats   = [],
      params        = {};

  if(selectedSeats.length === 0) {
    alert("Please select at least one seat.");
    return;
  }

  for( var i=0, iLen=selectedSeats.length; i<iLen; i++ ) {
    var classArray = $(selectedSeats[i]).attr('class').split(" ");
    var row = classArray[1].substring(4);
    var col = classArray[2].substring(4);
    var seat = "";

    if(Number(row) < 10) {
      row = "0" + row;
    }

    seat = row + "-" + col;
    bookedSeats.push(seat);
  }

  var hash    = window.location.hash,
      temp    = hash.indexOf('?sid='),
      sid     = hash.substring(temp+5),
      c_id    = Number(localStorage.userId);

  params = {
    sid   : sid,
    seats : bookedSeats,
    c_id  : c_id
  };

  $.ajax({
      url       : Application.api+"book",
      type      : "POST",
      dataType  : 'json',
      data      : params,
      success   : function(response) {
        var tempObj = {
          movieDetails  : movieDetails,
          bookedSeats   : params.seats
        };
        localStorage.booking = "";
        localStorage.booking = JSON.stringify(tempObj);
        Application.router.navigate('confirmation', {trigger: true});
      },
      error     : function(response) {
        console.log("in error : ", response);
      }
  });
};

module.exports = View.extend({
    id            : 'booking-view',
    events        : events,
    getRenderData : getRenderData,
    afterRender   : afterRender,
    template      : template,
    seatClicked   : seatClicked,
    submitBooking : submitBooking,
    bookedSeats   : bookedSeats
})
