import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),

    userProfile: Ember.computed(function() {
        return this.get('model.userProfiles').find(profile => profile.belongsTo('user').id() === this.get('session.data.authenticated.user_id').toString());
    }),

    canEdit: Ember.computed('model.post', function() {
        return this.get('model.post').belongsTo('author').id() === this.get('userProfile.id');
    })
});
