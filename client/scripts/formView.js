var FormView = {

  $form: $('form'),
  $message: $('input#message'),

  initialize: function() {
    //FormView.$form.on('submit', FormView.handleSubmit);
    $('#submitmessage').click(FormView.handleSubmit);
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();
    let msg = {
      'text': FormView.$message.val(),
      'username': App.username,
      'roomname': RoomsView.$select.val()
    };
    Parse.create(msg, App.fetch(App.stopSpinner));
    FormView.$message.val('');
    console.log('click! message submitted.');
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};
