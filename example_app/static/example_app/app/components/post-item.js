import Ember from 'ember';

function voteHelper(direction, currentScore, magnitude, isUndo) {
    return isUndo
        ? (direction === 'up' ? currentScore - magnitude : currentScore + magnitude)
        : (direction === 'up' ? currentScore + magnitude : currentScore - magnitude);
}

export default Ember.Component.extend({
    showComments: false,

    store: Ember.inject.service(),

    submitDisabled: Ember.computed.empty('commentText'),

    voteTracker: Ember.computed('post.upvoters.@each', 'post.downvoters.@each', function() {
        return ['up', 'down'].reduce((map, voteType) => {
            map[voteType + 'voted'] = this.get('post').hasMany(`${voteType}voters`).ids().contains(this.get('userProfile.id'));
            return map;
        }, {});
    }),

    displayedComments: Ember.computed(function() {
        return this.get('comments').filter(comment => comment.belongsTo('post').id() === this.get('post.id') && comment.belongsTo('parent').id() === null);
    }),

    teammates: Ember.computed(function() {
        return this.get('userProfiles').filter(profile => this.get('post').hasMany('teammates').ids().indexOf(profile.get('id')) !== -1);
    }),

    actions: {
        toggleComments() {
            this.set('showComments', !this.get('showComments'));
        },

        vote(direction) {
            const otherDirection = direction === 'up' ? 'down' : 'up';

            let currentScore = this.get('post.score'),
                [ directionVoters, otherDirectionVoters ] = [ direction, otherDirection ].map(d => this.get('post').hasMany(`${d}voters`).ids());

            this.set('post.score', this.get(`voteTracker.${direction}voted`)
                ? voteHelper(direction, currentScore, 1, true)  // Undoing vote
                : (this.get(`voteTracker.${otherDirection}voted`)
                    ? voteHelper(direction, currentScore, 2, false)  // Switching vote type
                    : voteHelper(direction, currentScore, 1, false)));  // Fresh vote

            if (this.get(`voteTracker.${direction}voted`)) {
                directionVoters.splice(directionVoters.indexOf(this.get('userProfile.id')), 1);  // Undoing vote
            } else { directionVoters.push(this.get('userProfile.id')); } // Regular vote

            if (this.get(`voteTracker.${otherDirection}voted`)) {
                otherDirectionVoters.splice(otherDirectionVoters.indexOf(this.get('userProfile.id')), 1); // Remove user from other voters if switching vote type
            }

            this.set(`post.${direction}voters`, this.get('userProfiles').filter(profile => directionVoters.contains(profile.get('id'))));
            this.set(`post.${otherDirection}voters`, this.get('userProfiles').filter(profile => otherDirectionVoters.contains(profile.get('id'))));
            this.get('post').save();
        },

        createComment() {
            const comment = this.get('store').createRecord('comment', {
                author: this.get('userProfile'),
                post: this.get('post'),
                text: this.get('commentText'),
                date: new Date()
            });
            comment.save().then(() => {
                this.set('commentText', '');
                this.get('displayedComments').pushObject(comment);
            });
        },

        deleteComment(comment) {
            comment.destroyRecord().then(() => {
                this.get('displayedComments').removeObject(comment);
            });
        },

        goToDetail(id) {
            this.sendAction();
            this.get('router').transitionTo('post', {
                post_id: id,
                post: this.get('post'),
                userProfile: this.get('userProfile'),
                userProfiles: this.get('userProfiles'),
                comments: this.get('comments')
            });
        }
    }
});
