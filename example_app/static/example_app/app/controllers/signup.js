import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),
    actions: {
        register() {

            let username = this.get('username');
            let email = this.get('email');
            let password = 'ADCpassword1!';
            let confirm_password = 'ADCpassword1!';

            Ember.$.ajax({
                url: ENV.host + '/api/signup/',
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
