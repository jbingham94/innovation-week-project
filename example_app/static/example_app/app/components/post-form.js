import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),

    title: Ember.computed(function() {
        return this.get('post') ? this.get('post.title') : '';
    }),

    category: Ember.computed(function() {
        return this.get('post') ? this.get('categories').findBy('id', this.get('post').belongsTo('category').id()) : null;
    }),

    body: Ember.computed(function() {
        return this.get('post') ? this.get('post.body') : '';
    }),

    submitDisabled: Ember.computed('title', 'category', 'body', function() {
        if (this.get('title') && this.get('category') && this.get('body') && this.get('title').length <= 300) {
            return false;
        } else { return true; }
    }),

    actions: {
        toggleDropdown() {
            this.set('showDropdown', this.get('showDropdown') ? !this.get('showDropdown') : true);
        },
        setCategory(category) {
            this.set('category', category);
        },
        submitPost() {
            if (this.get('isEdit')) {
                this.get('post').setProperties(['title', 'category', 'body'].reduce((map, property) => { map[property] = this.get(property); return map; }, {}));
                this.get('post').save();
                this.get('router').transitionTo('my-posts');
            } else {
                this.get('store').createRecord('post', {
                    author: this.get('userProfile'),
                    title: this.get('title'),
                    category: this.get('category'),
                    body: this.get('body'),
                    date: new Date(),
                    score: 0
                }).save().then(() => {
                    this.setProperties(['title', 'category', 'body'].reduce((map, property) => { map[property] = undefined; return map; }, {}));
                    this.get('router').transitionTo('posts');
                });
            }
        },
        cancel() {
            this.get('router').transitionTo(this.get('isEdit') ? 'my-posts' : 'posts');
        }
    }
});
