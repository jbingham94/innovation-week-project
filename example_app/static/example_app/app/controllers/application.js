import Ember from 'ember';

export default Ember.Controller.extend({
      session: Ember.inject.service('session'),

      actions: {
            invalidateSession() {
                this.get('session').invalidate();
            },

            showLoginForm() {
                this.setProperties({showLoginForm: true, showSignupForm: false});
            },

            showSignupForm() {
                this.setProperties({showLoginForm: false, showSignupForm: true});
            }
      }
});
