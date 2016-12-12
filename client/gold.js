if(Meteor.isClient){
    Template.gold.helpers({
        gold: function(){
            return Meteor.user().profile.gold;
        }
    });
    Template.navigation.helpers({
        gold: function(){
            return Meteor.user().profile.gold;
        }
    });
    Template.gold.events({
        'submit #addGold': function(event){
            event.preventDefault();

            var input = parseInt(event.target.text.value);

            if(input != "" && !isNaN(input)){

                var g = parseInt(Meteor.user().profile.gold);

                g += input;

                Meteor.users.update({_id: Meteor.userId()},{
                    $set: {"profile.gold" : g}}
                );

                event.target.text.value = "Added " + input + " gold";
            }else{
                event.target.text.value = "Not a Number";
            }

        }
    });
}