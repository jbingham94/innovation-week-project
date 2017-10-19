import Ember from 'ember';

export default Ember.Controller.extend({
    canEdit: Ember.computed('model.post', function() {
        return this.get('model.post').belongsTo('author').id() === this.get('model.userProfile.id');
    })
});
