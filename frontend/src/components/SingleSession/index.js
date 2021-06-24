import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDndSingleSession, deleteDndSession } from '../../store/dndsession'
import HostingFormEditModal from "../HostingFormEditModal";

function SingleSession() {
  const dispatch = useDispatch();
  const { sessionId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const singleSession = useSelector(state => state.dndsession[sessionId]);

  useEffect(() => {
    dispatch(getDndSingleSession(sessionId));
  }, [dispatch])

  return (
    <div className='SingleSessionContainer'>
      <h1>{singleSession?.name}</h1>
      <div>TESTING? - {sessionId}</div>
      {(sessionUser && singleSession.host_id === sessionUser.id) ? <div>
        <HostingFormEditModal btnTxt={'edit'}/>
        <button
          type='button'
          onClick={(e) => {
            e.preventDefault();
            dispatch(deleteDndSession(singleSession.id));
          }}
          className='SingleSessionRemoveButton'
        >
          delete
        </button>
      </div> : null}
    </div>
  );
}

export default SingleSession;
