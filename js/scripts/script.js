$(document).ready(function(){
  $('.overlay span').click(function(){
    hideOverlay();
  });
  $('.overlay').click(function(){
    hideOverlay();
  });
  $('.overlay .pane .x').click(function(){
    hideOverlay();
  })
  $('.overlay .pane').click(function(){
    event.stopPropagation();
  });
  
});


function showOverlay(){
  $('.overlay').css('visibility','visible');
  $('.overlay').css('opacity','1');
}

function hideOverlay(){
  $('.overlay').css('opacity','0');
  $('.overlay').css('visibility','hidden');
  console.log($('.overlay .pane img').width());
}



function formSubmit(){
  $raw = $('contactForm').html();
  $('#submit').html('<p>Thank you for your message!</p>');
}