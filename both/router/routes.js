Router.route('/', {
    name  : 'home',
    waitOn: function () {
        Meteor.autorun(function () {
            Meteor.subscribe('columns');
            Meteor.subscribe('entries');
            Meteor.subscribe('crossTabOnes');
            Meteor.subscribe('crossTabTwos');
            return [];
        });
    }
});

Router.route('/dashboard', {
    name: 'dashboard'
});

Router.plugin('ensureSignedIn', {
    only: ['dashboard']
});
