$(function(){
  function appendUser(user){
    var searchResult = $("#user-search-result");
    var html =
    `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user.name}</p>
      <a class="chat-group-user__btn chat-group-user__btn--add">追加</a>
    </div>
    `
    searchResult.append(html);
  }
  $('.chat-group-form__input').on('keyup',function(){
    var input = $(this).val();
    $.ajax({
      type: 'GET',
      url: location.origin + '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      $('#user-search-result').empty();
      if(users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNoUser("一致するユーザーは存在しません。");
      }
    })
  });
});
