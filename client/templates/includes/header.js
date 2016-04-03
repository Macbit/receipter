Template.header.events({
    'click .upload': function(e) {
        e.preventDefault();
        var self = this; //small hack to avoid loosing 'this' inside functions downstream
        console.log('button pressed');
        var options = {
            width: 2000,
            height: 2000,
            quality: 85,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        }

        MeteorCamera.getPicture(options, function(err, data) {
            if (err) {
                console.log('error from get picture function', err);
            }
            if (data) {
                //console.log("data from get picture", data);
                Session.set('img', data);
                console.log('we are inside if DATA block of MeteorCamera');

                //CHOOSE either first one or second, comment the second

                /*Meteor.call('performOCR', processedData, function(err, result) {
                  if (err) console.log("performOCR has thrown exception", err);
                });*/

                var my_args = {
                    data: data,
                    callback: function(processedData) {
                        console.log("Woohoo!", processedData);
                    }
                }

                Meteor.call('processImage', my_args,
                    function(err, result) {
                        if (err) console.log("processImage has thrown exception", err);
                        console.log("OMG!!!", result);
                    });


            }
        });
    },
    'click .camera': function(e) {
        e.preventDefault();
        var self = this; //small hack to avoid loosing 'this' inside functions downstream
        console.log('button pressed');

        var options = {
            width: 350,
            height: 350,
            quality: 75
        }
        MeteorCamera.getPicture(options, function(err, data) {
            if (err) {
                console.log('error from get picture', err);
            }
            if (data) {
                Session.set('img', data);
                console.log(data);
                //processImage(data);
            }
        });

    }
});

Template.header.helpers({
    mobile: function() {
        return Meteor.isCordova
    }
});
