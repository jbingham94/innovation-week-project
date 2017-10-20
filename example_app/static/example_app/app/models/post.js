import DS from 'ember-data';

export default DS.Model.extend({
    author: DS.belongsTo('user-profile'),
    authorUsername: DS.attr('string'),
    category: DS.belongsTo('category'),
    categoryName: DS.attr('string'),
    date: DS.attr('date'),
    title: DS.attr('string'),
    body: DS.attr('string'),
    score: DS.attr('number'),
    upvoters: DS.hasMany('user-profile'),
    downvoters: DS.hasMany('user-profile'),
    teammates: DS.hasMany('user-profile')
});
