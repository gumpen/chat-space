$(function(){
  function buildHTML(message){
    var html =
    `
    <div class="main__content__message" data-message-id="${message.id}">
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

  function updateMessage(){
    if (location.pathname.match(/\/groups\/\d+\/messages/)){
      var lastMessageId = $('.main__content').find('.main__content__message').last().data('message-id');
      console.log(lastMessageId);
      $.ajax({
        url: location.pathname,
        type: "GET",
        data: {"lastMessageId": lastMessageId},
        dataType: 'json'
      })
      .done(function(messages){
        console.log(messages);
        if(messages.length !== 0){
          messages.forEach(function(message){
            var html = buildHTML(message);
            console.log(html);
            $('.main__content').append(html);
            scroll();
          })
        }
      })
      .fail(function(){
        alert('自動更新に失敗しました')
      })
    }
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
      $('.main__content').append(html);
      $('.main__footer__formarea__submit').prop('disabled', false);
      scroll()
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('送信に失敗しました')
    })
  })

  setInterval(updateMessage, 5000);
})

