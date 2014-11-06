/******************************************************************************
 Movie Listing Helper
******************************************************************************/

Handlebars.registerHelper( 'navbar', function(options) {
	var output = 	'<nav class="navbar navbar-inverse" role="navigation">'+
					'<div class="container">'+
					'<div class="pull-right">'+
					'<button type="button" class="btn btn-default navbar-btn login hide">Login</button>'+
					'<button type="button" class="btn btn-default navbar-btn register hide">Register</button>'+
					'<div class="navbar-text">Hi, '+localStorage.name+'</div>'+
					'<button type="button" class="btn btn-default navbar-btn logout">Logout</button>'+
					'</div>'+
					'</div>'+
					'</nav>';
	return output;
});

/******************************************************************************
 Movie Listing Helper
******************************************************************************/

Handlebars.registerHelper( 'movielisting', function(listingObject, options) {
	var output = "";

	if(listingObject.length == 0) {
		output = 	'<div class="col-sm-12"><div class="panel panel-default"><div class="panel-body">'+
					'<h3>Your search returned no results.</h3>'
  					'</div></div></div>';
		return output;
	}

	for( var i=0, iLen=listingObject.length; i<iLen; i++ ) {
		var itemHtml = "";

		itemHtml += '<div class="col-sm-4 col-md-4 col-lg-4 listing-item">'+
					'<div class="col-sm-12 col-md-12 col-lg-12 listing-title">'+
					listingObject[i].TITLE+
					'</div>'+
					'<div class="col-md-5 col-lg-5 listing-left">'+
					'<img class="listing-thumbnail" src="img/thumbs/'+listingObject[i].MID+'.jpg">'+
					'</div>'+
					'<div class="col-md-7 col-lg-7 listing-right">'+
					'<div class="listing-synopsis">'+
					listingObject[i].SYNOPSIS+
					'</div>'+
					'<div class="listing-book">'+
					'<a href="#/movie?id='+listingObject[i].MID+'">'+
					'<button type="button" class="btn btn-default btn-sm">BOOK NOW</button></a></div></div></div>';

		output += itemHtml;
	}

	return output;
});

/******************************************************************************
 Showtimes Helper
******************************************************************************/

Handlebars.registerHelper('showtimeslist', function(showtimesObject, options) {
	var output = "";
	var formedArray = [];
	var showtimesObject = _.groupBy(showtimesObject, 'p_name');

	_.each(showtimesObject, function(value, key) {
		var formedObject 	= {};
		formedObject.cinema = key;
		formedObject.shows 	= _.groupBy(value, 'SHOWDATE');
		formedArray.push(formedObject);
	});

	for( var i=0, iLen=formedArray.length; i<iLen; i++ ) {
		var itemHtml = "";

		itemHtml = 	'<div class="movie-showtime-venue">'+
					formedArray[i].cinema+
					'</div><div><ul class="col-sm-12 col-md-12 col-lg-12 movie-showtime-list">';

		_.each(formedArray[i].shows, function(value, key) {
			var listItem = "";

			var tempDate 	= new Date(key),
				dateString 	= tempDate.toDateString(),
				day 		= dateString.substr(0,3),
				month 		= dateString.substr(4,3),
				dayNum 		= dateString.substr(8,2);

			listItem = 	'<li>'+
						'<span class="col-sm-6 col-md-2 col-lg-2 movie-showtime-date">'+
						dayNum+" "+month+", "+day+
						'</span><span class="col-sm-6 col-md-10 col-lg-10">'+
						'<ul class="movie-showtime-timelist">';

			for( var j=0; j<value.length; j++ ) {
				var temp = "";
				temp = '<li><a href="#/booking?sid='+value[j].SID+'">'+value[j].TIME.substring(0,5)+'</a></li>';
				listItem += temp;
			}

			listItem += '</ul></span></li>';
			itemHtml += listItem;
		});

		itemHtml += '</ul></div>';
		output += itemHtml;
	}
	return output;
});

/******************************************************************************
 Booking screen movie details Helper
******************************************************************************/

Handlebars.registerHelper('moviebookingdetails', function(detailsObject, options) {
	var tempDate 	= new Date(detailsObject.showdate),
		dateString 	= tempDate.toDateString(),
		day 		= dateString.substr(0,3),
		month 		= dateString.substr(4,3),
		dayNum 		= dateString.substr(8,2),
		time 		= detailsObject.time.substring(0,5);

	var output = 	'<div class="panel-body">'+
					'<div class="col-sm-12 col-md-6 col-lg-6">'+
					'<div class="booking-movie-venue">'+
					'<span class="col-sm-3 col-md-3 col-lg-3">Cineplex: </span>'+
					'<span class="col-sm-9 col-md-9 col-lg-9">'+detailsObject.cineplex+'</span>'+
					'</div>'+
					'<div class="booking-movie-title">'+
					'<span class="col-sm-3 col-md-3 col-lg-3">Movie Title: </span>'+
					'<span class="col-sm-9 col-md-9 col-lg-9">'+detailsObject.title+'</span>'+
					'</div>'+
					'<div class="booking-movie-date">'+
					'<span class="col-sm-3 col-md-3 col-lg-3">Movie Date: </span>'+
					'<span class="col-sm-9 col-md-9 col-lg-9">'+dayNum+" "+month+", "+day+'</span>'+
					'</div>'+
					'<div class="booking-movie-time">'+
					'<span class="col-sm-3 col-md-3 col-lg-3">Movie Time: </span>'+
					'<span class="col-sm-9 col-md-9 col-lg-9">'+time+'</span>'+
					'</div>'+
					'</div>'+
					'<div class="col-sm-12 col-md-6 col-lg-6 booking-movie-info">'+
					'<div class="booking-movie-duration">'+
					'<span class="col-sm-3 col-md-3 col-lg-3">Duration: </span>'+
					'<span class="col-sm-9 col-md-9 col-lg-9">'+detailsObject.runtime+' mins</span>'+
					'</div>'+
					'<div class="booking-movie-rating">'+
					'<span class="col-sm-3 col-md-3 col-lg-3">Rating: </span>'+
					'<span class="col-sm-9 col-md-9 col-lg-9">'+detailsObject.mdarating+'</span>'+
					'</div>'+
					'</div>'+
					'</div>';

	return output;
});

/******************************************************************************
 Pre booking screen movie details Helper
******************************************************************************/

Handlebars.registerHelper('moviedetails', function(detailsObject, options) {
	var subtitles = detailsObject.subtitles == "None" ? "" : " with " + detailsObject.subtitles + " subtitles";

	var output 	= 	'<div class="col-sm-12 col-md-5 col-lg-5 movie-poster">'+
					'<img src="img/'+detailsObject.MID+'.jpg">'+
					// '<img src="img/'+detailsObject.mid+'.jpg">'+
					'</div>'+
					'<div class="col-sm-12 col-md-5 col-lg-5 movie-details">'+
					'<div class="col-sm-12 col-md-12 col-lg-12 movie-title">'+
					detailsObject.title+
					'</div>'+
					'<div class="col-sm-12 col-md-12 col-lg-12 movie-cast">'+
					'<span class="col-sm-3 col-md-3 col-lg-3">Cast</span>'+
					'<span class="col-sm-9 col-md-9 col-lg-9">'+
					detailsObject.cast+
					'</span>'+
					'</div>'+
					'<div class="col-sm-12 col-md-12 col-lg-12 movie-director">'+
					'<span class="col-sm-3 col-md-3 col-lg-3">Director</span>'+
					'<span class="col-sm-9 col-md-9 col-lg-9">'+
					detailsObject.director+
					'</span>'+
					'</div>'+
					'<div class="col-sm-12 col-md-12 col-lg-12 movie-language">'+
					'<span class="col-sm-3 col-md-3 col-lg-3">Language</span>'+
					'<span class="col-sm-9 col-md-9 col-lg-9">'+
					detailsObject.languages+subtitles+
					'</span>'+
					'</div>'+
					'<div class="col-sm-12 col-md-12 col-lg-12 movie-runtime">'+
					'<span class="col-sm-3 col-md-3 col-lg-3">Runtime</span>'+
					'<span class="col-sm-9 col-md-9 col-lg-9">'+
					detailsObject.runtime+' mins'+
					'</span>'+
					'</div>'+
					'<div class="col-sm-12 col-md-12 col-lg-12 movie-rating">'+
					'<span class="col-sm-3 col-md-3 col-lg-3">MDA Rating</span>'+
					'<span class="col-sm-9 col-md-9 col-lg-9">'+
					detailsObject.mdarating+
					'</span>'+
					'</div>'+
					'<div class="col-sm-12 col-md-12 col-lg-12 movie-synopsis">'+
					detailsObject.synopsis+
					'</div>'+
					'</div>';

	return output;
});

/******************************************************************************
 Confirmation Helper
******************************************************************************/

Handlebars.registerHelper('confirmation', function(options) {
	var bookingObject 	= JSON.parse(localStorage.booking);
	var movieDetails 	= bookingObject.movieDetails;
	var bookedSeats 	= bookingObject.bookedSeats.join(", ");

	var tempDate 	= new Date(movieDetails.showdate),
		dateString 	= tempDate.toDateString(),
		day 		= dateString.substr(0,3),
		month 		= dateString.substr(4,3),
		dayNum 		= dateString.substr(8,2),
		time 		= movieDetails.time.substring(0,5);

	var output = 	'<tr><td>Cineplex:</td><td>'+
					movieDetails.cineplex+
					'</td></tr>'+
					'<tr><td>Movie Title:</td><td>'+
					movieDetails.title+
					'</td></tr>'+
					'<tr><td>Movie Date:</td><td>'+
					dayNum+" "+month+", "+day+
					'</td></tr>'+
					'<tr><td>Movie Time:</td><td>'+
					time+
					'</td></tr>'+
					'<tr><td>Duration:</td><td>'+
					movieDetails.runtime+' mins'+
					'</td></tr>'+
					'<tr><td>Rating:</td><td>'+
					movieDetails.mdarating+
					'</td></tr>'+
					'<tr><td>Seats:</td><td>'+
					bookedSeats+
					'</td></tr>';
	return output;
});


