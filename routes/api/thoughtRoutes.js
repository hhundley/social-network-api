

const router = require('express').Router();
const {
  getAllThoughts,
  getSingleThought,
  addThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts);

router.route('/:userId').post(addThought);

router.route('/:userId/:thoughtId').get(getSingleThought).put(updateThought).post(addReaction).delete(deleteThought);

router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;