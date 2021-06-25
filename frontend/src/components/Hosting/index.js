import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import HostingFormModal from '../HostingFormModal';
import { getDndSessionByHost,  deleteDndSession } from '../../store/dndsession';
import './Hosting.css';
import { getAllDndSessions } from '../../store/randomSession';
import SessionCard from '../SessionCard';
import { PURGE } from '../../store/partyStore';

function Hosting({ nav }) {
  nav();
  const dispatch = useDispatch();
  const [userIsHost, setUserIsHost] = useState(false)
  const dndSessions = useSelector(state => state.dndsession);
  const allSessions = useSelector(state => state.allSessions);
  const sessionUser = useSelector(state => state.session.user);
  const allSessionsArray = Object.keys(allSessions);
  function randomNum(num) {
    return Math.floor(Math.random() * num) + 1;
  }
  const randomIndex = randomNum(allSessionsArray.length - 1);
  const randomIdOne = allSessions[allSessionsArray[randomIndex]];
  const randomIndex2 = randomNum(allSessionsArray.length - 1);
  const randomIdTwo = allSessions[allSessionsArray[randomIndex2]];

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  useEffect(async () => {

    if(!isEmpty(dndSessions)) setUserIsHost(true);
    if(isEmpty(dndSessions)) setUserIsHost(false);

  }, [dndSessions])


  useEffect(() => {

    dispatch({ type: PURGE })
    if(sessionUser) dispatch(getDndSessionByHost(sessionUser.id));
    dispatch(getAllDndSessions());

  }, [dispatch, sessionUser])

  return (
    <div className='HostingPage'>
      <div className='HostingPageHeaderContainer'>
        <div className='HostingPageHeader'>
          <div className='HostingPageIntro'>
            <h1>Hosting makes Airdnd, Airdnd</h1>
          </div>
          <NavLink to={`/sessions/${allSessions[randomIdOne?.id]?.id}`}
            className='HostingPageExample'
            style={{ backgroundImage: `url('${allSessions[randomIdOne?.id]?.map}')` }}
          >
            <div className='HostingPageExampleName'>
              {allSessions[randomIdOne?.id]?.name}
            </div>
          </NavLink>
        </div>
        <div className='HostingFormButton'>
          <HostingFormModal btnTxt={"Try Hosting"} />
        </div>
      </div>
      <div className='HostingPageHostAnything'>

      </div>
      {(userIsHost) ?
      <>
        <div classList='HostingPageYourSessionsTitle'>
          <h1>Here is all the sessions you're currently hosting: </h1>
        </div>
        <div className='HostingPageYourSessions'>
          {Object.keys(dndSessions).map((sessionId) => {
            if(dndSessions[sessionId]?.host_id === sessionUser?.id) {
              return (
                <NavLink key={sessionId} to={`/sessions/${sessionId}`}>
                  <SessionCard sessionId={ sessionId } setShowSessions={() => setUserIsHost(false)} />
                </NavLink>
              );
            }//endIF
          })}
        </div>
      </> :
      null
      }
      <div className='HostingPageIdeas'>

      </div>
      <div className='HostingPageFooterContainer'>
        <div className='HostingPageFooter'>
          <NavLink to={`/sessions/${allSessions[randomIdTwo?.id]?.id}`}
            className='HostingPageExample'
            style={{ backgroundImage: `url('${allSessions[randomIdTwo?.id]?.map}')` }}
          >
            <div className='HostingPageExampleName'>
              {allSessions[randomIdTwo?.id]?.name}
            </div>
          </NavLink>
          <div className='HostingPageOutro'>
            <h1>Try hosting a session on Airdnd</h1>
            <h2>Join us. We'll help you every step of the way.</h2>
          </div>
        </div>
        <div className='HostingFormButton'>
          <HostingFormModal btnTxt={"Let's go!"} setShowSessions={() => setUserIsHost(true)} />
        </div>
      </div>
      <div className='HostingPageActualFooter'>

      </div>
    </div>
  );
}

export default Hosting;
