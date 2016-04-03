Template.receiptPage.helpers({
    items: function() {
        for (var i = 1; i < this.items.length + 1; i++) this.items[i - 1].index = i;
        /*for (var key in this.items) {
            arr.push({n: i,key: key, value: this.items[key]});
            i++;
        }*/
        console.log(this.items);
        return this.items;
    },

    total: function() {
        var total = 0;
        for (var i = 0; i < this.items.length; i++) total += this.items[i].price;
        console.log(total);
        return total.toFixed(2);
    }
});
