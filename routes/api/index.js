const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

// route names
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

// export routes
module.exports = router;