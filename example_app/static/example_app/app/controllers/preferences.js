import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),

    userProfile: Ember.computed(function() {
        return this.get('model.userProfiles').find(profile => profile.belongsTo('user').id() === this.get('session.data.authenticated.user_id').toString());
    }),

    changingSetting: false,

    actions: {
        toggleEmailNotifications() {
            this.set('changingSetting', true);
            const userProfile = this.get('userProfile');
            userProfile.set('emailNotifications', !userProfile.get('emailNotifications'));
            userProfile.save().then(() => this.set('changingSetting', false));
        }
    }
});
