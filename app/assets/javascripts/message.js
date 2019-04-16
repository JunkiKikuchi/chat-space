$(function(){
  function scroll(){
    var target = $('.message').last();
    var position = target.offset().top + $('.messages').scrollTop();
    $('.messages').animate({scrollTop:position}, 500, 'swing');
  }
  function buildHTML(content){
    var message = content.message ? `${content.message}` : "";
    var image = content.image.url ? `<img src=${content.image.url}>` : "";
    var html = `<div class="message" data-message-id='${content.id}'>
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                    ${content.user_name}
                    </p>
                    <p class="message__upper-info__date">
                    ${content.date}
                    </p>
                  </div>
                  <p class="message__text">
                  ${message}
                  </p>
                  ${image}
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
       var html = buildHTML(data);
       $('.messages').append(html);
       scroll();
       $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('メッセージを送信できませんでした！！');
    })
  });

  var reloadMessages = function() {
    var group_id = $('.main-header__left-box__current-group').data('group-id');
    last_message_id = $('.message').last().data('message-id');
    $.ajax({
      url: '/groups/' + group_id + '/api/messages',
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      for(let message of messages){
        insertHTML += buildHTML(message);
      }
      $('.messages').append(insertHTML);
      scroll();
    })
    .fail(function() {
      alert('自動更新に失敗しました。');
    });
  };
  setInterval(reloadMessages, 5000);
});
