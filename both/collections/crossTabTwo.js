/**
 * Created by Dhingu on 5/6/15.
 */
CrossTabTwo = new Mongo.Collection('crossTabTwo');

CrossTabTwo.helpers({

});

CrossTabTwo.before.insert(function (userId, doc) {
    doc.createdAt = moment().toDate();
});
