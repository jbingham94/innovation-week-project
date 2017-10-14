import DS from 'ember-data';

export default DS.Model.extend({
    user: DS.belongsTo('user'),
    upvoted_posts: DS.hasMany('post', { inverse: 'upvoters' }),
    downvoted_posts: DS.hasMany('post', { inverse: 'downvoters' }),
});
