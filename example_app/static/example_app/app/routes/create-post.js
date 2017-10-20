import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    session: Ember.inject.service('session'),

    model() {
        return Ember.RSVP.hash({
<<<<<<< Updated upstream
            userProfile: this.store.findRecord('user-profile', this.get('session.session.authenticated.user_id')),
            userProfiles: this.store.findAll('user-profile'),
=======
>>>>>>> Stashed changes
            categories: this.store.findAll('category'),
            userProfiles: this.store.findAll('user-profile')
        });
    }
});
