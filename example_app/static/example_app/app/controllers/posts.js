import Ember from 'ember';

export default Ember.Controller.extend({
    sortedPosts: Ember.computed.sort('model.posts', 'sortBy'),

    displayedPosts: Ember.computed('categoryFilter', 'searchText', 'sortedPosts', function() {
        let posts = this.get('sortedPosts');

        if (this.get('categoryFilter')) {
            posts = posts.filter(post => post.belongsTo('category').id() === this.get('categoryFilter.id'));
        }

        if (this.get('searchText')) {
            posts = posts.filter(post => [ 'title', 'body' ].some(field => post.get(field).toLowerCase().includes(this.get('searchText').toLowerCase())));
        }

        return posts;
    }),

    sortBy: Ember.computed('mainFilter', function() {
        return [this.get('mainFilter') === 'Recent' ? 'date:desc' : 'score:desc'];
    }),

    mainFilter: 'Recent',

    mainFilterTypes: ['Recent', 'Top Voted'],

    showCategoryDropdown: false,

    showMainFilterDropdown: false,

    actions: {
        toggleCategoryDropdown() {
            this.set('showCategoryDropdown', !this.get('showCategoryDropdown'));
        },

        toggleMainFilterDropdown() {
            this.set('showMainFilterDropdown', !this.get('showMainFilterDropdown'));
        },

        newPost() {
            this.transitionToRoute('create-post');
        },

        setCategoryFilter(category) {
            this.set('categoryFilter', category);
        },

        setMainFilter(filter) {
            this.set('mainFilter', filter);
        },

        clearFilters() {
            this.setProperties({
                categoryFilter: null,
                searchText: '',
                mainFilter: 'Recent'
            });
        }
    }
});
