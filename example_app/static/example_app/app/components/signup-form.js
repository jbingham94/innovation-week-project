import Ember from 'ember';

export default Ember.Component.extend({
    submitDisabled: Ember.computed('identification', function() {
        return !this.get('identification');
    }),

    email: Ember.computed('identification', function() {
        return (this.get('identification') ? this.get('identification') : '') + '@alarm.com';
    })
});
