/**
 * Created by Dhingu on 5/6/15.
 */
Meteor.publish('crossTabTwos', function () {
    return CrossTabTwo.find();
});
