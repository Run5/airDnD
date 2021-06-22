const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { User, Session } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// validation middleware
const validateSession = [
  check('party_max_size')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a maximum party size, between 2 and 16.'),
  check('public')
    .exists({ checkFalsy: true })
    .withMessage("Please indicate if you'd like this session to be public."),
  check('in_person')
    .exists({ checkFalsy: true })
    .withMessage("Please indicate if this session will be in person or online."),
  handleValidationErrors,
];

router.post(
  '/createSession',
  validateSession,
  asyncHandler(async (req, res) => {
    const { description, location, party_max_size, public, in_person } = req.body;
    const host = await User.scope('currentUser').findByPk(id);
    const session = await Session.create({
      host,
      description,
      location,
      party_max_size,
      public,
      in_person
    });

    return res.json({
      session,
    });
  }),
);

module.exports = router;
