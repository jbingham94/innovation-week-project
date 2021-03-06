import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),

    userProfile: Ember.computed(function() {
        return this.get('model.userProfiles').find(profile => profile.belongsTo('user').id() === this.get('session.data.authenticated.user_id').toString());
    }),

    sortedPosts: Ember.computed.sort('model.posts', 'postsSortBy'),

    sortedCategories: Ember.computed.sort('model.categories', 'categoriesSortBy'),

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

    postsSortBy: Ember.computed('mainFilter', function() {
        return [this.get('mainFilter') === 'Recent' ? 'date:desc' : 'score:desc'];
    }),

    categoriesSortBy: ['name'],

    mainFilter: 'Recent',

    mainFilterTypes: ['Recent', 'Top Voted'],

    showCategoryDropdown: false,

    showMainFilterDropdown: false,

    filtersCleared: Ember.computed('categoryFilter', 'searchText', 'mainFilter', function() {
        return !this.get('categoryFilter') && !this.get('searchText') && this.get('mainFilter') === 'Recent';
    }),

    actions: {
        toggleCategoryDropdown() {
            this.set('showCategoryDropdown', !this.get('showCategoryDropdown'));
        },

        toggleMainFilterDropdown() {
            this.set('showMainFilterDropdown', !this.get('showMainFilterDropdown'));
        },

        newPost() {
            this.send('clearFilters');
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
