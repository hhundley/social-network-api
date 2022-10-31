const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
            trim: true,
          },
          username: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
            // add getter method for customdate logic for formatting
          },
        },
        {
          // plus some getters
          toJSON: {
            getters: true,
          },
          id: false,
    }
);

module.exports = reactionSchema;