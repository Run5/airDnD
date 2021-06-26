import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getDndSingleSession, deleteDndSession } from '../../store/dndsession'
import { getPartyBySession, deleteDndParty, patchParty } from "../../store/partyStore";
import { getCharacters } from "../../store/charStore";
import HostingFormEditModal from "../HostingFormEditModal";
import './SingleSession.css';


function SingleSession({ nav }) {
  nav()

  const [partyIsFull, setFullParty] = useState(true);
  const [showCharacters, setShowCharacters] = useState(false);
  const [partyEmptySlot, setPartyEmptySlot] = useState('');
  const [isInParty, setIsInParty] = useState(false);
  const [mySlot, setMySlot] = useState('')

  const dispatch = useDispatch();
  const { sessionId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const singleSession = useSelector(state => state.dndsession[sessionId]);
  const sessionParty = useSelector(state => state.party);
  const myCharacters = useSelector(state => state.characters);

  let history = useHistory();

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  }

  useEffect(async () => {
    await dispatch(getDndSingleSession(sessionId));
    await dispatch(getPartyBySession(sessionId));
    if (sessionUser) await dispatch(getCharacters(sessionUser?.id));
  }, [dispatch])

  useEffect(() => {
    if(sessionParty) {
      const myCharsArr = Object.keys(myCharacters).map((charId) => myCharacters[charId].id);
      Object.keys(sessionParty).map(partySlot => {
        if(sessionParty[partySlot]?.character_id === null) {
          setFullParty(false);
          setPartyEmptySlot(partySlot)
        }
        if(myCharsArr.includes(sessionParty[partySlot]?.character_id)) {
          setMySlot(partySlot)
          setIsInParty(true);
        }
      })
    }//endIf
  }, [sessionParty])

  return (
    <div className='SingleSessionContainer'>
      <div className='SingleSessionWrapper'>
        <div className='SingleSessionInfo'>
          <h1 className='SingleSessionName'>{singleSession?.name}</h1>
          <p>{singleSession?.description}</p>
          <ul>
            <li>location: {singleSession?.location}</li>
            <li>Maximum Party Size: {singleSession?.party_max_size}</li>
            <li>Who can sign up for this session? {singleSession?.public  ? 'Public' : 'Private'}</li>
            <li>Will this session be hosted in person or online? {singleSession?.in_person ? 'In person.' : 'Online'}</li>
          </ul>
        </div>
        <div
          className='SingleSessionMap'
          style={{ backgroundImage: `url('${singleSession?.map}')` }}
        ></div>
        {(sessionUser && singleSession?.host_id === sessionUser?.id) ? <div>
          <HostingFormEditModal btnTxt={ 'edit' } sessionId={ sessionId }/>
          <button
            type='button'
            onClick={async (e) => {
              e.preventDefault();
              await dispatch(deleteDndParty(sessionId));
              await dispatch(deleteDndSession(sessionId));
              history.push('/host')
            }}
            className='SingleSessionRemoveButton'
          >
            delete
          </button>
        </div> :
        <div>
          { (isInParty) ?
            <button type='button' className={(showCharacters) ? 'SingleSessionJoinButtonDisabled' : 'SingleSessionJoinButton'} onClick={async (e) => {
              e.preventDefault();
              await dispatch(patchParty(mySlot, 0));
              await dispatch(getPartyBySession(sessionId));
            }}>
              Leave This Session
            </button> : (partyIsFull) ?
              <div>
                This Session is Full
              </div> :
              <button type='button' className='SingleSessionJoinButton' onClick={(e) => {
                e.preventDefault();
                setShowCharacters(!showCharacters)
              }}>
                Join This Session
              </button>
          }
        </div>}
      </div>
      { (showCharacters) ?
      <div className='SingleSessionCharacters'>
        { isEmpty(myCharacters) ?
          <p>You have not created any characters yet.</p> :
          <div className='MyCharacters'>
            { Object.keys(myCharacters).map((charId) => {
              return (
                <div>
                  <div>{myCharacters[charId].name} the {myCharacters[charId].race} {myCharacters[charId].class}</div>
                  <button type='button' onClick={async (e) => {
                    e.preventDefault();
                    await dispatch(patchParty(partyEmptySlot, charId));
                    await dispatch(getPartyBySession(sessionId));
                  }}>Join</button>
                </div>
              )
            })}
            <button type='button' onClick={(e) => {
              e.preventDefault();
              setShowCharacters(!showCharacters)
            }}>Cancel</button>
          </div>
        }
      </div> : null
      }
      <div className='SingleSessionReviewsContainer'>
        Reviews Go Here
      </div>
    </div>
  );
}

export default SingleSession;
