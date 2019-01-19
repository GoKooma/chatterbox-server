var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
    Parse.readAll((data) => {
      $.each(data.results, function(i, message) {
        if (message.roomname) {
          if (!Rooms.list[message.roomname]) {
            Rooms.list[message.roomname] = [];
            RoomsView.render(message.roomname);
          }
          Rooms.list[message.roomname].push(message);
        }
      });
    });
    $(document).ready(function() {
      $('#addRoom').click(function() {
        $('#roomform').toggle();
      });
      $('#createRoom').click(function() {
        event.preventDefault();
        let roomname = $('input#room').val();
        Rooms.add(roomname);
        $('input#room').val('');
        RoomsView.$select.val(roomname);
      });
    });
    RoomsView.$select.change(RoomsView.changeRoom);
  },

  render: function(roomname) {
    RoomsView.$select.prepend(`<option class="${roomname}" value="${roomname}">${roomname}</div>`);
  },

  changeRoom: function(event) {
    MessagesView.$chats.empty();
    App.messages.list = [];
    App.fetch();
  }
};
