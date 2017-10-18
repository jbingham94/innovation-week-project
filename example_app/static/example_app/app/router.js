import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('secret');
  this.route('posts');
  this.route('create-post');
  this.route('post', { path: '/post/:post_id' });
  this.route('my-posts');
  this.route('edit-post');
});

export default Router;
