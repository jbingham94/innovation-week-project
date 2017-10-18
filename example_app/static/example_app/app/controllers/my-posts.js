import Ember from 'ember';

export default Ember.Controller.extend({
    displayedPosts: Ember.computed('model.posts.@each', function() {
        return this.get('model.posts').filter(post => post.belongsTo('author').id() === this.get('model.userProfile.id'));
    }),

    actions: {
        deletePost(post) {
            post.destroyRecord();
            this.set('model.posts', this.get('model.posts').removeObject(post));
        }
    }
});
