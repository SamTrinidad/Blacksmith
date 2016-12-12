ItemList = new Mongo.Collection('items');
bsList = new Mongo.Collection('blacksmiths');
trans = new Mongo.Collection('transactions');

if (Meteor.isServer) {



    Meteor.publish('itemSearch', function(query) {
        check(query, String);

        if (_.isEmpty(query))
            return this.ready();

        return ItemList.search(query);
    });

    Meteor.publish("gold", function(){
        return gold.find({user: this.userId});
    });
    Meteor.publish("transactions", function(){
        return trans.find({user: this.userId});
    });
	Meteor.publish('items', function(){
        return ItemList.find();
    });
    Meteor.publish('blacksmiths', function(){
        return bsList.find();
    });
	
    trans.allow({
        'insert': function(userId){
            if(Meteor.users.find({_id:userId}))
                return true;
            else{
                return false;
            }
        }
    });

    ItemList.allow({
        'insert': function(userId){
            if(Roles.userIsInRole(Meteor.userId(),'blacksmith')){
                return true;
            }
            return false;
        }
    });

    bsList.allow({
        'insert': function(){
            if(Roles.userIsInRole(Meteor.userId(),'admin')){
                return true;
            }
            return false;
        }
    });

    Meteor.users.allow({
        'update': function(userId){
            if(Meteor.users.find({_id:userId}))
                return true;
            else{
                return false;
            }
        },
		'insert': function(userId){
            if(Meteor.users.find({_id:userId}))
                return true;
            else{
                return false;
            }
        }
    });

    Meteor.publish("userData", function() {
        if (Roles.userIsInRole(this.userId, 'admin')) {
            return Meteor.users.find();
        }
    });




    if(Meteor.users.find().count()===0){
        var users = [
            {
                fname: 'Sam', lname:'Trinidad', email: 'admin@bs.com', password: 'pass', roles: ['user', 'admin'], gold: 100
            },
            {
                fname: 'Bob', lname:'BlackSmith', email: 'bob@bs.com', password: 'pass', roles: ['user', 'blacksmith'],gold: 100
            }
        ];

        bsList.insert({
            fname: 'Bob',
            lname: 'BlackSmith',
            email: 'bob@bs.com',
            application: 'I am the Best!'
        });

        _.each(users, function (d) {
            // return id for use in roles assignment below
            var userId = Accounts.createUser({
                email: d.email,
                password: d.password,
                username: d.email,
                profile: {
                    fname: d.fname,
                    lname: d.lname,
                    gold : d.gold,
                    cart : []
                }
            });
            Roles.addUsersToRoles(userId, d.roles);
        });
    }



    Accounts.onCreateUser(function (options, user) {
        user.roles = ['user'];


        if (options.profile) {

            user.profile = options.profile;
            user.profile.gold = 0;
            user.profile.cart = [];
        }
        return user;
    });



    //Items
    if(ItemList.find().count() === 0){
        var items = [
            {
                name: 'Sword',
                cost: 150,
                type: 1},
            {
                name: 'Axe',
                cost: 175,
                type: 1},
			{
                name: 'Knife',
                cost: 100,
                type: 1},
            {
                name: 'Chestplate',
                cost: 200,
                type: 2},
            {
                name: 'Helmet',
                cost: 150,
                type: 2},
            {
                name: 'Greaves',
                cost: 10,
                type: 2}
        ];
        _.forEach(items, function(item){
            ItemList.insert(item);
        });
    }
    

}
