import React from 'react';
import HostingFormModal from '../HostingFormModal';
import { useSelector } from "react-redux";
// import { NavLink } from 'react-router-dom';
import './Hosting.css';

function Hosting() {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className='HostingPage'>
      <div className='HostingPageHeader'>
        <div className='HostingPageIntro'>
          Hosting makes Airdnd, Airdnd
        </div>
        <div className='HostingPageExample'>
          This will be an example session
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
