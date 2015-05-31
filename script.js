var red = "#FF5B71";
$(document).ready(function(){
	$('h2 > a').hover(function(){
		$(this).parent().next().addClass('red');
	},function(){
		$(this).parent().next().removeClass('red');
	});
});
