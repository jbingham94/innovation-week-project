import Ember from 'ember';

export default Ember.Route.extend({
    session: Ember.inject.service('session'),

    model() {
        return Ember.RSVP.hash({
            post: this.store.findRecord('post', arguments[0].post_id),
            comments: this.store.findAll('comment'),
            userProfiles: this.store.findAll('user-profile')
        });
    }
});
