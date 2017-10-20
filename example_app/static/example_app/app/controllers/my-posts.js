import Ember from 'ember';

export default Ember.Controller.extend({
    displayedPosts: Ember.computed('model.posts.@each', function() {
        return this.get('model.posts').filter(post => post.belongsTo('author').id() === this.get('model.userProfile.id'));
    }),

    hasPosts: Ember.computed.notEmpty('displayedPosts'),

    actions: {
        deletePost(post) {
            post.destroyRecord().then(() => {
                this.get('model.posts').removeObject(post);
            });
        },

        editPost(post) {
            this.transitionToRoute('edit-post', {
                post_id: post.get('id'),
                userProfile: this.get('model.userProfile'),
                userProfiles: this.get('model.userProfiles'),
                post: post,
                categories: this.get('model.categories')
            });
        },

        goToDetail(post) {
            this.transitionToRoute('post', {
                post_id: post.get('id'),
                post: post,
                userProfile: this.get('model.userProfile'),
                userProfiles: this.get('model.userProfiles'),
                comments: this.get('model.comments')
            });
        },

        newPost() {
            this.transitionToRoute('create-post');
        },

        goToPosts() {
            this.transitionToRoute('posts');
        },
    }
});
