// frontend/src/components/Profile/index.js
import React, { useState, useEffect } from "react";
// import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Fab from "./Fab";
import CreateCharacter from "./CreateCharacter";
import EditCharacter from './EditCharacter'
import { getCharacters, deleteCharacter } from '../../store/charStore'
import './Profile.css';

function Profile(){
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [characterId, setCharacterId] = useState(0);
  const sessionUser = useSelector(state => state.session.user);
  const myCharacters = useSelector(state => state.characters);


  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  }

  useEffect(() => {
    dispatch(getCharacters(sessionUser?.id));
  }, [dispatch])

  return (
    <>
      <div>
        <h1>{sessionUser?.username}</h1>
        <p>Here is your profile Page!</p>
      </div>
      <div>
        {(!isEmpty(myCharacters)) ?
          <div>
            <h2>Your Characters</h2>
            { Object.keys(myCharacters).map((charId) => {
              if(myCharacters[charId]?.user_id === sessionUser?.id) {
                return (
                  <div>
                    {/* <NavLink to={``}></NavLink> eventually can link to character details page here*/}
                    <div>{myCharacters[charId]?.name}</div>
                    <div>{myCharacters[charId]?.race}</div>
                    <div>{myCharacters[charId]?.class}</div>
                    <div>{myCharacters[charId]?.level}</div>
                    <button type="button" onClick={(e) => {
                      e.preventDefault();
                      setCharacterId(charId);
                      setShowEditForm(true)
                    }}>edit</button>
                    <button type="button" onClick={(e) => {
                      e.preventDefault();
                      dispatch(deleteCharacter(charId));
                    }}>delete</button>
                  </div>
                )
              }//endIf
            }) }
          </div> : null
        }
        { showEditForm ? <EditCharacter hideForm={ () => setShowEditForm(false) } charId={ characterId } /> : null }
      </div>
      <div>
        <Fab hidden={showForm} onClick={() => setShowForm(true)} />
        { showForm ? (
          <CreateCharacter hideForm={ () => setShowForm(false) } />
        ) : null }
      </div>
    </>
  );
}

export default Profile;
