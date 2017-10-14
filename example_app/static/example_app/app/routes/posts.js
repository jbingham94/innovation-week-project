import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model() {
        return Ember.RSVP.hash({
            posts: this.store.findAll('post'),
            userProfiles: this.store.findAll('user-profile'),
            categories: this.store.findAll('category'),
            users: this.store.findAll('user')
        });
    }
});
