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

const remove = () => ({
  type: DELETE_SESSION
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

// const deletedndsession = () => {
//   return {
//     type: DELETE_HOST,
//   };
// };

// const getdndsession = (dndsession) => {
//   return {
//     type: GET_HOST,
//     payload: dndsession,
//   };
// };

// export const host = (dndsession) => async (dispatch) => {
//   const {
//     host_id,
//     name,
//     description,
//     location,
//     map,
//     party,
//     isPublic,
//     inPerson
//   } = dndsession;
//   const response = await csrfFetch('/api/host/', {
//     method: "POST",
//     body: JSON.stringify({
//       host_id,
//       name,
//       description,
//       location,
//       map,
//       party,
//       isPublic,
//       inPerson
//     }),
//   });
//   const data = await response.json();
//   dispatch(setdndsession(data.dndsession));
//   return response;
// };

// export const editHost = (dndsession) => async dispatch => {
//   const {
//     host_id,
//     name,
//     description,
//     location,
//     map,
//     party,
//     isPublic,
//     inPerson
//   } = dndsession;
//   const response = await csrfFetch('/api/host/editdndsession', {
//     method: "PATCH",
//     body: JSON.stringify({
//       host_id,
//       name,
//       description,
//       location,
//       map,
//       party,
//       isPublic,
//       inPerson
//     }),
//   });
//   const data = await response.json();
//   dispatch(editdndsession(data.dndsession));
//   return response;
// };

// export const deleteHost = () => async (dispatch) => {
//   const response = await csrfFetch('/api/host/deletedndsession', {
//     method: 'DELETE',
//   });
//   dispatch(deletedndsession());
//   return response;
// };

// export const getHost = () => async dispatch => {
//   const response = await csrfFetch(`/api/host/getSingledndsession`);

//   if (response.ok) {
//     const dndsession = await response.json();
//     dispatch(getdndsession(dndsession));
//   };
// };

export const getDndSession = () => async dispatch => {
  const response = await csrfFetch(`/api/host`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  };
};

export const createDndSession = (payload) => async dispatch => {
  // const dndsessionBody = JSON.stringify(payload);
  // dndsessionBody.party = Number(dndsessionBody.party)

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

// const dndsessionReducer = (state = {}, action) => {
//   let newState;
//   switch (action.type) {
//     case HOST:
//       newState = Object.assign({}, state);
//       newState.dndsession = action.payload;
//       return newState;
//     case EDIT_HOST:
//       newState = Object.assign({}, state);
//       newState.dndsession = action.payload;
//       return newState;
//     case DELETE_HOST:
//       return newState;
//     case GET_HOST:
//       newState = {...action.dndsession};
//       return newState;
//     default:
//       return state;
//   }
// };

const initialState = {
  list: [],
};

const sortList = (list) => {
  return list.sort((dndsessionA, dndsessionB) => {
    return dndsessionA.id - dndsessionB.id;
  }).map((dndsession) => dndsession.id);
};

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
        list: sortList(action.list),
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
