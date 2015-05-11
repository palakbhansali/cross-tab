/**
 * Created by Dhingu on 5/4/15.
 */
Meteor.publish('columns', function () {
    return Column.find();
});
