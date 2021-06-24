// frontend/src/store/dndsession.js
import { csrfFetch } from './csrf';


const LOAD = 'host/LOAD';
const LOAD_ONE = 'host/LOAD_ONE'
const ADD_ONE = 'host/ADD_ONE';
// const EDIT_HOST ='dndsession/EDIT_HOST';
const DELETE_SESSION = 'host/DELETE_SESSION';
// const GET_HOST = 'dndsession/GET_HOST';

const load = list => ({
  type: LOAD,
  list,
});

const loadOne = session => ({
  type: LOAD_ONE,
  session,
});

const addOneDndSession = dndsession => ({
  type: ADD_ONE,
  dndsession,
});

const removeDndSession = id => ({
  type: DELETE_SESSION,
  id,
});

// const setdndsession = (dndsession) => {
//   return {
//     type: HOST,
//     payload: dndsession,
//   };
// };

// const editdndsession = (dndsession) => {
//   return {
//     type: EDIT_HOST,
//     payload: dndsession,
//   };
// };

export const deleteDndSession = (id) => async dispatch => {
  const response = await csrfFetch(`api/host/sessions/${id}`, {
    method: 'DELETE',
  })

  dispatch(removeDndSession(id));
  return response;
};

// const getdndsession = (dndsession) => {
//   return {
//     type: GET_HOST,
//     payload: dndsession,
//   };
// };

export const getDndSingleSession = (sessionId) => async dispatch => {
  console.log('SESSION ID IN THE DISPATCH CALL: ', sessionId)
  const response = await csrfFetch(`/api/host/sessions/${sessionId}`);

  console.log("RESPONSE FROM FETCH: ", response)
  if (response.ok) {
    const list = await response.json();
    dispatch(loadOne(list));
  };
};

export const getDndSessionByHost = (hostId) => async dispatch => {
  const response = await csrfFetch(`/api/host/${hostId}`);

  if (response.ok) {
    const session = await response.json();
    dispatch(load(session));
  };
};

export const createDndSession = (payload) => async dispatch => {
  const response = await csrfFetch(`/api/host/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
  })

  if (response.ok) {
    const dndsession = await response.json();
    dispatch(addOneDndSession(dndsession));
    return dndsession;
  };
};

const initialState = {};

const dndSessionReducer = (state = initialState, action) => {
  let newState = {}
  switch (action.type) {
    case LOAD:
      const alldndsessions = {};
      action.list.forEach(dndsession => {
        alldndsessions[dndsession.id] = dndsession;
      });
      return {
        ...alldndsessions,
        ...state,
      };
    case LOAD_ONE:
      newState = action.session;
      return newState;
    case ADD_ONE:
      newState = Object.assign({}, state);
      newState[action.dndsession.id] = action.dndsession;
      return newState;
    case DELETE_SESSION:
      newState = { ...state }
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default dndSessionReducer;
