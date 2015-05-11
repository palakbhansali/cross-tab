/**
 * Created by Dhingu on 5/4/15.
 */
Column = new Mongo.Collection('column');

Column.helpers({

});

Column.before.insert(function (userId, doc) {
    doc.createdAt = moment().toDate();
});
