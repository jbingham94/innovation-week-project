import Ember from 'ember';

export default Ember.Controller.extend({
    store: Ember.inject.service(),

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
            this.get('store').createRecord('post', {
                author: this.get('model.userProfile'),
                title: this.get('title'),
                category: this.get('category'),
                body: this.get('body'),
                date: new Date(),
                score: 0
            }).save().then(() => {
                this.setProperties(['title', 'category', 'body'].reduce((map, property) => { map[property] = undefined; return map; }, {}));
                this.transitionToRoute('posts')
            });
        },
        cancel() {
            this.transitionToRoute('posts');
        }
    }
});
