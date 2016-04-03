Receipts = new Mongo.Collection('receipts');

Receipts.allow({
    update: function(userId, receipt) {
        return ownsDocument(userId, receipt);
    },
    remove: function(userId, receipt) {
        return ownsDocument(userId, receipt);
    },
});

Receipts.deny({
    update: function(userId, receipt, fieldNames) {
        // may only edit the following two fields:
        return (_.without(fieldNames, 'url', 'title').length > 0);
    }
});

Meteor.methods({
    receiptInsert: function(receiptAttributes) {
        check(this.userId, String);
        check(receiptAttributes, {
            title: String,
            url: String
        });

        var receiptWithSameLink = Receipts.findOne({ url: receiptAttributes.url });
        if (receiptWithSameLink) {
            return {
                receiptExists: true,
                _id: receiptWithSameLink._id
            }
        }

        var user = Meteor.user();
        var receipt = _.extend(receiptAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });

        var receiptId = Receipts.insert(receipt);

        return {
            _id: receiptId
        };
    },
    processImage: function(imgName) {
        var _dirname = Meteor.absolutePath + '/';
        var blackPnt = "40%",
            whitePnt = "40%", // or 43ç%
            gamma = 1;
        var gm = Meteor.npmRequire('gm');
        console.log('precessImage is working......');
        //console.log('gm is: ', gm);
        console.log(_dirname);
        /*gm(_dirname + 'photo.JPG')
            .resize("100%")
            .level(blackPnt, gamma, whitePnt)
            .trim()
            .write(_dirname + 'processed_' + 'photo.JPG', function(err) {
                if (err) console.log('error in .write of gm function' + err);
                //console.log(imgName + ' preprocessed');
            });*/
        console.log('should be DONE!!!');
        return { success: true };
    }

});
