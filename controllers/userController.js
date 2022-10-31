const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

const userCount = async () =>
  Student.aggregate()
    .count('userCount')
    .then((numberOfUsers) => numberOfUsers);

module.exports = {
    getAllUsers(req,res) {
        Student.find()
        .then(async (users) => {
          const userObj = {
            users,
            userCount: await userCount(),
          };
          return res.json(userObj);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    getSingleUser(req,res) {
        User.findOne({ _id: req.params.id })
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
          : res.json({user})
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
    },
}