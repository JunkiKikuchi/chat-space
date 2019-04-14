$(function(){
  var search_list = $("#user-search-result");
  var member_list = $("#chat-group-users");
  function searchUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    search_list.append(html);
  }
  function searchErrMsgToHTML(){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">一致するユーザーが見つかりません</p>
                </div>`
    search_list.append(html);
  }
  function addMember(userInfo){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${userInfo.userId}'>
                  <input name='group[user_ids][]' type='hidden' value='${userInfo.userId}'>
                  <p class='chat-group-user__name'>${userInfo.userName}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    member_list.append(html);
  }


  $('body').on('click', '#user-search-result a', function(event){
    var userInfo = {
      userId : $(this).data('user-id'),
      userName : $(this).data('user-name')
    };
    $(this).parent().remove();
    addMember(userInfo);
  });

  $('body').on('click', '#chat-group-users a', function(event){
    $(this).parent().remove();
  });

  $("#user-search-field").on("keyup", function(){
    var input = $('#user-search-field').val();
    var currentUserId = $('#group_user_ids').val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })
    .done(function(users){
      $("#user-search-result").empty();
      if(input && users.length !== 0){
        users.forEach(function(user){
          searchUser(user);
        })
      }
      if(users.length === 0) {
        searchErrMsgToHTML();
      }
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    })
  });
});
