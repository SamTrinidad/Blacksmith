Template.sideBar.events({
    'mouseover img.a': function(e){
        $(e.target).stop().animate({"opacity": "0"}, "slow");
    },
    'mouseout img.a': function(e){
        $(e.target).stop().animate({"opacity": "1"}, "slow");
    }
})