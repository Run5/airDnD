// frontend/src/components/Profile/index.js
import React, { useState, useEffect } from "react";
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
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const myCharacters = useSelector(state => state.characters);


  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    dispatch(getCharacters(sessionUser?.id));
  }, [dispatch])

  return (
    <div className='ProfileContainer'>
      <div className='ProfileTitle'>
        <h1>Hello {sessionUser?.username}</h1>
        <p>Here is your profile Page!</p>
        <div>
          <Fab hidden={showForm || buttonDisabled} onClick={() => {
            setButtonDisabled(true)
            setShowForm(true)
          }} />
        </div>
      </div>
      <div>
        {(!isEmpty(myCharacters)) ?
          <div className='YourCharactersContainer'>
            <h2>Your Characters</h2>
            { Object.keys(myCharacters).map((charId) => {
              if(myCharacters[charId]?.user_id === sessionUser?.id) {
                return (
                  <div className='CharacterWrapper'>
                    <div className='CharWrap'>
                    {/* <NavLink to={``}></NavLink> eventually can link to character details page here*/}
                      <div className='CharacterInfo'>{myCharacters[charId]?.name}</div>
                      <div className='CharacterInfo'>{myCharacters[charId]?.race}</div>
                      <div className='CharacterInfo'>{myCharacters[charId]?.class}</div>
                      <div className='CharacterInfo'>{myCharacters[charId]?.level}</div>
                    </div>
                    <div className='BtnWrap'>
                      <button type="button" className='CharacterButton' disabled={buttonDisabled} onClick={(e) => {
                        e.preventDefault();
                        setCharacterId(charId);
                        setShowEditForm(true)
                        setButtonDisabled(true);
                      }}>Edit</button>
                      <button type="button" className='CharacterButton' disabled={buttonDisabled} onClick={(e) => {
                        e.preventDefault();
                        dispatch(deleteCharacter(charId));
                      }}>Delete</button>
                    </div>
                  </div>
                )
              }//endIf
            }) }
          </div> : null
        }
        { showForm ? <CreateCharacter hideForm={ () => {
            setButtonDisabled(false)
            setShowForm(false)
          }} /> : null }
        { showEditForm ? <EditCharacter hideForm={ () => {
            setButtonDisabled(false)
            setShowEditForm(false)
          }} charId={ characterId } /> : null }
      </div>
    </div>
  );
}

export default Profile;
