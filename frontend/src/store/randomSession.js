// frontend/src/store/ranodmSession.js
import { csrfFetch } from './csrf';


const LOAD = 'random/LOAD';
const ADD_ONE = 'random/ADD_ONE';


const loadAll = list => ({
  type: LOAD,
  list,
});

const addOneRandomSession = dndsession => ({
  type: ADD_ONE,
  dndsession,
});


export const getAllDndSessions = () => async dispatch => {
  const response = await csrfFetch(`/api/host/all`);

  if (response.ok) {
    const list = await response.json();
    dispatch(loadAll(list));
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
    case ADD_ONE:
      newState = Object.assign({}, state);
      newState[action.dndsession.id] = action.dndsession;
      return newState;
    default:
      return state;
  }
};

export default randomSessionReducer;
