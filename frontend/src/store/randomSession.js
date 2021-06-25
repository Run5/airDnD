// frontend/src/store/ranodmSession.js
import { csrfFetch } from './csrf';
import { DELETE_SESSION, ADD_ONE } from './dndsession';


const LOAD = 'random/LOAD';
const ADD_SESSION = 'random/ADD_SESSION'


const loadAll = list => ({
  type: LOAD,
  list,
});

export const addOneRandomSession = dndsession => ({
  type: ADD_SESSION,
  dndsession,
});

export const getAllDndSessions = () => async dispatch => {
  const response = await csrfFetch(`/api/host/all`);

  if (response.ok) {
    const list = await response.json();
    dispatch(loadAll(list));
  };
};

export const createSession = (payload) => async dispatch => {
  const response = await csrfFetch(`/api/host/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
  })

  if (response.ok) {
    const dndsession = await response.json();
    dispatch(addOneRandomSession(dndsession));
    return dndsession;
  };
};

const initialState = {};

const randomSessionReducer = (state = initialState, action) => {
  let newState = {}
  switch (action.type) {
    case LOAD:
      const alldndsessions = {};
      action.list.forEach(singleSessionFromAll => {
        alldndsessions[singleSessionFromAll.id] = singleSessionFromAll;
      });
      return {
        ...alldndsessions,
        ...state,
      };
    case ADD_SESSION:
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

export default randomSessionReducer;
