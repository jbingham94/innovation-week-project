import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),

    userProfile: Ember.computed(function() {
        return this.get('model.userProfiles').find(profile => profile.belongsTo('user').id() === this.get('session.data.authenticated.user_id').toString());
    }),

    displayedPosts: Ember.computed('model.posts.@each', function() {
        return this.get('model.posts').filter(post => post.belongsTo('author').id() === this.get('userProfile.id'));
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
                userProfile: this.get('userProfile'),
                userProfiles: this.get('model.userProfiles'),
                post: post,
                categories: this.get('model.categories')
            });
        },

        goToDetail(post) {
            this.transitionToRoute('post', {
                post_id: post.get('id'),
                post: post,
                userProfile: this.get('userProfile'),
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
