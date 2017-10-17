import Ember from 'ember';

export default Ember.Controller.extend({
    posts: Ember.computed('model.posts', function() {
        const comments = this.get('model.comments');

        return this.get('model.posts').map(post => {
            return {
                post: post,
                comments: comments.filter(comment => comment.belongsTo('post').id() === post.id)
            }
        });
    }),

    actions: {
        newPost() {
            this.transitionToRoute('create-post');
        }
    }
});
