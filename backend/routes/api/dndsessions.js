const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { Session } = require('../../db/models');
const SessionRepository = require('../../db/sessions-repository')
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
  '/',
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

    return res.json(session);
  }),
);

router.patch(
  '/:id(\\d+)',
  validateSession,
  asyncHandler(async (req, res) => {
    // const id = req.params.id;
    // const session = await Session.findByPk(id);
    // await session.update({
    //   host_id,
    //   name,
    //   description,
    //   location,
    //   map,
    //   party_max_size: party,
    //   public: isPublic,
    //   in_person: inPerson
    // });

    // return res.json({
    //   session,
    // });

    const id = await SessionRepository.update(req.body);
    const session = await SessionRepository.one(id);
    return res.json(session);
  }),
);


router.get(
  '/:hostId(\\d+)',
  asyncHandler(async (req, res) => {
    const { hostId } = req.params
    const sessions = await Session.findAll({
      where: { host_id: hostId }
    });
    return res.json(sessions);
  }),
);

router.get(
  'sessions/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log('ID PASSED TO BACKEND ROUTE', id)
    const session = await Session.findByPk(id);
    console.log('SESSION FOUND FROM TABLE', session)
    return res.json(session);
  }),
);

router.delete(
  '/sessions/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const session = await Session.findByPk(id);
    if (!session) throw new Error('Cannot find session');
    const sessionId = session.id;
    await Session.destroy({ where: { id: sessionId } });
    return res.json({ sessionId })
  }),
);


module.exports = router;
