const {Schema, model} = require('mongoose');
const reactionSchema = require('./Reaction')

// schema to create thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // add getter method for date formatting
        },
        username: {
            type: String,
            required: true,
        },
        // array of nested documents created with the reactionSchema
        reactions: [reactionSchema],
    },
    {
        // virtuals & getters
        toJSON: {
          virtuals: true,
          getters: true,
        },
        id: false,
      });
    //  add a virtual for length of reactions array for a thought
    thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;