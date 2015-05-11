/**
 * Created by Dhingu on 4/30/15.
 */
Entry = new Mongo.Collection('entry');

Entry.helpers({

});

Entry.before.insert(function (userId, doc) {
    doc.createdAt = moment().toDate();
});
