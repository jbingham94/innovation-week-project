import DS from 'ember-data';

export default DS.Model.extend({
    user: DS.belongsTo('user'),
    userUsername: DS.attr('string'),
    emailNotifications: DS.attr('boolean')
});
