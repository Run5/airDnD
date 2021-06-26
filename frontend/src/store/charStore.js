// frontend/src/store/charStore.js
import { csrfFetch } from './csrf';


const LOAD_CHARS = 'char/LOAD_CHARS';
const ADD_CHAR = 'char/ADD_CHAR';
const DELETE_CHAR = 'char/DELETE_CHAR';


const load = list => ({
  type: LOAD_CHARS,
  list,
});

const addOneChar = character => ({
  type: ADD_CHAR,
  character,
});

const removeChar = charId => ({
  type: DELETE_CHAR,
  charId,
});

export const deleteCharacter = (id) => async dispatch => {
  const response = await csrfFetch(`/api/character/${id}`, {
    method: 'DELETE',
  })

  dispatch(removeChar(id));
  return response;
};

export const getSingleCharacter = (charId) => async dispatch => {
  const response = await csrfFetch(`/api/character/details/${charId}`);

  if (response.ok) {
    const character = await response.json();
    dispatch(addOneChar(character));
  };
};

export const getCharacters = (userId) => async dispatch => {
  const response = await csrfFetch(`/api/character/mychars/${userId}`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  };
};

export const getAllCharacters = () => async dispatch => {
  const response = await csrfFetch(`/api/character/all`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  };
};

export const createCharacter = (payload, userId) => async dispatch => {
  const response = await csrfFetch(`/api/character/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
  })

  if (response.ok) {
    const character = await response.json();
    dispatch(addOneChar(character));
    return character;
  };
};

export const patchCharacter = (payload, charId ) => async dispatch => {
  const response = await csrfFetch(`/api/character/${charId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
  })

  if (response.ok) {
    const character = await response.json();
    dispatch(addOneChar(character));
    return character;
  };
};

const initialState = {};

const characterReducer = (state = initialState, action) => {
  let newState = {}
  switch (action.type) {
    case LOAD_CHARS:
      const allCharacters = {};
      action.list.forEach(character => {
        allCharacters[character.id] = character;
      });
      return {
        ...allCharacters,
        ...state,
      };
    case ADD_CHAR:
      newState = Object.assign({}, state);
      newState[action.character.id] = action.character;
      return newState;
    case DELETE_CHAR:
      newState = { ...state }
      delete newState[action.charId];
      return newState;
    default:
      return state;
  }
};

export default characterReducer;
