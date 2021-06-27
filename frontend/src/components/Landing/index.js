// frontend/src/components/Landing/index.js
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllDndSessions } from '../../store/randomSession';
import { useDispatch, useSelector } from 'react-redux';
import SessionCard from '../SessionCard';
import './Landing.css';

function Landing({ nav }) {
  nav();
  const dispatch = useDispatch();
  const allSessions = useSelector(state => state.allSessions);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllDndSessions());
  }, [])

  return (
    <div className='LandingPage'>
      <div className='LandingHeader'>
        <div className='LandingBannerContainer'>
          <div className='LandingBanner'>
            <div className='LandingBannerTitle'>
              The Greatest Adventure
            </div>
            <div className='LandingBannerSubtitle'>
              Wishlists curated by Airdnd.
            </div>
            <button className='LandingBannerButton'>
              Get inspired
            </button>
          </div>
        </div>
      </div>
      <div className='LandingExploreNearby'>
        <div className='NearYouTitle'>
          <h2>Explore some sessions near you!</h2>
        </div>
        <div className='AllSessions'>
          {Object.keys(allSessions).map((sessionId) => {
            return (
              <NavLink key={sessionId} to={`/sessions/${sessionId}`}>
                <div
                  className="SessionMap"
                  style={{ backgroundImage: `url('${allSessions[sessionId]?.map}')` }}
                ></div>
              </NavLink>
            );
          })}
        </div>
      </div>
      {/* <div className='LandingHostAnywhere'>

      </div>
      <div className='LandingTryHosting'>

      </div>
      <div className='LandingDiscover'>

      </div>
      <div className='LandingLearnMore'>

      </div>
      <div className='LandingInspirations'>

      </div>
      <div className='LandingLinks'>

      </div>
      <div className='LandingFooter'>

      </div> */}
    </div>
  );
}

export default Landing;
