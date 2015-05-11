/**
 * Created by Dhingu on 5/6/15.
 */
CrossTabOne.allow({
    'insert': function(userId, doc) {
        return true;
    },
    'update': function(userId, doc, fields, modifier) {
        return true;
    },
    'remove': function(userId, doc) {
        return true;
    }
});
