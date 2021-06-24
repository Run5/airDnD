import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDndSingleSession } from '../../store/dndsession'

function SingleSession() {
  const dispatch = useDispatch();
  const { sessionId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const singleSession = useSelector(state => state.singleSession);

  console.log('>>>>>>>>>>>>>>>>', singleSession)

  useEffect(() => {
    dispatch(getDndSingleSession(sessionId));
  }, [dispatch])



  return (
    <div className='SingleSessionContainer'>
      <h1>{singleSession?.name}</h1>
      <div>TESTING? - {sessionId}</div>
    </div>
  );
}

export default SingleSession;
