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

if (Meteor.isServer) {
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
        performOCR: function(data) {
            check(data, String);
            var request = { "file": data.split(",")[1] };
            console.log("the request is", request)

            HTTP.call('POST', 'http://koko.inf.ed.ac.uk/ocr/read/', {
                    params: request,
                    data: request
                        /*headers: {
                            "content-type": "application/json ; charset=UTF-8"
                        }*/
                },

                function(error, response) {
                    if (error) console.log(error);
                    console.log("response: " + JSON.stringify(response));
                });

            console.log('should be DONE!!!');
            return { success: true };
        },
        processImage: function(my_args) {
            var gm = Meteor.npmRequire('gm');
            check(my_args, Object);
            var data = my_args.data;
            //var done = my_args.callback;
            //console.log("done is", my_args);

            var _dirname = Meteor.absolutePath + '/';
            var blackPnt = "40%",
                whitePnt = "40%", // or 43ç%
                gamma = 1;
            console.log('precessImage is working......');
            //console.log('gm is: ', gm);
            //console.log(_dirname);
            gm(_dirname + "photo.JPG")
                .resize("30%")
                .level(blackPnt, gamma, whitePnt)
                .trim()
                .toBuffer('JPG', function(err, buffer) {
                    if (err) return handle(err);
                    //console.log('done!', buffer.toString('base64'));
                    return buffer.toString('base64');
                    //done(buffer);
                })
                // .write(_dirname + 'processed_' + 'photo.JPG', function(err) {
                //   if (err) console.log('error in .write of gm function' + err);
                //   //console.log(imgName + ' preprocessed');
                // });

        }

    });
}
