
Router.configure({
    layoutTemplate: 'main'
});

Router.route('/',{
        name:'home'
    });

Router.route('/gold',{
    onBeforeAction: approveRoute
});

Router.route('/cart',{
    onBeforeAction: approveRoute
});
Router.route('/purchaseHistory',{
    onBeforeAction: approveRoute
});

Router.route('/weapons',{
    name:'weapon'
});

Router.route('/armour',{
    name:'armour'
});

Router.route('/blacksmiths',{
    name:'blacksmiths'
});

//Router.route('/bundles',{
//    name:'bundles'
//});

Router.route('/findus',{
    name:'findus'
});

Router.route('/bsApplication',{
    name: 'bsApplication'
});

Router.route('/users', {
    onBeforeAction: approveAdminRoute
});

Router.route('/addItem',{
    onBeforeAction: approveBSRoute
});

Router.route('/submitted',{
    onBeforeAction:approveRoute
});

function approveRoute() {
    var currentUser = Meteor.userId();
    if (currentUser) {
        this.next();
    } else {
        this.render("home");
    }
}

function approveBSRoute() {
    var currentUser = Meteor.userId();
    if (currentUser && Roles.userIsInRole(currentUser, 'blacksmith')) {
        this.next();
    } else {
        this.render("home");
    }
}

function approveAdminRoute() {
    var currentUser = Meteor.userId();
    if (currentUser && Roles.userIsInRole(currentUser, 'admin')) {
        this.next();
    } else {
        this.render("home");
    }
}