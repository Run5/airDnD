// frontend/src/store/dndsession.js
import { csrfFetch } from './csrf';


const LOAD = 'host/LOAD';
const ADD_ONE = 'host/ADD_ONE';
// const EDIT_HOST ='dndsession/EDIT_HOST';
const DELETE_SESSION = 'host/DELETE_SESSION';
// const GET_HOST = 'dndsession/GET_HOST';

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

const initialState = {};

const dndSessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      const alldndsessions = {};
      action.list.forEach(dndsession => {
        alldndsessions[dndsession.id] = dndsession;
      });
      return {
        ...alldndsessions,
        ...state,
      };
    }
    case ADD_ONE:
      let newState = {}
      newState = Object.assign({}, state);
      newState.dndsession = action.payload;
      return newState;
    default:
      return state;
  }
};

export default dndSessionReducer;
