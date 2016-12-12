searchIndex = new EasySearch.Index({
    collection: ItemList,
    fields: ['name'],
    engine: new EasySearch.Minimongo()
});

Template.weapon.helpers({
        searchIndex: () => searchIndex,
    isWeapon: function(type){
        if(type==1) {
            return true;
        }
        else{
            return false;
        }
    }
});

Template.armour.helpers({
        searchIndex: () => searchIndex,
    isArmour: function(type){
    if(type==2) {
        return true;
    }
    else{
        return false;
    }
}
});