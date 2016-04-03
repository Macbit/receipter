Template.receiptItem.helpers({
    ownReceipt: function() {
        return this.userId == Meteor.userId();
    },
    datetime: function() {
        date = new Date(this.datetime);
        console.log(date);
        return moment(date).format('D MMM YYYY @ h:mm a');
    }
});

Template.receiptItem.events({
    'click .delete': function(e) { //implement if we press DELETE
        e.preventDefault();
        if (confirm("Delete this receipt?")) {
            var currentReceiptId = this._id;
            Receipts.remove(currentReceiptId);
            Router.go('receiptsList');
        }
    }
});
