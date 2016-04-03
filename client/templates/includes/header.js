Template.header.events({
    'click .upload': function(e) {
        e.preventDefault();
        var self = this; //small hack to avoid loosing 'this' inside functions downstream
        console.log('button pressed');
        var options = {
            width: 350,
            height: 350,
            quality: 75,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        }

        MeteorCamera.getPicture(options, function(err, data) {
            if (err) {
                console.log('error', err);
            }
            if (data) {
                Session.set('img', data);
                console.log('we are inside ifDATA block of MeteorCamera');
                //processImage(data);
                Meteor.call('processImage', data, function(error, result) {
                    // handle error/success
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
                console.log('error VERY BAD ERROR', err);
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
