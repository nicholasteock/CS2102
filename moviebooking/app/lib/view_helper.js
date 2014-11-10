/******************************************************************************
 Navbar Helper
******************************************************************************/

Handlebars.registerHelper( 'navbar', function(options) {
	var output = 	'<nav class="navbar navbar-inverse" role="navigation">'+
					'<div class="container">';
					

		if(localStorage.userType == 0) {
			output += 	'<ul class="nav navbar-nav">'+
						'<li><a href="#/listing"><button type="button" class="btn btn-default navbar-btn"><span class="glyphicon glyphicon-home"></span></button></li>'+
						'<li><a><button type="button" class="btn btn-default navbar-btn adminpanel">Admin Panel</button></a></li>'+
						'</ul>';
		}
		else {
			output += 	'<ul class="nav navbar-nav">'+
						'<li><a href="#/listing"><button type="button" class="btn btn-default navbar-btn"><span class="glyphicon glyphicon-home"></span></button></li>'+
						'</ul>';
		}
		
		output += 	'<ul class="nav navbar-nav navbar-right">'+
					'<li><a><button type="button" class="btn btn-default navbar-btn login hide">Login</button></a></li>'+
					'<li><a><button type="button" class="btn btn-default navbar-btn register hide">Register</button></a></li>'+
					'<li><a><div class="navbar-text">Hi, '+localStorage.name+'</div></a></li>'+
					'<li><a><button type="button" class="btn btn-default navbar-btn logout">Logout</button></a></li>'+
					'</ul>'+
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

	output += '<h4 class="text-right">'+listingObject.length+' results</h4>';

	for( var i=0, iLen=listingObject.length; i<iLen; i++ ) {
		var itemHtml = "";

		itemHtml += '<div class="col-sm-4 col-md-4 col-lg-4 listing-item">'+
					'<div class="col-sm-12 col-md-12 col-lg-12 listing-title">'+
					listingObject[i].TITLE+
					'</div>'+
					'<div class="col-md-5 col-lg-5 listing-left">'+
					'<img class="listing-thumbnail" src="img/thumbs/'+listingObject[i].MID+'.jpg" alt="'+listingObject[i].TITLE+'">'+
					'<div class="text-center"><strong>Rating: '+listingObject[i].RATING+' / 10</strong></div>'+
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
					'<img src="img/'+detailsObject.mid+'.jpg" alt="'+detailsObject.title+'">'+
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

/******************************************************************************
 Admin page users Helper
******************************************************************************/

Handlebars.registerHelper('users', function(userlist, options) {
	var type 	= 	"",
		user 	= 	"",
		output 	= 	'<table class="table table-hover">'+
					'<thead>'+
					'<tr>'+
					'<th>Name</th>'+
					'<th>Email</th>'+
					'<th>Password</th>'+
					'<th>Type</th>'+
					'<th>Edit</th>'+
					'<th>Remove</th>'+
					'</tr>'+
					'</thead>'+
					'<tbody>';

	for(var i=0, iLen=userlist.length; i<iLen; i++) {
		user = 	'<tr>'+
				'<td>'+userlist[i].c_name+'</td>'+
				'<td>'+userlist[i].c_email+'</td>'+
				'<td>'+userlist[i].c_pwd+'</td>';

		if(userlist[i].c_type == 0) {
			type = "Admin";
		}
		else {
			type = "Customer";
		}

		user += '<td>'+type+'</td>'+
				'<td><button id="edituser-'+userlist[i].c_id+'" type="button" class="btn btn-sm btn-warning edituser">Edit</button></td>'+
				'<td><button id="removeuser-'+userlist[i].c_id+'" type="button" class="btn btn-sm btn-danger removeuser">Remove</button></td></tr>';
		output += user;
	}
	
	output += '</tbody></table>';

	return output;
});

/******************************************************************************
 Admin page bookings Helper
******************************************************************************/

Handlebars.registerHelper('bookings', function(bookinglist, options) {
	var type 	= 	"",
		booking = 	"",
		output 	= 	'<table class="table table-hover">'+
					'<thead>'+
					'<tr>'+
					'<th>Movie</th>'+
					'<th>Venue</th>'+
					'<th>Date</th>'+
					'<th>Time</th>'+
					'<th>Seat</th>'+
					'<th>Ticket#</th>'+
					'<th>Edit</th>'+
					'<th>Remove</th>'+
					'</tr>'+
					'</thead>'+
					'<tbody>';

	for(var i=0, iLen=bookinglist.length; i<iLen; i++) {
		var tempDate 	= new Date(bookinglist[i].showdate),
			dateString 	= tempDate.toDateString(),
			day 		= dateString.substr(0,3),
			month 		= dateString.substr(4,3),
			dayNum 		= dateString.substr(8,2),
			time 		= bookinglist[i].showtime.substring(0,5);

		booking = 	'<tr>'+
					'<td>'+bookinglist[i].title+'</td>'+
					'<td>'+bookinglist[i].cinema+'</td>'+
					'<td>'+dayNum+" "+month+", "+day+'</td>'+
					'<td>'+time+'</td>'+
					'<td>'+bookinglist[i].seatnum+'</td>'+
					'<td>'+bookinglist[i].ticketnum+'</td>'+
					'<td><button id="editbooking-'+bookinglist[i].ticketnum+'" type="button" class="btn btn-sm btn-warning editbooking">Edit</button></td>'+
					'<td><button id="removebooking-'+bookinglist[i].ticketnum+'" type="button" class="btn btn-sm btn-danger removebooking">Remove</button></td></tr>';

		output += booking;
	}
	
	output += '</tbody></table>';

	return output;
});

/******************************************************************************
 Admin page movies Helper
******************************************************************************/

Handlebars.registerHelper('movies', function(movieList, options) {
	var type 	= 	"",
		movie = 	"",
		output 	= 	'<table class="table table-hover">'+
					'<thead>'+
					'<tr>'+
					'<th>Title</th>'+
					'<th>Edit</th>'+
					'<th>Remove</th>'+
					'</tr>'+
					'</thead>'+
					'<tbody>';

	for(var i=0, iLen=movieList.length; i<iLen; i++) {
		movie = 	'<tr>'+
					'<td>'+movieList[i].TITLE+'</td>'+
					'<td><button id="editmovie-'+movieList[i].MID+'" type="button" class="btn btn-sm btn-warning editmovie">Edit</button></td>'+
					'<td><button id="removemovie-'+movieList[i].MID+'" type="button" class="btn btn-sm btn-danger removemovie">Remove</button></td></tr>';

		output += movie;
	}
	
	output += '</tbody></table>';

	return output;
});

/******************************************************************************
 Edit User Helper
******************************************************************************/

Handlebars.registerHelper('edituser', function(userObject, options) {

	var output = 	'<div class="container edituser-form">'+
					'<div class="text-danger edituser-error"></div>'+
					'<br>'+
					'<div class="col-sm-6 col-sm-offset-3">'+
					'<form class="form-horizontal" role="form">'+
					'<div class="form-group">'+
					'<label for="edituser-email" class="col-sm-3 control-label">Email</label>'+
					'<div class="col-sm-9">'+
					'<input type="email" class="form-control input-lg" id="edituser-email" placeholder="Email" value="'+userObject[0].c_email+'">'+
					'</div>'+
					'</div>'+
					'<div class="form-group">'+
					'<label for="edituser-name" class="col-sm-3 control-label">Name</label>'+
					'<div class="col-sm-9">'+
					'<input type="text" class="form-control input-lg" id="edituser-name" placeholder="Name" value="'+userObject[0].c_name+'">'+
					'<span class="text-danger"></span>'+
					'</div>'+
					'</div>'+
					'<div class="form-group">'+
					'<label for="edituser-password" class="col-sm-3 control-label">Password</label>'+
					'<div class="col-sm-9">'+
					'<input type="password" class="form-control input-lg" id="edituser-password" placeholder="Password" value="'+userObject[0].c_pwd+'">'+
					'</div>'+
					'</div>'+
					'<div class="form-group">'+
					'<div class="col-sm-12"><input type="checkbox" id="edituser-isadmin"';

		if( userObject[0].c_type==0 ) {
			output += " checked";
		}

		output += 	'> Administrator'+
					'</div></div>'+
					'<div class="form-group">'+
					'<div class="col-sm-2 col-sm-offset-4">'+
					'<button type="button" class="btn btn-lg btn-danger edituser-cancel">Cancel</button>'+
					'</div><div class="col-sm-6">'+
					'<button type="button" id="'+userObject[0].c_id+'" class="btn btn-lg btn-primary edituser-submit">Update</button>'+
					'</div></div></div></form></div></div>';

	return output;

});

/******************************************************************************
 Edit Movie Helper
******************************************************************************/

Handlebars.registerHelper('editmovie', function(movieObject, options) {
	movieObject = movieObject[0];
	console.log("movieobject : ", movieObject);
	var output = 	'<div class="container editmovie-form">'+
					'<div class="text-danger editmovie-error"></div>'+
					'<br>'+
					'<div class="col-sm-6 col-sm-offset-3">'+
					'<form class="form-horizontal" role="form">'+
					'<div class="form-group">'+
					'<label for="editmovie-email" class="col-sm-3 control-label">Title</label>'+
					'<div class="col-sm-9">'+
					'<input type="text" class="form-control input-lg" id="editmovie-title" placeholder="Title" value="'+movieObject.title+'">'+
					'</div>'+
					'</div>'+
					'<div class="form-group">'+
					'<label for="editmovie-rating" class="col-sm-3 control-label">Rating</label>'+
					'<div class="col-sm-9">'+
					'<input type="number" class="form-control input-lg" id="editmovie-rating" placeholder="Rating" value="'+movieObject.rating+'">'+
					'</div>'+
					'</div>'+
					'<div class="form-group">'+
					'<label for="editmovie-director" class="col-sm-3 control-label">Director</label>'+
					'<div class="col-sm-9">'+
					'<input type="text" class="form-control input-lg" id="editmovie-director" placeholder="Director" value="'+movieObject.director+'">'+
					'</div>'+
					'</div>'+
					'<div class="form-group">'+
					'<label for="editmovie-cast" class="col-sm-3 control-label">Cast</label>'+
					'<div class="col-sm-9">'+
					'<input type="text" class="form-control input-lg" id="editmovie-cast" placeholder="Cast" value="'+movieObject.cast+'">'+
					'</div>'+
					'</div>'+
					'<div class="form-group">'+
					'<label for="editmovie-genre" class="col-sm-3 control-label">Genre</label>'+
					'<div class="col-sm-9">'+
					'<input type="text" class="form-control input-lg" id="editmovie-title" placeholder="Genre" value="'+movieObject.genre+'">'+
					'</div>'+
					'</div>'+
					'<div class="form-group">'+
					'<label for="editmovie-runtime" class="col-sm-3 control-label">Runtime</label>'+
					'<div class="col-sm-9">'+
					'<input type="number" class="form-control input-lg" id="editmovie-runtime" placeholder="Runtime" value="'+movieObject.runtime+'">'+
					'</div>'+
					'</div>'+
					'<div class="form-group">'+
					'<label for="editmovie-mdarating" class="col-sm-3 control-label">MDA Rating</label>'+
					'<div class="col-sm-9">'+
					'<select id="editmovie-mdarating" class="form-control input-lg">';

	switch(movieObject.mdarating) {
		case 'G':
			output += 	'<option value="UR">UR</option>'+
						'<option value="G" selected="selected">G</option>'+
						'<option value="PG13">PG13</option>'+
						'<option value="NC16">NC16</option>'+
						'<option value="M18">M18</option>'+
						'<option value="R21">R21</option>';
			break;
		case 'PG13':
			output += 	'<option value="UR">UR</option>'+
						'<option value="G">G</option>'+
						'<option value="PG13" selected="selected">PG13</option>'+
						'<option value="NC16">NC16</option>'+
						'<option value="M18">M18</option>'+
						'<option value="R21">R21</option>';
			break;
		case 'NC16':
			output += 	'<option value="UR">UR</option>'+
						'<option value="G">G</option>'+
						'<option value="PG13">PG13</option>'+
						'<option value="NC16" selected="selected">NC16</option>'+
						'<option value="M18">M18</option>'+
						'<option value="R21">R21</option>';
			break;
		case 'M18':
			output += 	'<option value="UR">UR</option>'+
						'<option value="G">G</option>'+
						'<option value="PG13">PG13</option>'+
						'<option value="NC16">NC16</option>'+
						'<option value="M18" selected="selected">M18</option>'+
						'<option value="R21">R21</option>';
			break;
		case 'R21':
			output += 	'<option value="UR">UR</option>'+
						'<option value="G">G</option>'+
						'<option value="PG13">PG13</option>'+
						'<option value="NC16">NC16</option>'+
						'<option value="M18">M18</option>'+
						'<option value="R21" selected="selected">R21</option>';
			break;
		default:
			output += 	'<option value="UR" selected="selected">UR</option>'+
						'<option value="G">G</option>'+
						'<option value="PG13">PG13</option>'+
						'<option value="NC16">NC16</option>'+
						'<option value="M18">M18</option>'+
						'<option value="R21">R21</option>';
			break;

	};

	output +=	'</select>'+
				'</div>'+
				'</div>'+
				'<div class="form-group">'+
				'<label for="editmovie-language" class="col-sm-3 control-label">Language</label>'+
				'<div class="col-sm-9">'+
				'<select id="editmovie-language" class="form-control input-lg">';

	switch(movieObject.languages) {
		case 'English':
			output += 	'<option value="None">None</option>'+
						'<option value="English" selected="selected">English</option>'+
						'<option value="Chinese">Chinese</option>'+
						'<option value="Japanese">Japanese</option>'+
						'<option value="Spanish">Spanish</option>'+
						'<option value="Hindu">Hindu</option>';
			break;
		case 'Chinese':
			output += 	'<option value="None">None</option>'+
						'<option value="English">English</option>'+
						'<option value="Chinese" selected="selected">Chinese</option>'+
						'<option value="Japanese">Japanese</option>'+
						'<option value="Spanish">Spanish</option>'+
						'<option value="Hindu">Hindu</option>';
			break;
		case 'Japanese':
			output += 	'<option value="None">None</option>'+
						'<option value="English">English</option>'+
						'<option value="Chinese">Chinese</option>'+
						'<option value="Japanese" selected="selected">Japanese</option>'+
						'<option value="Spanish">Spanish</option>'+
						'<option value="Hindu">Hindu</option>';
			break;
		case 'Hindu':
			output += 	'<option value="None">None</option>'+
						'<option value="English">English</option>'+
						'<option value="Chinese">Chinese</option>'+
						'<option value="Japanese">Japanese</option>'+
						'<option value="Spanish">Spanish</option>'+
						'<option value="Hindu" selected="selected">Hindu</option>';
			break;
		case 'Spanish':
			output += 	'<option value="None">None</option>'+
						'<option value="English">English</option>'+
						'<option value="Chinese">Chinese</option>'+
						'<option value="Japanese">Japanese</option>'+
						'<option value="Spanish" selected="selected">Spanish</option>'+
						'<option value="Hindu">Hindu</option>';
			break;
		default:
			output += 	'<option value="None" selected="selected">None</option>'+
						'<option value="English">English</option>'+
						'<option value="Chinese">Chinese</option>'+
						'<option value="Japanese">Japanese</option>'+
						'<option value="Spanish">Spanish</option>'+
						'<option value="Hindu">Hindu</option>';
			break;
	};

	output +=	'</select>'+
				'</div>'+
				'</div>'+
				'<div class="form-group">'+
				'<label for="editmovie-subtitles" class="col-sm-3 control-label">Subtitles</label>'+
				'<div class="col-sm-9">'+
				'<select id="editmovie-subtitles" class="form-control input-lg">';


	switch(movieObject.subtitles) {
		case 'English':
			output += 	'<option value="None">None</option>'+
						'<option value="English" selected="selected">English</option>'+
						'<option value="Chinese">Chinese</option>'+
						'<option value="Japanese">Japanese</option>'+
						'<option value="Spanish">Spanish</option>'+
						'<option value="Hindu">Hindu</option>';
			break;
		case 'Chinese':
			output += 	'<option value="None">None</option>'+
						'<option value="English">English</option>'+
						'<option value="Chinese" selected="selected">Chinese</option>'+
						'<option value="Japanese">Japanese</option>'+
						'<option value="Spanish">Spanish</option>'+
						'<option value="Hindu">Hindu</option>';
			break;
		case 'Japanese':
			output += 	'<option value="None">None</option>'+
						'<option value="English">English</option>'+
						'<option value="Chinese">Chinese</option>'+
						'<option value="Japanese" selected="selected">Japanese</option>'+
						'<option value="Spanish">Spanish</option>'+
						'<option value="Hindu">Hindu</option>';
			break;
		case 'Spanish':
			output += 	'<option value="None">None</option>'+
						'<option value="English">English</option>'+
						'<option value="Chinese">Chinese</option>'+
						'<option value="Japanese">Japanese</option>'+
						'<option value="Spanish" selected="selected">Spanish</option>'+
						'<option value="Hindu">Hindu</option>';
			break;
		case 'Hindu':
			output += 	'<option value="None">None</option>'+
						'<option value="English">English</option>'+
						'<option value="Chinese">Chinese</option>'+
						'<option value="Japanese">Japanese</option>'+
						'<option value="Spanish">Spanish</option>'+
						'<option value="Hindu" selected="selected">Hindu</option>';
			break;
		default:
			output += 	'<option value="None" selected="selected">None</option>'+
						'<option value="English">English</option>'+
						'<option value="Chinese">Chinese</option>'+
						'<option value="Japanese">Japanese</option>'+
						'<option value="Spanish">Spanish</option>'+
						'<option value="Hindu">Hindu</option>';
			break;
	}

	output += 	'</select>'+
				'</div>'+
				'</div>'+
				'<div class="form-group">'+
				'<label for="editmovie-synopsis" class="col-sm-3 control-label">Synopsis</label>'+
				'<div class="col-sm-9">'+
				'<textarea class="form-control input-lg" rows="7" id="editmovie-synopsis" placeholder="Synopsis">'+movieObject.synopsis+'</textarea>'+
				'</div>'+
				'</div>'+
				'<div class="form-group">'+
				'<div class="col-sm-2 col-sm-offset-4">'+
				'<button type="button" class="btn btn-lg btn-danger editmovie-cancel">Cancel</button>'+
				'</div><div class="col-sm-6">'+
				'<button type="button" id="'+movieObject.mid+'" class="btn btn-lg btn-primary editmovie-submit">Update</button>'+
				'</div></div></div></form>'+
				'</div>'+
				'</div>';

	return output;
});
