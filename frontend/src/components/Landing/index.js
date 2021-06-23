// frontend/src/components/Landing/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import './Landing.css';

function Landing() {

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

      </div>
      <div className='LandingHostAnywhere'>

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

      </div>
    </div>
  );
}

export default Landing;
