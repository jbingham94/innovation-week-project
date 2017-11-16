import Ember from 'ember';

export default Ember.Component.extend({
    submitDisabled: Ember.computed('identification', function() {
        return !this.get('identification');
    }),

    email: Ember.computed('identification', function() {
        return (this.get('identification') ? this.get('identification') : '') + '@alarm.com';
    }),
    actions: {
        register() {
            let username = this.get('identification');
            let email = this.get('email');
            let password = 'ADCpassword1!';
            let confirm_password = 'ADCpassword1!';

            Ember.$.ajax({
                url: '/api/signup/',
                type: 'POST',
                data: JSON.stringify({
                    username: username,
                    email: email,
                    password1: password,
                    password2: confirm_password
                }),
                contentType: 'application/json;charset=utf-8',
                dataType: 'json'
            }).then((response) => {
                this.set('signupComplete', true);
            }, (xhr, status, error) => {
                this.set('error', xhr.responseText);
            });
        }
    }

});
