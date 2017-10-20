import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
    return new Ember.Handlebars.SafeString(params[0].replace(/\n/g, '<br>'));
});
