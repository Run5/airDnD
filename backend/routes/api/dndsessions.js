const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { Session } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// validation middleware
const validateSession = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a name between 0 and 40 characters.'),
  check('map')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a url for the map to be used.'),
  handleValidationErrors,
];

router.post(
  '/createSession',
  validateSession,
  asyncHandler(async (req, res) => {
    const { host_id, name, description, location, map, party, isPublic, inPerson } = req.body;
    const session = await Session.create({
      host_id,
      name,
      description,
      location,
      map,
      party_max_size: party,
      public: isPublic,
      in_person: inPerson
    });

    return res.json({
      session,
    });
  }),
);

module.exports = router;
