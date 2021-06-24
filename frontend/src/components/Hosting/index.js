import React, { useEffect } from 'react';
import HostingFormModal from '../HostingFormModal';
import ExampleHost from './ExampleHost';
import { useDispatch, useSelector } from "react-redux";
import './Hosting.css';
import { getDndSession } from '../../store/dndsession';

function Hosting() {
  const dispatch = useDispatch();
  // const dndSessions = useSelector(state => {
  //   console.log('>>>>>>>>>', state.dndsession)
  //   return state.session.list.map(sessionId => state.session[sessionId]);
  // });
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getDndSession());
  }, [dispatch])

  // if (!dndSessions) {
  //   return null;
  // }

  return (
    <div className='HostingPage'>
      <div className='HostingPageHeader'>
        <div className='HostingPageIntro'>
          Hosting makes Airdnd, Airdnd
        </div>
        <div className='HostingPageExample'>
          This will be an example session
          {/* Here is the sessions: {dndSessions} */}
          <ExampleHost />
        </div>
      </div>
      <div className='HostingPageHostAnything'>

      </div>
      <div className='HostingPageYourSessions'>

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
