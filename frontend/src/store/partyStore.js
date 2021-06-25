// frontend/src/store/dndsession.js
import { csrfFetch } from './csrf';

const ADD = 'party/ADD';
const DELETE = 'party/DELETE';

const createParty = party => ({
  type: ADD,
  party,
});

const removeParty = sessionId => ({
  type: DELETE,
  sessionId,
})

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

export const deleteDndParty = (id) => async dispatch => {
  const response = await csrfFetch(`/api/party/session/${id}`, {
    method: 'DELETE',
  })

  dispatch(removeParty(id));
  return response;
};

const initialState = {};

const dndPartyReducer = (state = initialState, action) => {
  let newState = {}
  switch (action.type) {
    case ADD:
      newState = { ...action.dndparty }
      return newState;
    case DELETE:
      newState = { ...state }
      // for (const [ key, value ] of Object.entries(newState)) {
      //   console.log(`${key}: ${value}`);
      //   if ( key === 'session_id' && value === action.sessionId) delete newState[key];
      // }//endFor
      delete newState[action.sessionId]
      return newState;
    default:
      return state;
  }
};

export default dndPartyReducer;
