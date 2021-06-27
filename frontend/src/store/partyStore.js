// frontend/src/store/dndsession.js
import { csrfFetch } from './csrf';

const ADD = 'party/ADD';
const DELETE = 'party/DELETE';
const LOAD = 'party/LOAD';
export const PURGE = 'party/PURGE';

const createParty = party => ({
  type: ADD,
  party,
});

const removeParty = sessionId => ({
  type: DELETE,
  sessionId,
});

const load = list => ({
  type: LOAD,
  list,
});

export const createDndParty = (sessionId, partySize) => async dispatch => {
  const response = await csrfFetch(`/api/party/create/${sessionId}/${partySize}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  if (response.ok) {
    const dndparty = await response.json();
    dispatch(createParty(dndparty));
    return dndparty;
  };
};

export const deleteDndParty = (sessionId) => async dispatch => {
  const response = await csrfFetch(`/api/party/session/${sessionId}`, {
    method: 'DELETE',
  });

  dispatch(removeParty(sessionId));
  return response;
};

export const getPartyBySession = (sessionId) => async dispatch => {
  const response = await csrfFetch(`/api/party/session/${sessionId}`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  };
};

export const patchParty = (partyId, charId) => async dispatch => {
  const payload = { char_id: charId }

  const response = await csrfFetch(`/api/party/${partyId}/${charId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const partySlot = await response.json();
    dispatch(createParty(partySlot));
    return partySlot;
  };
};
const initialState = {};

const dndPartyReducer = (state = initialState, action) => {
  let newState = {}
  switch (action.type) {
    case LOAD:
      const allPartyMembers = {};
      action.list.forEach(member => {
        allPartyMembers[member.id] = member;
      });
      return {
        ...allPartyMembers,
        ...state,
      };
    case ADD:
      console.log(">>>>>>>>>>>>>", action.party)
      newState = { ...state }
      newState = action.party
      console.log('new state: ', newState)
      return newState;
    case DELETE:
      newState = {};
      return newState;
    case PURGE:
      newState = {};
      return newState;
    default:
      return state;
  }
};

export default dndPartyReducer;
