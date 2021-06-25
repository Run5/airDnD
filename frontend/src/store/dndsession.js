// frontend/src/store/dndsession.js
import { csrfFetch } from './csrf';


const LOAD = 'host/LOAD';
export const ADD_ONE = 'host/ADD_ONE';
export const DELETE_SESSION = 'host/DELETE_SESSION';


const load = list => ({
  type: LOAD,
  list,
});

const addOneDndSession = dndsession => ({
  type: ADD_ONE,
  dndsession,
});

const removeDndSession = id => ({
  type: DELETE_SESSION,
  id,
});

export const deleteDndSession = (id) => async dispatch => {
  const response = await csrfFetch(`/api/host/sessions/${id}`, {
    method: 'DELETE',
  })

  dispatch(removeDndSession(id));
  return response;
};

export const getDndSingleSession = (sessionId) => async dispatch => {
  const response = await csrfFetch(`/api/host/sessions/${sessionId}`);

  if (response.ok) {
    const singleSession = await response.json();
    dispatch(addOneDndSession(singleSession));
  };
};

export const getDndSessionByHost = (hostId) => async dispatch => {
  const response = await csrfFetch(`/api/host/${hostId}`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
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

export const patchDndSession = (sessionId, payload) => async dispatch => {
  const response = await csrfFetch(`/api/host/${sessionId}`, {
    method: 'PATCH',
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
