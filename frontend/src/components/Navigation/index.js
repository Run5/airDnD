// frontend/src/components/Navigation/index.js
import React, { useState } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import HostingFormModal from "../HostingFormModal";
import * as sessionActions from '../../store/session';
import { d20, userIcon, barsIcon, searchIcon } from '../icons';
import './Navigation.css';

function Navigation({ isLoaded, nav }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  let history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <>
      {(nav) ?
      <nav className='NavigationContainer'>
        <div className='NavHome'>
          <NavLink exact to='/'>{d20} airdnd</NavLink>
        </div>
        {/* <div className='NavSearchBar'>
          <div className='NavSearch'>
            Start your search
          </div>
          <button type='button' className='NavSearchButton'>
            {searchIcon}
          </button>
        </div> */}
        <div className='NavRightContainer'>
          <div className='NavBecomeHost'>
            <NavLink className='NavHostButton' to='/host'>
              Become a host
            </NavLink>
          </div>
          <div className='NavLoginSignup'>
            <button
              type='button'
              className='NavProfileButton'
              onClick={() => {
                const menu = document.querySelector('.profile-dropdown');
                if(!showMenu){
                  menu.classList.remove('hidden')
                  setShowMenu(true);
                } else {
                  menu.classList.add('hidden')
                  setShowMenu(false);
                }
              }}
            >
              {barsIcon}&ensp;{userIcon}
            </button>
            {isLoaded && (sessionUser) ?
              <ul className="profile-dropdown hidden">
                <li>{sessionUser.username}</li>
                <li>{sessionUser.email}</li>
                <li><NavLink exact to={`/profile/${sessionUser.id}`} >View My Profile</NavLink></li>
                <HostingFormModal btnTxt={'Start Hosting'} cName={'menuHostingFormButton'}/>
                <button className='LogoutButton' onClick={logout}>Log Out</button>
              </ul> :
              <ul className="profile-dropdown hidden">
                <li><LoginFormModal setShowMenu={ setShowMenu }/></li>
                <li><SignupFormModal setShowMenu={ setShowMenu }/></li>
              </ul>}
          </div>
        </div>
      </nav> :
      <div className='NavHomeInvisible'>
        <NavLink exact to='/'>{d20}</NavLink>
      </div>}
    </>
  );
}

export default Navigation;
