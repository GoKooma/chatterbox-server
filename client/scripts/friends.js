var Friends = {
  list: {},

  toggleStatus: function(event) {
    //console.log('clicked friend');
    let friend = $(event.currentTarget).text();
    //console.log(friend);
    if (!Friends.list[friend]) {
      Friends.list[friend] = true;
      allPosts = Array.from($('#chats').find('.username'));
      for (let i = 0; i < allPosts.length; i++) {
        if ($(allPosts[i]).text() === friend) {
          $(allPosts[i]).addClass('friend');
        }
      }
    } else {
      Friends.list[friend] = false;
      allPosts = Array.from($('#chats').find('.username'));
      for (let i = 0; i < allPosts.length; i++) {
        if ($(allPosts[i]).text() === friend) {
          $(allPosts[i]).removeClass('friend');
        }
      }
    }
  }

};
