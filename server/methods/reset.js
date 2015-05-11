/**
 * Created by Dhingu on 5/6/15.
 */
Meteor.methods({
    "resetCollections": function (collectionName) {
        if(collectionName === 'CrossTabOne')
            CrossTabOne.remove({});
        if(collectionName === 'CrossTabTwo')
            CrossTabTwo.remove({});
        if(collectionName === 'Column')
            Column.remove({});
        if(collectionName === 'Entry')
            Entry.remove({});
    }
});
