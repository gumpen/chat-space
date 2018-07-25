$(function(){
  var searchResult = $("#user-search-result");
  var addedUsers = $("#chat-group-users");
  function appendUser(user){
    var html =
    `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user.name}</p>
      <a class="chat-group-user__btn chat-group-user__btn--add click-add" data-user='{"id":"${user.id}","name":"${user.name}"}'>追加</a>
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
      <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove click-rm'>削除</a>
    </div>
    `
    addedUsers.append(html);
  }
  $('#user-search-field').on('keyup',function(){
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
    .fail(function(){
        alert('ユーザー検索に失敗しました')
    })
  });
  $('#user-search-result').on('click','.click-add',function(){
    var name = $(this).data("user").name;
    var id = $(this).data("user").id;
    addUser(name, id);
    $(this).parent().remove();
  });
  $('#chat-group-users').on('click','.click-rm',function(){
    $(this).parent().remove();
  })

});
