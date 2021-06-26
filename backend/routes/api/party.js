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

    const partyObj = {};
    for (let i = 0; i < partySize; i++) {
      const party = await Party_member.create({
        character_id: null,
        session_id: sessionId,
      });
      partyObj[party.id] = party;
    }//endFor

    return res.json(partyObj);
  }),
);

router.patch(
  '/:partyId(\\d+)/:charId(\\d+)',
  asyncHandler(async (req, res) => {
    let { partyId, charId } = req.params;
    if(charId == 0) charId = null;
    console.log( 'the IDs: ', partyId, charId )

    if (charId) {
      const character = await Character.findByPk(charId);
      if (!character) throw new Error('Cannot find character');
    }

    const partyMemberSlot = await Party_member.findByPk(partyId);
    if (!partyMemberSlot) throw new Error('Cannot find a slot in this party');


    //NOTE: fix this later!
    if(charId === 0) {
      await partyMemberSlot.update({
        character_id: null
      });
    } else {
      await partyMemberSlot.update({
        character_id: charId
      });
    }

    console.log(">>>>>>>>>>>>>>>>>updated slot:", partyMemberSlot)

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
    await Party_member.destroy({
      where: {
        session_id: id
      }
    });
    return res.json()
  }),
);

module.exports = router;
