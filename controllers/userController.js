const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

const userCount = async () =>
  User.aggregate()
    .count('userCount')
    .then((numberOfUsers) => numberOfUsers);

module.exports = {
    // GET all users
    getAllUsers(req,res) {
        User.find()
        .then(async (user) => {
          const userObj = {
            user,
            userCount: await userCount(),
          };
          return res.json(userObj);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // GET single user
    getSingleUser(req,res) {
        User.findOne({ _id: req.params._id })
        .populate({
            path: 'thoughts',
            select: '-__v',
          })
          .populate({
            path: 'friends',
            select: '-__v',
          })
        .select('-__v')
        .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
    },
    // POST new user
    createUser(req, res) {
      User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
    },
    // PUT existing user
    updateUser(req, res) {
      User.findOneAndUpdate({ _id: req.params._id }, {$set: req.body }, {
        new: true,
        runValidators: true, new: true
      })
        .then((user) => {
          if (!user) {
            res.status(404).json({ message: 'user not found' });
            return;
          }
          res.json(user);
        })
        .catch((err) => res.status(500).json(err));
    },
    // DELETE a user
    deleteUser(req, res) {
      User.findOneAndDelete({ _id: req.params._id })
        .then((user) => {
          if (!user) {
            res.status(404).json({ message: 'user not found' });
            return;
          }
          res.json(user);
        })
        .catch((err) => res.status(500).json(err));
    },
    // POST friend
    addFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params._id },
        { $addToSet: { friends: req.body } },
        { runValidators: true, new: true }
      )
        .then((user) => {
          if (!user) {
            res.status(404).json({ message: 'user not found' });
            return;
          }
          res.json(user);
        })
        .catch((err) => res.status(500).json(err));
    },
    // DELETE a friend
    deleteFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params._id },
        { $pull: { friends: {_id: req.params.friendId } } },
        { runValidators: true, new: true }
      )
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
};