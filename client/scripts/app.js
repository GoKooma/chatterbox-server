var App = {

  $spinner: $('.spinner img'),

  username: 'anonymous',

  initialize: function() {
    App.username = window.location.search.substr(10);
    App.startSpinner();
    //    App.messages = new Messages();

    FormView.initialize();
    RoomsView.render('All Rooms');
    Rooms.list['All Rooms'] = [];
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.fetch(App.stopSpinner());
    setInterval(function() { RoomsView.initialize(); App.fetch(); }, 10000);
  },

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
      // examine the response from the server request:
      console.log(data);
      $.each(data.results.reverse(), function(i, message) {
        let roomFilter = false;
        let currentRoom = RoomsView.$select.val();
        if (currentRoom === 'All Rooms') {
          roomFilter = true;
        }
        if (message.text && (message.roomname === currentRoom || roomFilter)) {
          let unique = true;
          for (let i = 0; i < App.messages.list.length; i++) {
            if (message.objectId === App.messages.list[i].objectId) {
              unique = false;
            }
          }
          if (unique) {
            message.username = DOMPurify.sanitize(message.username);
            message.text = DOMPurify.sanitize(message.text);
            message.roomname = DOMPurify.sanitize(message.roomname);
            App.messages.addMessage(message.username, message.text, message.roomname);
            MessagesView.render(message);
          }
          /*
           *for (let i = 0; i < Friends.list.length; i++) {
           *  if (Friends.list[i] === message.username) {
           *  }
           *}
           */
        }
      });
      //MessagesView.$chats.find('.username').on('click', Friends.toggleStatus);
      callback();
    });
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};
