$(function(){
  $("#message_submit").on("submit",function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href;
  })
  $.ajax({
    url: href,
    type: 'POST',
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
})
