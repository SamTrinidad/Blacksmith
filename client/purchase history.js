if(Meteor.isClient){
    Template.purchaseHistory.helpers({
        'purchase' : function(){
            return trans.find({user: Meteor.userId()});
        },
        'plist' : function(items){
            var collect = "";
            for(x in items){
                var i = ItemList.find({_id: items[x]}).fetch()[0].name;
                var j = ItemList.find({_id: items[x]}).fetch()[0].cost;
                collect+= "<li>" + i + "  -  Cost: " + j + "</li>";
            }
            return collect;
        }
    });
}