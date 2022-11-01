const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
  } = require('../../controllers/userController');

  // api users
router.route('/').get(getAllUsers).post(createUser);

// api user by :id
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

// api user:id/friends/friendId
router.route('/:id/:friendId').post(addFriend).delete(deleteFriend);

// export user routes
module.exports = router;