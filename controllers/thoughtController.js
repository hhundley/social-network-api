const { User, Thought } = require('../models');

const thoughtCount = async () =>
  Thought.aggregate()
    .count('thoughtCount')
    .then((numberOfThoughts) => numberOfThoughts);

module.exports = {
    // GET all thoughts
    getAllThoughts(req,res) {
        Thought.find()
        .then(async (thoughts) => {
          const thoughtObj = {
            thoughts,
            thoughtCount: await thoughtCount(),
          };
          return res.json(thoughtObj);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
     // GET single thought
     getSingleThought(req,res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that id' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
    },
    // POST thought
    addThought(req, res) {
        Thought.create(req.body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: req.params.userId },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then((thought) => {
            if (!thought) {
              res.status(404).json({ message: 'not found' });
              return;
            }
            res.json(thought);
          })
          .catch((err) => res.json(err));
      },
      // PUT thought
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, {$set: req.body }, {
          new: true,
          runValidators: true, new: true
        })
          .then((thought) => {
            if (!thought) {
              res.status(404).json({ message: 'thought not found' });
              return;
            }
            res.json(thought);
          })
          .catch((err) => res.status(500).json(err));
      },
      // DELETE a thought
      deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
          .then((thought) => {
            if (!thought) {
              res.status(404).json({ message: 'thought not found' });
              return;
            }
            res.json(thought);
          })
          .catch((err) => res.status(500).json(err));
      },
    //   POST reaction
      addReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $push: { reactions: req.body } },
          { new: true, runValidators: true }
        )
          .then((thought) => {
            if (!thought) {
              res.status(404).json({ message: 'thought not found' });
              return;
            }
            res.json(thought);
          })
          .catch((err) => res.json(err));
      },
    // DELETE reaction
      removeReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { new: true }
        )
          .then((thought) => res.json(thought))
          .catch((err) => res.json(err));
      },
};