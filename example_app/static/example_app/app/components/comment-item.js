import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),

    replyText: '',

    submitDisabled: Ember.computed.empty('replyText'),

    showReplyField: false,

    userIsAuthor: Ember.computed(function() {
        return this.get('comment').belongsTo('author').id() === this.get('userProfile.id');
    }),

    isBaseComment: Ember.computed(function() { return this.get('indent') === 0; }),

    children: Ember.computed(function() {
        return this.get('allComments').filter(comment => comment.belongsTo('parent').id() === this.get('comment.id'));
    }),

    childColor: Ember.computed(function() {
        return this.get('colorClass') === 'white-comment' ? 'lightgray-comment' : 'white-comment';
    }),

    actions: {
        toggleReplyField() {
            this.set('showReplyField', !this.get('showReplyField'));
        },

        createReply() {
            const reply = this.get('store').createRecord('comment', {
                author: this.get('userProfile'),
                post: this.get('post'),
                text: this.get('replyText'),
                date: new Date(),
                parent: this.get('comment')
            });
            reply.save().then((response) => {
                this.set('replyText', '');
                this.set('showReplyField', false);
                this.get('children').pushObject(reply);
                Ember.$.ajax({
                    url: '/api/send-comment-notification/',
                    type: 'POST',
                    data: JSON.stringify({
                        'comment': reply.get('id')
                    }),
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json'
                });
            });
        },

        sendDeleteComment() {
            this.sendAction('action', this.get('comment'));
        },

        deleteComment(comment) {
            comment.destroyRecord().then(() => {
                this.get('children').removeObject(comment);
            });
        }
    }
});
