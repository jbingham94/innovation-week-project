import Ember from 'ember';

export default Ember.Component.extend({
    showComments: false,

    store: Ember.inject.service(),

    submitDisabled: Ember.computed.empty('commentText'),

    actions: {
        toggleComments() {
            this.set('showComments', !this.get('showComments'));
        },
        createComment() {
            const comment = this.get('store').createRecord('comment', {
                author: this.get('userProfile'),
                post: this.get('post'),
                text: this.get('commentText'),
                date: new Date()
            })
            comment.save().then(() => {
                this.set('commentText', '');
                this.get('comments').pushObject(comment);
            });
        }
    }
});
