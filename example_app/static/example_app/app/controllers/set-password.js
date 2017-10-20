import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),
    actions: {
        setPassword() {

            let user = this.get('session.account');
            if (user){
                let username = this.get('username');
                let password = this.get('password')
                let confirm_password = this.get('confirm_password');

                Ember.$.ajax({
                    url: ENV.host + '/api/set-password/',
                    type: 'POST',
                    data: JSON.stringify({
                        username: username,
                        password1: password,
                        password2: confirm_password
                    }),
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json'
                }).then((response) => {
                    this.set('passwordSetComplete', true);
                }, (xhr, status, error) => {
                    this.set('error', xhr.responseText);
                });
            }

        }
    }
});
