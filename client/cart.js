if(Meteor.isClient){
    Template.cart.helpers({
        'cartItem':function() {
            var itemIds = Meteor.user().profile.cart;
            if(itemIds.length>0) {
                var objects = "ItemList.find({ $or: [";
                for (y in itemIds) {
                    objects += "{_id:'" + itemIds[y] + "'}";
                    //ItemList.find({_id: itemIds[y]}
                    if (y < itemIds.length - 1) {
                        objects += ",";
                    }
                }
                objects += "]});";

                var items = eval(objects);

                return items;
            }
        },
        'multiple':function(itemId){
            var itemIds = Meteor.user().profile.cart;
            var sum = 0;

            for(x in itemIds){
                if(itemIds[x]==itemId){
                    sum++;

                }
            }
            if(sum == 1){
                return "";
            }
            else{

                return " x "+sum;
            }
        },

        'total' : function(){
            var itemIds = Meteor.user().profile.cart;
            var total = 0;
            for(x in itemIds){
                total += ItemList.find({_id: itemIds[x]}).fetch()[0].cost;
            }
            return total;
        }


    });

    Template.cart.events({
        'click #clr': function(){
            var g = [];
            Meteor.users.update({_id:Meteor.userId()},
                {
                    $set: {"profile.cart":g}
                });
            document.getElementById("message").innerHTML = "Cart has been cleared";
        },
        'click #cout':function(){
            var itemIds = Meteor.user().profile.cart;
            var gold = Meteor.user().profile.gold;
            var id = Meteor.user()._id;
            var total = 0;
            for(x in itemIds){
                total += ItemList.find({_id: itemIds[x]}).fetch()[0].cost;
            }
            var carryover = gold-total;
            if(carryover<0){
                document.getElementById("message").innerHTML = "Insufficient Funds!";
            }
            else{

                var transaction = {
                    user: id,
                    items: itemIds,
                    date: new Date(),
                    total: total
                };
                trans.insert(transaction);

                var g = [];
                Meteor.users.update({_id:id},
                    {
                        $set: {"profile.cart":g,
                            "profile.gold": carryover},
                    });
                document.getElementById("message").innerHTML = "Your payment was successful! Transaction complete!";
            }

        }
    });
}