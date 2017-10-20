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
            },

            authenticate() {
                let credentials = this.getProperties('identification', 'password'),
                    authenticator = 'authenticator:token';

                this.get('session').authenticate(authenticator, credentials).catch((reason) => {
                    this.set('errorMessage', reason.non_field_errors || reason);
                });
            }
      }
});
