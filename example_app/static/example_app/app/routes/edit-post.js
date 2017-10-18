import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    session: Ember.inject.service('session'),

    model() {
        return Ember.RSVP.hash({
            userProfile: this.store.findRecord('user-profile', this.get('session.session.authenticated.user_id')),
            post: this.store.findRecord('post', arguments[0].post_id),
            categories: this.store.findAll('category'),
        });
    }
});
