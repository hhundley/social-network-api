const { Schema, model } = require('mongoose');

// Schema to create a User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/@/,'Please enter a valid email'],
    },
    thoughts: [ {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    }],
    friends: [ {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
});
//  add a virtual for length of friends array
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;