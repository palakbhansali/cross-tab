/**
 * Created by Dhingu on 4/30/15.
 */
Meteor.publish('entries', function () {
    return Entry.find();
});
