$(function(){
  function scroll(){
    var target = $('.message').last();
    var position = target.offset().top + $('.messages').scrollTop();
    $('.messages').animate({scrollTop:position}, 500, 'swing');
  }
  function buildHTML(content){
    var message = content.message ? `${content.message}` : "";
    var image = content.image ? `<img src=${content.image}>` : "";
    var html = `<div class="message">
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
});
