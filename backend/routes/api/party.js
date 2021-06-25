const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { Party_member, Character, Session } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.post(
  '/create/:sessionId(\\d+)/:partySize(\\d+)',
  asyncHandler(async (req, res) => {
    const { sessionId, partySize } = req.params;

    const partyArray = []
    for (let i = 0; i < partySize; i++) {
      const party = await Party_member.create({
        character_id: null,
        session_id: sessionId,
      });
      partyArray.push(party)
    }//endFor

    return res.json(partyArray);
  }),
);

router.patch(
  '/:partyId/:charId(\\d+)',
  asyncHandler(async (req, res) => {
    const { partyId, charId } = req.params;
    const character = await Character.findByPk(charId);
    if (!character) throw new Error('Cannot find character');
    const partyMemberSlot = await Party_member.findByPk(partyId);
    if (!partyMemberSlot) throw new Error('Cannot find a slot in this party');
    const { charId } = req.body;
    if(charId === 0) {
      await partyMemberSlot.update({
        character_id: null
      });
    } else {
      await partyMemberSlot.update({
        character_id: charId
      });
    }
    return res.json(partyMemberSlot);
  }),
);

router.get(
  '/session/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const slots = await Party_member.findAll({
      where: {session_id: id}
    });
    return res.json(slots);
  }),
);

router.delete(
  '/session/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const slots = await Party_member.findAll({
      where: {session_id: id}
    });
    slots.array.forEach(async slot => {
      await slot.destroy({ where: { id: slot.id } })
    });
    return res.json()
  }),
);

module.exports = router;
