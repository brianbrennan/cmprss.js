$(document).ready(function(){$('.overlayspan').click(function(){hideOverlay();});$('.overlay').click(function(){hideOverlay();});$('.overlay.pane.x').click(function(){hideOverlay();})$('.overlay.pane').click(function(){event.stopPropagation();});});functionshowOverlay(){$('.overlay').css('visibility','visible');$('.overlay').css('opacity','1');}functionhideOverlay(){$('.overlay').css('opacity','0');$('.overlay').css('visibility','hidden');console.log($('.overlay.paneimg').width());}functionformSubmit(){$raw=$('contactForm').html();$('#submit').html('<p>Thankyouforyourmessage!</p>');}