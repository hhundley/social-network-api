const {Schema, model} = require('mongoose');

// schema to create thought model
const thoughtSchema = new Schema(
    {
        thoughText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        // array of nested documents created with the reactionSchema
        reactions: [{}],
    },
    {
        timestamps: true
    });
    //  add a virtual for length of reactions array for a thought
    userSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;