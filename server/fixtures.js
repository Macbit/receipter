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
    Receipts.insert({
        "items": [{
            "price": 1.25,
            "description": "CONDENSED MILK LOHIC2 TWAROG"
        }, {
            "price": 1.25,
            "description": "LOWICZ TWAROG"
        }, {
            "price": 0.7,
            "description": "TARTS REDUCED PRICE"
        }, {
            "price": 1.39,
            "description": "ORG BANANAS"
        }, {
            "price": 0.79,
            "description": "MUSHROOMS"
        }, {
            "price": 0.5,
            "description": "DAFFODIL"
        }, {
            "price": 0.5,
            "description": "REDUCED PRICE DAFFODIL REDUCED PRICE"
        }, {
            "price": 0.05,
            "description": "Gov BAG CHARGE x"
        }, {
            "price": 0.5,
            "description": "MULTI BUY SAVINGS CHILLED PRODUCTS 2 F 2"
        }],
        "company": "Tesco",
        "total": 8.68,
        "datetime": "2016-03-09 14:29:00"
    })
}
