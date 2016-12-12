/**
 * Created by Seaman on 3/30/2016.
 */
if(Meteor.isClient){
    Meteor.subscribe("userData");
    Meteor.subscribe("transactions");

    Meteor.logout = function (callback) {
        Router.go("home");
        return Accounts.logout(callback);
    };

    Template.users.helpers({
        userList : function(){
            return Meteor.users.find();
        }
    });

    Template.userItem.helpers({
        first: function(){
            return this.profile.fname;
        },
        last: function(){
            return this.profile.lname;
        },
        emailAddress: function () {
            return this.emails[0].address;
        },
        comment: function(){
            return this.profile.application;
        },
        userRole: function() {
            var returnValue = "";
            for (var i=0; i<this.roles.length; i++) {
                returnValue += (this.roles[i] + " ");
            }
            return returnValue;
        },
        isPending: function(){
            for(x in this.roles){
                if(this.roles[x]=='pending'){
                    return true;
                }
            }
            return false;
        }

    });

    Template.userItem.events({
        'submit form' : function(e){
            var userId = e.target.approveUser.value;
            Roles.addUsersToRoles(userId,'blacksmith');
            Roles.removeUsersFromRoles(userId, 'pending');
			
			var fName = this.profile.fname;
			var lName = this.profile.lname;
			var comment = this.profile.application;
			
            bsList.insert({fname:fName,
                lname: lName,
                application: comment
            });
        }
    });
}