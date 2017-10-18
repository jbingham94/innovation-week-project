import Ember from 'ember';

export default Ember.Route.extend({
    session: Ember.inject.service('session'),

    model() {
        return Ember.RSVP.hash({
            post: this.store.findRecord('post', arguments[0].post_id),
            userProfile: this.store.findRecord('user-profile', this.get('session.session.authenticated.user_id')),
            userProfiles: this.store.findAll('user-profile'),
            comments: this.store.findAll('comment')
        });
    }
});
