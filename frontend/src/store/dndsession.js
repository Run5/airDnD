// frontend/src/store/dndsession.js
import { csrfFetch } from './csrf';

const HOST = 'dndsession/host';
const EDIT_HOST ='dndsession/editHost';
const DELETE_HOST = 'dndsession/deleteHost';
const GET_HOST = 'dndsession/getHost';

const setSession = (session) => {
  return {
    type: HOST,
    payload: session,
  };
};

const editSession = (session) => {
  return {
    type: EDIT_HOST,
    payload: session,
  };
};

const deleteSession = () => {
  return {
    type: DELETE_HOST,
  };
};

const getSession = (session) => {
  return {
    type: GET_HOST,
    payload: session,
  };
};

export const host = (session) => async (dispatch) => {
  const {
    host_id,
    name,
    description,
    location,
    map,
    party,
    isPublic,
    inPerson
  } = session;
  const response = await csrfFetch('/api/host/createSession', {
    method: "POST",
    body: JSON.stringify({
      host_id,
      name,
      description,
      location,
      map,
      party,
      isPublic,
      inPerson
    }),
  });
  const data = await response.json();
  dispatch(setSession(data.session));
  return response;
};

export const editHost = (session) => async dispatch => {
  const {
    host_id,
    name,
    description,
    location,
    map,
    party,
    isPublic,
    inPerson
  } = session;
  const response = await csrfFetch('/api/host/editSession', {
    method: "PATCH",
    body: JSON.stringify({
      host_id,
      name,
      description,
      location,
      map,
      party,
      isPublic,
      inPerson
    }),
  });
  const data = await response.json();
  dispatch(editSession(data.session));
  return response;
};

export const deleteHost = () => async (dispatch) => {
  const response = await csrfFetch('/api/host/deleteSession', {
    method: 'DELETE',
  });
  dispatch(deleteSession());
  return response;
};

export const getHost = () => async dispatch => {
  const response = await csrfFetch(`/api/host/getSingleSession`);

  if (response.ok) {
    const session = await response.json();
    dispatch(getSession(session));
  };
};

const dndsessionReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case HOST:
      newState = Object.assign({}, state);
      newState.session = action.payload;
      return newState;
    case EDIT_HOST:
      newState = Object.assign({}, state);
      newState.session = action.payload;
      return newState;
    case DELETE_HOST:
      return newState;
    case GET_HOST:
      return action.session;
    default:
      return state;
  }
};

export default dndsessionReducer;
