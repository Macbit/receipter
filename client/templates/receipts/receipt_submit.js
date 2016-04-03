Template.receiptSubmit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var receipt = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };
    
    Meteor.call('receiptInsert', receipt, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);
      
      // show this result but route anyway
      if (result.receiptExists)
        throwError('This link has already been receipted');
      
      Router.go('receiptPage', {_id: result._id});
    });
  }
});