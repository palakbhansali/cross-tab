/**
 * Created by Dhingu on 5/6/15.
 */
Meteor.publish('crossTabOnes', function () {
    return CrossTabOne.find();
});
