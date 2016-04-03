Meteor.publish('receipts', function() {
  return Receipts.find();
});