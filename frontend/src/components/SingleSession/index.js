import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getDndSingleSession, deleteDndSession } from '../../store/dndsession'
import HostingFormEditModal from "../HostingFormEditModal";
import './SingleSession.css';


function SingleSession({ nav }) {
  nav()

  const dispatch = useDispatch();
  const { sessionId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const singleSession = useSelector(state => state.dndsession[sessionId]);

  let history = useHistory();

  useEffect(() => {
    dispatch(getDndSingleSession(sessionId));
  }, [dispatch])

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
        {(sessionUser && singleSession.host_id === sessionUser.id) ? <div>
          <HostingFormEditModal btnTxt={ 'edit' } sessionId={ sessionId }/>
          <button
            type='button'
            onClick={(e) => {
              e.preventDefault();
              dispatch(deleteDndSession(singleSession.id));
              history.push('/host')
            }}
            className='SingleSessionRemoveButton'
          >
            delete
          </button>
        </div> :
        <div>
          <button className='SingleSessionJoinButton'>
            Join This Session
          </button>
        </div>}
      </div>
      <div className='SingleSessionReviewsContainer'>
        Reviews Go Here
      </div>
    </div>
  );
}

export default SingleSession;
