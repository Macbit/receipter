Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return Meteor.subscribe('receipts'); }
});

Router.route('/', {
    name: 'receiptsList'
    /*,
    data: function() {
        var user = Meteor.user();
        console.log(user);
        return Receipts.find(user._id); }*/
});

Router.route('/receipts/:_id', {
    name: 'receiptPage',
    data: function() {
        return Receipts.findOne(this.params._id); }
});

Router.route('/receipts/:_id/edit', {
    name: 'receiptEdit',
    data: function() {
        return Receipts.findOne(this.params._id); }
});

Router.route('/submit', { name: 'receiptSubmit' });

var requireLogin = function() {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
}

Router.onBeforeAction('dataNotFound', { only: 'receiptPage' });
Router.onBeforeAction(requireLogin, { only: 'receiptSubmit' });
