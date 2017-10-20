import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    session: Ember.inject.service('session'),

    model() {
        return Ember.RSVP.hash({
            posts: this.store.findAll('post'),
            categories: this.store.findAll('category'),
            comments: this.store.findAll('comment'),
            userProfiles: this.store.findAll('user-profile')
        });
    }
});
