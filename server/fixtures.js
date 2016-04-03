//gm = Meteor.npmRequire('gm');
//var fs = Meteor.npmRequire('fs');


if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
        email: 'admin@admin.com',
        username: 'admin',
        password: 'admin',
        profile: {
            name: 'admin',
            events: []
        }

    });
}


var admin = Accounts.findUserByUsername('admin');
//console.log(admin);

if (Receipts.find().count() === 0) {
    Receipts.insert({
        company: 'Tesco',
        datetime: '9 March, 2016 7:43 PM',
        items: [{ description: "Super Bread", price: 1.19 }, { description: "Normal Eggs", price: 1.49 }],
        contents: { 'Super bread': 1.29, 'Normal Eggs': 1.49 },
        total: 100,
        userId: admin._id
    });
    Receipts.insert({
        company: 'Lidl',
        datetime: '31 March, 2016 7:43 PM',
        items: [{ description: "Super Bread 2", price: 1.19 }, { description: "Normal Eggs 2", price: 1.49 }],
        total: 9.43,
        userId: admin._id
    });
    Receipts.insert({
        company: 'Tesco',
        datetime: '1 April, 2016 10:00 AM',
        items: [{ description: "Super Bread 3", price: 1.19 }, { description: "Normal Eggs 3", price: 1.49 }],
        total: 3.45,
        userId: admin._id
    });
}
