var Rooms = {
  list: {},
  add: function(roomname) {
    if (!Rooms.list[roomname]) {
      Rooms.list[roomname] = [];
      RoomsView.render(roomname);
    }
  }
};
