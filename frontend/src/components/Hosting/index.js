import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import HostingFormModal from '../HostingFormModal';
import ExampleHost from './ExampleHost';
import { getDndSessionByHost,  deleteDndSession } from '../../store/dndsession';
import './Hosting.css';

function Hosting() {
  const dispatch = useDispatch();
  const dndSessions = useSelector(state => {
    return state.dndsession;
  });
  const sessionUser = useSelector((state) => state.session.user);


  useEffect(() => {

    if(sessionUser) dispatch(getDndSessionByHost(sessionUser.id));

  }, [dispatch, sessionUser])

  // if (!dndSessions) {
  //   return null;
  // }

  // console.log(Object.keys(dndSessions))

  // const handleRemoveButtonClick = (e) => {
  //   e.preventDefault();
  //   dispatch(deleteDndSession());
  // }

  return (
    <div className='HostingPage'>
      <div className='HostingPageHeader'>
        <div className='HostingPageIntro'>
          Hosting makes Airdnd, Airdnd
        </div>
        <div className='HostingPageExample'>
          This will be an example session
          {/* <ExampleHost /> */}
        </div>
      </div>
      <div className='HostingPageHostAnything'>

      </div>
      <div className='HostingPageYourSessions'>
        {Object.keys(dndSessions).map((sessionId) => {
          return (
            <NavLink key={sessionId} to={`/sessions/${sessionId}`}>
              <div className='HostedSessionsContainer'>
                <h1>{dndSessions[sessionId]?.name}</h1>
                <div
                  className="HostedSessionsMap"
                  style={{ backgroundImage: `url('${dndSessions[sessionId]?.map}')` }}
                >

                </div>
                <div>

                </div>
                <div className='HostedSessionsRemove'>
                  <button
                    type='button'
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(deleteDndSession(sessionId));
                    }}
                    className='HostedSessionsRemoveButton'
                  >
                    Remove
                  </button>
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
      <div className='HostingPageIdeas'>

      </div>
      <div className='HostingPageFooter'>
        <div className='HostingPageExample'>
          This will be an example session
        </div>
        <div className='HostingPageOutro'>
          Try hosting a session on Airdnd
          <p>Join us. We'll help you every step of the way.</p>
          <HostingFormModal btnTxt={"Let's go!"} />
        </div>
      </div>
      <div className='HostingPageActualFooter'>

      </div>
    </div>
  );
}

export default Hosting;
