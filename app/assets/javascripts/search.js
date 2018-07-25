$(function(){
  var searchResult = $("#user-search-result");
  var addedUsers = $("#chat-group-users");
  var preWord;
  function appendUser(user){
    var html =
    `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user.name}</p>
      <a class="chat-group-user__btn chat-group-user__btn--add user-search-add" data-user='{"id":"${user.id}","name":"${user.name}"}'>追加</a>
    </div>
    `
    searchResult.append(html);
  }
  function appendNoUser(str){
    var searchResult = $("#user-search-result");
    var html =
    `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${str}</p>
    </div>
    `
    searchResult.append(html);
  }
  function addUser(name,id){
    var html =
    `
    <div id="#chat-group-user-${id}" class="chat-group-user clearfix">
      <input name="group[user_ids][]" type="hidden" value="${id}">
      <p class="chat-group-user__name">${name}</p>
      <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
    </div>
    `
    addedUsers.append(html);
  }
  $('#user-search-field').on('keyup',function(){
    var input = $(this).val();
    if(input != preWord && input.length != 0){
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
      .fail(function(){
        alert('ユーザー検索に失敗しました')
      })
    }
    preWord = input;
  });
  $('#user-search-result').on('click','.user-search-add',function(){
    var name = $(this).data("user").name;
    var id = $(this).data("user").id;
    addUser(name, id);
    $(this).parent().remove();
  });
  $('#chat-group-users').on('click','.js-remove-btn',function(){
    $(this).parent().remove();
  })

});
