$(function() {
  function buildHTML(chat) {
    var body = chat.chat.body;
    var time = chat.chat.created_at;
    var name = chat.name;
    var html = $('.chat-space-content').append('<h3>' + name + '</h3>' + '<p class="date">' + time + '</p>' + '<p>' + body + '</p>');
    return html;
  }

  $('.js-form').on('submit', function(e) {

    e.preventDefault();
    var textField = $('.form');
    var chat = textField.val();
    var path_name = location.pathname ;
    $.ajax({
      type: 'POST',
      url: path_name,
      data: {
        chat: {
          body: chat
        }
      },
      dataType: 'json'
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.chats').append(html);
      textField.val('');
    })
    .fail(function() {
      alert('error');
    });
  });

  function update(){
    var path_name = location.pathname ;
    $.ajax({
      type: 'GET',
      url: path_name,
      dataType: 'json'
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.chats').append(html);
      textField.val('');
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(update, 2000);
});
