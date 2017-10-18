import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),

    replyText: '',

    submitDisabled: Ember.computed.empty('replyText'),

    showReplyField: false,

    isBaseComment: Ember.computed(function() { return this.get('indent') === 0; }),

    children: Ember.computed(function() {
        return this.get('allComments').filter(comment => comment.belongsTo('parent').id() === this.get('comment.id'));
    }),

    childColor: Ember.computed(function() {
        return this.get('colorClass') === 'white-comment' ? 'lightgray-comment' : 'white-comment';
    }),

    actions: {
        showReplyField() {
            this.set('showReplyField', true);
        },

        createReply() {
            const reply = this.get('store').createRecord('comment', {
                author: this.get('userProfile'),
                post: this.get('post'),
                text: this.get('replyText'),
                date: new Date(),
                parent: this.get('comment')
            });
            reply.save().then(() => {
                this.set('replyText', '');
                this.set('showReplyField', false);
                this.get('children').pushObject(reply);
            });
        },
    }
});
