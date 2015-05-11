/**
 * Created by Dhingu on 5/6/15.
 */
CrossTabOne = new Mongo.Collection('crossTabOne');

CrossTabOne.helpers({

});

CrossTabOne.before.insert(function (userId, doc) {
    doc.createdAt = moment().toDate();
});
