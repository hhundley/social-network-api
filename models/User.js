const { Schema, model } = require('mongoose');
const Thought = require('./Thought')

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
},
{
  // virtuals & getters
  toJSON: {
    virtuals: true,
    getters: true,
  },
});
//  add a virtual for length of friends array
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;