var View     = require('./view')
  , template = require('./templates/booking');

var showSeats = function() {
	console.log("ok");
	ss=$("#test").seat({
											tpl:'<span class="tpl" style="background-color: #fff; width: 25px; height: 25px; "></span>',
											bgcolor:'#fff',
											space:30,
											title:false,
											toleft:30,
											totop:50,
											colorprice:['#fff','#fff','#fff','#fff'],
											result:function(data,current){
												$('.selected_panel').empty();seatCart='';
												$.each(data,function(index){
													//alert(this);
													var da=this.split(',');
													var s_seat=$('<li><span class="info"><i class="nr">N</i> '+da[4]+': <i class="nr">R</i> '+da[3]+'</span></li>');
													var del=$('<span class="s_delete">X</span>');
														del.bind('click',function(e){
															e.preventDefault();
															e.stopPropagation();
														
														$("#s_"+da[0]+"_"+da[6]+"_"+venueid).trigger('click');
														
														})
														s_seat.append(del);
													$('.selected_panel').append(s_seat);
													seatCart=seatCart+","+da[0];
												})
												$('#tPrice').html("$"+data.length*2);
												seatCart=seatCart.substring(1,seatCart.length);
												$('#seat-cart').val(seatCart);
											}});
};

var afterRender = function() {
	setTimeout( showSeats(), 100 );
};

module.exports = View.extend({
    id: 'booking-view',
    afterRender: afterRender,
    template: template
})
