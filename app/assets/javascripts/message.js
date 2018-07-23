$(function(){
  function buildHTML(message){
    var html =
    `
    <div class="main__content__message">
      <div class="main__content__message__upper">
        <span class="main__content__message__upper__name">
          ${message.user_name}
        </span>
        <span class="main__content__message__upper__datetime">
          ${message.created_at}
        </span>
      </div>
        <div class="main__content__message__text">
          ${message.body}
        </div>
      ${ message.image? `
              <img src = '${ message.image }', class='main__content__message__image'>` :''}
    </div>
    `;
    return html;
  };

  function scroll(){
    $('.main__content').animate({scrollTop: $('.main__content')[0].scrollHeight},'fast')
  }

  $("#new_message").on("submit",function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      debugger;
      $('.main__content').append(html);
      $('.main__footer__formarea__submit').prop('disabled', false);
      scroll()
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('送信に失敗しました')
    })
  })
})

