// backend/routes/api/index.js
// External Imports
const router = require('express').Router();

// Internal Imports
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const dndSessionRouter = require('./dndsessions.js');
const characterRouter = require('./character.js')
const partyRouter = require('./party.js')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/host', dndSessionRouter);
router.use('/character', characterRouter);
router.use('/party', partyRouter);

module.exports = router;
