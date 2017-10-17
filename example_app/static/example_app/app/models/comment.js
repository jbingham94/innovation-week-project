import DS from 'ember-data';

export default DS.Model.extend({
    author: DS.belongsTo('user-profile'),
    authorUsername: DS.attr('string'),
    date: DS.attr('date'),
    text: DS.attr('string'),
    post: DS.belongsTo('post')
});
