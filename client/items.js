if(Meteor.isClient){

    Meteor.subscribe("items");

    Template.weapon.helpers({
        'item': function(){
            return ItemList.find({
                type:1
            })
        }
    });
    Template.armour.helpers({
        'item': function(){
            return ItemList.find({
                type:2
            })
        }
    });

    Template.weapon.events({
        'click .addCart' : function(event){
            var itemId = this._id;

            var g = Meteor.user().profile.cart;

            g.push(itemId);

            Meteor.users.update({_id:Meteor.userId()},
                {
                    $set: {"profile.cart":g}
                });
            document.getElementById("message").innerHTML=  this.name + " was added to your cart.";
            }
        });


    Template.armour.events({
        'click .addCart' : function(event){
            var itemId = this._id;

            var g = Meteor.user().profile.cart;

            g.push(itemId);

            Meteor.users.update({_id:Meteor.userId()},
                {
                    $set: {"profile.cart":g}
                });
            document.getElementById("message").innerHTML=  this.name + " was added to your cart.";
        }
    });

    Template.addItem.events({
        'submit form' : function(event){

            var input = parseInt(event.target.pPrice.value);
            var type = parseInt(event.target.gender.value);
            var object = {
                'name' :event.target.pName.value,
                'cost' : input,
                'desc' : event.target.desc.value,
                'type' : type
            };
            if(input != "" && !isNaN(input)){
                ItemList.insert(object);
            }else{
                event.target.pPrice.value = "Not a Number";
            }

        }
    })
}