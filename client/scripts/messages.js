class Messages {
  constructor() {
    this.list = [];
  }
  addMessage(username = 'anonymous', text, roomname = 'lobby', objectId) {
    this.list.push({'username': username, 'text': text, 'roomname': roomname, 'objectId': objectId});
  }
}
