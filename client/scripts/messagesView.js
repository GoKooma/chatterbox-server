var MessagesView = {

  $chats: $('#chats'),

  initialize: function() {
    App.messages = new Messages();
    $('body').on('click', '.username', Friends.toggleStatus);
  },

  render: function(message) {
    //message.text.replace('<', '&lt;');
    if (message.text) {
      if (Friends.list[message.username]) {
        MessagesView.$chats.prepend(
          `<div class="chat"><div class="username friend">${message.username}</div><div>${message.text}</div></div>`
        );
      } else {
        MessagesView.$chats.prepend(
          `<div class="chat"><div class="username">${message.username}</div><div>${message.text}</div></div>`
        );
      }
    }
  }

};
