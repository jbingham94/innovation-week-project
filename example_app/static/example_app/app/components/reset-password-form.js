import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Component.extend({
    session: Ember.inject.service(),

    errorMessage: 'We were unable to reset your password.  Please verify you correctly entered your old password.',

    resetFailed: false,

    resetSuccess: false,

    submitDisabled: Ember.computed('oldPassword', 'newPassword', 'confirmNewPassword', 'passwordsDoNotMatch', 'newPasswordSame', function() {
        return !this.get('oldPassword') || !this.get('newPassword') || !this.get('confirmNewPassword') || this.get('passwordsDoNotMatch') || this.get('newPasswordSame');
    }),

    newPasswordClass: Ember.computed('newPasswordSame', function() {
        return this.get('newPasswordSame') ? 'input is-danger' : 'input';
    }),

    confirmNewPasswordClass: Ember.computed('passwordsDoNotMatch', function() {
        return this.get('passwordsDoNotMatch') ? 'input is-danger' : 'input';
    }),

    passwordsDoNotMatch: Ember.computed('newPassword', 'confirmNewPassword', function() {
        return this.get('confirmNewPassword') && this.get('newPassword') !== this.get('confirmNewPassword');
    }),

    newPasswordSame: Ember.computed('oldPassword', 'newPassword', function() {
        return this.get('oldPassword') && this.get('oldPassword') === this.get('newPassword');
    }),

    actions: {
        resetPassword() {
            Ember.$.ajax({
                url: '/api/reset-password/',
                type: 'POST',
                data: JSON.stringify({
                    user_id: this.get('session.data.authenticated.user_id'),
                    old_password: this.get('oldPassword'),
                    new_password: this.get('newPassword')
                }),
                contentType: 'application/json;charset=utf-8',
                dataType: 'json'
            }).then((response) => {
                this.set('resetSuccess', true);
                setTimeout(() => {
                    this.get('router').transitionTo('posts');
                }, 2000);
            }, (xhr, status, error) => {
                this.set('resetFailed', true);
            });
        },

        clearForm() {
            this.setProperties([ 'oldPassword', 'newPassword', 'confirmNewPassword' ].reduce((map, field) => { map[field] = ''; return map; }, {}));
        }
    }
});
