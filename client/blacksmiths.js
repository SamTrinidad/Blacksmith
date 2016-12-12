
if(Meteor.isClient){
    Meteor.subscribe("blacksmiths");

    Template.blacksmiths.helpers({
        'item' : function(){
            return bsList.find();
        }
    });

    Template.bsApplication.events({
        'submit form': function(event){
            event.preventDefault();
            var userId = Meteor.userId();
            var fName = event.target.firstname.value;
            var lName = event.target.lastname.value;
            var comment = event.target.rzn.value;

            Roles.addUsersToRoles( Meteor.userId(), 'pending');
            Meteor.users.update({_id: userId},{
                $set: {"profile.fname" : fName,
                    "profile.lname" : lName,
                    "profile.application" : comment
                }}
            );
            Router.go('submitted');

        }
    })
}