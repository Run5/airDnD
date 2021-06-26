const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { Character, User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// validation middleware
const validateCharacter = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a name between 0 and 30 characters.'),
  check('level')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a level between 1 and 20.'),
  handleValidationErrors,
];

router.post(
  '/:id(\\d+)',
  validateCharacter,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, race, dndClass, level } = req.body;
    const character = await Character.create({
      user_id: id,
      name,
      race,
      class: dndClass,
      level,
    });

    return res.json(character);
  }),
);

router.patch(
  '/:id(\\d+)',
  validateCharacter,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const character = await Character.findByPk(id);
    if (!character) throw new Error('Cannot find character');
    const { name, myRace, dndClass, level } = req.body;
    await character.update({
      name,
      race: myRace,
      class: dndClass,
      level,
    });
    return res.json(character);
  }),
);

router.get(
  '/all',
  asyncHandler(async (req, res) => {
    const characters = await Character.findAll();
    return res.json(characters);
  }),
);

router.get(
  '/mychars/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const characters = await Character.findAll({ where: { user_id: id } });
    return res.json(characters);
  }),
);
// router.get(
//   '/:partyId(\\d+)',
//   asyncHandler(async (req, res) => {
//     const { partyId } = req.params
//     const characters = await Character.findAll({
//       include: { model: },
//       where: { host_id: hostId }
//     });
//     return res.json(sessions);
//   }),
// );

router.get(
  '/details/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const character = await Character.findByPk(id);
    if (!character) throw new Error('Cannot find character');
    return res.json(character);
  }),
);

router.delete(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const character = await Character.findByPk(id);
    if (!character) throw new Error('Cannot find character');
    const characterId = character.id;
    await Character.destroy({ where: { id: characterId } });
    return res.json({ characterId })
  }),
);

module.exports = router;
