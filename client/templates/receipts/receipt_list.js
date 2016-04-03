Template.receiptsList.helpers({
  receipts: function() {
    return Receipts.find({}, {sort: {submitted: -1}});
  }
});